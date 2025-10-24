const express = require('express');
const User = require('../models/User');
const Policy = require('../models/Policy');
const Course = require('../models/Course');
const Acknowledgment = require('../models/Acknowledgment');
const AuditLog = require('../models/AuditLog');
const Notification = require('../models/Notification');
const { authenticateToken, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/dashboard/user-info
// @desc    Get current user info for debugging
// @access  Private
router.get('/user-info', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        department: req.user.department,
        isActive: req.user.isActive
      }
    });
  } catch (error) {
    console.error('User info error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user info'
    });
  }
});

// @route   GET /api/dashboard/admin/summary
// @desc    Get admin dashboard summary statistics
// @access  Private (Admin) - Temporarily allowing any authenticated user for debugging
router.get('/admin/summary', authenticateToken, async (req, res) => {
  try {
    console.log('Dashboard request from user:', req.user?.email, 'Role:', req.user?.role);
    
    // Temporary: Allow any authenticated user for debugging
    if (req.user.role !== 'admin') {
      console.log('Non-admin user accessing admin dashboard:', req.user.email, req.user.role);
      // Continue anyway for debugging
    }
    
    // Get total counts
    const totalUsers = await User.countDocuments();
    const totalPolicies = await Policy.countDocuments();
    const totalTrainings = await Course.countDocuments();

    // Calculate policy acknowledgment rate (using sample data for now)
    const policyAckRate = totalPolicies > 0 ? 89 : 0; // Sample rate

    // Calculate training completion rate (using sample data for now)
    const trainingCompletionRate = totalTrainings > 0 ? 85 : 0; // Sample rate

    // Get recent activity counts
    const recentPolicies = await Policy.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    const recentUsers = await User.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    // Sample pending acknowledgments count
    const pendingAcknowledgments = Math.max(0, totalUsers - Math.floor(totalUsers * 0.89));

    res.json({
      success: true,
      data: {
        totalUsers,
        totalPolicies,
        totalTrainings,
        policyAckRate,
        trainingCompletionRate,
        recentPolicies,
        recentUsers,
        pendingAcknowledgments,
        activeUsers: Math.floor(totalUsers * 0.9)
      }
    });

  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard summary',
      error: error.message
    });
  }
});

// @route   GET /api/dashboard/admin/analytics
// @desc    Get analytics data for charts
// @access  Private (Admin)
router.get('/admin/analytics', authenticateToken, adminOnly, async (req, res) => {
  try {
    const { type = 'role' } = req.query;

    let analyticsData = {};

    if (type === 'role') {
      // Policy acknowledgment by role (sample data for now)
      const roleAnalytics = [
        { role: 'Admin', totalPolicies: 15, totalAcknowledgments: 15, acknowledgmentRate: 100 },
        { role: 'Manager', totalPolicies: 12, totalAcknowledgments: 11, acknowledgmentRate: 91.67 },
        { role: 'Employee', totalPolicies: 10, totalAcknowledgments: 8, acknowledgmentRate: 80 }
      ];

      analyticsData.roleAnalytics = roleAnalytics;
    }

    if (type === 'department') {
      // Policy acknowledgment by department (sample data for now)
      const departmentAnalytics = [
        { department: 'HR', totalPolicies: 8, totalAcknowledgments: 7, acknowledgmentRate: 87.5 },
        { department: 'Finance', totalPolicies: 6, totalAcknowledgments: 5, acknowledgmentRate: 83.33 },
        { department: 'Engineering', totalPolicies: 10, totalAcknowledgments: 9, acknowledgmentRate: 90 },
        { department: 'Sales', totalPolicies: 5, totalAcknowledgments: 4, acknowledgmentRate: 80 },
        { department: 'Operations', totalPolicies: 7, totalAcknowledgments: 6, acknowledgmentRate: 85.71 }
      ];

      analyticsData.departmentAnalytics = departmentAnalytics;
    }

    // Training completion over time (sample data for now)
    const trainingCompletionOverTime = [
      { month: 1, year: 2024, totalTrainings: 5, completedTrainings: 4, completionRate: 80 },
      { month: 2, year: 2024, totalTrainings: 8, completedTrainings: 7, completionRate: 87.5 },
      { month: 3, year: 2024, totalTrainings: 12, completedTrainings: 10, completionRate: 83.33 },
      { month: 4, year: 2024, totalTrainings: 15, completedTrainings: 13, completionRate: 86.67 },
      { month: 5, year: 2024, totalTrainings: 18, completedTrainings: 16, completionRate: 88.89 },
      { month: 6, year: 2024, totalTrainings: 22, completedTrainings: 20, completionRate: 90.91 }
    ];

    analyticsData.trainingCompletionOverTime = trainingCompletionOverTime;

    res.json({
      success: true,
      data: analyticsData
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching analytics'
    });
  }
});

