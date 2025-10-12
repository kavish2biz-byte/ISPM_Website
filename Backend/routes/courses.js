const express = require('express');
const Course = require('../models/Course');
const UserProgress = require('../models/UserProgress');
const Certificate = require('../models/Certificate');
const { authenticateToken, adminOnly, adminOrManager } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses (with filtering and pagination)
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      category,
      difficulty,
      search,
      assignedToMe = false
    } = req.query;

    const query = { isDeleted: false };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by difficulty
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filter courses assigned to user
    if (assignedToMe === 'true') {
      query.$or = [
        { assignedRoles: req.user.role },
        { assignedDepartments: req.user.department },
        { assignedUsers: req.user._id }
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: [
        { path: 'createdBy', select: 'name email' },
        { path: 'lastModifiedBy', select: 'name email' }
      ]
    };

    const courses = await Course.paginate(query, options);

    // Get user progress for each course
    const coursesWithProgress = await Promise.all(
      courses.docs.map(async (course) => {
        const progress = await UserProgress.findOne({
          userId: req.user._id,
          courseId: course._id
        });

        return {
          ...course.toObject(),
          userProgress: progress
        };
      })
    );

    res.json({
      success: true,
      courses: coursesWithProgress,
      pagination: {
        page: courses.page,
        pages: courses.totalPages,
        total: courses.totalDocs,
        hasNext: courses.hasNextPage,
        hasPrev: courses.hasPrevPage
      }
    });

  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses'
    });
  }
});

// @route   GET /api/courses/:id
// @desc    Get single course
// @access  Private
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('lastModifiedBy', 'name email')
      .populate('prerequisites', 'title description');

    if (!course || course.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user has access to this course
    const hasAccess = course.assignedRoles.includes(req.user.role) ||
                     course.assignedDepartments.includes(req.user.department) ||
                     course.assignedUsers.includes(req.user._id);

    if (!hasAccess && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this course'
      });
    }

    // Get user progress
    const progress = await UserProgress.findOne({
      userId: req.user._id,
      courseId: course._id
    });

    // Get user's certificate if exists
    const certificate = await Certificate.findOne({
      userId: req.user._id,
      courseId: course._id,
      status: 'active'
    });

    res.json({
      success: true,
      course: {
        ...course.toObject(),
        userProgress: progress,
        certificate: certificate
      }
    });

  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course'
    });
  }
});

// @route   POST /api/courses
// @desc    Create new course (Admin only)
// @access  Private (Admin)
router.post('/', authenticateToken, adminOnly, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      estimatedDuration,
      assignedRoles,
      assignedDepartments,
      assignedUsers,
      content,
      quiz,
      certificate,
      deadline,
      autoAssign,
      prerequisites,
      tags
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !estimatedDuration) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, category, and estimated duration are required'
      });
    }

    const courseData = {
      title,
      description,
      category,
      difficulty: difficulty || 'beginner',
      estimatedDuration: parseInt(estimatedDuration),
      assignedRoles: assignedRoles || ['employee'],
      assignedDepartments: assignedDepartments || [],
      assignedUsers: assignedUsers || [],
      content: content || { modules: [] },
      quiz: quiz || { enabled: true, passingScore: 80, maxAttempts: 3, questions: [] },
      certificate: certificate || { enabled: true, validFor: 365 },
      deadline: deadline ? new Date(deadline) : null,
      autoAssign: autoAssign || false,
      prerequisites: prerequisites || [],
      tags: tags || [],
      createdBy: req.user._id
    };

    const course = new Course(courseData);
    await course.save();

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course
    });

  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating course'
    });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update course (Admin only)
// @access  Private (Admin)
router.put('/:id', authenticateToken, adminOnly, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course || course.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    const {
      title,
      description,
      category,
      difficulty,
      estimatedDuration,
      status,
      assignedRoles,
      assignedDepartments,
      assignedUsers,
      content,
      quiz,
      certificate,
      deadline,
      autoAssign,
      prerequisites,
      tags
    } = req.body;

    // Update fields
    if (title) course.title = title;
    if (description) course.description = description;
    if (category) course.category = category;
    if (difficulty) course.difficulty = difficulty;
    if (estimatedDuration) course.estimatedDuration = parseInt(estimatedDuration);
    if (status) course.status = status;
    if (assignedRoles) course.assignedRoles = assignedRoles;
    if (assignedDepartments) course.assignedDepartments = assignedDepartments;
    if (assignedUsers) course.assignedUsers = assignedUsers;
    if (content) course.content = content;
    if (quiz) course.quiz = { ...course.quiz, ...quiz };
    if (certificate) course.certificate = { ...course.certificate, ...certificate };
    if (deadline !== undefined) course.deadline = deadline ? new Date(deadline) : null;
    if (autoAssign !== undefined) course.autoAssign = autoAssign;
    if (prerequisites) course.prerequisites = prerequisites;
    if (tags) course.tags = tags;

    course.lastModifiedBy = req.user._id;
    await course.save();

    res.json({
      success: true,
      message: 'Course updated successfully',
      course
    });

  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating course'
    });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete course (Admin only)
