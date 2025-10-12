const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Mock users for testing
const mockUsers = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@ispm.com',
    role: 'admin',
    department: 'IT Administration',
    isActive: true
  },
  {
    _id: '2',
    name: 'Manager Smith',
    email: 'manager@ispm.com',
    role: 'manager',
    department: 'Security Management',
    isActive: true
  },
  {
    _id: '3',
    name: 'John Employee',
    email: 'employee@ispm.com',
    role: 'employee',
    department: 'Security Operations',
    isActive: true
  },
  {
    _id: '4',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@ispm.com',
    role: 'employee',
    department: 'Compliance',
    isActive: true
  },
  {
    _id: '5',
    name: 'Mike Wilson',
    email: 'mike.wilson@ispm.com',
    role: 'manager',
    department: 'Risk Assessment',
    isActive: true
  }
];

const passwords = {
  'admin@ispm.com': 'admin123',
  'manager@ispm.com': 'manager123',
  'employee@ispm.com': 'employee123',
  'sarah.johnson@ispm.com': 'sarah123',
  'mike.wilson@ispm.com': 'mike123'
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'ISPM Test Server is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'ISPM Test Server',
    database: 'Mock (No MongoDB required)'
  });
});

// Mock authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const expectedPassword = passwords[email];
    if (password !== expectedPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, 'test-secret-key', { expiresIn: '24h' });

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, 'test-secret-key');
    const user = mockUsers.find(u => u._id === decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid user'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
});

// Mock policy routes
app.get('/api/policies', (req, res) => {
  const mockPolicies = [
    {
      _id: '1',
      title: 'Information Security Policy',
      description: 'Comprehensive policy covering all aspects of information security',
      category: 'Security',
      version: '2.1',
      status: 'active',
      effectiveDate: new Date(),
      createdBy: { name: 'Admin User', email: 'admin@ispm.com' }
    },
    {
      _id: '2',
      title: 'Data Privacy Policy',
      description: 'Policy governing the collection, use, and protection of personal data',
      category: 'Privacy',
      version: '1.5',
      status: 'active',
      effectiveDate: new Date(),
      createdBy: { name: 'Admin User', email: 'admin@ispm.com' }
    }
  ];

  res.json({
    success: true,
    policies: mockPolicies,
    pagination: {
      page: 1,
      pages: 1,
      total: mockPolicies.length,
      hasNext: false,
      hasPrev: false
    }
  });
});

// Mock course routes
app.get('/api/courses', (req, res) => {
  const mockCourses = [
    {
      _id: '1',
      title: 'Security Awareness Training',
      description: 'Basic security awareness training for all employees',
      category: 'Security Awareness',
      difficulty: 'beginner',
      estimatedDuration: 30,
      status: 'published',
      userProgress: {
        status: 'in-progress',
        progress: 65
      }
    },
    {
      _id: '2',
      title: 'GDPR Compliance Training',
      description: 'Understanding GDPR requirements and compliance',
      category: 'Compliance',
      difficulty: 'intermediate',
      estimatedDuration: 45,
      status: 'published',
      userProgress: {
        status: 'not-started',
        progress: 0
      }
    }
  ];

  res.json({
    success: true,
    courses: mockCourses,
    pagination: {
      page: 1,
      pages: 1,
      total: mockCourses.length,
      hasNext: false,
      hasPrev: false
    }
  });
});

// Mock compliance dashboard
app.get('/api/compliance/dashboard', (req, res) => {
  res.json({
    success: true,
    dashboard: {
      overview: {
        totalPolicies: 12,
        totalCourses: 8,
        totalUsers: 156,
        timeframe: '30d'
      },
      policyCompliance: {
        totalAcknowledged: 145,
        onTime: 130,
        late: 15,
        avgDaysLate: 3,
        acknowledgmentRate: 85
      },
      trainingCompliance: {
        totalEnrollments: 89,
        completed: 67,
        inProgress: 15,
        notStarted: 7,
        overdue: 5,
        avgProgress: 75,
        avgTimeSpent: 25,
        completionRate: 75
      },
      certificates: {
        totalIssued: 45,
        active: 42,
        expired: 2,
        revoked: 1
      },
      departmentCompliance: [
        {
          _id: 'IT',
          userCount: 25,
          policiesAcknowledged: 120,
          trainingCompleted: 45
        },
        {
          _id: 'HR',
          userCount: 18,
          policiesAcknowledged: 85,
          trainingCompleted: 32
        }
      ],
      recentActivity: {
        policyAcknowledgments: [],
        trainingCompletions: []
      },
      overdue: {
        policies: [],
        training: []
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
  console.log(`📋 Mock data available for testing`);
});

