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
  LogOut,
  Filter,
  UserPlus,
  FileCheck,
  Target,
  Zap,
  RefreshCw,
  Bell,
  Search,
  Tag,
  History,
  FileUp,
  EyeOff,
  ChevronDown,
  ChevronUp,
  X,
  BarChart,
  LineChart,
  PieChart,
  Download,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Building,
  Award,
  TrendingDown,
  AlertCircle,
  Info,
  CheckCircle2,
  Star,
  Lock,
  Unlock,
  Trash2,
  Copy,
  Archive,
  Share2,
  DollarSign,
  Globe,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Monitor,
  Smartphone,
  Tablet,
  Headphones,
  Camera,
  Mic,
  Video,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Flag,
  Bookmark,
  Share,
  ExternalLink,
  Maximize,
  Minimize,
  RotateCcw,
  Save,
  Upload,
  Cloud,
  CloudRain,
  Sun,
  Moon,
  Zap as Lightning,
  Flame,
  Snowflake,
  Wind
} from 'lucide-react';
import Sidebar from '../components/shared/Sidebar';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  background: #F8FAFC;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 1.5rem;
`;

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const Greeting = styled.h1`
  font-size: 2rem;
    font-weight: 700;
  color: #3B82F6;
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
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
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
  color: #3B82F6;
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

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
    font-weight: 600;
  color: #3B82F6;
    margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const AnalyticsSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SummaryCard = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
`;

const SummaryIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor || '#EFF6FF'};
  color: ${props => props.color || '#3B82F6'};
`;

const SummaryContent = styled.div`
  flex: 1;
`;

const SummaryValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 0.25rem;
`;

const SummaryLabel = styled.div`
  font-size: 0.8rem;
  color: #64748B;
  font-weight: 500;
`;

const ActivitySection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
`;

const ActivityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => {
    switch(props.action) {
      case 'create': return '#EFF6FF';
      case 'update': return '#F0FDF4';
      case 'delete': return '#FEE2E2';
      default: return '#F8FAFC';
    }
  }};
  color: ${props => {
    switch(props.action) {
      case 'create': return '#3B82F6';
      case 'update': return '#10B981';
      case 'delete': return '#EF4444';
      default: return '#64748B';
    }
  }};
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityText = styled.div`
  font-weight: 500;
  color: #1E293B;
  font-size: 0.9rem;
`;

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: #64748B;
  margin-top: 0.25rem;
`;

const NotificationsPanel = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.$isOpen ? '0' : '-400px'};
  width: 400px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const NotificationsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #E2E8F0;
`;

const NotificationsTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: #F8FAFC;
  border-radius: 6px;
  cursor: pointer;
  color: #64748B;
  transition: all 0.2s;

  &:hover {
    background: #E2E8F0;
    color: #1E293B;
  }
`;

const NotificationsBody = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  background: ${props => {
    switch(props.type) {
      case 'success': return '#F0FDF4';
      case 'warning': return '#FEF3C7';
      case 'error': return '#FEE2E2';
      default: return '#F8FAFC';
    }
  }};
  border: 1px solid ${props => {
    switch(props.type) {
      case 'success': return '#D1FAE5';
      case 'warning': return '#FDE68A';
      case 'error': return '#FECACA';
      default: return '#E2E8F0';
    }
  }};
`;

const NotificationTitle = styled.div`
    font-weight: 600;
  color: #1E293B;
  font-size: 0.9rem;
    margin-bottom: 0.25rem;
`;

const NotificationMessage = styled.div`
  color: #64748B;
    font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const NotificationTime = styled.div`
  color: #9CA3AF;
  font-size: 0.75rem;
`;

// New enhanced components
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const MainDashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SidebarDashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const QuickActionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #3B82F6;
    transform: translateY(-2px);
  }
`;

const QuickActionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor || '#EFF6FF'};
  color: ${props => props.color || '#3B82F6'};
  margin: 0 auto 1rem auto;
`;

const QuickActionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0 0 0.5rem 0;
`;

const QuickActionDescription = styled.p`
  font-size: 0.85rem;
  color: #64748B;
  margin: 0;
`;

const SystemStatusCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const SystemStatusHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const SystemStatusTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`;

const SystemStatusItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #F1F5F9;

  &:last-child {
    border-bottom: none;
  }
`;

const SystemStatusLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #374151;
`;

const SystemStatusValue = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.status === 'online' ? '#059669' : props.status === 'warning' ? '#D97706' : '#DC2626'};
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.status === 'online' ? '#10B981' : props.status === 'warning' ? '#F59E0B' : '#EF4444'};
`;


const RecentUsersCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #F1F5F9;

  &:last-child {
    border-bottom: none;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.bgColor || '#EFF6FF'};
  color: ${props => props.color || '#3B82F6'};
    display: flex;
    align-items: center;
    justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
`;

const UserInfo = styled.div`
    flex: 1;
`;

const UserName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #1E293B;
  margin-bottom: 0.25rem;
`;

const UserRole = styled.div`
  font-size: 0.8rem;
  color: #64748B;
`;

const UserStatus = styled.div`
  font-size: 0.8rem;
  color: ${props => props.status === 'active' ? '#059669' : '#64748B'};
`;


const AlertsPanel = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const AlertItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${props => {
    switch(props.type) {
      case 'critical': return '#FEE2E2';
      case 'warning': return '#FEF3C7';
      case 'info': return '#EFF6FF';
      default: return '#F8FAFC';
    }
  }};
  border-radius: 8px;
  margin-bottom: 0.75rem;
  border: 1px solid ${props => {
    switch(props.type) {
      case 'critical': return '#FECACA';
      case 'warning': return '#FDE68A';
      case 'info': return '#DBEAFE';
      default: return '#E2E8F0';
    }
  }};

  &:last-child {
    margin-bottom: 0;
  }
`;

const AlertIcon = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  background: ${props => {
    switch(props.type) {
      case 'critical': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'info': return '#3B82F6';
      default: return '#6B7280';
    }
  }};
  color: white;
`;

const AlertContent = styled.div`
    flex: 1;
`;

const AlertTitle = styled.div`
  font-size: 0.9rem;
    font-weight: 600;
  color: #1E293B;
    margin-bottom: 0.25rem;
`;

const AlertMessage = styled.div`
    font-size: 0.8rem;
  color: #64748B;
`;

const AlertTime = styled.div`
  font-size: 0.75rem;
    color: #9CA3AF;
`;