// @access  Private (Admin)
router.delete('/:id', authenticateToken, adminOnly, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course || course.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Soft delete
    course.isDeleted = true;
    course.status = 'archived';
    course.lastModifiedBy = req.user._id;
    await course.save();

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });

  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting course'
    });
  }
});

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in course
// @access  Private
router.post('/:id/enroll', authenticateToken, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course || course.isDeleted || course.status !== 'published') {
      return res.status(404).json({
        success: false,
        message: 'Course not found or not published'
      });
    }

    // Check if user has access to this course
    const hasAccess = course.assignedRoles.includes(req.user.role) ||
                     course.assignedDepartments.includes(req.user.department) ||
                     course.assignedUsers.includes(req.user._id);

    if (!hasAccess && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this course'
      });
    }

    // Check if already enrolled
    const existingProgress = await UserProgress.findOne({
      userId: req.user._id,
      courseId: course._id
    });

    if (existingProgress) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Create progress record
    const progress = new UserProgress({
      userId: req.user._id,
      courseId: course._id,
      status: 'not-started',
      deadline: course.deadline
    });

    await progress.save();

    res.json({
      success: true,
      message: 'Successfully enrolled in course',
      progress
    });

  } catch (error) {
    console.error('Enroll course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while enrolling in course'
    });
  }
});

// @route   POST /api/courses/:id/progress
// @desc    Update course progress
// @access  Private
router.post('/:id/progress', authenticateToken, async (req, res) => {
  try {
    const { moduleId, completed, timeSpent } = req.body;

    const progress = await UserProgress.findOne({
      userId: req.user._id,
      courseId: req.params.id
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Course progress not found'
      });
    }

    // Update module progress
    if (moduleId) {
      const moduleIndex = progress.moduleProgress.findIndex(
        mp => mp.moduleId.toString() === moduleId
      );

      if (moduleIndex >= 0) {
        progress.moduleProgress[moduleIndex].completed = completed;
        if (completed) {
          progress.moduleProgress[moduleIndex].completedAt = new Date();
        }
        progress.moduleProgress[moduleIndex].timeSpent = timeSpent || 0;
      } else {
        progress.moduleProgress.push({
          moduleId,
          completed,
          completedAt: completed ? new Date() : null,
          timeSpent: timeSpent || 0
        });
      }
    }

    // Update overall progress
    const course = await Course.findById(req.params.id);
    const totalModules = course.content.modules.length;
    const completedModules = progress.moduleProgress.filter(mp => mp.completed).length;
    progress.progress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

    // Update status
    if (progress.progress === 100 && course.quiz.enabled) {
      progress.status = 'in-progress'; // Ready for quiz
    } else if (progress.progress === 100 && !course.quiz.enabled) {
      progress.status = 'completed';
      progress.completedAt = new Date();
    } else if (progress.progress > 0) {
      progress.status = 'in-progress';
    }

    progress.lastAccessedAt = new Date();
    progress.timeSpent += timeSpent || 0;

    await progress.save();

    res.json({
      success: true,
      message: 'Progress updated successfully',
      progress
    });

  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating progress'
    });
  }
});

// @route   POST /api/courses/:id/quiz
// @desc    Submit quiz attempt
// @access  Private
router.post('/:id/quiz', authenticateToken, async (req, res) => {
  try {
    const { answers, timeSpent } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course || !course.quiz.enabled) {
      return res.status(404).json({
        success: false,
        message: 'Course or quiz not found'
      });
    }

    const progress = await UserProgress.findOne({
      userId: req.user._id,
      courseId: req.params.id
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Course progress not found'
      });
    }

    // Check if max attempts reached
    if (progress.quizAttempts.length >= course.quiz.maxAttempts) {
      return res.status(400).json({
        success: false,
        message: 'Maximum quiz attempts reached'
      });
    }

    // Calculate score
    let correctAnswers = 0;
    const totalQuestions = course.quiz.questions.length;
    const quizAnswers = [];

    course.quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index] || [];
      const isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(question.correctAnswers.sort());
      
      quizAnswers.push({
        questionId: question._id,
        selectedAnswers: userAnswer,
        isCorrect
      });

      if (isCorrect) correctAnswers++;
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = score >= course.quiz.passingScore;

    // Record quiz attempt
    const attempt = {
      attemptNumber: progress.quizAttempts.length + 1,
      startedAt: new Date(),
      completedAt: new Date(),
      score,
      passed,
      answers: quizAnswers,
      timeSpent
    };

    progress.quizAttempts.push(attempt);

    // Update overall progress
    if (passed) {
      progress.status = 'completed';
      progress.completedAt = new Date();

      // Generate certificate if enabled
      if (course.certificate.enabled) {
        const certificateNumber = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + course.certificate.validFor);

        const certificate = new Certificate({
          userId: req.user._id,
          courseId: course._id,
          certificateNumber,
          title: `${course.title} - Certificate of Completion`,
          score,
          completionTime: progress.timeSpent,
          validUntil,
          verificationCode: Math.random().toString(36).substr(2, 12)
        });

        await certificate.save();
      }
    }

    await progress.save();

    res.json({
      success: true,
      message: passed ? 'Quiz passed successfully!' : 'Quiz attempt recorded',
      attempt,
      passed,
      score
    });

  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting quiz'
    });
  }
});

// @route   GET /api/courses/:id/progress
// @desc    Get course progress for all users (Admin/Manager only)
// @access  Private (Admin/Manager)
router.get('/:id/progress', authenticateToken, adminOrManager, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { courseId: req.params.id };
    if (status) {
      query.status = status;
    }

    const progress = await UserProgress.find(query)
      .populate('userId', 'name email department role')
      .sort({ lastAccessedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await UserProgress.countDocuments(query);

    res.json({
      success: true,
      progress,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get course progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course progress'
    });
  }
});

module.exports = router;

