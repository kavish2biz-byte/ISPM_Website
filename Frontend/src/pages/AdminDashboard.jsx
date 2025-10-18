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
  Bell,
  Search,
  Tag,
  History,
  FileUp,
  EyeOff,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import { Document, Page as PDFPage } from 'react-pdf';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
`;

const UserInfo = styled.div`
  text-align: right;
`;

const UserDisplayName = styled.div`
  font-weight: 600;
  color: #1E293B;
`;

const UserRole = styled.div`
  color: #64748B;
  font-size: 0.9rem;
`;

const LogoutButton = styled.button`
  background: #EF4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background: #DC2626;
  }
`;

// Enhanced Policy Management Section
const PolicySection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.variant === 'primary' ? '#3B82F6' : '#F1F5F9'};
  color: ${props => props.variant === 'primary' ? 'white' : '#475569'};

  &:hover {
    background: ${props => props.variant === 'primary' ? '#2563EB' : '#E2E8F0'};
  }
`;

// Search and Filter Section
const SearchFilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
`;

const SearchField = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  width: 1rem;
  height: 1rem;
`;

const FilterDropdown = styled.div`
  position: relative;
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
  color: #374151;

  &:hover {
    border-color: #3B82F6;
  }
`;

const FilterDropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 200px;
  padding: 1rem;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;

const FilterGroup = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
`;

const DateRangeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 0.9rem;
  width: 120px;
`;

const TagInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  font-size: 0.9rem;
`;

// Policy Cards Grid
const PolicyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const PolicyCard = styled.div`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s;
  position: relative;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #3B82F6;
  }
`;

const PolicyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const PolicyTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
  flex: 1;
`;

const PolicyVersion = styled.span`
  background: #F3F4F6;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

const PolicyDescription = styled.p`
  color: #64748B;
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem 0;
  line-height: 1.5;
`;

const PolicyMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const MetaTag = styled.span`
  background: ${props => {
    switch(props.type) {
      case 'category': return '#EFF6FF';
      case 'status': return props.status === 'active' ? '#ECFDF5' : '#FEF3C7';
      case 'tag': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'category': return '#1D4ED8';
      case 'status': return props.status === 'active' ? '#059669' : '#D97706';
      case 'tag': return '#374151';
      default: return '#374151';
    }
  }};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const PolicyActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const PolicyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
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

  &.primary {
    background: #3B82F6;
    color: white;
    border-color: #3B82F6;

    &:hover {
      background: #2563EB;
    }
  }
`;

// PDF Preview Modal
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  color: #6B7280;

  &:hover {
    background: #F3F4F6;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
`;

const PDFContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: #F9FAFB;
  border-radius: 8px;
`;

// Version History Modal
const VersionHistoryModal = styled(Modal)``;

const VersionList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const VersionItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }
`;

const VersionInfo = styled.div`
  flex: 1;
`;

const VersionNumber = styled.div`
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 0.25rem;
`;

const VersionChanges = styled.div`
  color: #64748B;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const VersionDate = styled.div`
  color: #9CA3AF;
  font-size: 0.8rem;
`;

const VersionActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

// Audit Trail Modal
const AuditTrailModal = styled(Modal)``;

const AuditList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const AuditItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  gap: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

const AuditIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => {
    switch(props.action) {
      case 'create': return '#ECFDF5';
      case 'update': return '#EFF6FF';
      case 'acknowledge': return '#FEF3C7';
      case 'view': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.action) {
      case 'create': return '#059669';
      case 'update': return '#1D4ED8';
      case 'acknowledge': return '#D97706';
      case 'view': return '#6B7280';
      default: return '#6B7280';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  flex-shrink: 0;
`;

const AuditContent = styled.div`
  flex: 1;
`;

const AuditAction = styled.div`
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 0.25rem;
`;

const AuditDetails = styled.div`
  color: #64748B;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const AuditTimestamp = styled.div`
  color: #9CA3AF;
  font-size: 0.8rem;
`;

// Stats Cards
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
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.bgColor || '#F3F4F6'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: #64748B;
  font-size: 0.9rem;
`;

