/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 280px;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const SidebarHeader = styled.div`
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #E2E8F0;
`;

const Logo = styled.img`
  height: 2.5rem;
  width: auto;
`;

const SidebarTitle = styled.h1`
  font-size: 1.5rem;
  color: #1E3A8A;
  font-weight: 800;
  margin-top: 1rem;
  font-family: 'Inter', sans-serif;
`;

const SidebarSubtitle = styled.p`
  color: #64748B;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Navigation = styled.nav`
  flex: 1;
  padding: 1.5rem 0;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.5rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  color: #64748B;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
  
  &:hover {
    background: #F8FAFC;
    color: #1E3A8A;
    border-left-color: #1E3A8A;
  }
  
  ${({ $isActive }) => $isActive && `
    background: #EBF4FF;
    color: #1E3A8A;
    border-left-color: #1E3A8A;
    font-weight: 600;
  `}
`;

const NavIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const NavText = styled.span`
  font-size: 0.95rem;
`;

const UserSection = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #E2E8F0;
  background: #F8FAFC;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1E3A8A, #2563EB);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #1E3A8A;
  font-size: 0.9rem;
`;

const UserRole = styled.div`
  color: #64748B;
  font-size: 0.8rem;
`;

const LogoutLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #64748B;
  text-decoration: none;
  font-size: 0.9rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #F1F5F9;
    color: #1E3A8A;
  }
`;

const LogoutIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// SVG Icons
const DashboardIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
  </svg>
);

const TrainingIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
  </svg>
);

const CertificateIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13,21L15.5,18.5L18,21V12H20V22H4V12H6V21L8.5,18.5L11,21H13"/>
  </svg>
);

const QuizIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
  </svg>
);

const PolicyIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2m6-6v-5a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
  </svg>
);

const LogoutIconSVG = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z"/>
  </svg>
);

// Admin-specific icons
const UsersIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
  </svg>
);

const ReportsIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
  </svg>
);

// Policy-specific icons
const PolicyCreateIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z M12,13H10V15H8V13H6V11H8V9H10V11H12V13Z"/>
  </svg>
);

const PolicyTemplatesIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z M8,12H16V14H8V12M8,16H13V18H8V16Z"/>
  </svg>
);

// Training-specific icons
const TrainingManagementIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
  </svg>
);

// Team management icons
const TeamManagementIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5l-1-1.5c-.47-.62-1.21-.99-2.01-.99H9.46c-.8 0-1.54.37-2.01.99L5 10.5l-1-1.5C3.53 8.37 2.79 8 2 8H.5L3 15.5V22h2v-6h2v6h2v-6h2v6h2v-6h2v6h2zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5z"/>
  </svg>
);

const TeamProgressIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
  </svg>
);

export default function Sidebar({ user, onLogout }) {
  const location = useLocation();

  const dashboardPath = user?.role === 'admin'
    ? '/admin-dashboard'
    : user?.role === 'manager'
      ? '/manager-dashboard'
      : '/employee-dashboard';

  const baseItems = [
    { path: dashboardPath, label: 'Dashboard', icon: DashboardIcon },
    { path: '/my-training', label: 'My Training', icon: TrainingIcon },
    { path: '/my-certificates', label: 'My Certificates', icon: CertificateIcon },
    { path: '/quizzes', label: 'Security Quizzes', icon: QuizIcon },
    { path: '/videos', label: 'Training Videos', icon: VideoIcon },
    { path: '/policies', label: 'Security Policies', icon: PolicyIcon },
  ];

  // Admin-specific navigation items
  const adminItems = [
    { path: '/admin-dashboard', label: 'Dashboard', icon: DashboardIcon },
    { path: '/admin-users', label: 'User Management', icon: UsersIcon },
    { path: '/admin-analytics', label: 'Analytics', icon: AnalyticsIcon },
    { path: '/admin-reports', label: 'Reports', icon: ReportsIcon },
    { path: '/policy-management', label: 'Policy Management', icon: PolicyIcon },
    { path: '/policy-create', label: 'Create Policy', icon: PolicyCreateIcon },
    { path: '/admin-settings', label: 'Settings', icon: SettingsIcon },
    { path: '/my-training', label: 'Training Management', icon: TrainingManagementIcon },
  ];

  // Manager-specific navigation items
  const managerItems = [
    { path: '/manager-dashboard', label: 'Dashboard', icon: DashboardIcon },
    { path: '/team-management', label: 'Team Management', icon: TeamManagementIcon },
    { path: '/team-progress', label: 'Team Progress', icon: TeamProgressIcon },
    { path: '/my-training', label: 'My Training', icon: TrainingIcon },
    { path: '/my-certificates', label: 'My Certificates', icon: CertificateIcon },
    { path: '/quizzes', label: 'Security Quizzes', icon: QuizIcon },
    { path: '/policies', label: 'Security Policies', icon: PolicyIcon },
  ];

  // Employee-specific navigation items
  const employeeItems = [
    { path: '/employee-dashboard', label: 'Dashboard', icon: DashboardIcon },
    { path: '/notifications', label: 'Notifications', icon: BellIcon },
    { path: '/my-training', label: 'My Training', icon: TrainingIcon },
    { path: '/my-certificates', label: 'My Certificates', icon: CertificateIcon },
    { path: '/quizzes', label: 'Security Quizzes', icon: QuizIcon },
    { path: '/videos', label: 'Training Videos', icon: VideoIcon },
    { path: '/policies', label: 'Security Policies', icon: PolicyIcon },
  ];

  // Select navigation items based on user role
  const navItems = user?.role === 'admin' 
    ? adminItems 
    : user?.role === 'manager' 
      ? managerItems 
      : employeeItems;

  return (
    <SidebarContainer>
      <SidebarHeader>
        <Logo src="/images/logo.png" alt="SecureGuard Logo" />
        <SidebarTitle>Policy & Awareness</SidebarTitle>
        <SidebarSubtitle>Security Management Platform</SidebarSubtitle>
      </SidebarHeader>
      
      <Navigation>
        <NavList>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavItem key={item.path}>
                <NavLink to={item.path} $isActive={isActive}>
                  <NavIcon>
                    <IconComponent />
                  </NavIcon>
                  <NavText>{item.label}</NavText>
                </NavLink>
              </NavItem>
            );
          })}
        </NavList>
      </Navigation>

      <UserSection>
        <UserInfo>
          <UserAvatar>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </UserAvatar>
          <UserDetails>
            <UserName>{user?.name || 'User'}</UserName>
            <UserRole>{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'Employee'}</UserRole>
          </UserDetails>
        </UserInfo>
        
        <LogoutLink onClick={onLogout}>
          <LogoutIcon>
            <LogoutIconSVG />
          </LogoutIcon>
          Logout
        </LogoutLink>
      </UserSection>
    </SidebarContainer>
  );
}
