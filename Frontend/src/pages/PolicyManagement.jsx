import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Upload, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  User,
  Shield,
  Lock,
  Globe,
  Settings,
  BarChart3,
  Send,
  Copy,
  Archive,
  Star,
  TrendingUp,
  FileCheck,
  UserCheck,
  Bell
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

const PoliciesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const PolicyCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const PolicyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  margin-top: 2.5rem;
`;

const PolicyTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
`;

const PolicyStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => 
    props.status === 'active' ? '#D1FAE5' : 
    props.status === 'draft' ? '#FEF3C7' : 
    props.status === 'expired' ? '#FEE2E2' : '#EFF6FF'
  };
  color: ${props => 
    props.status === 'active' ? '#065F46' : 
    props.status === 'draft' ? '#92400E' : 
    props.status === 'expired' ? '#DC2626' : '#1E40AF'
  };
`;

const PolicyDescription = styled.p`
  color: #6B7280;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const PolicyMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #6B7280;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CategoryBadge = styled.span`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #F3F4F6;
  color: #374151;
  z-index: 1;
`;

const PriorityBadge = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => 
    props.priority === 'high' ? '#FEE2E2' : 
    props.priority === 'medium' ? '#FEF3C7' : '#D1FAE5'
  };
  color: ${props => 
    props.priority === 'high' ? '#DC2626' : 
    props.priority === 'medium' ? '#92400E' : '#065F46'
  };
  z-index: 1;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #F3F4F6;
  border-radius: 3px;
  overflow: hidden;
  margin: 0.75rem 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #10B981, #059669);
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const PolicyActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
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

  &.warning {
    background: #F59E0B;
    color: white;
    
    &:hover {
      background: #D97706;
    }
  }
`;

const CreatePolicyModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6B7280;
  cursor: pointer;
  padding: 0.25rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export default function PolicyManagement({ user, onLogout }) {
  const [policies, setPolicies] = useState([
    {
      id: 1,
      title: 'Information Security Policy',
      description: 'Comprehensive policy covering data protection, access controls, and security incident response procedures.',
      status: 'active',
      category: 'Security',
      priority: 'high',
      version: '2.1',
      lastUpdated: '2025-01-20',
      nextReview: '2025-04-20',
      totalUsers: 120,
      acknowledgedUsers: 95,
      createdBy: 'Sarah Johnson',
      department: 'IT Security'
    },
    {
      id: 2,
      title: 'Remote Work Policy',
      description: 'Guidelines for remote work arrangements, security requirements, and productivity expectations.',
      status: 'active',
      category: 'HR',
      priority: 'medium',
      version: '1.3',
      lastUpdated: '2025-01-18',
      nextReview: '2025-04-18',
      totalUsers: 85,
      acknowledgedUsers: 78,
      createdBy: 'Michael Chen',
      department: 'Human Resources'
    },
    {
      id: 3,
      title: 'Data Privacy Policy',
      description: 'Policy governing the collection, use, and protection of personal data in compliance with GDPR.',
      status: 'active',
      category: 'Compliance',
      priority: 'high',
      version: '3.0',
      lastUpdated: '2025-01-15',
      nextReview: '2025-04-15',
      totalUsers: 150,
      acknowledgedUsers: 142,
      createdBy: 'Lisa Park',
      department: 'Legal'
    },
    {
      id: 4,
      title: 'Acceptable Use Policy',
      description: 'Guidelines for appropriate use of company IT resources, including email, internet, and software.',
      status: 'active',
      category: 'IT',
      priority: 'medium',
      version: '2.2',
      lastUpdated: '2025-01-12',
      nextReview: '2025-04-12',
      totalUsers: 200,
      acknowledgedUsers: 189,
      createdBy: 'David Rodriguez',
      department: 'IT Operations'
    },
    {
      id: 5,
      title: 'Password Security Policy',
      description: 'Requirements for password creation, management, and multi-factor authentication implementation.',
      status: 'active',
      category: 'Security',
      priority: 'high',
      version: '1.5',
      lastUpdated: '2025-01-10',
      nextReview: '2025-04-10',
      totalUsers: 200,
      acknowledgedUsers: 195,
      createdBy: 'Alex Thompson',
      department: 'IT Security'
    },
    {
      id: 6,
      title: 'Social Media Policy',
      description: 'Guidelines for employee use of social media platforms and representation of the company online.',
      status: 'active',
      category: 'HR',
      priority: 'low',
      version: '1.2',
      lastUpdated: '2025-01-08',
      nextReview: '2025-04-08',
      totalUsers: 180,
      acknowledgedUsers: 165,
      createdBy: 'Emma Wilson',
      department: 'Marketing'
    },
    {
      id: 7,
      title: 'Business Continuity Policy',
      description: 'Procedures for maintaining business operations during emergencies and disaster recovery planning.',
      status: 'draft',
      category: 'Operations',
      priority: 'medium',
      version: '1.0',
      lastUpdated: '2025-01-05',
      nextReview: '2025-04-05',
      totalUsers: 0,
      acknowledgedUsers: 0,
      createdBy: 'James Miller',
      department: 'Operations'
    },
    {
      id: 8,
      title: 'Code of Conduct',
      description: 'Standards of behavior and ethical guidelines for all employees and stakeholders.',
      status: 'active',
      category: 'HR',
      priority: 'high',
      version: '4.1',
      lastUpdated: '2025-01-03',
      nextReview: '2025-04-03',
      totalUsers: 200,
      acknowledgedUsers: 200,
      createdBy: 'Rachel Green',
      department: 'Human Resources'
    },
    {
      id: 9,
      title: 'Software Licensing Policy',
      description: 'Guidelines for software procurement, licensing compliance, and asset management.',
      status: 'active',
      category: 'IT',
      priority: 'medium',
      version: '2.0',
      lastUpdated: '2025-01-01',
      nextReview: '2025-04-01',
      totalUsers: 75,
      acknowledgedUsers: 68,
      createdBy: 'Kevin Lee',
      department: 'IT Operations'
    },
    {
      id: 10,
      title: 'Travel and Expense Policy',
      description: 'Guidelines for business travel, expense reporting, and reimbursement procedures.',
      status: 'active',
      category: 'Finance',
      priority: 'low',
      version: '1.8',
      lastUpdated: '2024-12-28',
      nextReview: '2025-03-28',
      totalUsers: 160,
      acknowledgedUsers: 148,
      createdBy: 'Maria Garcia',
      department: 'Finance'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [newPolicy, setNewPolicy] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    department: ''
  });

  const categories = ['Security', 'HR', 'Compliance', 'IT', 'Operations', 'Finance', 'Legal', 'Marketing'];
  const priorities = ['high', 'medium', 'low'];
  const departments = ['IT Security', 'Human Resources', 'Legal', 'IT Operations', 'Marketing', 'Operations', 'Finance'];

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || policy.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || policy.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || policy.priority === filterPriority;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const stats = {
    totalPolicies: policies.length,
    activePolicies: policies.filter(p => p.status === 'active').length,
    totalUsers: policies.reduce((sum, p) => sum + p.totalUsers, 0),
    acknowledgmentRate: policies.length > 0 ? 
      Math.round(policies.reduce((sum, p) => sum + (p.totalUsers > 0 ? (p.acknowledgedUsers / p.totalUsers) * 100 : 0), 0) / policies.length) : 0
  };

  const handleCreatePolicy = (e) => {
    e.preventDefault();
    const policy = {
      id: policies.length + 1,
      ...newPolicy,
      status: 'draft',
      version: '1.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalUsers: 0,
      acknowledgedUsers: 0,
      createdBy: user?.name || 'Admin'
    };
    setPolicies([...policies, policy]);
    setNewPolicy({ title: '', description: '', category: '', priority: '', department: '' });
    setShowCreateModal(false);
    alert('Policy created successfully!');
  };

  const handleDeletePolicy = (id) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      setPolicies(policies.filter(policy => policy.id !== id));
      alert('Policy deleted successfully!');
    }
  };

  const handlePublishPolicy = (id) => {
    setPolicies(policies.map(policy => 
      policy.id === id ? { ...policy, status: 'active' } : policy
    ));
    alert('Policy published successfully!');
  };

  const handleArchivePolicy = (id) => {
    setPolicies(policies.map(policy => 
      policy.id === id ? { ...policy, status: 'expired' } : policy
    ));
    alert('Policy archived successfully!');
  };

  const handleSendReminder = (id) => {
    const policy = policies.find(p => p.id === id);
    alert(`Sending reminder for policy: ${policy.title}\n\nThis would send notifications to ${policy.totalUsers - policy.acknowledgedUsers} users who haven't acknowledged the policy yet.`);
  };

  const handleDuplicatePolicy = (id) => {
    const policy = policies.find(p => p.id === id);
    const duplicatedPolicy = {
      ...policy,
      id: policies.length + 1,
      title: `${policy.title} (Copy)`,
      status: 'draft',
      version: '1.0',
      lastUpdated: new Date().toISOString().split('T')[0],
      nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalUsers: 0,
      acknowledgedUsers: 0
    };
    setPolicies([...policies, duplicatedPolicy]);
    alert('Policy duplicated successfully!');
  };

  const handleExportPolicy = (id) => {
    const policy = policies.find(p => p.id === id);
    alert(`Exporting policy: ${policy.title}\n\nThis would generate:\n- Policy document (PDF)\n- Acknowledgment report\n- Compliance metrics\n- Review schedule`);
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
                  <FileText size={24} />
                  Policy Management
                </h1>
                <p>Create, manage, and track organizational policies and compliance</p>
              </HeaderLeft>
              <HeaderActions>
                <ActionBtn className="primary" onClick={() => setShowCreateModal(true)}>
                  <Plus size={16} />
                  Create Policy
                </ActionBtn>
                <ActionBtn className="secondary">
                  <Upload size={16} />
                  Import
                </ActionBtn>
                <ActionBtn className="success">
                  <Download size={16} />
                  Export All
                </ActionBtn>
              </HeaderActions>
            </HeaderContent>
            
            <UserProfile>
              <UserAvatar>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </UserAvatar>
              <UserInfo>
                <UserDisplayName>{user?.name || 'Admin'}</UserDisplayName>
                <UserRole>Policy Manager</UserRole>
              </UserInfo>
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
                <FileText size={20} />
              </StatIcon>
              <StatNumber>{stats.totalPolicies}</StatNumber>
              <StatLabel>Total Policies</StatLabel>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #10B981, #059669)">
                <CheckCircle size={20} />
              </StatIcon>
              <StatNumber>{stats.activePolicies}</StatNumber>
              <StatLabel>Active Policies</StatLabel>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #F59E0B, #D97706)">
                <Users size={20} />
              </StatIcon>
              <StatNumber>{stats.totalUsers}</StatNumber>
              <StatLabel>Total Users</StatLabel>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #8B5CF6, #7C3AED)">
                <TrendingUp size={20} />
              </StatIcon>
              <StatNumber>{stats.acknowledgmentRate}%</StatNumber>
              <StatLabel>Acknowledgment Rate</StatLabel>
            </StatCard>
          </StatsGrid>

          <FiltersSection>
            <SearchBox>
              <Search size={20} />
              <input
                type="text"
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBox>
            
            <FilterSelect
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FilterSelect>
            
            <FilterSelect
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="expired">Expired</option>
            </FilterSelect>

            <FilterSelect
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </FilterSelect>
          </FiltersSection>

          <PoliciesGrid>
            {filteredPolicies.map(policy => (
              <PolicyCard key={policy.id}>
                <PriorityBadge priority={policy.priority}>{policy.priority}</PriorityBadge>
                <CategoryBadge>{policy.category}</CategoryBadge>
                
                <PolicyHeader>
                  <PolicyTitle>{policy.title}</PolicyTitle>
                  <PolicyStatus status={policy.status}>{policy.status}</PolicyStatus>
                </PolicyHeader>
                
                <PolicyDescription>{policy.description}</PolicyDescription>
                
                <PolicyMeta>
                  <MetaItem>
                    <Clock size={14} />
                    <span>v{policy.version}</span>
                  </MetaItem>
                  <MetaItem>
                    <User size={14} />
                    <span>{policy.createdBy}</span>
                  </MetaItem>
                </PolicyMeta>
                
                <PolicyMeta>
                  <MetaItem>
                    <Calendar size={14} />
                    <span>Updated: {policy.lastUpdated}</span>
                  </MetaItem>
                  <MetaItem>
                    <Calendar size={14} />
                    <span>Review: {policy.nextReview}</span>
                  </MetaItem>
                </PolicyMeta>
                
                <PolicyMeta>
                  <MetaItem>
                    <Users size={14} />
                    <span>{policy.totalUsers} users</span>
                  </MetaItem>
                  <MetaItem>
                    <CheckCircle size={14} />
                    <span>{policy.acknowledgedUsers} acknowledged</span>
                  </MetaItem>
                </PolicyMeta>

                {policy.totalUsers > 0 && (
                  <>
                    <ProgressBar>
                      <ProgressFill 
                        percentage={(policy.acknowledgedUsers / policy.totalUsers) * 100} 
                      />
                    </ProgressBar>
                    <PolicyMeta>
                      <span>Acknowledgment Rate: {Math.round((policy.acknowledgedUsers / policy.totalUsers) * 100)}%</span>
                    </PolicyMeta>
                  </>
                )}
                
                <PolicyActions>
                  <ActionButton className="primary">
                    <Edit size={14} />
                    Edit
                  </ActionButton>
                  <ActionButton className="secondary">
                    <Eye size={14} />
                    View
                  </ActionButton>
                  {policy.status === 'draft' && (
                    <ActionButton className="success" onClick={() => handlePublishPolicy(policy.id)}>
                      <Send size={14} />
                      Publish
                    </ActionButton>
                  )}
                  {policy.status === 'active' && (
                    <ActionButton className="warning" onClick={() => handleSendReminder(policy.id)}>
                      <Bell size={14} />
                      Remind
                    </ActionButton>
                  )}
                  <ActionButton className="secondary" onClick={() => handleDuplicatePolicy(policy.id)}>
                    <Copy size={14} />
                    Duplicate
                  </ActionButton>
                  <ActionButton className="secondary" onClick={() => handleExportPolicy(policy.id)}>
                    <Download size={14} />
                    Export
                  </ActionButton>
                  {policy.status === 'active' && (
                    <ActionButton className="warning" onClick={() => handleArchivePolicy(policy.id)}>
                      <Archive size={14} />
                      Archive
                    </ActionButton>
                  )}
                  <ActionButton className="danger" onClick={() => handleDeletePolicy(policy.id)}>
                    <Trash2 size={14} />
                    Delete
                  </ActionButton>
                </PolicyActions>
              </PolicyCard>
            ))}
          </PoliciesGrid>

          {showCreateModal && (
            <CreatePolicyModal onClick={() => setShowCreateModal(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Create New Policy</ModalTitle>
                  <CloseButton onClick={() => setShowCreateModal(false)}>×</CloseButton>
                </ModalHeader>
                
                <form onSubmit={handleCreatePolicy}>
                  <FormGroup>
                    <Label>Policy Title</Label>
                    <Input
                      type="text"
                      value={newPolicy.title}
                      onChange={(e) => setNewPolicy({...newPolicy, title: e.target.value})}
                      placeholder="Enter policy title"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Description</Label>
                    <TextArea
                      value={newPolicy.description}
                      onChange={(e) => setNewPolicy({...newPolicy, description: e.target.value})}
                      placeholder="Describe the policy content and objectives"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Category</Label>
                    <Select
                      value={newPolicy.category}
                      onChange={(e) => setNewPolicy({...newPolicy, category: e.target.value})}
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </Select>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Priority</Label>
                    <Select
                      value={newPolicy.priority}
                      onChange={(e) => setNewPolicy({...newPolicy, priority: e.target.value})}
                      required
                    >
                      <option value="">Select priority</option>
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
                      ))}
                    </Select>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Department</Label>
                    <Select
                      value={newPolicy.department}
                      onChange={(e) => setNewPolicy({...newPolicy, department: e.target.value})}
                      required
                    >
                      <option value="">Select department</option>
                      {departments.map(department => (
                        <option key={department} value={department}>{department}</option>
                      ))}
                    </Select>
                  </FormGroup>
                  
                  <ModalActions>
                    <ActionButton 
                      type="button" 
                      className="secondary" 
                      onClick={() => setShowCreateModal(false)}
                    >
                      Cancel
                    </ActionButton>
                    <ActionButton type="submit" className="primary">
                      Create Policy
                    </ActionButton>
                  </ModalActions>
                </form>
              </ModalContent>
            </CreatePolicyModal>
          )}
        </Container>
      </MainContent>
    </Page>
  );
}