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

  // Inject Notifications only for employees to avoid impacting other roles
  const navItems = user?.role === 'employee'
    ? [
        baseItems[0],
        { path: '/notifications', label: 'Notifications', icon: BellIcon },
        ...baseItems.slice(1)
      ]
    : baseItems;

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
    </SidebarContainer>
  );
}