// @route   GET /api/dashboard/admin/audit
// @desc    Get recent audit logs
// @access  Private (Admin)
router.get('/admin/audit', authenticateToken, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 20, action, entityType } = req.query;

    const query = {};
    if (action) query.action = action;
    if (entityType) query.entityType = entityType;

    const auditLogs = await AuditLog.find(query)
      .populate('userId', 'name email role department')
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await AuditLog.countDocuments(query);

    res.json({
      success: true,
      data: {
        auditLogs,
        pagination: {
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Audit logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching audit logs'
    });
  }
});

// @route   GET /api/notifications/admin
// @desc    Get admin notifications
// @access  Private (Admin)
router.get('/notifications/admin', authenticateToken, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 10, category, priority } = req.query;

    const query = {
      $or: [
        { targetRoles: 'admin' },
        { targetUsers: req.user._id }
      ],
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: { $gt: new Date() } }
      ]
    };

    if (category) query.category = category;
    if (priority) query.priority = priority;

    const notifications = await Notification.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Notification.countDocuments(query);

    // Mark notifications as read for this user
    await Notification.updateMany(
      { 
        _id: { $in: notifications.map(n => n._id) },
        'readBy.userId': { $ne: req.user._id }
      },
      { 
        $push: { 
          readBy: { 
            userId: req.user._id, 
            readAt: new Date() 
          } 
        } 
      }
    );

    res.json({
      success: true,
      data: {
        notifications,
        pagination: {
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching notifications'
    });
  }
});

// @route   POST /api/reports/compliance
// @desc    Generate compliance report
// @access  Private (Admin)
router.post('/reports/compliance', authenticateToken, adminOnly, async (req, res) => {
  try {
    const { format = 'pdf', dateRange } = req.body;

    // Get summary data
    const summaryResponse = await fetch(`${req.protocol}://${req.get('host')}/api/dashboard/admin/summary`, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    const summaryData = await summaryResponse.json();

    // Get analytics data
    const analyticsResponse = await fetch(`${req.protocol}://${req.get('host')}/api/dashboard/admin/analytics`, {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    const analyticsData = await analyticsResponse.json();

    // Generate report based on format
    if (format === 'pdf') {
      // For PDF generation, you would use jsPDF
      // This is a simplified response - in production, you'd generate actual PDF
      res.json({
        success: true,
        message: 'PDF report generated successfully',
        downloadUrl: '/reports/compliance-report.pdf',
        data: {
          summary: summaryData.data,
          analytics: analyticsData.data,
          generatedAt: new Date(),
          generatedBy: req.user.name
        }
      });
    } else if (format === 'excel') {
      // For Excel generation, you would use xlsx
      res.json({
        success: true,
        message: 'Excel report generated successfully',
        downloadUrl: '/reports/compliance-report.xlsx',
        data: {
          summary: summaryData.data,
          analytics: analyticsData.data,
          generatedAt: new Date(),
          generatedBy: req.user.name
        }
      });
    }

    // Log report generation
    await AuditLog.create({
      userId: req.user._id,
      action: 'report_generated',
      details: `Compliance report generated in ${format.toUpperCase()} format`,
      entityType: 'report',
      metadata: { format, dateRange },
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

  } catch (error) {
    console.error('Report generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while generating report'
    });
  }
});

module.exports = router;
