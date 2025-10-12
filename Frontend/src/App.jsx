import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './components/Homepage.jsx'
import AboutUs from './pages/AboutUs.jsx'
import ContactUs from './pages/ContactUs.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import Policies from './pages/Policies.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ManagerDashboard from './pages/ManagerDashboard.jsx'
import EmployeeDashboard from './pages/EmployeeDashboard.jsx'
import PolicyManagement from './pages/PolicyManagement.jsx'
import TrainingManagement from './pages/TrainingManagement.jsx'
import UserManagement from './pages/UserManagement.jsx'
import ComplianceReports from './pages/ComplianceReports.jsx'
import MyTraining from './pages/MyTraining.jsx'
import MyCertificates from './pages/MyCertificates.jsx'
import Quizzes from './pages/Quizzes.jsx'
import Videos from './pages/Videos.jsx'
import AssignmentManagement from './pages/AssignmentManagement.jsx'
import TeamManagement from './pages/TeamManagement.jsx'
import TeamProgress from './pages/TeamProgress.jsx'
import NonCompliance from './pages/NonCompliance.jsx'

// Protected Route Component
const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#64748B'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected pages with role-based routing */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute user={user}>
              <AdminDashboard user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/manager-dashboard" 
          element={
            <ProtectedRoute user={user}>
              <ManagerDashboard user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee-dashboard" 
          element={
            <ProtectedRoute user={user}>
              <EmployeeDashboard user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-training" 
          element={
            <ProtectedRoute user={user}>
              <MyTraining user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-certificates" 
          element={
            <ProtectedRoute user={user}>
              <MyCertificates user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quizzes" 
          element={
            <ProtectedRoute user={user}>
              <Quizzes user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/videos" 
          element={
            <ProtectedRoute user={user}>
              <Videos user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/policies" 
          element={
            <ProtectedRoute user={user}>
              <Policies user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/policy-management" 
          element={
            <ProtectedRoute user={user}>
              <PolicyManagement user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/training-management" 
          element={
            <ProtectedRoute user={user}>
              <TrainingManagement user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user-management" 
          element={
            <ProtectedRoute user={user}>
              <UserManagement user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/compliance-reports" 
          element={
            <ProtectedRoute user={user}>
              <ComplianceReports user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/assignment-management" 
          element={
            <ProtectedRoute user={user}>
              <AssignmentManagement user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/team-management" 
          element={
            <ProtectedRoute user={user}>
              <TeamManagement user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/team-progress" 
          element={
            <ProtectedRoute user={user}>
              <TeamProgress user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/non-compliance" 
          element={
            <ProtectedRoute user={user}>
              <NonCompliance user={user} onLogout={logout} />
            </ProtectedRoute>
          } 
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}
