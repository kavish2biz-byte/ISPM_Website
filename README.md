# SecureGuard - Information Security Policy Management System

A comprehensive role-based security training and policy management platform built with React and Node.js.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher) - Optional for testing

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ISPM
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Start the Application**

   **Option A: With Test Server (No MongoDB Required)**
   ```bash
   # Terminal 1 - Backend Test Server
   cd Backend
   npm run test
   
   # Terminal 2 - Frontend
   cd Frontend
   npm run dev
   ```

   **Option B: With Full MongoDB Setup**
   ```bash
   # Start MongoDB first
   # Windows: net start MongoDB
   # macOS: brew services start mongodb/brew/mongodb-community
   # Linux: sudo systemctl start mongod
   
   # Terminal 1 - Backend
   cd Backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd Frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 🔐 User Roles & Access

### Admin
- **Email**: admin@ispm.com
- **Password**: admin123
- **Access**: Full system administration, policy management, user management

### Manager
- **Email**: manager@ispm.com
- **Password**: manager123
- **Access**: Team oversight, compliance tracking, training assignments

### Employee
- **Email**: employee@ispm.com
- **Password**: employee123
- **Access**: Personal training, policy acknowledgments, certificates

## 🎯 Key Features

### Role-Based Dashboards
- **Admin Dashboard**: System overview, analytics, policy management
- **Manager Dashboard**: Team performance, compliance tracking, assignments
- **Employee Dashboard**: Personal progress, training status, achievements

### Policy Management
- Create, edit, and publish security policies
- Version control and approval workflows
- Role-based policy assignments
- Acknowledgment tracking

### Training System
- Interactive training modules
- Progress tracking and analytics
- Certificate generation
- Quiz assessments

### Compliance Tracking
- Real-time compliance metrics
- Department-wise reporting
- Deadline monitoring
- Automated notifications

## 📱 Available Routes

### Public Routes
- `/` - Homepage
- `/login` - User authentication
- `/signup` - User registration
- `/about` - About page
- `/contact` - Contact information

### Protected Routes (Require Authentication)
- `/admin-dashboard` - Admin control panel
- `/manager-dashboard` - Manager overview
- `/employee-dashboard` - Employee workspace
- `/policy-management` - Policy administration
- `/my-training` - Training modules
- `/my-certificates` - Certificate management
- `/quizzes` - Assessment center
- `/videos` - Training videos
- `/policies` - Policy viewing

## 🛠️ Technical Stack

### Frontend
- **React 18** - UI framework
- **React Router DOM** - Navigation
- **Styled Components** - CSS-in-JS styling
- **Recharts** - Data visualization
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Security Features
- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control
- Protected routes
- Input validation and sanitization

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Password reset

### Policies
- `GET /api/policies` - Get all policies
- `POST /api/policies` - Create policy (Admin)
- `PUT /api/policies/:id` - Update policy (Admin)
- `DELETE /api/policies/:id` - Delete policy (Admin)

### Training
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (Admin)
- `POST /api/courses/:id/enroll` - Enroll in course

### Compliance
- `GET /api/compliance/dashboard` - Get dashboard metrics
- `GET /api/compliance/trends` - Get compliance trends

## 🔧 Development Commands

### Backend
```bash
npm run dev      # Start development server with nodemon
npm run test     # Start test server (no MongoDB)
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📁 Project Structure

```
ISPM/
├── Backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   ├── scripts/         # Utility scripts
│   └── server.js        # Main server file
├── Frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── public/          # Static assets
└── README.md
```

## 🚨 Security Considerations

- All passwords are hashed using bcryptjs
- JWT tokens expire after 24 hours
- Protected routes require authentication
- Input validation on all forms
- Role-based access control implemented
- Demo credentials removed from production builds

## 📈 Future Enhancements

- [ ] Email notifications
- [ ] Advanced reporting
- [ ] Mobile application
- [ ] Single Sign-On (SSO) integration
- [ ] API rate limiting
- [ ] Audit logging
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Note**: This system is designed for educational and demonstration purposes. For production use, additional security measures and testing should be implemented.