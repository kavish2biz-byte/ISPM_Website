const User = require('../models/User');
const { DEPARTMENTS } = require('../constants/departments');

// @desc    Create new manager user
// @access  Admin only
const createManager = async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    // Validate input
    if (!name || !email || !password || !department) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate department
    if (!DEPARTMENTS.includes(department)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid department specified'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new manager user
    const newManager = new User({
      name,
      email,
      password,
      role: 'manager',
      department
    });

    await newManager.save();

    // Return user data (without password)
    const managerData = await User.findById(newManager._id).select('-password');

    res.status(201).json({
      success: true,
      message: 'Manager user created successfully',
      user: managerData
    });

  } catch (error) {
    console.error('Create manager error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating manager'
    });
  }
};

// @desc    Get all manager users
// @access  Admin only
const getAllManagers = async (req, res) => {
  try {
    const managers = await User.find({ 
      role: 'manager', 
      isActive: true 
    }).select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      managers,
      count: managers.length
    });

  } catch (error) {
    console.error('Get all managers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching managers'
    });
  }
};

// @desc    Update manager user
// @access  Admin only
const updateManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department } = req.body;

    // Check if user exists and is manager
    const manager = await User.findOne({ _id: id, role: 'manager' });
    if (!manager) {
      return res.status(404).json({
        success: false,
        message: 'Manager user not found'
      });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== manager.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }

    // Validate department if provided
    if (department) {
      if (!DEPARTMENTS.includes(department)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid department specified'
        });
      }
    }

    // Update manager
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (department) updateData.department = department;

    const updatedManager = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Manager updated successfully',
      user: updatedManager
    });

  } catch (error) {
    console.error('Update manager error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating manager'
    });
  }
};

// @desc    Deactivate manager user
// @access  Admin only
const deactivateManager = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists and is manager
    const manager = await User.findOne({ _id: id, role: 'manager' });
    if (!manager) {
      return res.status(404).json({
        success: false,
        message: 'Manager user not found'
      });
    }

    // Deactivate manager
    await User.findByIdAndUpdate(id, { isActive: false });

    res.json({
      success: true,
      message: 'Manager deactivated successfully'
    });

  } catch (error) {
    console.error('Deactivate manager error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deactivating manager'
    });
  }
};

// @desc    Promote employee to manager
// @access  Admin only
const promoteToManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { department } = req.body;

    // Check if user exists and is employee
    const employee = await User.findOne({ _id: id, role: 'employee' });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Validate department if provided
    if (department) {
      if (!DEPARTMENTS.includes(department)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid department specified'
        });
      }
    }

    // Update employee to manager
    const updateData = { role: 'manager' };
    if (department) updateData.department = department;

    const promotedManager = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Employee promoted to manager successfully',
      user: promotedManager
    });

  } catch (error) {
    console.error('Promote to manager error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while promoting employee'
    });
  }
};

// @desc    Demote manager to employee
// @access  Admin only
const demoteToEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists and is manager
    const manager = await User.findOne({ _id: id, role: 'manager' });
    if (!manager) {
      return res.status(404).json({
        success: false,
        message: 'Manager not found'
      });
    }

    // Demote manager to employee
    const demotedEmployee = await User.findByIdAndUpdate(
      id,
      { role: 'employee' },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Manager demoted to employee successfully',
      user: demotedEmployee
    });

  } catch (error) {
    console.error('Demote to employee error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while demoting manager'
    });
  }
};

module.exports = {
  createManager,
  getAllManagers,
  updateManager,
  deactivateManager,
  promoteToManager,
  demoteToEmployee
};
