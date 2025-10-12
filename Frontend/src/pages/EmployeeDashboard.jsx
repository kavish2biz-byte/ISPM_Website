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
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
  }
`;

const MyTrainingSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
`;

const TrainingItem = styled.div`
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

const TrainingIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #10B981, #059669);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const TrainingInfo = styled.div`
  flex: 1;
`;

const TrainingName = styled.div`
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.25rem;
`;

const TrainingDescription = styled.div`
  font-size: 0.85rem;
  color: #64748B;
  margin-bottom: 0.25rem;
`;

const TrainingProgress = styled.div`
  font-size: 0.8rem;
  color: ${props => props.color || '#3B82F6'};
  font-weight: 500;
`;

const TrainingButton = styled(Link)`
  background: ${props => props.bgColor || '#3B82F6'};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const PolicySection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
`;

const PolicyItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-left: 3px solid ${props => props.color || '#3B82F6'};
  background: ${props => props.bgColor || '#EFF6FF'};
  border-radius: 0 8px 8px 0;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const PolicyIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.color || '#3B82F6'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const PolicyContent = styled.div`
  flex: 1;
`;

const PolicyName = styled.div`
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.25rem;
`;

const PolicyDescription = styled.div`
  font-size: 0.9rem;
  color: #64748B;
  margin-bottom: 0.25rem;
`;

const PolicyStatus = styled.div`
  font-size: 0.8rem;
  color: ${props => props.color || '#3B82F6'};
  font-weight: 500;
