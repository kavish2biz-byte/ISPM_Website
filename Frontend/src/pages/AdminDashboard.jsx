import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Users, 
  FileText, 
  Activity, 
  BookOpen, 
  Shield, 
  Plus, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  ArrowRight, 
  Settings, 
  Edit,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Download,
  Filter,
  UserPlus,
  FileCheck,
  Target,
  Zap,
  RefreshCw,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import './AdminDashboard.css';

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

const HeaderContent = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  flex: 1;
  margin-right: 1rem;
`;

const HeaderLeft = styled.div`
  h1 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1F2937;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  p {
    margin: 0;
    color: #6B7280;
    font-size: 0.9rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: #1E293B;
    color: white;
    
    &:hover {
      background: #0F172A;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  &.secondary {
    background: #475569;
    color: white;
    
    &:hover {
      background: #334155;
      transform: translateY(-1px);
    }
  }

  &.tertiary {
    background: #64748B;
    color: white;
    
    &:hover {
      background: #475569;
      transform: translateY(-1px);
    }
  }
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
  color: #1F2937;
  font-size: 0.9rem;
`;

const UserRole = styled.div`
  color: #6B7280;
  font-size: 0.8rem;
`;

const WelcomeSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  margin-bottom: 1.5rem;
`;

const WelcomeText = styled.div`
  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #1F2937;
  }
  
  p {
    margin: 0;
    color: #6B7280;
    font-size: 0.9rem;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const MetricCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MetricTitle = styled.span`
  font-size: 0.8rem;
  color: #6B7280;
  font-weight: 500;
`;

const MetricAction = styled.span`
  font-size: 0.7rem;
  color: #3B82F6;
  cursor: pointer;
  font-weight: 500;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  line-height: 1;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
`;

const DashboardCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  
  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #1F2937;
  }
`;

const PeriodSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  select {
    padding: 0.25rem 0.5rem;
    border: 1px solid #D1D5DB;
    border-radius: 4px;
    font-size: 0.8rem;
    background: white;
  }
  
  .overview-link {
    font-size: 0.7rem;
    color: #6B7280;
  }
`;

const ChartContainer = styled.div`
  padding: 1.5rem;
  height: 300px;
`;

const ChartData = styled.div`
  display: flex;
  align-items: end;
  height: 100%;
  position: relative;
`;

const ChartBars = styled.div`
  display: flex;
  align-items: end;
  gap: 1.25rem;
  flex: 1;
  height: 80%;
`;

const ChartBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
`;

const BarFill = styled.div`
  width: 40px;
  background: #1E40AF;
  border-radius: 4px 4px 0 0;
  margin-bottom: 0.5rem;
  min-height: 4px;
`;

const BarLabel = styled.span`
  font-size: 0.7rem;
  color: #6B7280;
  font-weight: 500;
`;

const ChartAxis = styled.div`
  position: absolute;
  left: -30px;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.7rem;
  color: #9CA3AF;
`;

const LinksGrid = styled.div`
  padding: 1.25rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const LinkItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.8rem;
  color: #374151;
  text-decoration: none;

  &:hover {
    background: #F3F4F6;
  }
`;

const QuickActions = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  margin-bottom: 1.5rem;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionCard = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  text-decoration: none;
  color: #374151;
  transition: all 0.3s ease;

  &:hover {
    background: #F1F5F9;
    border-color: #3B82F6;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }

  .action-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .action-content {
    flex: 1;
  }

  .action-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: #1F2937;
  }

  .action-description {
    font-size: 0.8rem;
    color: #6B7280;
  }
`;

const RecentActivity = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #F3F4F6;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #F9FAFB;
  }

  &:last-child {
    border-bottom: none;
  }

  .activity-icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .activity-icon.success {
    background: #D1FAE5;
    color: #065F46;
  }

  .activity-icon.warning {
    background: #FEF3C7;
    color: #92400E;
  }

  .activity-icon.info {
    background: #EFF6FF;
    color: #1E40AF;
  }

  .activity-content {
    flex: 1;
  }

  .activity-title {
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 0.25rem;
  }

  .activity-description {
    font-size: 0.8rem;
    color: #6B7280;
  }

  .activity-time {
    font-size: 0.7rem;
    color: #9CA3AF;
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #EF4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
`;

export default function AdminDashboard({ user, onLogout }) {
  // Role-based access control
  useEffect(() => {
    if (user && user.role !== 'admin') {
      // Redirect non-admin users to their appropriate dashboard
      switch (user.role) {
        case 'manager':
          window.location.href = '/manager-dashboard';
          break;
        case 'employee':
          window.location.href = '/employee-dashboard';
          break;
        default:
          window.location.href = '/employee-dashboard';
      }
    }
  }, [user]);

  const [dashboardData, setDashboardData] = useState({
    overview: {
      employees: 12,
      activeContent: 8,
      publishedQuizzes: 15,
      phishingCampaigns: 6
    },
    emailEngagement: {
      weekly: [
        { period: '2025-38', value: 85 },
        { period: '2025-39', value: 92 },
        { period: '2025-40', value: 100 }
      ]
    }
  });

  const [selectedPeriod, setSelectedPeriod] = useState('Weekly');
  const [recentActivity] = useState([
    {
      id: 1,
      type: 'success',
      title: 'New Employee Added',
      description: 'Sarah Johnson joined the team',
      time: '2 hours ago',
      icon: <UserPlus size={16} />,
      action: () => window.location.href = '/user-management'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Policy Update Required',
      description: '3 policies need review',
      time: '4 hours ago',
      icon: <FileCheck size={16} />,
      action: () => window.location.href = '/policy-management'
    },
    {
      id: 3,
      type: 'info',
      title: 'Training Completed',
      description: 'Security awareness training finished',
      time: '6 hours ago',
      icon: <Target size={16} />,
      action: () => window.location.href = '/training-management'
    },
    {
      id: 4,
      type: 'success',
      title: 'System Updated',
      description: 'Latest security patches applied',
      time: '1 day ago',
      icon: <Zap size={16} />,
      action: () => window.location.href = '/compliance-reports'
    }
  ]);

  const quickActions = [
    {
      title: 'Manage Employees',
      description: 'Add, edit, or remove team members',
      icon: <Users size={20} />,
      to: '/user-management'
    },
    {
      title: 'Manage Training',
      description: 'Create and assign training courses',
      icon: <BookOpen size={20} />,
      to: '/training-management'
    },
    {
      title: 'Policy Management',
      description: 'Update and manage company policies',
      icon: <FileText size={20} />,
      to: '/policy-management'
    },
    {
      title: 'Compliance Reports',
      description: 'View and generate compliance reports',
      icon: <BarChart3 size={20} />,
      to: '/compliance-reports'
    }
  ];

  // Functional handlers
  const handleQuickAdd = () => {
    const options = [
      { label: 'Add Employee', action: () => window.location.href = '/user-management' },
      { label: 'Create Training', action: () => window.location.href = '/training-management' },
      { label: 'New Policy', action: () => window.location.href = '/policy-management' }
    ];
    
    const choice = window.confirm('Quick Add Options:\n1. Add Employee\n2. Create Training\n3. New Policy\n\nClick OK for Employee, Cancel for other options');
    if (choice) {
      options[0].action();
    } else {
      const secondChoice = window.confirm('Choose:\nOK = Training\nCancel = Policy');
      if (secondChoice) {
        options[1].action();
      } else {
        options[2].action();
      }
    }
  };

  const handleExportData = () => {
    alert('Exporting dashboard data...\n\nThis would typically:\n- Generate CSV/PDF reports\n- Include metrics and charts\n- Export user data\n- Create compliance reports');
  };

  const handleSettings = () => {
    alert('Settings Panel\n\nThis would open:\n- System configuration\n- User preferences\n- Security settings\n- Notification preferences');
  };

  const handleMetricClick = (metricType) => {
    const routes = {
      employees: '/user-management',
      activeContent: '/training-management',
      publishedQuizzes: '/quizzes',
      phishingCampaigns: '/compliance-reports'
    };
    
    if (routes[metricType]) {
      window.location.href = routes[metricType];
    }
  };

  const handleRefreshData = () => {
    alert('Refreshing dashboard data...\n\nUpdating:\n- User metrics\n- Training progress\n- Policy compliance\n- System status');
    // In a real app, this would trigger a data refresh
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <HeaderContent>
              <HeaderLeft>
                <h1>
                  <Shield size={24} />
                  Admin Dashboard
                </h1>
                <p>Comprehensive system overview and management tools</p>
              </HeaderLeft>
              <HeaderActions>
                <ActionBtn className="primary" onClick={handleQuickAdd}>
                  <Plus size={16} />
                  Quick Add
                </ActionBtn>
                <ActionBtn className="secondary" onClick={handleExportData}>
                  <Download size={16} />
                  Export Data
                </ActionBtn>
                <ActionBtn className="tertiary" onClick={handleRefreshData}>
                  <RefreshCw size={16} />
                  Refresh
                </ActionBtn>
              </HeaderActions>
            </HeaderContent>
            
            <UserProfile>
              <UserAvatar>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                <NotificationBadge>3</NotificationBadge>
              </UserAvatar>
              <UserInfo>
                <UserDisplayName>{user?.name || 'Admin'}</UserDisplayName>
                <UserRole>System Administrator</UserRole>
              </UserInfo>
              <LogoutButton onClick={() => {
                onLogout();
              }}>
                Logout
              </LogoutButton>
            </UserProfile>
          </Header>

          <WelcomeSection>
            <WelcomeText>
              <h2>Welcome, {user?.name || 'Admin'}</h2>
              <p>Here's what's happening across employees, content, quizzes, and simulations today.</p>
            </WelcomeText>
          </WelcomeSection>

          <MetricsGrid>
            <MetricCard onClick={() => handleMetricClick('employees')}>
              <MetricHeader>
                <MetricTitle>Employees</MetricTitle>
                <MetricAction>View →</MetricAction>
              </MetricHeader>
              <MetricValue>{dashboardData.overview.employees}</MetricValue>
            </MetricCard>

            <MetricCard onClick={() => handleMetricClick('activeContent')}>
              <MetricHeader>
                <MetricTitle>Active Content</MetricTitle>
                <MetricAction>View →</MetricAction>
              </MetricHeader>
              <MetricValue>{dashboardData.overview.activeContent}</MetricValue>
            </MetricCard>

            <MetricCard onClick={() => handleMetricClick('publishedQuizzes')}>
              <MetricHeader>
                <MetricTitle>Published Quizzes</MetricTitle>
                <MetricAction>View →</MetricAction>
              </MetricHeader>
              <MetricValue>{dashboardData.overview.publishedQuizzes}</MetricValue>
            </MetricCard>

            <MetricCard onClick={() => handleMetricClick('phishingCampaigns')}>
              <MetricHeader>
                <MetricTitle>Phishing Campaigns</MetricTitle>
                <MetricAction>View →</MetricAction>
              </MetricHeader>
              <MetricValue>{dashboardData.overview.phishingCampaigns}</MetricValue>
            </MetricCard>
          </MetricsGrid>

          <ContentGrid>
            <DashboardCard>
              <CardHeader>
                <h3>Email Engagement Trends</h3>
                <PeriodSelector>
                  <select 
                    value={selectedPeriod} 
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                  <span className="overview-link">{selectedPeriod} Overview</span>
                </PeriodSelector>
              </CardHeader>
              <ChartContainer>
                <ChartData>
                  <ChartBars>
                    {dashboardData.emailEngagement.weekly.map((data, index) => (
                      <ChartBar key={index}>
                        <BarFill style={{ height: `${data.value}%` }} />
                        <BarLabel>{data.period}</BarLabel>
                      </ChartBar>
                    ))}
                  </ChartBars>
                  <ChartAxis>
                    <span>0</span>
                    <span>2</span>
                    <span>4</span>
                    <span>6</span>
                    <span>8</span>
                  </ChartAxis>
                </ChartData>
              </ChartContainer>
            </DashboardCard>

            <DashboardCard>
              <CardHeader>
                <h3>Quick Links</h3>
              </CardHeader>
              <LinksGrid>
                <LinkItem to="/user-management">
                  <Users size={20} />
                  <span>Manage Employees</span>
                </LinkItem>
                <LinkItem to="/training-management">
                  <BookOpen size={20} />
                  <span>Manage Training</span>
                </LinkItem>
                <LinkItem to="/policy-management">
                  <FileText size={20} />
                  <span>Policy Management</span>
                </LinkItem>
                <LinkItem to="/compliance-reports">
                  <BarChart3 size={20} />
                  <span>Compliance Reports</span>
                </LinkItem>
              </LinksGrid>
            </DashboardCard>
          </ContentGrid>

          <QuickActions>
            <CardHeader>
              <h3>Quick Actions</h3>
            </CardHeader>
            <ActionGrid>
              {quickActions.map((action, index) => (
                <ActionCard key={index} to={action.to}>
                  <div className="action-icon">
                    {action.icon}
                  </div>
                  <div className="action-content">
                    <div className="action-title">{action.title}</div>
                    <div className="action-description">{action.description}</div>
                  </div>
                </ActionCard>
              ))}
            </ActionGrid>
          </QuickActions>

          <RecentActivity>
            <CardHeader>
              <h3>Recent Activity</h3>
            </CardHeader>
            {recentActivity.map((activity) => (
              <ActivityItem key={activity.id} type={activity.type} onClick={activity.action}>
                <div className={`activity-icon ${activity.type}`}>
                  {activity.icon}
                </div>
                <div className="activity-content">
                  <div className="activity-title">{activity.title}</div>
                  <div className="activity-description">{activity.description}</div>
                </div>
                <div className="activity-time">{activity.time}</div>
              </ActivityItem>
            ))}
          </RecentActivity>
        </Container>
      </MainContent>
    </Page>
  );
}