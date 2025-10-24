import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Download,
  Calendar,
  Target,
  Award,
  Activity,
  Filter,
  RefreshCw,
  Settings,
  Clock,
  Zap,
  Eye,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Bell,
  Share2,
  Mail,
  FileUp,
  Database,
  PieChart,
  LineChart,
  BarChart,
  Layers
} from 'lucide-react';
import Sidebar from '../components/shared/Sidebar';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter as RechartsScatter,
  ComposedChart,
  ReferenceLine,
  Legend
} from 'recharts';

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
  max-width: 1600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const Greeting = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
`;

const Subtext = styled.p`
  color: #64748B;
  margin: 0.5rem 0 0 0;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #3B82F6;
    color: #3B82F6;
  }

  &.primary {
    background: #3B82F6;
    color: white;
    border-color: #3B82F6;

    &:hover {
      background: #2563EB;
    }
  }

  &.success {
    background: #10B981;
    color: white;
    border-color: #10B981;

    &:hover {
      background: #059669;
    }
  }
`;

const ControlsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const ControlsRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ControlLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
`;

const Select = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: white;
  font-size: 0.9rem;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: white;
  font-size: 0.9rem;
  min-width: 150px;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: ${props => props.active ? '#3B82F6' : 'white'};
  color: ${props => props.active ? 'white' : '#374151'};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#2563EB' : '#F9FAFB'};
  }
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.trendColor || '#3B82F6'};
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor || '#EFF6FF'};
  color: ${props => props.color || '#3B82F6'};
`;

const StatTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748B;
  margin: 0;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: ${props => props.positive ? '#059669' : '#DC2626'};
`;

const StatPrediction = styled.div`
  font-size: 0.75rem;
  color: #8B5CF6;
  margin-top: 0.5rem;
  font-style: italic;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`;

const ChartActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ChartButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 0.8rem;
  color: #374151;
  transition: all 0.2s;

  &:hover {
    background: #F9FAFB;
    border-color: #3B82F6;
    color: #3B82F6;
  }
`;

const ChartContainer = styled.div`
  height: 350px;
`;

const InsightsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const InsightsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InsightItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  background: ${props => {
    switch(props.type) {
      case 'positive': return '#F0FDF4';
      case 'warning': return '#FEF3C7';
      case 'negative': return '#FEE2E2';
      default: return '#F8FAFC';
    }
  }};
  border-left: 4px solid ${props => {
    switch(props.type) {
      case 'positive': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'negative': return '#EF4444';
      default: return '#3B82F6';
    }
  }};
`;

const InsightIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch(props.type) {
      case 'positive': return '#D1FAE5';
      case 'warning': return '#FEF3C7';
      case 'negative': return '#FEE2E2';
      default: return '#EFF6FF';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'positive': return '#059669';
      case 'warning': return '#D97706';
      case 'negative': return '#DC2626';
      default: return '#3B82F6';
    }
  }};
`;

const InsightContent = styled.div`
  flex: 1;
`;

const InsightTitle = styled.div`
  font-weight: 600;
  color: #1E293B;
  font-size: 0.9rem;
