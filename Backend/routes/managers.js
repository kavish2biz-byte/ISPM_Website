const express = require('express');
const {
  createManager,
  getAllManagers,
  updateManager,
  deactivateManager,
  promoteToManager,
  demoteToEmployee
} = require('../controllers/managerController');
const { authenticateToken, adminOnly } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/managers
// @desc    Get all manager users
// @access  Admin only
router.get('/', authenticateToken, adminOnly, getAllManagers);

// @route   POST /api/managers
// @desc    Create new manager user
// @access  Admin only
router.post('/', authenticateToken, adminOnly, createManager);

// @route   PUT /api/managers/:id
// @desc    Update manager user
// @access  Admin only
router.put('/:id', authenticateToken, adminOnly, updateManager);

// @route   PUT /api/managers/:id/promote
// @desc    Promote employee to manager
// @access  Admin only
router.put('/:id/promote', authenticateToken, adminOnly, promoteToManager);

// @route   PUT /api/managers/:id/demote
// @desc    Demote manager to employee
// @access  Admin only
router.put('/:id/demote', authenticateToken, adminOnly, demoteToEmployee);

// @route   DELETE /api/managers/:id
// @desc    Deactivate manager user
// @access  Admin only
router.delete('/:id', authenticateToken, adminOnly, deactivateManager);

module.exports = router;
