import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Building,
  MoreVertical,
  Settings,
  UserCheck,
  UserX,
  Crown,
  Award,
  TrendingUp,
  Activity
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
    background: #3B82F6;
    color: white;
    
    &:hover {
      background: #2563EB;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
    }
  }

  &.secondary {
    background: #6B7280;
    color: white;
    
    &:hover {
      background: #4B5563;
      transform: translateY(-1px);
    }
  }

  &.success {
    background: #10B981;
    color: white;
    
    &:hover {
      background: #059669;
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

const UserProfileInfo = styled.div`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.bgColor || 'linear-gradient(135deg, #3B82F6, #1D4ED8)'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 1rem;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #6B7280;
  font-weight: 500;
  font-size: 0.9rem;
`;

const FiltersSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
  
  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    font-size: 0.9rem;
    
    &:focus {
      outline: none;
      border-color: #3B82F6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }
  
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9CA3AF;
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  min-width: 150px;
`;

const UsersTable = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #F8FAFC;
  border-bottom: 1px solid #E5E7EB;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background: #F9FAFB;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.bgColor || 'linear-gradient(135deg, #3B82F6, #1D4ED8)'};
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
  color: #1F2937;
  margin-bottom: 0.25rem;
`;

const UserEmail = styled.div`
  font-size: 0.8rem;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const RoleBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => 
    props.role === 'admin' ? '#FEE2E2' : 
    props.role === 'manager' ? '#FEF3C7' : '#D1FAE5'
  };
  color: ${props => 
    props.role === 'admin' ? '#DC2626' : 
    props.role === 'manager' ? '#92400E' : '#065F46'
  };
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.status === 'active' ? '#D1FAE5' : '#FEE2E2'};
  color: ${props => props.status === 'active' ? '#065F46' : '#DC2626'};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #F3F4F6;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #1D4ED8);
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const ActionButton = styled.button`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &.primary {
    background: #3B82F6;
    color: white;
    
    &:hover {
      background: #2563EB;
    }
  }

  &.success {
    background: #10B981;
    color: white;
    
    &:hover {
      background: #059669;
    }
  }

  &.warning {
    background: #F59E0B;
    color: white;
    
    &:hover {
      background: #D97706;
    }
  }

  &.danger {
    background: #EF4444;
    color: white;
    
    &:hover {
      background: #DC2626;
    }
  }

  &.secondary {
    background: #6B7280;
    color: white;
    
    &:hover {
      background: #4B5563;
    }
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const DepartmentBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  background: #F3F4F6;
  color: #374151;
`;

export default function UserManagement({ user, onLogout }) {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@ispm.com',
      role: 'admin',
      status: 'active',
      department: 'IT Security',
      position: 'System Administrator',
      lastLogin: '2025-01-22',
      trainingProgress: 100,
      phone: '+1-555-0101',
      location: 'New York, NY',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Manager Smith',
      email: 'manager@ispm.com',
      role: 'manager',
      status: 'active',
      department: 'Human Resources',
      position: 'HR Manager',
      lastLogin: '2025-01-22',
      trainingProgress: 95,
      phone: '+1-555-0102',
      location: 'Los Angeles, CA',
      joinDate: '2024-02-01'
    },
    {
      id: 3,
      name: 'John Employee',
      email: 'employee@ispm.com',
      role: 'employee',
      status: 'active',
      department: 'Engineering',
      position: 'Software Developer',
      lastLogin: '2025-01-21',
      trainingProgress: 85,
      phone: '+1-555-0103',
      location: 'Chicago, IL',
      joinDate: '2024-03-15'
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@ispm.com',
      role: 'employee',
      status: 'active',
      department: 'Marketing',
      position: 'Marketing Specialist',
      lastLogin: '2025-01-22',
      trainingProgress: 92,
      phone: '+1-555-0104',
      location: 'Miami, FL',
      joinDate: '2024-04-01'
    },
    {
      id: 5,
      name: 'Mike Wilson',
      email: 'mike.wilson@ispm.com',
      role: 'manager',
      status: 'active',
      department: 'Finance',
      position: 'Finance Manager',
      lastLogin: '2025-01-21',
      trainingProgress: 88,
      phone: '+1-555-0105',
      location: 'Seattle, WA',
      joinDate: '2024-02-15'
    },
    {
      id: 6,
      name: 'Jane Doe',
      email: 'jane.doe@ispm.com',
      role: 'employee',
      status: 'inactive',
      department: 'Sales',
      position: 'Sales Representative',
      lastLogin: '2025-01-15',
      trainingProgress: 65,
      phone: '+1-555-0106',
      location: 'Boston, MA',
      joinDate: '2024-05-01'
    },
    {
      id: 7,
      name: 'David Rodriguez',
      email: 'david.rodriguez@ispm.com',
      role: 'employee',
      status: 'active',
      department: 'IT Operations',
      position: 'DevOps Engineer',
      lastLogin: '2025-01-22',
      trainingProgress: 78,
      phone: '+1-555-0107',
      location: 'Austin, TX',
      joinDate: '2024-06-01'
    },
    {
      id: 8,
      name: 'Lisa Park',
      email: 'lisa.park@ispm.com',
      role: 'employee',
      status: 'active',
      department: 'Legal',
      position: 'Legal Counsel',
      lastLogin: '2025-01-22',
      trainingProgress: 96,
      phone: '+1-555-0108',
      location: 'San Francisco, CA',
      joinDate: '2024-03-01'
    },
    {
      id: 9,
      name: 'Alex Thompson',
      email: 'alex.thompson@ispm.com',
      role: 'manager',
      status: 'active',
      department: 'Engineering',
      position: 'Engineering Manager',
      lastLogin: '2025-01-21',
      trainingProgress: 91,
      phone: '+1-555-0109',
      location: 'Denver, CO',
      joinDate: '2024-01-20'
    },
    {
      id: 10,
      name: 'Emma Wilson',
      email: 'emma.wilson@ispm.com',
      role: 'employee',
      status: 'active',
      department: 'Customer Success',
      position: 'Customer Success Manager',
      lastLogin: '2025-01-22',
      trainingProgress: 87,
      phone: '+1-555-0110',
      location: 'Portland, OR',
      joinDate: '2024-04-15'
    },
    {
      id: 11,
      name: 'James Miller',
      email: 'james.miller@ispm.com',
      role: 'employee',
      status: 'active',
      department: 'Operations',
      position: 'Operations Analyst',
      lastLogin: '2025-01-21',
      trainingProgress: 73,
      phone: '+1-555-0111',
      location: 'Phoenix, AZ',
      joinDate: '2024-07-01'
    },
    {
      id: 12,
      name: 'Rachel Green',
      email: 'rachel.green@ispm.com',
      role: 'manager',
      status: 'active',
      department: 'Marketing',
      position: 'Marketing Manager',
      lastLogin: '2025-01-22',
      trainingProgress: 94,
      phone: '+1-555-0112',
      location: 'Nashville, TN',
      joinDate: '2024-02-20'
    },
    {
      id: 13,
      name: 'Kevin Lee',
      email: 'kevin.lee@ispm.com',
      role: 'employee',
      status: 'active',
      department: 'IT Operations',
      position: 'System Administrator',
      lastLogin: '2025-01-21',
      trainingProgress: 89,
      phone: '+1-555-0113',
      location: 'Las Vegas, NV',
      joinDate: '2024-08-01'
    },
    {
      id: 14,
      name: 'Maria Garcia',
      email: 'maria.garcia@ispm.com',
      role: 'employee',
      status: 'active',
      department: 'Finance',
      position: 'Financial Analyst',
      lastLogin: '2025-01-22',
      trainingProgress: 82,
      phone: '+1-555-0114',
      location: 'San Diego, CA',
      joinDate: '2024-05-15'
    },
    {
      id: 15,
      name: 'Tom Anderson',
      email: 'tom.anderson@ispm.com',
      role: 'employee',
      status: 'inactive',
      department: 'Sales',
      position: 'Account Executive',
      lastLogin: '2025-01-10',
      trainingProgress: 45,
      phone: '+1-555-0115',
      location: 'Dallas, TX',
      joinDate: '2024-09-01'
    },
    {
      id: 16,
      name: 'Sophie Chen',
      email: 'sophie.chen@ispm.com',
      role: 'employee',
      status: 'active',
      department: 'Engineering',
      position: 'Frontend Developer',
      lastLogin: '2025-01-22',
      trainingProgress: 76,
      phone: '+1-555-0116',
      location: 'Atlanta, GA',
      joinDate: '2024-06-15'
    },
    {
      id: 17,
      name: 'Robert Taylor',
      email: 'robert.taylor@ispm.com',
      role: 'employee',
      status: 'active',
      department: 'Customer Success',
      position: 'Support Specialist',
      lastLogin: '2025-01-21',
      trainingProgress: 68,
      phone: '+1-555-0117',
      location: 'Minneapolis, MN',
      joinDate: '2024-10-01'
    },
    {
      id: 18,
      name: 'Jessica Brown',
      email: 'jessica.brown@ispm.com',
      role: 'employee',
      status: 'active',
      department: 'HR',
      position: 'HR Specialist',
      lastLogin: '2025-01-22',
      trainingProgress: 93,
      phone: '+1-555-0118',
      location: 'Orlando, FL',
      joinDate: '2024-03-20'
    },
    {
      id: 19,
      name: 'Michael Davis',
      email: 'michael.davis@ispm.com',
      role: 'manager',
      status: 'active',
      department: 'Sales',
      position: 'Sales Manager',
      lastLogin: '2025-01-21',
      trainingProgress: 90,
      phone: '+1-555-0119',
      location: 'Houston, TX',
      joinDate: '2024-01-25'
    },
    {
      id: 20,
      name: 'Amanda White',
      email: 'amanda.white@ispm.com',
      role: 'employee',
      status: 'active',
      department: 'Legal',
      position: 'Paralegal',
      lastLogin: '2025-01-22',
      trainingProgress: 81,
      phone: '+1-555-0120',
      location: 'Philadelphia, PA',
      joinDate: '2024-11-01'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || user.department === filterDepartment;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    admins: users.filter(u => u.role === 'admin').length,
    managers: users.filter(u => u.role === 'manager').length,
    employees: users.filter(u => u.role === 'employee').length,
    avgTrainingProgress: Math.round(users.reduce((sum, u) => sum + u.trainingProgress, 0) / users.length)
  };

  const departments = [...new Set(users.map(u => u.department))];

  const handleToggleStatus = (id) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ));
    alert('User status updated successfully!');
  };

  const handleChangeRole = (id, newRole) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, role: newRole } : u
    ));
    alert('User role updated successfully!');
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
      alert('User deleted successfully!');
    }
  };

  const handleViewProfile = (user) => {
    alert(`Viewing profile for: ${user.name}\n\nEmail: ${user.email}\nRole: ${user.role}\nDepartment: ${user.department}\nPosition: ${user.position}\nPhone: ${user.phone}\nLocation: ${user.location}\nJoin Date: ${user.joinDate}\nLast Login: ${user.lastLogin}\nTraining Progress: ${user.trainingProgress}%`);
  };

  const handleSendEmail = (user) => {
    alert(`Sending email to: ${user.name} (${user.email})\n\nThis would open the default email client with a new message addressed to ${user.email}.`);
  };

  const getAvatarColor = (name) => {
    const colors = [
      'linear-gradient(135deg, #3B82F6, #1D4ED8)',
      'linear-gradient(135deg, #10B981, #059669)',
      'linear-gradient(135deg, #F59E0B, #D97706)',
      'linear-gradient(135deg, #EF4444, #DC2626)',
      'linear-gradient(135deg, #8B5CF6, #7C3AED)',
      'linear-gradient(135deg, #06B6D4, #0891B2)',
      'linear-gradient(135deg, #84CC16, #65A30D)',
      'linear-gradient(135deg, #F97316, #EA580C)'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
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
                  <Users size={24} />
                  User Management
                </h1>
                <p>Manage user accounts, roles, and permissions across your organization</p>
              </HeaderLeft>
              <HeaderActions>
                <ActionBtn className="primary">
                  <UserPlus size={16} />
                  Add User
                </ActionBtn>
                <ActionBtn className="secondary">
                  <Upload size={16} />
                  Import
                </ActionBtn>
                <ActionBtn className="success">
                  <Download size={16} />
                  Export
                </ActionBtn>
              </HeaderActions>
            </HeaderContent>
            
            <UserProfile>
              <UserAvatar>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </UserAvatar>
              <UserProfileInfo>
                <UserDisplayName>{user?.name || 'Admin'}</UserDisplayName>
                <UserRole>User Manager</UserRole>
              </UserProfileInfo>
              <LogoutButton onClick={() => {
                onLogout();
              }}>
                Logout
              </LogoutButton>
            </UserProfile>
          </Header>

          <StatsGrid>
            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #3B82F6, #1D4ED8)">
                <Users size={20} />
              </StatIcon>
              <StatNumber>{stats.total}</StatNumber>
              <StatLabel>Total Users</StatLabel>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #10B981, #059669)">
                <CheckCircle size={20} />
              </StatIcon>
              <StatNumber>{stats.active}</StatNumber>
              <StatLabel>Active Users</StatLabel>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #EF4444, #DC2626)">
                <Crown size={20} />
              </StatIcon>
              <StatNumber>{stats.admins}</StatNumber>
              <StatLabel>Administrators</StatLabel>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #F59E0B, #D97706)">
                <Award size={20} />
              </StatIcon>
              <StatNumber>{stats.managers}</StatNumber>
              <StatLabel>Managers</StatLabel>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #8B5CF6, #7C3AED)">
                <TrendingUp size={20} />
              </StatIcon>
              <StatNumber>{stats.avgTrainingProgress}%</StatNumber>
              <StatLabel>Avg Training</StatLabel>
            </StatCard>
          </StatsGrid>

          <FiltersSection>
            <SearchBox>
              <Search size={20} />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBox>
            
            <FilterSelect
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </FilterSelect>
            
            <FilterSelect
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FilterSelect>

            <FilterSelect
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </FilterSelect>
          </FiltersSection>

          <UsersTable>
            <TableHeader>
              <div>User</div>
              <div>Role</div>
              <div>Department</div>
              <div>Status</div>
              <div>Last Login</div>
              <div>Training</div>
              <div>Actions</div>
            </TableHeader>
            
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <UserInfoContainer>
                  <Avatar bgColor={getAvatarColor(user.name)}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <UserDetails>
                    <UserName>{user.name}</UserName>
                    <UserEmail>
                      <Mail size={12} />
                      {user.email}
                    </UserEmail>
                  </UserDetails>
                </UserInfoContainer>
                
                <RoleBadge role={user.role}>
                  <Shield size={12} />
                  {user.role}
                </RoleBadge>
                
                <DepartmentBadge>{user.department}</DepartmentBadge>
                
                <StatusBadge status={user.status}>
                  {user.status === 'active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                  {user.status}
                </StatusBadge>
                
                <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                  {user.lastLogin}
                </div>
                
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280', marginBottom: '0.25rem' }}>
                    {user.trainingProgress}%
                  </div>
                  <ProgressBar>
                    <ProgressFill percentage={user.trainingProgress} />
                  </ProgressBar>
                </div>
                
                <ActionsContainer>
                  <ActionButton className="secondary" onClick={() => handleViewProfile(user)}>
                    <Eye size={12} />
                    View
                  </ActionButton>
                  <ActionButton className="primary">
                    <Edit size={12} />
                    Edit
                  </ActionButton>
                  <ActionButton className="success" onClick={() => handleSendEmail(user)}>
                    <Mail size={12} />
                    Email
                  </ActionButton>
                  <ActionButton 
                    className={user.status === 'active' ? 'warning' : 'success'} 
                    onClick={() => handleToggleStatus(user.id)}
                  >
                    {user.status === 'active' ? <UserX size={12} /> : <UserCheck size={12} />}
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </ActionButton>
                  <ActionButton className="danger" onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 size={12} />
                    Delete
                  </ActionButton>
                </ActionsContainer>
              </TableRow>
            ))}
          </UsersTable>
        </Container>
      </MainContent>
    </Page>
  );
}