`;

const InsightDescription = styled.div`
  color: #64748B;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const AdminAnalytics = ({ user, onLogout }) => {
  const [dateRange, setDateRange] = useState('30d');
  const [comparisonPeriod, setComparisonPeriod] = useState('previous');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [viewMode, setViewMode] = useState('overview');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [drillDown, setDrillDown] = useState(null);

  const [analyticsData, setAnalyticsData] = useState({
    roleAnalytics: [
      { role: 'Admin', acknowledgmentRate: 100, totalUsers: 5, trend: 2.5 },
      { role: 'Manager', acknowledgmentRate: 92, totalUsers: 12, trend: 5.2 },
      { role: 'Employee', acknowledgmentRate: 85, totalUsers: 230, trend: -1.8 }
    ],
    departmentAnalytics: [
      { department: 'HR', complianceRate: 95, totalPolicies: 8, trend: 3.2 },
      { department: 'Finance', complianceRate: 88, totalPolicies: 6, trend: -2.1 },
      { department: 'Engineering', complianceRate: 92, totalPolicies: 10, trend: 4.5 },
      { department: 'Sales', complianceRate: 85, totalPolicies: 5, trend: 1.8 },
      { department: 'Operations', complianceRate: 90, totalPolicies: 7, trend: 2.3 }
    ],
    trainingProgress: [
      { month: 'Jan', completed: 45, inProgress: 12, notStarted: 8, predicted: 50 },
      { month: 'Feb', completed: 52, inProgress: 15, notStarted: 6, predicted: 58 },
      { month: 'Mar', completed: 48, inProgress: 18, notStarted: 4, predicted: 55 },
      { month: 'Apr', completed: 58, inProgress: 12, notStarted: 3, predicted: 65 },
      { month: 'May', completed: 62, inProgress: 10, notStarted: 2, predicted: 70 },
      { month: 'Jun', completed: 68, inProgress: 8, notStarted: 1, predicted: 75 }
    ],
    userGrowth: [
      { month: 'Jan', users: 120, predicted: 125 },
      { month: 'Feb', users: 135, predicted: 140 },
      { month: 'Mar', users: 148, predicted: 155 },
      { month: 'Apr', users: 162, predicted: 170 },
      { month: 'May', users: 175, predicted: 185 },
      { month: 'Jun', users: 190, predicted: 200 }
    ],
    complianceTrends: [
      { period: 'Q1 2023', compliance: 78, target: 85 },
      { period: 'Q2 2023', compliance: 82, target: 85 },
      { period: 'Q3 2023', compliance: 85, target: 85 },
      { period: 'Q4 2023', compliance: 88, target: 90 },
      { period: 'Q1 2024', compliance: 92, target: 90 },
      { period: 'Q2 2024', compliance: 95, target: 95 }
    ]
  });

  const [metrics, setMetrics] = useState({
    totalUsers: 247,
    totalPolicies: 15,
    totalTrainings: 8,
    complianceRate: 88,
    userGrowthRate: 12.5,
    policyAckRate: 89,
    riskScore: 15,
    efficiencyScore: 92
  });

  const [insights, setInsights] = useState([
    {
      type: 'positive',
      icon: TrendingUp,
      title: 'Compliance Rate Improved',
      description: 'Overall compliance increased by 3.2% this month, exceeding target by 2%',
      impact: 'High'
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Finance Department Below Target',
      description: 'Finance department compliance dropped by 2.1% - requires attention',
      impact: 'Medium'
    },
    {
      type: 'positive',
      icon: Users,
      title: 'User Engagement Up',
      description: 'Training completion rates increased by 8% compared to last month',
      impact: 'High'
    },
    {
      type: 'negative',
      icon: Clock,
      title: 'Policy Review Overdue',
      description: '3 policies require review - overdue by 15 days',
      impact: 'High'
    }
  ]);

  const handleExportReport = () => {
    alert('Exporting advanced analytics report with custom parameters...');
  };

  const handleScheduleReport = () => {
    alert('Setting up scheduled report generation...');
  };

  const handleDrillDown = (data) => {
    setDrillDown(data);
    alert(`Drilling down into ${data.name} - showing detailed breakdown...`);
  };

  const handleRefresh = () => {
    alert('Refreshing analytics data...');
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#8B5CF6'];

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <HeaderLeft>
              <Greeting>Advanced Analytics & Insights</Greeting>
              <Subtext>Deep insights, predictive analytics, and comprehensive reporting</Subtext>
            </HeaderLeft>
            <HeaderRight>
              <ActionButton onClick={handleRefresh}>
                <RefreshCw size={16} />
                Refresh
              </ActionButton>
              <ActionButton onClick={handleScheduleReport}>
                <Clock size={16} />
                Schedule Report
              </ActionButton>
              <ActionButton className="primary" onClick={handleExportReport}>
                <Download size={16} />
                Export Report
              </ActionButton>
            </HeaderRight>
          </Header>

          {/* Advanced Controls */}
          <ControlsSection>
            <ControlsRow>
              <ControlGroup>
                <ControlLabel>Date Range</ControlLabel>
                <Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                  <option value="custom">Custom range</option>
                </Select>
              </ControlGroup>

              <ControlGroup>
                <ControlLabel>Compare With</ControlLabel>
                <Select value={comparisonPeriod} onChange={(e) => setComparisonPeriod(e.target.value)}>
                  <option value="previous">Previous period</option>
                  <option value="yoy">Year over year</option>
                  <option value="target">Target goals</option>
                  <option value="none">No comparison</option>
                </Select>
              </ControlGroup>

              <ControlGroup>
                <ControlLabel>Department</ControlLabel>
                <Select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                  <option value="all">All Departments</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                </Select>
              </ControlGroup>

              <ControlGroup>
                <ControlLabel>Role</ControlLabel>
                <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </Select>
              </ControlGroup>

              <ControlGroup>
                <ControlLabel>View Mode</ControlLabel>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <ToggleButton 
                    active={viewMode === 'overview'} 
                    onClick={() => setViewMode('overview')}
                  >
                    <Eye size={14} />
                    Overview
                  </ToggleButton>
                  <ToggleButton 
                    active={viewMode === 'detailed'} 
                    onClick={() => setViewMode('detailed')}
                  >
                    <BarChart3 size={14} />
                    Detailed
                  </ToggleButton>
                  <ToggleButton 
                    active={viewMode === 'predictive'} 
                    onClick={() => setViewMode('predictive')}
                  >
                    <Zap size={14} />
                    Predictive
                  </ToggleButton>
                </div>
              </ControlGroup>

              <ControlGroup>
                <ControlLabel>Auto Refresh</ControlLabel>
                <ToggleButton 
                  active={autoRefresh} 
                  onClick={() => setAutoRefresh(!autoRefresh)}
                >
                  <RefreshCw size={14} />
                  {autoRefresh ? 'ON' : 'OFF'}
                </ToggleButton>
              </ControlGroup>
            </ControlsRow>
          </ControlsSection>

          {/* Key Metrics with Predictions */}
          <StatsGrid>
            <StatCard trendColor="#3B82F6">
              <StatHeader>
                <StatIcon bgColor="#EFF6FF" color="#3B82F6">
                  <Users size={20} />
                </StatIcon>
                <StatTitle>Total Users</StatTitle>
              </StatHeader>
              <StatValue>{metrics.totalUsers}</StatValue>
              <StatChange positive>
                <TrendingUp size={14} />
                +{metrics.userGrowthRate}% this month
              </StatChange>
              <StatPrediction>
                Predicted: {Math.round(metrics.totalUsers * 1.15)} by next month
              </StatPrediction>
            </StatCard>

            <StatCard trendColor="#10B981">
              <StatHeader>
                <StatIcon bgColor="#F0FDF4" color="#10B981">
                  <FileText size={20} />
                </StatIcon>
                <StatTitle>Compliance Rate</StatTitle>
              </StatHeader>
              <StatValue>{metrics.complianceRate}%</StatValue>
              <StatChange positive>
                <TrendingUp size={14} />
                +3.2% vs target
              </StatChange>
              <StatPrediction>
                Target: 90% | Current: {metrics.complianceRate}%
              </StatPrediction>
            </StatCard>

            <StatCard trendColor="#F59E0B">
              <StatHeader>
                <StatIcon bgColor="#FEF3C7" color="#F59E0B">
                  <Target size={20} />
                </StatIcon>
                <StatTitle>Risk Score</StatTitle>
              </StatHeader>
              <StatValue>{metrics.riskScore}</StatValue>
              <StatChange positive>
                <TrendingUp size={14} />
                Low risk
              </StatChange>
              <StatPrediction>
                Risk trend: Decreasing by 2% monthly
              </StatPrediction>
            </StatCard>

            <StatCard trendColor="#8B5CF6">
              <StatHeader>
                <StatIcon bgColor="#F3E8FF" color="#8B5CF6">
                  <Zap size={20} />
                </StatIcon>
                <StatTitle>Efficiency Score</StatTitle>
              </StatHeader>
              <StatValue>{metrics.efficiencyScore}</StatValue>
              <StatChange positive>
                <TrendingUp size={14} />
                +5% this month
              </StatChange>
              <StatPrediction>
                Predicted: {metrics.efficiencyScore + 3} by next quarter
              </StatPrediction>
            </StatCard>
          </StatsGrid>

          {/* Key Insights */}
          <InsightsSection>
            <InsightsTitle>
              <Zap size={20} />
              Key Insights
            </InsightsTitle>
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <InsightItem key={index} type={insight.type}>
                  <InsightIcon type={insight.type}>
                    <IconComponent size={16} />
                  </InsightIcon>
                  <InsightContent>
                    <InsightTitle>{insight.title}</InsightTitle>
                    <InsightDescription>{insight.description}</InsightDescription>
                  </InsightContent>
                </InsightItem>
              );
            })}
          </InsightsSection>

          {/* Advanced Charts */}
          <ChartsGrid>
            <ChartCard>
              <ChartHeader>
                <ChartTitle>Compliance Trends vs Targets</ChartTitle>
                <ChartActions>
                  <ChartButton onClick={() => handleDrillDown({name: 'Compliance Trends'})}>
                    <ChevronDown size={12} />
                    Drill Down
                  </ChartButton>
                </ChartActions>
              </ChartHeader>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={analyticsData.complianceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="compliance" fill="#3B82F6" name="Actual" />
                    <Line type="monotone" dataKey="target" stroke="#EF4444" strokeWidth={2} name="Target" />
                    <ReferenceLine y={90} stroke="#10B981" strokeDasharray="5 5" label="Goal" />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </ChartCard>

            <ChartCard>
              <ChartHeader>
                <ChartTitle>Training Progress with Predictions</ChartTitle>
                <ChartActions>
                  <ChartButton onClick={() => handleDrillDown({name: 'Training Progress'})}>
                    <ChevronDown size={12} />
                    Drill Down
                  </ChartButton>
                </ChartActions>
              </ChartHeader>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={analyticsData.trainingProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={3} name="Completed" />
                    <Line type="monotone" dataKey="predicted" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </ChartCard>

            <ChartCard>
              <ChartHeader>
                <ChartTitle>Department Performance Analysis</ChartTitle>
                <ChartActions>
                  <ChartButton onClick={() => handleDrillDown({name: 'Department Performance'})}>
                    <ChevronDown size={12} />
                    Drill Down
                  </ChartButton>
                </ChartActions>
              </ChartHeader>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={analyticsData.departmentAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="complianceRate" fill="#3B82F6" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </ChartCard>

            <ChartCard>
              <ChartHeader>
                <ChartTitle>User Growth with Forecast</ChartTitle>
                <ChartActions>
                  <ChartButton onClick={() => handleDrillDown({name: 'User Growth'})}>
                    <ChevronDown size={12} />
                    Drill Down
                  </ChartButton>
                </ChartActions>
              </ChartHeader>
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData.userGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="users" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Actual" />
                    <Area type="monotone" dataKey="predicted" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} name="Forecast" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </ChartCard>
          </ChartsGrid>
        </Container>
      </MainContent>
    </Page>
  );
};

export default AdminAnalytics;