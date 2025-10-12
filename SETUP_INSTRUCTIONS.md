# SecureGuard - Setup Instructions

## 🚀 Quick Start (Without MongoDB)

If you want to test the system immediately without setting up MongoDB, use the test server:

### 1. Start Test Backend Server
```bash
cd Backend
npm run test
```

This will start a mock server on `http://localhost:5000` with dummy data - no MongoDB required!

### 2. Start Frontend
```bash
cd Frontend
npm run dev
```

### 3. Login with Demo Credentials
Navigate to `http://localhost:5173` and use any of these credentials:

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| **Admin** | admin@ispm.com | admin123 | Admin Dashboard |
| **Manager** | manager@ispm.com | manager123 | Manager Dashboard |
| **Employee** | employee@ispm.com | employee123 | Employee Dashboard |

## 🔧 Full Setup (With MongoDB)

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)

### 1. Start MongoDB
```bash
# Windows
net start MongoDB

# macOS
brew services start mongodb/brew/mongodb-community

# Linux
sudo systemctl start mongod
```

### 2. Install Backend Dependencies
```bash
cd Backend
npm install
```

### 3. Create Dummy Users
```bash
cd Backend
node scripts/createDummyUsers.js
```

### 4. Start Backend Server
```bash
cd Backend
npm run dev
```

### 5. Start Frontend
```bash
cd Frontend
npm run dev
```

## 🎯 Features Available

### ✅ Working Features
- **Role-based Authentication**: Login with different user roles
- **Separate Dashboards**: Customized dashboards for Admin, Manager, Employee
- **Policy Management**: Admin can create and manage policies
- **Training System**: Course enrollment and progress tracking
- **Compliance Dashboard**: Real-time metrics and analytics
- **Forgot Password**: Password reset functionality
- **Responsive Design**: Works on desktop and mobile

### 🔐 Security Features
- JWT token authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected routes
- Input validation

## 📊 Demo Data Available

### Test Server (No MongoDB)
- 5 mock users with different roles
- Sample policies and courses
- Mock compliance data
- All CRUD operations work with mock data

### Full Server (With MongoDB)
- Real user management
- File upload for policies
- Persistent data storage
- Complete audit trails

## 🛠️ Troubleshooting

### MongoDB Connection Issues
If you get MongoDB connection errors:
1. Make sure MongoDB is running
2. Check if MongoDB is on port 27017
3. Use the test server instead: `npm run test`

### Backend Server Issues
1. Check if port 5000 is available
2. Verify all dependencies are installed
3. Check the .env file configuration

### Frontend Issues
1. Make sure backend is running on port 5000
2. Check browser console for errors
3. Verify all frontend dependencies are installed

## 📱 Available Routes

### Public Routes
- `/` - Homepage
- `/login` - Login page
- `/signup` - Signup page (placeholder)
- `/about` - About page
- `/contact` - Contact page

### Protected Routes (Require Login)
- `/admin-dashboard` - Admin dashboard
- `/manager-dashboard` - Manager dashboard
- `/employee-dashboard` - Employee dashboard
- `/policy-management` - Policy management (Admin only)
- `/my-training` - Training modules
- `/my-certificates` - Certificates
- `/quizzes` - Quiz system
- `/videos` - Video training
- `/policies` - Policy viewing

## 🔄 Development Commands

### Backend
```bash
npm run dev      # Start with nodemon (auto-restart)
npm run test     # Start test server (no MongoDB)
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Policies
- `GET /api/policies` - Get all policies
- `POST /api/policies` - Create policy (Admin)
- `PUT /api/policies/:id` - Update policy (Admin)
- `DELETE /api/policies/:id` - Delete policy (Admin)

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (Admin)
- `POST /api/courses/:id/enroll` - Enroll in course

### Compliance
- `GET /api/compliance/dashboard` - Get dashboard metrics
- `GET /api/compliance/trends` - Get compliance trends

## 🎨 UI Features

- **Modern Design**: Clean, professional interface
- **Role-based Colors**: Different color schemes for each role
- **Responsive Layout**: Works on all screen sizes
- **Interactive Charts**: Real-time data visualization
- **Modal Forms**: Smooth user interactions
- **Loading States**: User feedback during operations

## 🔐 Security Notes

- Passwords are hashed using bcryptjs
- JWT tokens expire after 24 hours
- All API routes are protected
- File uploads are validated
- Input sanitization on all forms

## 📞 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure MongoDB is running (for full setup)
4. Try the test server for quick testing

The system is designed to work both with and without MongoDB for maximum flexibility!

