const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { DEPARTMENTS } = require('../constants/departments');

// @desc    Create new admin user
// @access  Admin only
const createAdmin = async (req, res) => {
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

    // Create new admin user
    const newAdmin = new User({
      name,
      email,
      password,
      role: 'admin',
      department
    });

    await newAdmin.save();

    // Return user data (without password)
    const adminData = await User.findById(newAdmin._id).select('-password');

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      user: adminData
    });

  } catch (error) {
    console.error('Create admin error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating admin'
    });
  }
};

// @desc    Get all admin users
// @access  Admin only
const getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ 
      role: 'admin', 
      isActive: true 
    }).select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      admins,
      count: admins.length
    });

  } catch (error) {
    console.error('Get all admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching admins'
    });
  }
};

// @desc    Update admin user
// @access  Admin only
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department } = req.body;

    // Check if user exists and is admin
    const admin = await User.findOne({ _id: id, role: 'admin' });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found'
      });
    }

    // Prevent self-deletion of the last admin
    if (req.user._id.toString() === id) {
      const adminCount = await User.countDocuments({ role: 'admin', isActive: true });
      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          message: 'Cannot modify the last remaining admin account'
        });
      }
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== admin.email) {
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

    // Update admin
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (department) updateData.department = department;

    const updatedAdmin = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Admin updated successfully',
      user: updatedAdmin
    });

  } catch (error) {
    console.error('Update admin error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already in use'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating admin'
    });
  }
};

// @desc    Deactivate admin user
// @access  Admin only
const deactivateAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists and is admin
    const admin = await User.findOne({ _id: id, role: 'admin' });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found'
      });
    }

    // Prevent self-deactivation
    if (req.user._id.toString() === id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot deactivate your own account'
      });
    }

    // Check if this is the last admin
    const adminCount = await User.countDocuments({ role: 'admin', isActive: true });
    if (adminCount <= 1) {
      return res.status(400).json({
        success: false,
        message: 'Cannot deactivate the last remaining admin account'
      });
    }

    // Deactivate admin
    await User.findByIdAndUpdate(id, { isActive: false });

    res.json({
      success: true,
      message: 'Admin deactivated successfully'
    });

  } catch (error) {
    console.error('Deactivate admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deactivating admin'
    });
  }
};

module.exports = {
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deactivateAdmin
};