const StatChange = styled.div`
  color: ${props => props.positive ? '#059669' : '#DC2626'};
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

const AdminDashboard = ({ user, onLogout }) => {
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    tags: '',
    effectiveDateFrom: '',
    effectiveDateTo: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [versionHistory, setVersionHistory] = useState([]);
  const [auditTrail, setAuditTrail] = useState([]);

  // Sample data for demonstration
  useEffect(() => {
    const samplePolicies = [
      {
        id: 1,
        title: 'Data Protection Policy',
        description: 'Comprehensive guidelines for handling sensitive data and ensuring GDPR compliance.',
        version: '2.1',
        category: 'Privacy',
        status: 'active',
        effectiveDate: '2024-01-15',
        tags: ['GDPR', 'Data Security', 'Compliance'],
        acknowledgments: 45,
        totalUsers: 50,
        fileUrl: '/sample-policy.pdf',
        fileName: 'data-protection-policy-v2.1.pdf'
      },
      {
        id: 2,
        title: 'IT Security Guidelines',
        description: 'Security protocols and best practices for IT infrastructure and user access.',
        version: '1.3',
        category: 'Security',
        status: 'active',
        effectiveDate: '2024-02-01',
        tags: ['Security', 'IT', 'Access Control'],
        acknowledgments: 38,
        totalUsers: 45,
        fileUrl: '/sample-policy.pdf',
        fileName: 'it-security-guidelines-v1.3.pdf'
      },
      {
        id: 3,
        title: 'Remote Work Policy',
        description: 'Guidelines for remote work arrangements and security requirements.',
        version: '1.0',
        category: 'HR',
        status: 'draft',
        effectiveDate: '2024-03-01',
        tags: ['Remote Work', 'HR', 'Security'],
        acknowledgments: 0,
        totalUsers: 30,
        fileUrl: '/sample-policy.pdf',
        fileName: 'remote-work-policy-v1.0.pdf'
      }
    ];

    setPolicies(samplePolicies);
    setFilteredPolicies(samplePolicies);
    setLoading(false);
  }, []);

  // Filter policies based on search and filters
  useEffect(() => {
    let filtered = policies;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(policy =>
        policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(policy => policy.category === filters.category);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(policy => policy.status === filters.status);
    }

    // Tags filter
    if (filters.tags) {
      const tagArray = filters.tags.split(',').map(tag => tag.trim().toLowerCase());
      filtered = filtered.filter(policy =>
        policy.tags.some(tag => tagArray.includes(tag.toLowerCase()))
      );
    }

    // Date range filter
    if (filters.effectiveDateFrom) {
      filtered = filtered.filter(policy => 
        new Date(policy.effectiveDate) >= new Date(filters.effectiveDateFrom)
      );
    }

    if (filters.effectiveDateTo) {
      filtered = filtered.filter(policy => 
        new Date(policy.effectiveDate) <= new Date(filters.effectiveDateTo)
      );
    }

    setFilteredPolicies(filtered);
  }, [policies, searchTerm, filters]);

  const handlePDFPreview = async (policy) => {
    setSelectedPolicy(policy);
    setPdfUrl(policy.fileUrl);
    setShowPDFPreview(true);
  };

  const handleVersionHistory = async (policy) => {
    setSelectedPolicy(policy);
    // Simulate API call for version history
    const versions = [
      {
        version: '2.1',
        changes: 'Updated GDPR compliance requirements',
        modifiedBy: 'John Admin',
        modifiedAt: '2024-01-15T10:30:00Z'
      },
      {
        version: '2.0',
        changes: 'Major revision for new data protection laws',
        modifiedBy: 'Jane Manager',
        modifiedAt: '2024-01-01T09:00:00Z'
      },
      {
        version: '1.0',
        changes: 'Initial policy creation',
        modifiedBy: 'Admin User',
        modifiedAt: '2023-12-01T14:00:00Z'
      }
    ];
    setVersionHistory(versions);
    setShowVersionHistory(true);
  };

  const handleAuditTrail = async (policy) => {
    setSelectedPolicy(policy);
    // Simulate API call for audit trail
    const audit = [
      {
        action: 'create',
        details: 'Policy created',
        user: 'Admin User',
        timestamp: '2023-12-01T14:00:00Z'
      },
      {
        action: 'update',
        details: 'Updated GDPR compliance requirements',
        user: 'John Admin',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        action: 'acknowledge',
        details: 'Acknowledged by Sarah Johnson',
        user: 'Sarah Johnson',
        timestamp: '2024-01-16T09:15:00Z'
      },
      {
        action: 'view',
        details: 'PDF preview accessed',
        user: 'Mike Wilson',
        timestamp: '2024-01-17T11:20:00Z'
      }
    ];
    setAuditTrail(audit);
    setShowAuditTrail(true);
  };

  const handleCreateVersion = (policy) => {
    // Simulate creating new version
    alert(`Creating new version for ${policy.title}`);
  };

  const handleAcknowledge = (policy) => {
    // Simulate acknowledgment
    alert(`Acknowledging ${policy.title}`);
  };

  const dashboardStats = {
    totalPolicies: policies.length,
    activePolicies: policies.filter(p => p.status === 'active').length,
    totalAcknowledgments: policies.reduce((sum, p) => sum + p.acknowledgments, 0),
    pendingAcknowledgments: policies.reduce((sum, p) => sum + (p.totalUsers - p.acknowledgments), 0)
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <div>
              <Greeting>Admin Dashboard</Greeting>
              <Subtext>Manage policies, users, and system settings</Subtext>
            </div>
            <UserProfile>
              <UserAvatar>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </UserAvatar>
              <UserInfo>
                <UserDisplayName>{user?.name || 'Admin'}</UserDisplayName>
                <UserRole>System Administrator</UserRole>
              </UserInfo>
              <LogoutButton onClick={onLogout}>
                Logout
              </LogoutButton>
            </UserProfile>
          </Header>

          {/* Stats Overview */}
          <StatsGrid>
            <StatCard>
              <StatHeader>
                <StatIcon bgColor="linear-gradient(135deg, #3B82F6, #1D4ED8)">
                  <FileText />
                </StatIcon>
                <StatContent>
                  <StatNumber>{dashboardStats.totalPolicies}</StatNumber>
                  <StatLabel>Total Policies</StatLabel>
                  <StatChange positive>+2 this month</StatChange>
                </StatContent>
              </StatHeader>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon bgColor="linear-gradient(135deg, #10B981, #059669)">
                  <CheckCircle />
                </StatIcon>
                <StatContent>
                  <StatNumber>{dashboardStats.activePolicies}</StatNumber>
                  <StatLabel>Active Policies</StatLabel>
                  <StatChange positive>All up to date</StatChange>
                </StatContent>
              </StatHeader>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon bgColor="linear-gradient(135deg, #F59E0B, #D97706)">
                  <FileCheck />
                </StatIcon>
                <StatContent>
                  <StatNumber>{dashboardStats.totalAcknowledgments}</StatNumber>
                  <StatLabel>Total Acknowledgments</StatLabel>
                  <StatChange positive>+12 this week</StatChange>
                </StatContent>
              </StatHeader>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon bgColor="linear-gradient(135deg, #EF4444, #DC2626)">
                  <AlertTriangle />
                </StatIcon>
                <StatContent>
                  <StatNumber>{dashboardStats.pendingAcknowledgments}</StatNumber>
                  <StatLabel>Pending Acknowledgments</StatLabel>
                  <StatChange>Requires attention</StatChange>
                </StatContent>
              </StatHeader>
            </StatCard>
          </StatsGrid>

          {/* Policy Management Section */}
          <PolicySection>
            <SectionHeader>
              <SectionTitle>Policy Management</SectionTitle>
              <ActionButtons>
                <ActionButton variant="primary">
                  <Plus size={16} />
                  Create Policy
                </ActionButton>
                <ActionButton>
                  <FileUp size={16} />
                  Bulk Upload
                </ActionButton>
              </ActionButtons>
            </SectionHeader>

            {/* Search and Filters */}
            <SearchFilterSection>
              <SearchInput>
                <SearchIcon />
                <SearchField
                  type="text"
                  placeholder="Search policies by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchInput>

              <FilterDropdown>
                <FilterButton onClick={() => setShowFilters(!showFilters)}>
                  <Filter size={16} />
                  Filters
                  {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </FilterButton>
                <FilterDropdownContent $isOpen={showFilters}>
                  <FilterGroup>
                    <FilterLabel>Category</FilterLabel>
                    <FilterSelect
                      value={filters.category}
                      onChange={(e) => setFilters({...filters, category: e.target.value})}
                    >
                      <option value="">All Categories</option>
                      <option value="Security">Security</option>
                      <option value="Privacy">Privacy</option>
                      <option value="Compliance">Compliance</option>
                      <option value="HR">HR</option>
                      <option value="IT">IT</option>
                      <option value="Operations">Operations</option>
                    </FilterSelect>
                  </FilterGroup>

                  <FilterGroup>
                    <FilterLabel>Status</FilterLabel>
                    <FilterSelect
                      value={filters.status}
                      onChange={(e) => setFilters({...filters, status: e.target.value})}
                    >
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                      <option value="expired">Expired</option>
                    </FilterSelect>
                  </FilterGroup>

                  <FilterGroup>
                    <FilterLabel>Tags</FilterLabel>
                    <TagInput
                      type="text"
                      placeholder="Enter tags separated by commas"
                      value={filters.tags}
                      onChange={(e) => setFilters({...filters, tags: e.target.value})}
                    />
                  </FilterGroup>

                  <FilterGroup>
                    <FilterLabel>Effective Date Range</FilterLabel>
                    <DateRangeContainer>
                      <DateInput
                        type="date"
                        placeholder="From"
                        value={filters.effectiveDateFrom}
                        onChange={(e) => setFilters({...filters, effectiveDateFrom: e.target.value})}
                      />
                      <span>to</span>
                      <DateInput
                        type="date"
                        placeholder="To"
                        value={filters.effectiveDateTo}
                        onChange={(e) => setFilters({...filters, effectiveDateTo: e.target.value})}
                      />
                    </DateRangeContainer>
                  </FilterGroup>
                </FilterDropdownContent>
              </FilterDropdown>
            </SearchFilterSection>

            {/* Policy Grid */}
            <PolicyGrid>
              {filteredPolicies.map((policy) => (
                <PolicyCard key={policy.id}>
                  <PolicyHeader>
                    <PolicyTitle>{policy.title}</PolicyTitle>
                    <PolicyVersion>v{policy.version}</PolicyVersion>
                  </PolicyHeader>

                  <PolicyDescription>{policy.description}</PolicyDescription>

                  <PolicyMeta>
                    <MetaTag type="category">{policy.category}</MetaTag>
                    <MetaTag type="status" status={policy.status}>
                      {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                    </MetaTag>
                    {policy.tags.map((tag, index) => (
                      <MetaTag key={index} type="tag">{tag}</MetaTag>
                    ))}
                  </PolicyMeta>

                  <PolicyActions>
                    <PolicyButton onClick={() => handlePDFPreview(policy)}>
                      <Eye size={14} />
                      Preview
                    </PolicyButton>
                    <PolicyButton onClick={() => handleVersionHistory(policy)}>
                      <History size={14} />
                      Versions
                    </PolicyButton>
                    <PolicyButton onClick={() => handleAuditTrail(policy)}>
                      <Activity size={14} />
                      Audit
                    </PolicyButton>
                    <PolicyButton onClick={() => handleCreateVersion(policy)}>
                      <FileUp size={14} />
                      New Version
                    </PolicyButton>
                    <PolicyButton className="primary" onClick={() => handleAcknowledge(policy)}>
                      <CheckCircle size={14} />
                      Acknowledge
                    </PolicyButton>
                  </PolicyActions>
                </PolicyCard>
              ))}
            </PolicyGrid>
          </PolicySection>

          {/* PDF Preview Modal */}
          <Modal $isOpen={showPDFPreview}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>{selectedPolicy?.title} - PDF Preview</ModalTitle>
                <CloseButton onClick={() => setShowPDFPreview(false)}>
                  <X size={20} />
                </CloseButton>
              </ModalHeader>
              <ModalBody>
                <PDFContainer>
                  <Document file={pdfUrl}>
                    <PDFPage pageNumber={1} width={600} />
                  </Document>
                </PDFContainer>
              </ModalBody>
            </ModalContent>
          </Modal>

          {/* Version History Modal */}
          <VersionHistoryModal $isOpen={showVersionHistory}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>{selectedPolicy?.title} - Version History</ModalTitle>
                <CloseButton onClick={() => setShowVersionHistory(false)}>
                  <X size={20} />
                </CloseButton>
              </ModalHeader>
              <ModalBody>
                <VersionList>
                  {versionHistory.map((version, index) => (
                    <VersionItem key={index}>
                      <VersionInfo>
                        <VersionNumber>Version {version.version}</VersionNumber>
                        <VersionChanges>{version.changes}</VersionChanges>
                        <VersionDate>
                          Modified by {version.modifiedBy} on {new Date(version.modifiedAt).toLocaleDateString()}
                        </VersionDate>
                      </VersionInfo>
                      <VersionActions>
                        <PolicyButton>
                          <Eye size={14} />
                          View
                        </PolicyButton>
                        <PolicyButton>
                          <Download size={14} />
                          Download
                        </PolicyButton>
                      </VersionActions>
                    </VersionItem>
                  ))}
                </VersionList>
              </ModalBody>
            </ModalContent>
          </VersionHistoryModal>

          {/* Audit Trail Modal */}
          <AuditTrailModal $isOpen={showAuditTrail}>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>{selectedPolicy?.title} - Audit Trail</ModalTitle>
                <CloseButton onClick={() => setShowAuditTrail(false)}>
                  <X size={20} />
                </CloseButton>
              </ModalHeader>
              <ModalBody>
                <AuditList>
                  {auditTrail.map((audit, index) => (
                    <AuditItem key={index}>
                      <AuditIcon action={audit.action}>
                        {audit.action.charAt(0).toUpperCase()}
                      </AuditIcon>
                      <AuditContent>
                        <AuditAction>{audit.action.charAt(0).toUpperCase() + audit.action.slice(1)}</AuditAction>
                        <AuditDetails>{audit.details}</AuditDetails>
                        <AuditTimestamp>
                          {audit.user} • {new Date(audit.timestamp).toLocaleString()}
                        </AuditTimestamp>
                      </AuditContent>
                    </AuditItem>
                  ))}
                </AuditList>
              </ModalBody>
            </ModalContent>
          </AuditTrailModal>
        </Container>
      </MainContent>
    </Page>
  );
};

export default AdminDashboard;