// Add CSS animation for spinner
const spinnerStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const AdminDashboard = ({ user, onLogout }) => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 100,
    totalPolicies: 15,
    totalTrainings: 8,
    policyAckRate: 89,
    trainingCompletionRate: 85,
    pendingAcknowledgments: 23,
    recentPolicies: 5,
    recentUsers: 12,
    activeUsers: 90
  });

  const [auditLogs] = useState([
    {
      action: 'create',
      details: 'New policy "Data Protection Guidelines" created',
      userId: { name: 'Admin User' },
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      action: 'update',
      details: 'User profile updated for John Doe',
      userId: { name: 'Manager User' },
      timestamp: new Date(Date.now() - 7200000).toISOString()
    },
    {
      action: 'create',
      details: 'New training module "Security Awareness" added',
      userId: { name: 'Admin User' },
      timestamp: new Date(Date.now() - 10800000).toISOString()
    },
    {
      action: 'update',
      details: 'Policy acknowledgment completed by 15 users',
      userId: { name: 'System' },
      timestamp: new Date(Date.now() - 14400000).toISOString()
    },
    {
      action: 'create',
      details: 'New user account created for Jane Smith',
      userId: { name: 'Admin User' },
      timestamp: new Date(Date.now() - 18000000).toISOString()
    }
  ]);

  const [notifications] = useState([
    {
      title: 'Policy Update Required',
      message: '3 policies need to be reviewed and updated',
      type: 'warning',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      isRead: false
    },
    {
      title: 'Training Completion',
      message: 'Security Awareness training completed by 25 users',
      type: 'success',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      isRead: true
    },
    {
      title: 'New User Registration',
      message: '5 new users registered this week',
      type: 'info',
      createdAt: new Date(Date.now() - 10800000).toISOString(),
      isRead: true
    }
  ]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  // New sample data for enhanced components
  const [quickActions] = useState([
    {
      id: 1,
      title: 'Create User',
      description: 'Add new employee',
      icon: UserPlus,
      bgColor: '#EFF6FF',
      color: '#3B82F6',
      action: 'create-user'
    },
    {
      id: 2,
      title: 'New Policy',
      description: 'Draft security policy',
      icon: FileText,
      bgColor: '#F0FDF4',
      color: '#10B981',
      action: 'create-policy'
    },
    {
      id: 3,
      title: 'Schedule Training',
      description: 'Plan training session',
      icon: Calendar,
      bgColor: '#FEF3C7',
      color: '#F59E0B',
      action: 'schedule-training'
    },
    {
      id: 4,
      title: 'Generate Report',
      description: 'Create compliance report',
      icon: BarChart3,
      bgColor: '#F3E8FF',
      color: '#8B5CF6',
      action: 'generate-report'
    },
    {
      id: 5,
      title: 'System Backup',
      description: 'Backup system data',
      icon: Database,
      bgColor: '#FEE2E2',
      color: '#EF4444',
      action: 'backup-system'
    },
    {
      id: 6,
      title: 'Security Scan',
      description: 'Run security audit',
      icon: Shield,
      bgColor: '#ECFDF5',
      color: '#059669',
      action: 'security-scan'
    }
  ]);

  const [systemStatus] = useState([
    { label: 'Database Server', status: 'online', value: 'Connected' },
    { label: 'API Services', status: 'online', value: 'Running' },
    { label: 'File Storage', status: 'warning', value: '85% Full' },
    { label: 'Email Service', status: 'online', value: 'Active' },
    { label: 'Backup System', status: 'online', value: 'Scheduled' },
    { label: 'Security Monitor', status: 'online', value: 'Scanning' }
  ]);

  const [recentUsers] = useState([
    { name: 'Sarah Johnson', role: 'Manager', status: 'active', avatar: 'SJ', bgColor: '#EFF6FF', color: '#3B82F6' },
    { name: 'Mike Chen', role: 'Employee', status: 'active', avatar: 'MC', bgColor: '#F0FDF4', color: '#10B981' },
    { name: 'Emily Davis', role: 'Admin', status: 'active', avatar: 'ED', bgColor: '#FEF3C7', color: '#F59E0B' },
    { name: 'David Wilson', role: 'Employee', status: 'inactive', avatar: 'DW', bgColor: '#FEE2E2', color: '#EF4444' },
    { name: 'Lisa Brown', role: 'Manager', status: 'active', avatar: 'LB', bgColor: '#F3E8FF', color: '#8B5CF6' }
  ]);

  const [alerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Security Alert',
      message: 'Unauthorized access attempt detected',
      time: '5 min ago',
      icon: AlertTriangle
    },
    {
      id: 2,
      type: 'warning',
      title: 'Storage Warning',
      message: 'Database storage is 85% full',
      time: '1 hour ago',
      icon: HardDrive
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'New security patches available',
      time: '2 hours ago',
      icon: Info
    }
  ]);

  const [error, setError] = useState(null);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  // Handler functions for quick actions
  const handleQuickAction = (action) => {
    console.log('Quick action clicked:', action);
    switch (action) {
      case 'create-user':
        // Navigate to user management
        window.location.href = '/admin-users';
        break;
      case 'create-policy':
        // Navigate to policy creation
        window.location.href = '/policy-create';
        break;
      case 'schedule-training':
        // Navigate to training management
        window.location.href = '/my-training';
        break;
      case 'generate-report':
        // Navigate to reports
        window.location.href = '/admin-reports';
        break;
      case 'backup-system':
        setShowBackupModal(true);
        break;
      case 'security-scan':
        setShowSecurityModal(true);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        // First check user info to debug role issues
        const userInfoResponse = await fetch(`/api/dashboard/user-info?_t=${Date.now()}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          console.log('Current user info:', userInfo.user);
          
          // Check if user has admin role
          if (userInfo.user.role !== 'admin') {
            setError(`Access denied. User role: ${userInfo.user.role}. Admin role required. Please login with admin@ispm.com / admin123`);
            setLoading(false);
            return;
          }
    } else {
          console.warn('Failed to get user info:', userInfoResponse.status);
          const errorText = await userInfoResponse.text();
          console.error('User info error response:', errorText);
        }

        const response = await fetch(`/api/dashboard/admin/summary?_t=${Date.now()}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.success) {
            setDashboardData({
              totalUsers: data.data.totalUsers || 100,
              totalPolicies: data.data.totalPolicies || 15,
              totalTrainings: data.data.totalTrainings || 8,
              policyAckRate: data.data.policyAckRate || 89,
              trainingCompletionRate: data.data.trainingCompletionRate || 85,
              pendingAcknowledgments: data.data.pendingAcknowledgments || 23,
              recentPolicies: data.data.recentPolicies || 5,
              recentUsers: data.data.recentUsers || 12,
              activeUsers: data.data.activeUsers || 90
            });
          } else {
            // Use fallback data if API fails
            setDashboardData({
              totalUsers: 100,
              totalPolicies: 15,
              totalTrainings: 8,
              policyAckRate: 89,
              trainingCompletionRate: 85,
              pendingAcknowledgments: 23,
              recentPolicies: 5,
              recentUsers: 12,
              activeUsers: 90
            });
          }
        } else {
          console.warn('Dashboard API returned non-ok status:', response.status);
          const errorText = await response.text();
          console.error('Dashboard API error response:', errorText);
          
          if (response.status === 403) {
            setError(`Access denied (403). Please ensure you're logged in with admin credentials (admin@ispm.com / admin123)`);
          } else {
            setError(`API Error: ${response.status} - ${errorText}`);
          }
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]); // Add user dependency to re-fetch when user changes

  if (loading) {
  return (
    <Page>
        <Sidebar user={user} onLogout={onLogout} />
        <MainContent>
          <Container>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', color: '#64748B', marginBottom: '1rem' }}>Loading dashboard...</div>
                <div style={{ width: '40px', height: '40px', border: '4px solid #E2E8F0', borderTop: '4px solid #3B82F6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
              </div>
            </div>
          </Container>
        </MainContent>
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        <Sidebar user={user} onLogout={onLogout} />
        <MainContent>
          <Container>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', color: '#EF4444', marginBottom: '1rem' }}>Error: {error}</div>
                <button 
                  onClick={() => window.location.reload()} 
                  style={{ 
                    padding: '0.5rem 1rem', 
                    backgroundColor: '#3B82F6', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Retry
                </button>
              </div>
            </div>
          </Container>
        </MainContent>
      </Page>
    );
  }

  return (
    <Page>
      <style>{spinnerStyle}</style>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
              <HeaderLeft>
              <Greeting>Admin Dashboard</Greeting>
              <Subtext>Welcome back, {user?.name || 'Admin'}.</Subtext>
              </HeaderLeft>
            <HeaderRight>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginRight: '1rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1E293B' }}>
                    {user?.name || 'Admin'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    Admin
                  </div>
                </div>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
              </div>
              <ActionButton onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={16} />
              </ActionButton>
              <ActionButton onClick={onLogout} style={{ backgroundColor: '#EF4444', color: 'white' }}>
                <LogOut size={16} />
                Logout
              </ActionButton>
            </HeaderRight>
          </Header>

          {/* Enhanced Dashboard Layout */}
          <DashboardGrid>
            <MainDashboard>
              {/* Quick Actions */}
              <Section>
                <SectionHeader>
                  <SectionTitle>Quick Actions</SectionTitle>
                  <ActionButton>
                    <RefreshCw size={16} />
                    Refresh
                  </ActionButton>
                </SectionHeader>
                <QuickActionsGrid>
                  {quickActions.map((action) => {
                    const IconComponent = action.icon;
                    return (
                      <QuickActionCard key={action.id} onClick={() => handleQuickAction(action.action)}>
                        <QuickActionIcon bgColor={action.bgColor} color={action.color}>
                          <IconComponent size={24} />
                        </QuickActionIcon>
                        <QuickActionTitle>{action.title}</QuickActionTitle>
                        <QuickActionDescription>{action.description}</QuickActionDescription>
                      </QuickActionCard>
                    );
                  })}
                </QuickActionsGrid>
              </Section>

              {/* Key Metrics */}
              <StatsGrid>
                <StatCard trendColor="#3B82F6">
                  <StatHeader>
                    <StatIcon bgColor="#EFF6FF" color="#3B82F6">
                      <Users size={20} />
                    </StatIcon>
                    <StatTitle>Total Users</StatTitle>
                  </StatHeader>
                  <StatValue>{dashboardData?.totalUsers || 0}</StatValue>
                  <StatChange positive>
                    <TrendingUp size={14} />
                    +12 this month
                  </StatChange>
                </StatCard>

                <StatCard trendColor="#10B981">
                  <StatHeader>
                    <StatIcon bgColor="#F0FDF4" color="#10B981">
                      <FileText size={20} />
                    </StatIcon>
                    <StatTitle>Active Policies</StatTitle>
                  </StatHeader>
                  <StatValue>{dashboardData?.totalPolicies || 0}</StatValue>
                  <StatChange positive>
                    <TrendingUp size={14} />
                    +3 updated
                  </StatChange>
                </StatCard>

                <StatCard trendColor="#F59E0B">
                  <StatHeader>
                    <StatIcon bgColor="#FEF3C7" color="#F59E0B">
                      <BookOpen size={20} />
                    </StatIcon>
                    <StatTitle>Training Modules</StatTitle>
                  </StatHeader>
                  <StatValue>{dashboardData?.totalTrainings || 0}</StatValue>
                  <StatChange positive>
                    <TrendingUp size={14} />
                    +2 new
                  </StatChange>
                </StatCard>

                <StatCard trendColor="#8B5CF6">
                  <StatHeader>
                    <StatIcon bgColor="#F3E8FF" color="#8B5CF6">
                      <Shield size={20} />
                    </StatIcon>
                    <StatTitle>Security Score</StatTitle>
                  </StatHeader>
                  <StatValue>92</StatValue>
                  <StatChange positive>
                    <TrendingUp size={14} />
                    +2 points
                  </StatChange>
                </StatCard>
              </StatsGrid>

              {/* Recent Activity Section */}
              <ActivitySection>
                <SectionHeader>
                  <SectionTitle>Recent Activity</SectionTitle>
                  <ActionButton>
                    <History size={16} />
                    View All
                  </ActionButton>
                </SectionHeader>

                <ActivityList>
                  {auditLogs.slice(0, 5).map((log, index) => (
                    <ActivityItem key={index}>
                      <ActivityIcon action={log.action}>
                        {log.action.charAt(0).toUpperCase()}
                      </ActivityIcon>
                      <ActivityContent>
                        <ActivityText>{log.details}</ActivityText>
                        <ActivityTime>
                          {log.userId?.name || 'System'} • {new Date(log.timestamp).toLocaleString()}
                        </ActivityTime>
                      </ActivityContent>
                    </ActivityItem>
                  ))}
                </ActivityList>
              </ActivitySection>
            </MainDashboard>

            <SidebarDashboard>
              {/* System Status */}
              <SystemStatusCard>
                <SystemStatusHeader>
                  <Server size={20} color="#3B82F6" />
                  <SystemStatusTitle>System Status</SystemStatusTitle>
                </SystemStatusHeader>
                {systemStatus.map((item, index) => (
                  <SystemStatusItem key={index}>
                    <SystemStatusLabel>
                      <StatusDot status={item.status} />
                      {item.label}
                    </SystemStatusLabel>
                    <SystemStatusValue status={item.status}>
                      {item.value}
                    </SystemStatusValue>
                  </SystemStatusItem>
                ))}
              </SystemStatusCard>

              {/* Recent Users */}
              <RecentUsersCard>
                <SectionHeader>
                  <SectionTitle>Recent Users</SectionTitle>
                  <ActionButton>
                    <Users size={16} />
                    View All
                  </ActionButton>
                </SectionHeader>
                {recentUsers.map((user, index) => (
                  <UserItem key={index}>
                    <UserAvatar bgColor={user.bgColor} color={user.color}>
                      {user.avatar}
                    </UserAvatar>
                    <UserInfo>
                      <UserName>{user.name}</UserName>
                      <UserRole>{user.role}</UserRole>
                    </UserInfo>
                    <UserStatus status={user.status}>
                      {user.status === 'active' ? 'Online' : 'Offline'}
                    </UserStatus>
                  </UserItem>
                ))}
              </RecentUsersCard>

              {/* Alerts Panel */}
              <AlertsPanel>
                <SectionHeader>
                  <SectionTitle>System Alerts</SectionTitle>
                  <ActionButton>
                    <Bell size={16} />
                    Manage
                  </ActionButton>
                </SectionHeader>
                {alerts.map((alert) => {
                  const IconComponent = alert.icon;
                  return (
                    <AlertItem key={alert.id} type={alert.type}>
                      <AlertIcon type={alert.type}>
                        <IconComponent size={16} />
                      </AlertIcon>
                      <AlertContent>
                        <AlertTitle>{alert.title}</AlertTitle>
                        <AlertMessage>{alert.message}</AlertMessage>
                        <AlertTime>{alert.time}</AlertTime>
                      </AlertContent>
                    </AlertItem>
                  );
                })}
              </AlertsPanel>
            </SidebarDashboard>
          </DashboardGrid>
        </Container>
      </MainContent>

      {/* Notifications Panel */}
      <NotificationsPanel $isOpen={showNotifications}>
        <NotificationsHeader>
          <NotificationsTitle>Notifications</NotificationsTitle>
          <CloseButton onClick={() => setShowNotifications(false)}>
            <X size={20} />
          </CloseButton>
        </NotificationsHeader>
        <NotificationsBody>
          {notifications.map((notification, index) => (
            <NotificationItem key={index} type={notification.type}>
              <NotificationTitle>{notification.title}</NotificationTitle>
              <NotificationMessage>{notification.message}</NotificationMessage>
              <NotificationTime>
                {new Date(notification.createdAt).toLocaleString()}
              </NotificationTime>
            </NotificationItem>
          ))}
        </NotificationsBody>
      </NotificationsPanel>

      {/* System Backup Modal */}
      {showBackupModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #E2E8F0'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#3B82F6',
                margin: 0
              }}>System Backup</h2>
              <button
                onClick={() => setShowBackupModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#64748B'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1E293B', marginBottom: '0.5rem' }}>
                  Backup Configuration
                </h3>
                <div style={{ color: '#64748B', marginBottom: '1rem' }}>
                  Configure and initiate a full system backup including all user data, policies, and system settings.
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Backup Type
                </label>
                <select style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  background: 'white'
                }}>
                  <option>Full System Backup</option>
                  <option>Database Only</option>
                  <option>User Data Only</option>
                  <option>Policies & Settings</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Storage Location
                </label>
                <select style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  background: 'white'
                }}>
                  <option>Local Server Storage</option>
                  <option>Cloud Storage (AWS S3)</option>
                  <option>External Drive</option>
                  <option>Network Storage</option>
                </select>
              </div>

              <div style={{
                background: '#F0FDF4',
                border: '1px solid #D1FAE5',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <CheckCircle size={16} color="#059669" />
                  <span style={{ fontWeight: '600', color: '#059669' }}>Estimated Size: 2.3 GB</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#047857' }}>
                  Estimated time: 15-20 minutes
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowBackupModal(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#F3F4F6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowBackupModal(false);
                  alert('Backup initiated successfully!');
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#3B82F6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Start Backup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Security Scan Modal */}
      {showSecurityModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #E2E8F0'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#3B82F6',
                margin: 0
              }}>Security Scan</h2>
              <button
                onClick={() => setShowSecurityModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#64748B'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1E293B', marginBottom: '0.5rem' }}>
                  Security Scan Configuration
                </h3>
                <div style={{ color: '#64748B', marginBottom: '1rem' }}>
                  Run a comprehensive security audit to identify potential vulnerabilities and compliance issues.
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Scan Type
                </label>
                <select style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  background: 'white'
                }}>
                  <option>Full Security Audit</option>
                  <option>Vulnerability Scan</option>
                  <option>Compliance Check</option>
                  <option>Access Control Review</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                  Scan Scope
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" defaultChecked />
                    <span>User Access Controls</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Data Encryption</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Network Security</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" defaultChecked />
                    <span>Policy Compliance</span>
                  </label>
                </div>
              </div>

              <div style={{
                background: '#FEF3C7',
                border: '1px solid #FDE68A',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <AlertTriangle size={16} color="#D97706" />
                  <span style={{ fontWeight: '600', color: '#D97706' }}>Last Scan: 3 days ago</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#92400E' }}>
                  Found 2 medium-risk issues
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowSecurityModal(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#F3F4F6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSecurityModal(false);
                  alert('Security scan initiated successfully!');
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#EF4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Start Scan
              </button>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

export default AdminDashboard;