import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Link } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  background: #F8FAFC;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 2rem;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const LogoutButton = styled.button`
  background: #6B7280;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #4B5563;
    transform: translateY(-1px);
  }
`;

const UserAvatar = styled.div`
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserDisplayName = styled.div`
  font-weight: 600;
  color: #3B82F6;
  font-size: 1rem;
`;

const UserRole = styled.div`
  color: #64748B;
  font-size: 0.85rem;
`;

const Greeting = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #3B82F6;
  margin-bottom: 0.5rem;
`;

const Subtext = styled.p`
  color: #64748B;
  margin-bottom: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  position: relative;
  overflow: hidden;
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background: ${props => props.bgColor};
  color: white;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: #64748B;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  font-size: 0.8rem;
  color: ${props => props.positive ? '#10B981' : '#EF4444'};
  font-weight: 600;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #1F2937;
  font-weight: 600;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ActionButton = styled(Link)`
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4);
  }
`;

const TeamSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
`;

const TeamMember = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: #FAFAFA;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MemberAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const MemberInfo = styled.div`
  flex: 1;
`;

const MemberName = styled.div`
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.25rem;
`;

const MemberRole = styled.div`
  font-size: 0.85rem;
  color: #64748B;
  margin-bottom: 0.25rem;
`;

const MemberProgress = styled.div`
  font-size: 0.8rem;
  color: ${props => props.color || '#3B82F6'};
  font-weight: 500;
`;

const AlertsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
`;

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-left: 3px solid ${props => props.color || '#3B82F6'};
  background: ${props => props.bgColor || '#FFFBEB'};
  border-radius: 0 8px 8px 0;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AlertIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.color || '#3B82F6'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.25rem;
`;

const AlertDescription = styled.div`
  font-size: 0.9rem;
  color: #64748B;
  margin-bottom: 0.25rem;
`;

const AlertTime = styled.div`
  font-size: 0.8rem;
  color: ${props => props.color || '#3B82F6'};
  font-weight: 500;
`;

const TeamCertifications = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
`;

const CertificationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const CertificationItem = styled.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const CertificationIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const CertificationName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1F2937;
`;

const CertificationCount = styled.div`
  font-size: 0.8rem;
  color: #6B7280;
