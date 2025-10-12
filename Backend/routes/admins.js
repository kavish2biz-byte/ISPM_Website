const express = require('express');
const {
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deactivateAdmin
} = require('../controllers/adminController');
const { authenticateToken, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/admins
// @desc    Get all admin users
// @access  Admin only
router.get('/', authenticateToken, adminOnly, getAllAdmins);

// @route   POST /api/admins
// @desc    Create new admin user
// @access  Admin only
router.post('/', authenticateToken, adminOnly, createAdmin);

// @route   PUT /api/admins/:id
// @desc    Update admin user
// @access  Admin only
router.put('/:id', authenticateToken, adminOnly, updateAdmin);

// @route   DELETE /api/admins/:id
// @desc    Deactivate admin user
// @access  Admin only
router.delete('/:id', authenticateToken, adminOnly, deactivateAdmin);

module.exports = router;