`;

const AchievementSection = styled.div`
  background: linear-gradient(135deg, #10B981, #059669);
  border-radius: 12px;
  padding: 1.5rem;
  color: white;
  margin-bottom: 2rem;
`;

const AchievementTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const AchievementList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const AchievementItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const AchievementIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const AchievementName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const AchievementDate = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const ProgressOverviewSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ProgressOverviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1.5rem;
  align-items: start;
`;

const ProgressOverviewCard = styled.div`
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  border-radius: 12px;
  padding: 2rem;
  color: white;
  text-align: center;
`;

const ProgressTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
`;

const ProgressCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

const ProgressCircleInner = styled.div`
  text-align: center;
`;

const ProgressPercentage = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: white;
`;

const ProgressLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
`;

const ProgressStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const ProgressStatItem = styled.div`
  text-align: center;
`;

const ProgressStatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
`;

const ProgressStatLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
`;

const RecentCertificatesCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #E2E8F0;
`;

const CertificateList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1rem 0;
  max-height: 400px;
  overflow-y: auto;
`;

const CertificateItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #F8FAFC;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  position: relative;
  border: 1px solid #E2E8F0;
`;

const CertificateIcon = styled.div`
  font-size: 1.5rem;
`;

const CertificateInfo = styled.div`
  flex: 1;
`;

const CertificateName = styled.div`
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.25rem;
`;

const CertificateDate = styled.div`
  font-size: 0.8rem;
  color: #6B7280;
`;

const CertificateProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background: #E2E8F0;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.color || '#10B981'};
  width: ${props => props.percentage}%;
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const ProgressText = styled.span`
  font-size: 0.75rem;
  color: #6B7280;
  font-weight: 500;
  min-width: 35px;
`;

const ViewAllLink = styled(Link)`
  display: inline-block;
  color: #3B82F6;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function EmployeeDashboard({ user, onLogout }) {
  // Role-based access control
  useEffect(() => {
    if (user && user.role !== 'employee' && user.role !== 'manager' && user.role !== 'admin') {
      // Redirect non-employee users to their appropriate dashboard
      window.location.href = '/employee-dashboard';
    }
  }, [user]);

  const [dashboardData, setDashboardData] = useState({
    personalOverview: {
      trainingCompleted: 5,
      certificatesEarned: 3,
      policiesAcknowledged: 8,
      overallProgress: 75
    },
    myProgress: {
      currentTraining: 2,
      upcomingDeadlines: 3,
      recentAchievements: 4,
      streak: 7
    }
  });

  const [myTraining] = useState([
    {
      id: 1,
      name: 'Security Awareness Training',
      description: 'Basic security practices and awareness',
      progress: '100% Complete',
      status: 'completed',
      color: '#10B981',
      bgColor: '#10B981'
    },
    {
      id: 2,
      name: 'GDPR Compliance Training',
      description: 'Understanding data protection regulations',
      progress: '65% Complete',
      status: 'in-progress',
      color: '#F59E0B',
      bgColor: '#F59E0B'
    },
    {
      id: 3,
      name: 'Password Security Best Practices',
      description: 'Advanced password management techniques',
      progress: 'Not Started',
      status: 'not-started',
      color: '#6B7280',
      bgColor: '#6B7280'
    }
  ]);

  const [myPolicies] = useState([
    {
      id: 1,
      name: 'Information Security Policy',
      description: 'Comprehensive security guidelines and procedures',
      status: 'Acknowledged',
      color: '#10B981',
      bgColor: '#ECFDF5',
      icon: '✅'
    },
    {
      id: 2,
      name: 'Data Privacy Policy',
      description: 'Data collection and protection guidelines',
      status: 'Acknowledged',
      color: '#10B981',
      bgColor: '#ECFDF5',
      icon: '✅'
    },
    {
      id: 3,
      name: 'Remote Work Security Policy',
      description: 'Guidelines for secure remote work practices',
      status: 'Pending Review',
      color: '#F59E0B',
      bgColor: '#FFFBEB',
      icon: '⏳'
    }
  ]);

  const [achievements] = useState([
    {
      id: 1,
      name: 'Security Champion',
      icon: '🛡️',
      date: 'Jan 15, 2025'
    },
    {
      id: 2,
      name: 'Training Expert',
      icon: '🎓',
      date: 'Jan 10, 2025'
    },
    {
      id: 3,
      name: 'Policy Master',
      icon: '📋',
      date: 'Jan 5, 2025'
    },
    {
      id: 4,
      name: 'Compliance Star',
      icon: '⭐',
      date: 'Dec 28, 2024'
    },
    {
      id: 5,
      name: 'GDPR Specialist',
      icon: '🔒',
      date: 'Jan 8, 2025'
    },
    {
      id: 6,
      name: 'Password Guardian',
      icon: '🔐',
      date: 'Jan 3, 2025'
    },
    {
      id: 7,
      name: 'Remote Work Pro',
      icon: '🏠',
      date: 'Jan 12, 2025'
    },
    {
      id: 8,
      name: 'Incident Response Expert',
      icon: '🚨',
      date: 'Jan 6, 2025'
    }
  ]);

  const weeklyProgressData = [
    { day: 'Mon', training: 2, policies: 1, quizzes: 3 },
    { day: 'Tue', training: 3, policies: 2, quizzes: 2 },
    { day: 'Wed', training: 1, policies: 3, quizzes: 4 },
    { day: 'Thu', training: 4, policies: 1, quizzes: 2 },
    { day: 'Fri', training: 2, policies: 2, quizzes: 3 },
    { day: 'Sat', training: 1, policies: 1, quizzes: 1 },
    { day: 'Sun', training: 0, policies: 0, quizzes: 0 }
  ];

  const progressData = [
    { name: 'Completed', value: dashboardData.personalOverview.trainingCompleted, color: '#10B981' },
    { name: 'In Progress', value: dashboardData.myProgress.currentTraining, color: '#F59E0B' },
    { name: 'Not Started', value: 3, color: '#6B7280' }
  ];

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <div>
              <Greeting>My Dashboard</Greeting>
              <Subtext>Track your progress and stay compliant</Subtext>
            </div>
            <UserProfile>
              <UserAvatar>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'E'}
              </UserAvatar>
              <UserInfo>
                <UserDisplayName>{user?.name || 'Employee'}</UserDisplayName>
                <UserRole>Team Member</UserRole>
              </UserInfo>
              <LogoutButton onClick={() => {
                onLogout();
              }}>
                Logout
              </LogoutButton>
            </UserProfile>
          </Header>

          <ActionButtons>
            <ActionButton to="/my-training">
              🎓 My Training
            </ActionButton>
            <ActionButton to="/my-certificates">
              🏆 My Certificates
            </ActionButton>
            <ActionButton to="/policies">
              📋 My Policies
            </ActionButton>
            <ActionButton to="/quizzes">
              🧠 Take Quiz
            </ActionButton>
          </ActionButtons>

          <StatsGrid>
            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #10B981, #059669)">
                🎓
              </StatIcon>
              <StatNumber>{dashboardData.personalOverview.trainingCompleted}</StatNumber>
              <StatLabel>Training Completed</StatLabel>
              <StatChange positive>+2 this week</StatChange>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #F59E0B, #D97706)">
                🏆
              </StatIcon>
              <StatNumber>{dashboardData.personalOverview.certificatesEarned}</StatNumber>
              <StatLabel>Certificates Earned</StatLabel>
              <StatChange positive>+1 new certificate</StatChange>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #3B82F6, #1D4ED8)">
                📋
              </StatIcon>
              <StatNumber>{dashboardData.personalOverview.policiesAcknowledged}</StatNumber>
              <StatLabel>Policies Acknowledged</StatLabel>
              <StatChange positive>All up to date</StatChange>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #8B5CF6, #7C3AED)">
                📊
              </StatIcon>
              <StatNumber>{dashboardData.personalOverview.overallProgress}%</StatNumber>
              <StatLabel>Overall Progress</StatLabel>
              <StatChange positive>+5% this month</StatChange>
            </StatCard>
          </StatsGrid>

          <ChartsGrid>
            <ChartCard>
              <ChartTitle>Weekly Activity</ChartTitle>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="training" fill="#3B82F6" name="Training" />
                  <Bar dataKey="policies" fill="#10B981" name="Policies" />
                  <Bar dataKey="quizzes" fill="#F59E0B" name="Quizzes" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
              <ChartTitle>Training Progress</ChartTitle>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </ChartsGrid>

          <ChartsGrid>
            <MyTrainingSection>
              <ChartTitle>My Training Courses</ChartTitle>
              {myTraining.map((training) => (
                <TrainingItem key={training.id}>
                  <TrainingIcon>🎓</TrainingIcon>
                  <TrainingInfo>
                    <TrainingName>{training.name}</TrainingName>
                    <TrainingDescription>{training.description}</TrainingDescription>
                    <TrainingProgress color={training.color}>
                      {training.progress}
                    </TrainingProgress>
                  </TrainingInfo>
                  <TrainingButton 
                    to="/my-training" 
                    bgColor={training.bgColor}
                  >
                    {training.status === 'completed' ? 'Review' : 
                     training.status === 'in-progress' ? 'Continue' : 'Start'}
                  </TrainingButton>
                </TrainingItem>
              ))}
            </MyTrainingSection>

            <PolicySection>
              <ChartTitle>My Policy Acknowledgments</ChartTitle>
              {myPolicies.map((policy) => (
                <PolicyItem key={policy.id} color={policy.color} bgColor={policy.bgColor}>
                  <PolicyIcon color={policy.color}>
                    {policy.icon}
                  </PolicyIcon>
                  <PolicyContent>
                    <PolicyName>{policy.name}</PolicyName>
                    <PolicyDescription>{policy.description}</PolicyDescription>
                    <PolicyStatus color={policy.color}>
                      {policy.status}
                    </PolicyStatus>
                  </PolicyContent>
                </PolicyItem>
              ))}
            </PolicySection>
          </ChartsGrid>

          <AchievementSection>
            <AchievementTitle>🏆 Recent Achievements</AchievementTitle>
            <AchievementList>
              {achievements.map((achievement) => (
                <AchievementItem key={achievement.id}>
                  <AchievementIcon>{achievement.icon}</AchievementIcon>
                  <AchievementName>{achievement.name}</AchievementName>
                  <AchievementDate>{achievement.date}</AchievementDate>
                </AchievementItem>
              ))}
            </AchievementList>
          </AchievementSection>

          <ProgressOverviewSection>
            <ChartTitle>Overall Progress Overview</ChartTitle>
            <ProgressOverviewGrid>
              <ProgressOverviewCard>
                <ProgressTitle>Training Progress</ProgressTitle>
                <ProgressCircle>
                  <ProgressCircleInner>
                    <ProgressPercentage>{dashboardData.personalOverview.overallProgress}%</ProgressPercentage>
                    <ProgressLabel>Complete</ProgressLabel>
                  </ProgressCircleInner>
                </ProgressCircle>
                <ProgressStats>
                  <ProgressStatItem>
                    <ProgressStatNumber>{dashboardData.personalOverview.trainingCompleted}</ProgressStatNumber>
                    <ProgressStatLabel>Completed</ProgressStatLabel>
                  </ProgressStatItem>
                  <ProgressStatItem>
                    <ProgressStatNumber>{dashboardData.personalOverview.certificatesEarned}</ProgressStatNumber>
                    <ProgressStatLabel>Certificates</ProgressStatLabel>
                  </ProgressStatItem>
                  <ProgressStatItem>
                    <ProgressStatNumber>{dashboardData.personalOverview.policiesAcknowledged}</ProgressStatNumber>
                    <ProgressStatLabel>Policies</ProgressStatLabel>
                  </ProgressStatItem>
                </ProgressStats>
              </ProgressOverviewCard>
              
              <RecentCertificatesCard>
                <ChartTitle>Recent Certificates</ChartTitle>
                <CertificateList>
                  {[
                    { id: 1, name: 'Security Awareness', date: '2025-01-15', progress: 100, status: 'Completed', color: '#10B981' },
                    { id: 2, name: 'Password Security', date: '2025-01-12', progress: 100, status: 'Completed', color: '#10B981' },
                    { id: 3, name: 'GDPR Compliance', date: '2025-01-10', progress: 100, status: 'Completed', color: '#10B981' },
                    { id: 4, name: 'Incident Response', date: 'In Progress', progress: 75, status: 'In Progress', color: '#F59E0B' },
                    { id: 5, name: 'Data Protection', date: 'Not Started', progress: 0, status: 'Not Started', color: '#6B7280' }
                  ].map(cert => (
                    <CertificateItem key={cert.id}>
                      <CertificateIcon>🏆</CertificateIcon>
                      <CertificateInfo>
                        <CertificateName>{cert.name}</CertificateName>
                        <CertificateDate>
                          {cert.status === 'Completed' ? `Earned ${cert.date}` : cert.date}
                        </CertificateDate>
                        <CertificateProgress>
                          <ProgressBar>
                            <ProgressFill percentage={cert.progress} color={cert.color} />
                          </ProgressBar>
                          <ProgressText>{cert.progress}%</ProgressText>
                        </CertificateProgress>
                      </CertificateInfo>
                    </CertificateItem>
                  ))}
                </CertificateList>
                <ViewAllLink to="/my-certificates">View All Certificates →</ViewAllLink>
              </RecentCertificatesCard>
            </ProgressOverviewGrid>
          </ProgressOverviewSection>

          <ChartsGrid>
            <ChartCard>
              <ChartTitle>Quick Actions</ChartTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ActionButton to="/my-training" style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
                  🎓 Continue Training
                </ActionButton>
                <ActionButton to="/quizzes" style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
                  🧠 Take Quiz
                </ActionButton>
                <ActionButton to="/my-certificates" style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
                  🏆 View Certificates
                </ActionButton>
                <ActionButton to="/policies" style={{ fontSize: '0.9rem', padding: '0.75rem 1rem' }}>
                  📋 Review Policies
                </ActionButton>
              </div>
            </ChartCard>

            <ChartCard>
              <ChartTitle>Learning Streak</ChartTitle>
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔥</div>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3B82F6', marginBottom: '0.5rem' }}>
                  {dashboardData.myProgress.streak} days
                </div>
                <div style={{ color: '#64748B' }}>Keep it up! You're on fire!</div>
              </div>
            </ChartCard>
          </ChartsGrid>
        </Container>
      </MainContent>
    </Page>
  );
}