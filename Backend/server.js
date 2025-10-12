const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB, getConnectionStatus } = require('./config/mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['your-frontend-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Database connection
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'ISPM Backend Server is running!' });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'ISPM Backend',
    database: getConnectionStatus()
  });
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// User management routes
app.use('/api/users', require('./routes/users'));
app.use('/api/admins', require('./routes/admins'));
app.use('/api/managers', require('./routes/managers'));
app.use('/api/departments', require('./routes/departments'));

// Policy routes
app.use('/api/policies', require('./routes/policies'));

// Course routes
app.use('/api/courses', require('./routes/courses'));

// Compliance routes
app.use('/api/compliance', require('./routes/compliance'));

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
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
});
