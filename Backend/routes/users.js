const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  getUserStats
} = require('../controllers/userController');
const { authenticateToken, adminOnly, adminOrManager } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users with pagination and filtering
// @access  Admin/Manager
router.get('/', authenticateToken, adminOrManager, getAllUsers);

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Admin/Manager
router.get('/stats', authenticateToken, adminOrManager, getUserStats);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Admin/Manager/Owner
router.get('/:id', authenticateToken, getUserById);

// @route   POST /api/users
// @desc    Create new user
// @access  Admin
router.post('/', authenticateToken, adminOnly, createUser);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Admin/Manager/Owner
router.put('/:id', authenticateToken, updateUser);

// @route   PUT /api/users/:id/password
// @desc    Change user password
// @access  Admin/Manager/Owner
router.put('/:id/password', authenticateToken, changeUserPassword);

// @route   DELETE /api/users/:id
// @desc    Delete user (soft delete)
// @access  Admin
router.delete('/:id', authenticateToken, adminOnly, deleteUser);

module.exports = router;
