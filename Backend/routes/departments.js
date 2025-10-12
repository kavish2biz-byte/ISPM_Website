const express = require('express');
const { DEPARTMENTS } = require('../constants/departments');

const router = express.Router();

// @route   GET /api/departments
// @desc    Get list of available departments
// @access  Public
router.get('/', (req, res) => {
  res.json({
    success: true,
    departments: DEPARTMENTS
  });
});

module.exports = router;
