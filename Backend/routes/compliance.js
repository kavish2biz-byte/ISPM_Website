const express = require('express');
const Policy = require('../models/Policy');
const PolicyAcknowledgement = require('../models/PolicyAcknowledgement');
const Course = require('../models/Course');
const UserProgress = require('../models/UserProgress');
const Certificate = require('../models/Certificate');
const User = require('../models/User');
const { authenticateToken, adminOnly, adminOrManager } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/compliance/dashboard
// @desc    Get compliance dashboard data
// @access  Private (Admin/Manager)
router.get('/dashboard', authenticateToken, adminOrManager, async (req, res) => {
  try {
    const { timeframe = '30d', department, role } = req.query;

    // Calculate date range
    const now = new Date();
    let startDate;
    switch (timeframe) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Build user filter
    const userFilter = {};
    if (department) userFilter.department = department;
    if (role) userFilter.role = role;

    // Policy Compliance Metrics
    const totalPolicies = await Policy.countDocuments({ 
      isDeleted: false, 
      status: 'active',
      createdAt: { $gte: startDate }
    });

    const totalUsers = await User.countDocuments({ 
      isActive: true, 
      ...userFilter 
    });

    const policyAcknowledgmentStats = await PolicyAcknowledgement.aggregate([
      {
        $lookup: {
          from: 'policies',
          localField: 'policyId',
          foreignField: '_id',
          as: 'policy'
        }
      },
      {
        $unwind: '$policy'
      },
      {
        $match: {
          'policy.isDeleted': false,
          'policy.status': 'active',
          acknowledgedAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalAcknowledged: { $sum: 1 },
          onTime: { $sum: { $cond: [{ $eq: ['$isLate', false] }, 1, 0] } },
          late: { $sum: { $cond: [{ $eq: ['$isLate', true] }, 1, 0] } },
          avgDaysLate: { $avg: { $cond: [{ $eq: ['$isLate', true] }, '$daysLate', 0] } }
        }
      }
    ]);

    // Training Compliance Metrics
    const totalCourses = await Course.countDocuments({ 
      isDeleted: false, 
      status: 'published',
      createdAt: { $gte: startDate }
    });

    const trainingStats = await UserProgress.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalEnrollments: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
          inProgress: { $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] } },
          notStarted: { $sum: { $cond: [{ $eq: ['$status', 'not-started'] }, 1, 0] } },
          overdue: { $sum: { $cond: [{ $eq: ['$isOverdue', true] }, 1, 0] } },
          avgProgress: { $avg: '$progress' },
          avgTimeSpent: { $avg: '$timeSpent' }
        }
      }
    ]);

    // Certificate Metrics
    const certificateStats = await Certificate.aggregate([
      {
        $match: {
          issuedAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalIssued: { $sum: 1 },
          active: { $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] } },
          expired: { $sum: { $cond: [{ $eq: ['$status', 'expired'] }, 1, 0] } },
          revoked: { $sum: { $cond: [{ $eq: ['$status', 'revoked'] }, 1, 0] } }
        }
      }
    ]);

    // User Compliance by Department
    const departmentCompliance = await User.aggregate([
      { $match: { isActive: true, ...userFilter } },
      {
        $lookup: {
          from: 'policyacknowledgements',
          localField: '_id',
          foreignField: 'userId',
          as: 'acknowledgments'
        }
      },
      {
        $lookup: {
          from: 'userprogresses',
          localField: '_id',
          foreignField: 'userId',
          as: 'trainingProgress'
        }
      },
      {
        $group: {
          _id: '$department',
          userCount: { $sum: 1 },
          policiesAcknowledged: {
            $sum: { $size: '$acknowledgments' }
          },
          trainingCompleted: {
            $sum: {
              $size: {
                $filter: {
                  input: '$trainingProgress',
                  cond: { $eq: ['$$this.status', 'completed'] }
                }
              }
            }
          },
          trainingInProgress: {
            $sum: {
              $size: {
                $filter: {
                  input: '$trainingProgress',
                  cond: { $eq: ['$$this.status', 'in-progress'] }
                }
              }
            }
          }
        }
      },
      {
        $sort: { userCount: -1 }
      }
    ]);

    // Recent Activity
    const recentActivity = await Promise.all([
      PolicyAcknowledgement.find()
        .populate('policyId', 'title')
        .populate('userId', 'name email')
        .sort({ acknowledgedAt: -1 })
        .limit(5),
      UserProgress.find({ status: 'completed' })
        .populate('courseId', 'title')
        .populate('userId', 'name email')
        .sort({ completedAt: -1 })
        .limit(5)
    ]);

    // Overdue Items
    const overduePolicies = await PolicyAcknowledgement.find({
      isLate: true,
      acknowledgedAt: { $gte: startDate }
    })
      .populate('policyId', 'title acknowledgmentDeadline')
      .populate('userId', 'name email department')
      .sort({ acknowledgedAt: -1 });

    const overdueTraining = await UserProgress.find({
      isOverdue: true,
      deadline: { $lt: now },
      status: { $ne: 'completed' }
    })
      .populate('courseId', 'title')
      .populate('userId', 'name email department')
      .sort({ deadline: 1 });

    res.json({
      success: true,
      dashboard: {
        overview: {
          totalPolicies,
          totalCourses,
          totalUsers,
          timeframe
        },
        policyCompliance: {
          ...policyAcknowledgmentStats[0] || { totalAcknowledged: 0, onTime: 0, late: 0, avgDaysLate: 0 },
          acknowledgmentRate: totalUsers > 0 ? 
            Math.round(((policyAcknowledgmentStats[0]?.totalAcknowledged || 0) / (totalUsers * totalPolicies)) * 100) : 0
        },
        trainingCompliance: {
          ...trainingStats[0] || { totalEnrollments: 0, completed: 0, inProgress: 0, notStarted: 0, overdue: 0, avgProgress: 0, avgTimeSpent: 0 },
          completionRate: trainingStats[0]?.totalEnrollments > 0 ? 
            Math.round((trainingStats[0].completed / trainingStats[0].totalEnrollments) * 100) : 0
        },
        certificates: {
          ...certificateStats[0] || { totalIssued: 0, active: 0, expired: 0, revoked: 0 }
        },
        departmentCompliance,
        recentActivity: {
          policyAcknowledgments: recentActivity[0],
          trainingCompletions: recentActivity[1]
        },
        overdue: {
          policies: overduePolicies,
          training: overdueTraining
        }
      }
    });

  } catch (error) {
    console.error('Get compliance dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching compliance dashboard'
    });
  }
});

