const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Policy = require('../models/Policy');
const PolicyAcknowledgement = require('../models/PolicyAcknowledgement');
const { authenticateToken, adminOnly, adminOrManager } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/policies');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.docx', '.doc'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'), false);
    }
  }
});

// @route   GET /api/policies
// @desc    Get all policies (with filtering and pagination)
// @access  Private
router.get('/', authenticateToken, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      category,
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

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filter policies assigned to user's role/department
    if (assignedToMe === 'true') {
      query.$or = [
        { assignedRoles: req.user.role },
        { assignedDepartments: req.user.department }
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

    const policies = await Policy.paginate(query, options);

    res.json({
      success: true,
      policies: policies.docs,
      pagination: {
        page: policies.page,
        pages: policies.totalPages,
        total: policies.totalDocs,
        hasNext: policies.hasNextPage,
        hasPrev: policies.hasPrevPage
      }
    });

  } catch (error) {
    console.error('Get policies error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching policies'
    });
  }
});

// @route   GET /api/policies/:id
// @desc    Get single policy
// @access  Private
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('lastModifiedBy', 'name email');

    if (!policy || policy.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }

    // Check if user has access to this policy
    const hasAccess = policy.assignedRoles.includes(req.user.role) ||
                     policy.assignedDepartments.includes(req.user.department);

    if (!hasAccess && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this policy'
      });
    }

    // Check if user has acknowledged this policy
    const acknowledgment = await PolicyAcknowledgement.findOne({
      policyId: policy._id,
      userId: req.user._id,
      acknowledgedVersion: policy.version
    });

    res.json({
      success: true,
      policy: {
        ...policy.toObject(),
        userAcknowledged: !!acknowledgment,
        acknowledgmentDate: acknowledgment?.acknowledgedAt
      }
    });

  } catch (error) {
    console.error('Get policy error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching policy'
    });
  }
});

// @route   POST /api/policies
// @desc    Create new policy (Admin only)
// @access  Private (Admin)
router.post('/', authenticateToken, adminOnly, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Policy file is required'
      });
    }

    const {
      title,
      description,
      category,
      effectiveDate,
      expiryDate,
      assignedRoles,
      assignedDepartments,
      acknowledgmentDeadline,
      tags
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !effectiveDate) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, category, and effective date are required'
      });
    }

    const policyData = {
      title,
      description,
      category,
      effectiveDate: new Date(effectiveDate),
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      fileUrl: req.file.path,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      assignedRoles: assignedRoles ? JSON.parse(assignedRoles) : ['employee'],
      assignedDepartments: assignedDepartments ? JSON.parse(assignedDepartments) : [],
      acknowledgmentDeadline: acknowledgmentDeadline ? new Date(acknowledgmentDeadline) : null,
      tags: tags ? JSON.parse(tags) : [],
      createdBy: req.user._id
    };

    const policy = new Policy(policyData);
    await policy.save();

    res.status(201).json({
      success: true,
      message: 'Policy created successfully',
      policy
    });

  } catch (error) {
    console.error('Create policy error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating policy'
    });
  }
});

// @route   PUT /api/policies/:id
// @desc    Update policy (Admin only)
// @access  Private (Admin)
router.put('/:id', authenticateToken, adminOnly, async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy || policy.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }

    const {
      title,
      description,
      category,
      effectiveDate,
      expiryDate,
      status,
      assignedRoles,
      assignedDepartments,
      acknowledgmentDeadline,
      tags
    } = req.body;

    // Update fields
    if (title) policy.title = title;
    if (description) policy.description = description;
    if (category) policy.category = category;
    if (effectiveDate) policy.effectiveDate = new Date(effectiveDate);
    if (expiryDate !== undefined) policy.expiryDate = expiryDate ? new Date(expiryDate) : null;
    if (status) policy.status = status;
    if (assignedRoles) policy.assignedRoles = JSON.parse(assignedRoles);
    if (assignedDepartments) policy.assignedDepartments = JSON.parse(assignedDepartments);
    if (acknowledgmentDeadline !== undefined) {
      policy.acknowledgmentDeadline = acknowledgmentDeadline ? new Date(acknowledgmentDeadline) : null;
    }
    if (tags) policy.tags = JSON.parse(tags);

    policy.lastModifiedBy = req.user._id;

    await policy.save();

    res.json({
      success: true,
      message: 'Policy updated successfully',
      policy
    });

  } catch (error) {
    console.error('Update policy error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating policy'
    });
  }
});

// @route   DELETE /api/policies/:id
// @desc    Delete policy (Admin only)
// @access  Private (Admin)
router.delete('/:id', authenticateToken, adminOnly, async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy || policy.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }

    // Soft delete
    policy.isDeleted = true;
    policy.status = 'archived';
    policy.lastModifiedBy = req.user._id;
    await policy.save();

    res.json({
      success: true,
      message: 'Policy deleted successfully'
    });

  } catch (error) {
    console.error('Delete policy error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting policy'
    });
  }
});

// @route   POST /api/policies/:id/acknowledge
// @desc    Acknowledge policy
// @access  Private
router.post('/:id/acknowledge', authenticateToken, async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);

    if (!policy || policy.isDeleted || policy.status !== 'active') {
      return res.status(404).json({
        success: false,
        message: 'Policy not found or not active'
      });
    }

    // Check if user has access to this policy
    const hasAccess = policy.assignedRoles.includes(req.user.role) ||
                     policy.assignedDepartments.includes(req.user.department);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this policy'
      });
    }

    // Check if already acknowledged
    const existingAcknowledgment = await PolicyAcknowledgement.findOne({
      policyId: policy._id,
      userId: req.user._id,
      acknowledgedVersion: policy.version
    });

    if (existingAcknowledgment) {
      return res.status(400).json({
        success: false,
        message: 'Policy already acknowledged'
      });
    }

    // Calculate if acknowledgment is late
    const now = new Date();
    const isLate = policy.acknowledgmentDeadline && now > policy.acknowledgmentDeadline;
    const daysLate = isLate ? Math.ceil((now - policy.acknowledgmentDeadline) / (1000 * 60 * 60 * 24)) : 0;

    const acknowledgment = new PolicyAcknowledgement({
      policyId: policy._id,
      userId: req.user._id,
      acknowledgedVersion: policy.version,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      isLate,
      daysLate
    });

    await acknowledgment.save();

    res.json({
      success: true,
      message: 'Policy acknowledged successfully',
      acknowledgment
    });

  } catch (error) {
    console.error('Acknowledge policy error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while acknowledging policy'
    });
  }
});

// @route   GET /api/policies/:id/acknowledgments
// @desc    Get policy acknowledgments (Admin/Manager only)
// @access  Private (Admin/Manager)
router.get('/:id/acknowledgments', authenticateToken, adminOrManager, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = { policyId: req.params.id };
    if (status === 'acknowledged') {
      query.acknowledgedAt = { $exists: true };
    } else if (status === 'pending') {
      // This would require a different approach to find non-acknowledged users
    }

    const acknowledgments = await PolicyAcknowledgement.find(query)
      .populate('userId', 'name email department role')
      .sort({ acknowledgedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await PolicyAcknowledgement.countDocuments(query);

    res.json({
      success: true,
      acknowledgments,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get acknowledgments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching acknowledgments'
    });
  }
});

module.exports = router;

