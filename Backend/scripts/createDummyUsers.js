const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const dummyUsers = [
  {
    name: 'Admin User',
    email: 'admin@ispm.com',
    password: 'admin123',
    role: 'admin',
    department: 'IT Administration'
  },
  {
    name: 'Manager Smith',
    email: 'manager@ispm.com',
    password: 'manager123',
    role: 'manager',
    department: 'Security Management'
  },
  {
    name: 'John Employee',
    email: 'employee@ispm.com',
    password: 'employee123',
    role: 'employee',
    department: 'Security Operations'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@ispm.com',
    password: 'sarah123',
    role: 'employee',
    department: 'Compliance'
  },
  {
    name: 'Mike Wilson',
    email: 'mike.wilson@ispm.com',
    password: 'mike123',
    role: 'manager',
    department: 'Risk Assessment'
  }
];

async function createDummyUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ispm');

    console.log('✅ Connected to MongoDB');

    // Clear existing users (optional - remove this if you want to keep existing users)
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');

    // Create dummy users
    for (const userData of dummyUsers) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created user: ${userData.name} (${userData.role})`);
    }

    console.log('\n🎉 Dummy users created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('┌─────────────────────────────────────────────────────────────┐');
    console.log('│ ADMIN ACCOUNTS                                             │');
    console.log('├─────────────────────────────────────────────────────────────┤');
    console.log('│ Email: admin@ispm.com         │ Password: admin123         │');
    console.log('└─────────────────────────────────────────────────────────────┘');
    console.log('┌─────────────────────────────────────────────────────────────┐');
    console.log('│ MANAGER ACCOUNTS                                           │');
    console.log('├─────────────────────────────────────────────────────────────┤');
    console.log('│ Email: manager@ispm.com      │ Password: manager123        │');
    console.log('│ Email: mike.wilson@ispm.com  │ Password: mike123           │');
    console.log('└─────────────────────────────────────────────────────────────┘');
    console.log('┌─────────────────────────────────────────────────────────────┐');
    console.log('│ EMPLOYEE ACCOUNTS                                          │');
    console.log('├─────────────────────────────────────────────────────────────┤');
    console.log('│ Email: employee@ispm.com     │ Password: employee123       │');
    console.log('│ Email: sarah.johnson@ispm.com│ Password: sarah123          │');
    console.log('└─────────────────────────────────────────────────────────────┘');

  } catch (error) {
    console.error('❌ Error creating dummy users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📤 Disconnected from MongoDB');
  }
}

// Run the script
createDummyUsers();