// @route   GET /api/compliance/trends
// @desc    Get compliance trends over time
// @access  Private (Admin/Manager)
router.get('/trends', authenticateToken, adminOrManager, async (req, res) => {
  try {
    const { timeframe = '30d', type = 'both' } = req.query;

    // Calculate date range
    const now = new Date();
    let startDate, interval;
    switch (timeframe) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        interval = 'day';
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        interval = 'day';
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        interval = 'week';
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        interval = 'month';
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        interval = 'day';
    }

    const trends = {};

    if (type === 'policies' || type === 'both') {
      // Policy acknowledgment trends
      trends.policyAcknowledgmentTrends = await PolicyAcknowledgement.aggregate([
        {
          $match: {
            acknowledgedAt: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: interval === 'day' ? '%Y-%m-%d' : interval === 'week' ? '%Y-%U' : '%Y-%m',
                date: '$acknowledgedAt'
              }
            },
            count: { $sum: 1 },
            onTime: { $sum: { $cond: [{ $eq: ['$isLate', false] }, 1, 0] } },
            late: { $sum: { $cond: [{ $eq: ['$isLate', true] }, 1, 0] } }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
    }

    if (type === 'training' || type === 'both') {
      // Training completion trends
      trends.trainingCompletionTrends = await UserProgress.aggregate([
        {
          $match: {
            completedAt: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: interval === 'day' ? '%Y-%m-%d' : interval === 'week' ? '%Y-%U' : '%Y-%m',
                date: '$completedAt'
              }
            },
            completions: { $sum: 1 },
            avgScore: { $avg: { $arrayElemAt: ['$quizAttempts.score', -1] } },
            avgTimeSpent: { $avg: '$timeSpent' }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);
    }

    res.json({
      success: true,
      trends,
      timeframe,
      interval
    });

  } catch (error) {
    console.error('Get compliance trends error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching compliance trends'
    });
  }
});

// @route   GET /api/compliance/reports
// @desc    Generate compliance reports
// @access  Private (Admin/Manager)
router.get('/reports', authenticateToken, adminOrManager, async (req, res) => {
  try {
    const { 
      type = 'summary', 
      format = 'json',
      department,
      role,
      startDate,
      endDate
    } = req.query;

    const filter = {};
    if (department) filter.department = department;
    if (role) filter.role = role;

    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    let report;

    switch (type) {
      case 'summary':
        report = await generateSummaryReport(filter, dateFilter);
        break;
      case 'detailed':
        report = await generateDetailedReport(filter, dateFilter);
        break;
      case 'user':
        report = await generateUserReport(filter, dateFilter);
        break;
      default:
        report = await generateSummaryReport(filter, dateFilter);
    }

    res.json({
      success: true,
      report,
      generatedAt: new Date(),
      filters: { type, format, department, role, startDate, endDate }
    });

  } catch (error) {
    console.error('Generate compliance report error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while generating compliance report'
    });
  }
});

// Helper functions for report generation
async function generateSummaryReport(filter, dateFilter) {
  const users = await User.find({ isActive: true, ...filter });
  const userIds = users.map(u => u._id);

  const policyStats = await PolicyAcknowledgement.aggregate([
    {
      $match: {
        userId: { $in: userIds },
        acknowledgedAt: dateFilter
      }
    },
    {
      $group: {
        _id: '$userId',
        acknowledgedPolicies: { $sum: 1 },
        lateAcknowledgments: { $sum: { $cond: [{ $eq: ['$isLate', true] }, 1, 0] } }
      }
    }
  ]);

  const trainingStats = await UserProgress.aggregate([
    {
      $match: {
        userId: { $in: userIds },
        createdAt: dateFilter
      }
    },
    {
      $group: {
        _id: '$userId',
        enrolledCourses: { $sum: 1 },
        completedCourses: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
        overdueCourses: { $sum: { $cond: [{ $eq: ['$isOverdue', true] }, 1, 0] } }
      }
    }
  ]);

  return {
    totalUsers: users.length,
    policyCompliance: {
      totalAcknowledged: policyStats.reduce((sum, stat) => sum + stat.acknowledgedPolicies, 0),
      lateAcknowledged: policyStats.reduce((sum, stat) => sum + stat.lateAcknowledgments, 0)
    },
    trainingCompliance: {
      totalEnrollments: trainingStats.reduce((sum, stat) => sum + stat.enrolledCourses, 0),
      completedCourses: trainingStats.reduce((sum, stat) => sum + stat.completedCourses, 0),
      overdueCourses: trainingStats.reduce((sum, stat) => sum + stat.overdueCourses, 0)
    }
  };
}

async function generateDetailedReport(filter, dateFilter) {
  // Implementation for detailed report
  return { message: 'Detailed report implementation' };
}

async function generateUserReport(filter, dateFilter) {
  // Implementation for user-specific report
  return { message: 'User report implementation' };
}

module.exports = router;