`;

export default function ManagerDashboard({ user, onLogout }) {
  // Role-based access control
  useEffect(() => {
    if (user && user.role !== 'manager' && user.role !== 'admin') {
      // Redirect non-manager users to their appropriate dashboard
      switch (user.role) {
        case 'employee':
          window.location.href = '/employee-dashboard';
          break;
        default:
          window.location.href = '/employee-dashboard';
      }
    }
  }, [user]);

  const [dashboardData, setDashboardData] = useState({
    teamOverview: {
      totalTeamMembers: 12,
      activeUsers: 11,
      trainingCompleted: 8,
      complianceRate: 92
    },
    teamPerformance: {
      policiesAcknowledged: 108,
      trainingCompleted: 45,
      overdueItems: 3,
      averageProgress: 78
    }
  });

  const [teamMembers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Security Analyst',
      progress: '85% Complete',
      color: '#10B981',
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'John Smith',
      role: 'Compliance Officer',
      progress: '72% Complete',
      color: '#3B82F6',
      avatar: 'JS'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Risk Assessment Specialist',
      progress: '90% Complete',
      color: '#10B981',
      avatar: 'ED'
    },
    {
      id: 4,
      name: 'Michael Brown',
      role: 'Security Coordinator',
      progress: '45% Complete',
      color: '#3B82F6',
      avatar: 'MB'
    }
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Training Deadline Approaching',
      description: 'Michael Brown has training deadline in 3 days',
      time: '2 hours ago',
      color: '#3B82F6',
      bgColor: '#FFFBEB',
      icon: '⚠️'
    },
    {
      id: 2,
      type: 'success',
      title: 'Policy Acknowledgment Complete',
      description: 'Sarah Johnson completed GDPR policy acknowledgment',
      time: '4 hours ago',
      color: '#10B981',
      bgColor: '#ECFDF5',
      icon: '✅'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Training Available',
      description: 'Advanced Security Training course is now available for your team',
      time: '1 day ago',
      color: '#3B82F6',
      bgColor: '#EFF6FF',
      icon: 'ℹ️'
    }
  ]);

  const [teamCertifications] = useState([
    {
      id: 1,
      name: 'Security Awareness',
      icon: '🛡️',
      count: 8,
      total: 12
    },
    {
      id: 2,
      name: 'GDPR Compliance',
      icon: '🔒',
      count: 6,
      total: 12
    },
    {
      id: 3,
      name: 'Password Security',
      icon: '🔐',
      count: 10,
      total: 12
    },
    {
      id: 4,
      name: 'Remote Work Security',
      icon: '🏠',
      count: 7,
      total: 12
    },
    {
      id: 5,
      name: 'Incident Response',
      icon: '🚨',
      count: 5,
      total: 12
    },
    {
      id: 6,
      name: 'Phishing Awareness',
      icon: '🎣',
      count: 9,
      total: 12
    },
    {
      id: 7,
      name: 'Data Protection',
      icon: '📊',
      count: 4,
      total: 12
    },
    {
      id: 8,
      name: 'Access Control',
      icon: '🔑',
      count: 11,
      total: 12
    }
  ]);

  const teamProgressData = [
    { name: 'Jan', completed: 65, assigned: 80 },
    { name: 'Feb', completed: 72, assigned: 85 },
    { name: 'Mar', completed: 78, assigned: 90 },
    { name: 'Apr', completed: 85, assigned: 95 },
    { name: 'May', completed: 92, assigned: 100 },
    { name: 'Jun', completed: 88, assigned: 105 }
  ];

  const complianceData = [
    { name: 'Compliant', value: dashboardData.teamPerformance.policiesAcknowledged, color: '#10B981' },
    { name: 'Overdue', value: dashboardData.teamPerformance.overdueItems, color: '#EF4444' }
  ];

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <div>
              <Greeting>Manager Dashboard</Greeting>
              <Subtext>Team oversight and compliance management</Subtext>
            </div>
            <UserProfile>
              <UserAvatar>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
              </UserAvatar>
              <UserInfo>
                <UserDisplayName>{user?.name || 'Manager'}</UserDisplayName>
                <UserRole>Team Manager</UserRole>
              </UserInfo>
              <LogoutButton onClick={() => {
                onLogout();
              }}>
                Logout
              </LogoutButton>
            </UserProfile>
          </Header>

          <ActionButtons>
            <ActionButton to="/team-management">
              👥 Team Management
            </ActionButton>
            <ActionButton to="/non-compliance">
              📊 Compliance Tracking
            </ActionButton>
            <ActionButton to="/assignment-management">
              🎓 Training Assignments
            </ActionButton>
            <ActionButton to="/policy-management">
              📋 Policy Approvals
            </ActionButton>
          </ActionButtons>

          <StatsGrid>
            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #3B82F6, #1D4ED8)">
                👥
              </StatIcon>
              <StatNumber>{dashboardData.teamOverview.totalTeamMembers}</StatNumber>
              <StatLabel>Team Members</StatLabel>
              <StatChange positive>All active</StatChange>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #10B981, #059669)">
                ✅
              </StatIcon>
              <StatNumber>{dashboardData.teamOverview.complianceRate}%</StatNumber>
              <StatLabel>Team Compliance</StatLabel>
              <StatChange positive>+3% this month</StatChange>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #3B82F6, #1D4ED8)">
                🎓
              </StatIcon>
              <StatNumber>{dashboardData.teamPerformance.trainingCompleted}</StatNumber>
              <StatLabel>Training Completed</StatLabel>
              <StatChange positive>+5 this week</StatChange>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #EF4444, #DC2626)">
                ⚠️
              </StatIcon>
              <StatNumber>{dashboardData.teamPerformance.overdueItems}</StatNumber>
              <StatLabel>Overdue Items</StatLabel>
              <StatChange positive>-2 resolved</StatChange>
            </StatCard>
          </StatsGrid>

          <ChartsGrid>
            <ChartCard>
              <ChartTitle>Team Progress Trend</ChartTitle>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={teamProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="completed" stroke="#3B82F6" strokeWidth={3} name="Completed" />
                  <Line type="monotone" dataKey="assigned" stroke="#3B82F6" strokeWidth={2} name="Assigned" />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
              <ChartTitle>Team Compliance Status</ChartTitle>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={complianceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </ChartsGrid>

          <ChartsGrid>
            <TeamSection>
              <ChartTitle>Team Members Progress</ChartTitle>
              {teamMembers.map((member) => (
                <TeamMember key={member.id}>
                  <MemberAvatar>{member.avatar}</MemberAvatar>
                  <MemberInfo>
                    <MemberName>{member.name}</MemberName>
                    <MemberRole>{member.role}</MemberRole>
                    <MemberProgress color={member.color}>
                      {member.progress}
                    </MemberProgress>
                  </MemberInfo>
                </TeamMember>
              ))}
            </TeamSection>

            <AlertsSection>
              <ChartTitle>Team Alerts & Notifications</ChartTitle>
              {alerts.map((alert) => (
                <AlertItem key={alert.id} color={alert.color} bgColor={alert.bgColor}>
                  <AlertIcon color={alert.color}>
                    {alert.icon}
                  </AlertIcon>
                  <AlertContent>
                    <AlertTitle>{alert.title}</AlertTitle>
                    <AlertDescription>{alert.description}</AlertDescription>
                    <AlertTime color={alert.color}>{alert.time}</AlertTime>
                  </AlertContent>
                </AlertItem>
              ))}
            </AlertsSection>
          </ChartsGrid>

          <TeamCertifications>
            <ChartTitle>Team Certifications Overview</ChartTitle>
            <CertificationGrid>
              {teamCertifications.map(cert => (
                <CertificationItem key={cert.id}>
                  <CertificationIcon>{cert.icon}</CertificationIcon>
                  <CertificationName>{cert.name}</CertificationName>
                  <CertificationCount>{cert.count}/{cert.total} completed</CertificationCount>
                </CertificationItem>
              ))}
            </CertificationGrid>
          </TeamCertifications>

          <ChartsGrid>
            <ChartCard>
              <ChartTitle>Team Management</ChartTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ActionButton to="/assignment-management" style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
                  🎓 Assignment Management
                </ActionButton>
                <ActionButton to="/team-management" style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
                  👥 Team Management
                </ActionButton>
                <ActionButton to="/team-progress" style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
                  📈 Team Progress
                </ActionButton>
              </div>
            </ChartCard>

            <ChartCard>
              <ChartTitle>Compliance & Monitoring</ChartTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ActionButton to="/non-compliance" style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
                  🚨 Non-Compliance
                </ActionButton>
                <ActionButton to="/policy-management" style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
                  📋 Policy Management
                </ActionButton>
                <ActionButton to="/training-management" style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
                  🎯 Training Management
                </ActionButton>
              </div>
            </ChartCard>
          </ChartsGrid>
        </Container>
      </MainContent>
    </Page>
  );
}