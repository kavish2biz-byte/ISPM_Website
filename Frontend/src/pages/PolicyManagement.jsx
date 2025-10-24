import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FileText, 
  Search,
  Filter,
  Eye,
  Download, 
  History,
  Activity,
  FileUp,
  CheckCircle,
  Plus, 
  Calendar,
  Tag,
  Users,
  Building,
  AlertCircle,
  Clock,
  X,
  ChevronDown,
  ChevronUp,
  Edit, 
  Trash2, 
  Copy,
  Archive,
  Share2,
  MoreVertical,
  Shield,
  Lock,
  UserCheck,
  Calculator,
  Briefcase,
  Settings
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

const SearchFilterSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
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

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const PoliciesContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const CategorySection = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E2E8F0;
`;

const CategoryTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #3B82F6;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CategoryIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: ${props => props.color || '#3B82F6'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
`;

const PoliciesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const PolicyListItem = styled.div`
  background: white;
  border: 2px solid #3B82F6;
  border-radius: 0;
  padding: 1rem 1.5rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-height: 80px;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);

  &:hover {
    background: #F8FAFC;
    border-color: #1D4ED8;
    box-shadow: 0 4px 8px rgba(59, 130, 246, 0.2);
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #F1F5F9;
  }
`;

const PolicyInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PolicyTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #3B82F6;
  margin: 0;
`;

const PolicyDescription = styled.p`
  color: #64748B;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PolicyMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PolicyVersion = styled.span`
  background: #EFF6FF;
  color: #3B82F6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const MetaTag = styled.span`
  background: ${props => {
    switch(props.type) {
      case 'status': return props.status === 'active' ? '#ECFDF5' : '#FEF3C7';
      case 'tag': return '#F1F5F9';
      default: return '#F1F5F9';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'status': return props.status === 'active' ? '#059669' : '#D97706';
      case 'tag': return '#475569';
      default: return '#475569';
    }
  }};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const PolicyStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #1E293B;
`;

const StatLabel = styled.span`
  font-size: 0.8rem;
  color: #64748B;
`;

const PolicyActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const PolicyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 2px solid #D1D5DB;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
  transition: all 0.2s;
  min-width: 80px;
  justify-content: center;

  &:hover {
    background: #F9FAFB;
    border-color: #3B82F6;
    color: #3B82F6;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &.primary {
    background: #3B82F6;
    color: white;
    border-color: #3B82F6;
    
    &:hover {
      background: #2563EB;
      border-color: #2563EB;
      box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
    }
  }

  &.danger {
    background: #EF4444;
    color: white;
    border-color: #EF4444;
    
    &:hover {
      background: #DC2626;
      border-color: #DC2626;
      box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
    }
  }
`;

const MoreActionsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  color: #6B7280;
  transition: all 0.2s;
    
    &:hover {
    background: #F9FAFB;
    border-color: #3B82F6;
    color: #3B82F6;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 180px;
  padding: 0.5rem 0;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.85rem;
  color: #374151;
  transition: background-color 0.2s;
    
    &:hover {
    background: #F9FAFB;
  }
`;

// Modal Components
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
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

const ModalBody = styled.div`
  margin-bottom: 2rem;
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  margin-top: 0.5rem;
  
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
`;

const ModalButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  &.primary {
    background: #3B82F6;
    color: white;
    border-color: #3B82F6;

    &:hover {
      background: #2563EB;
    }
  }

  &.danger {
    background: #EF4444;
    color: white;
    border-color: #EF4444;

    &:hover {
      background: #DC2626;
    }
  }

  &.secondary {
  background: white;
    color: #374151;
    border-color: #D1D5DB;

    &:hover {
      background: #F9FAFB;
    }
  }
`;

const WarningBox = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const WarningText = styled.div`
  color: #DC2626;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const WarningDescription = styled.div`
  color: #991B1B;
  font-size: 0.9rem;
`;

const PolicyManagement = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    department: ''
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [policyToDelete, setPolicyToDelete] = useState(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Sample policies data
  const samplePolicies = [
    // Security Policies
    {
      id: 1,
      title: 'Data Protection Policy',
      description: 'Comprehensive guidelines for handling personal data and ensuring GDPR compliance across all departments.',
      category: 'Security',
      status: 'active',
      version: '2.1',
      acknowledgments: 45,
      totalUsers: 50,
      tags: ['GDPR', 'Security', 'Compliance'],
      fileUrl: '/policies/data-protection.pdf',
      lastModified: '2024-01-15'
    },
    {
      id: 2,
      title: 'IT Security Guidelines',
      description: 'Security protocols and best practices for IT infrastructure, network access, and data protection.',
      category: 'Security',
      status: 'active',
      version: '1.3',
      acknowledgments: 38,
      totalUsers: 50,
      tags: ['IT', 'Security', 'Network'],
      fileUrl: '/policies/it-security.pdf',
      lastModified: '2024-01-10'
    },
    {
      id: 7,
      title: 'Password Security Policy',
      description: 'Guidelines for creating, managing, and protecting passwords across all systems and applications.',
      category: 'Security',
      status: 'active',
      version: '1.5',
      acknowledgments: 40,
      totalUsers: 50,
      tags: ['Password', 'Security', 'Authentication'],
      fileUrl: '/policies/password-security.pdf',
      lastModified: '2024-01-12'
    },
    {
      id: 8,
      title: 'Incident Response Plan',
      description: 'Procedures for identifying, reporting, and responding to security incidents and breaches.',
      category: 'Security',
      status: 'active',
      version: '2.0',
      acknowledgments: 32,
      totalUsers: 50,
      tags: ['Incident', 'Response', 'Security'],
      fileUrl: '/policies/incident-response.pdf',
      lastModified: '2024-01-08'
    },
    {
      id: 9,
      title: 'Access Control Policy',
      description: 'Standards for managing user access rights, permissions, and system privileges.',
      category: 'Security',
      status: 'draft',
      version: '1.1',
      acknowledgments: 28,
      totalUsers: 50,
      tags: ['Access', 'Control', 'Permissions'],
      fileUrl: '/policies/access-control.pdf',
      lastModified: '2024-01-06'
    },

    // Privacy Policies
    {
      id: 3,
      title: 'Code of Conduct',
      description: 'Ethical standards and behavioral expectations for all employees in professional and personal conduct.',
      category: 'Privacy',
      status: 'active',
      version: '3.0',
      acknowledgments: 50,
      totalUsers: 50,
      tags: ['Ethics', 'Behavior', 'Standards'],
      fileUrl: '/policies/code-of-conduct.pdf',
      lastModified: '2024-01-08'
    },
    {
      id: 10,
      title: 'Privacy Policy',
      description: 'Comprehensive privacy guidelines covering data collection, usage, and protection of personal information.',
      category: 'Privacy',
      status: 'active',
      version: '2.3',
      acknowledgments: 48,
      totalUsers: 50,
      tags: ['Privacy', 'Data', 'Protection'],
      fileUrl: '/policies/privacy-policy.pdf',
      lastModified: '2024-01-14'
    },
    {
      id: 11,
      title: 'Confidentiality Agreement',
      description: 'Terms and conditions for handling confidential information and trade secrets.',
      category: 'Privacy',
      status: 'active',
      version: '1.7',
      acknowledgments: 44,
      totalUsers: 50,
      tags: ['Confidentiality', 'NDA', 'Secrets'],
      fileUrl: '/policies/confidentiality.pdf',
      lastModified: '2024-01-11'
    },

    // HR Policies
    {
      id: 4,
      title: 'Remote Work Policy',
      description: 'Guidelines and procedures for remote work arrangements, including security and productivity measures.',
      category: 'HR',
      status: 'draft',
      version: '1.2',
      acknowledgments: 25,
      totalUsers: 50,
      tags: ['Remote', 'HR', 'Productivity'],
      fileUrl: '/policies/remote-work.pdf',
      lastModified: '2024-01-05'
    },
    {
      id: 12,
      title: 'Employee Handbook',
      description: 'Comprehensive guide covering employment policies, benefits, and workplace expectations.',
      category: 'HR',
      status: 'active',
      version: '4.2',
      acknowledgments: 46,
      totalUsers: 50,
      tags: ['Handbook', 'Employment', 'Benefits'],
      fileUrl: '/policies/employee-handbook.pdf',
      lastModified: '2024-01-13'
    },
    {
      id: 13,
      title: 'Anti-Harassment Policy',
      description: 'Zero-tolerance policy against workplace harassment, discrimination, and inappropriate behavior.',
      category: 'HR',
      status: 'active',
      version: '2.8',
      acknowledgments: 49,
      totalUsers: 50,
      tags: ['Harassment', 'Discrimination', 'Workplace'],
      fileUrl: '/policies/anti-harassment.pdf',
      lastModified: '2024-01-09'
    },
    {
      id: 14,
      title: 'Leave Management Policy',
      description: 'Guidelines for vacation, sick leave, and other time-off requests and approvals.',
      category: 'HR',
      status: 'active',
      version: '1.9',
      acknowledgments: 41,
      totalUsers: 50,
      tags: ['Leave', 'Vacation', 'Time-off'],
      fileUrl: '/policies/leave-management.pdf',
      lastModified: '2024-01-07'
    },

    // Finance Policies
    {
      id: 5,
      title: 'Financial Procedures',
      description: 'Standard operating procedures for financial transactions, expense management, and budget controls.',
      category: 'Finance',
      status: 'active',
      version: '2.5',
      acknowledgments: 42,
      totalUsers: 50,
      tags: ['Finance', 'Budget', 'Expenses'],
      fileUrl: '/policies/financial-procedures.pdf',
      lastModified: '2024-01-03'
    },
    {
      id: 15,
      title: 'Expense Reimbursement Policy',
      description: 'Guidelines for submitting, approving, and processing business expense reimbursements.',
      category: 'Finance',
      status: 'active',
      version: '1.6',
      acknowledgments: 37,
      totalUsers: 50,
      tags: ['Expenses', 'Reimbursement', 'Business'],
      fileUrl: '/policies/expense-reimbursement.pdf',
      lastModified: '2024-01-04'
    },
    {
      id: 16,
      title: 'Budget Management Guidelines',
      description: 'Procedures for budget planning, monitoring, and controlling departmental expenditures.',
      category: 'Finance',
      status: 'active',
      version: '2.1',
      acknowledgments: 33,
      totalUsers: 50,
      tags: ['Budget', 'Management', 'Planning'],
      fileUrl: '/policies/budget-management.pdf',
      lastModified: '2024-01-02'
    },

    // IT Policies
    {
      id: 6,
      title: 'System Administration',
      description: 'Policies and procedures for system administration, user management, and technical operations.',
      category: 'IT',
      status: 'active',
      version: '1.8',
      acknowledgments: 35,
      totalUsers: 50,
      tags: ['IT', 'Admin', 'Systems'],
      fileUrl: '/policies/system-admin.pdf',
      lastModified: '2024-01-01'
    },
    {
      id: 17,
      title: 'Software License Management',
      description: 'Guidelines for purchasing, installing, and managing software licenses across the organization.',
      category: 'IT',
      status: 'active',
      version: '1.4',
      acknowledgments: 29,
      totalUsers: 50,
      tags: ['Software', 'Licenses', 'Management'],
      fileUrl: '/policies/software-licenses.pdf',
      lastModified: '2024-01-16'
    },
    {
      id: 18,
      title: 'Backup and Recovery Policy',
      description: 'Procedures for data backup, disaster recovery, and business continuity planning.',
      category: 'IT',
      status: 'active',
      version: '2.2',
      acknowledgments: 31,
      totalUsers: 50,
      tags: ['Backup', 'Recovery', 'Disaster'],
      fileUrl: '/policies/backup-recovery.pdf',
      lastModified: '2024-01-17'
    },

    // Operations Policies
    {
      id: 19,
      title: 'Quality Management System',
      description: 'Standards and procedures for maintaining quality across all operational processes.',
      category: 'Operations',
      status: 'active',
      version: '3.1',
      acknowledgments: 39,
      totalUsers: 50,
      tags: ['Quality', 'Management', 'Standards'],
      fileUrl: '/policies/quality-management.pdf',
      lastModified: '2024-01-18'
    },
    {
      id: 20,
      title: 'Vendor Management Policy',
      description: 'Guidelines for selecting, managing, and maintaining relationships with external vendors.',
      category: 'Operations',
      status: 'active',
      version: '1.3',
      acknowledgments: 26,
      totalUsers: 50,
      tags: ['Vendor', 'Management', 'Procurement'],
      fileUrl: '/policies/vendor-management.pdf',
      lastModified: '2024-01-19'
    },
    {
      id: 21,
      title: 'Health and Safety Policy',
      description: 'Workplace safety guidelines and emergency procedures for all employees.',
      category: 'Operations',
      status: 'active',
      version: '2.7',
      acknowledgments: 47,
      totalUsers: 50,
      tags: ['Safety', 'Health', 'Emergency'],
      fileUrl: '/policies/health-safety.pdf',
      lastModified: '2024-01-20'
    }
  ];

  useEffect(() => {
    setPolicies(samplePolicies);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('[data-dropdown]') === null) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !filters.category || policy.category === filters.category;
    const matchesStatus = !filters.status || policy.status === filters.status;
    const matchesDepartment = !filters.department || policy.tags.includes(filters.department);
    return matchesSearch && matchesCategory && matchesStatus && matchesDepartment;
  });

  // Group policies by category
  const groupedPolicies = filteredPolicies.reduce((groups, policy) => {
    const category = policy.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(policy);
    return groups;
  }, {});

  // Get category icon and color
  const getCategoryInfo = (category) => {
    switch(category) {
      case 'Security':
        return { icon: Shield, color: '#EF4444', bgColor: '#FEF2F2' };
      case 'Privacy':
        return { icon: Lock, color: '#8B5CF6', bgColor: '#F3E8FF' };
      case 'HR':
        return { icon: UserCheck, color: '#10B981', bgColor: '#F0FDF4' };
      case 'Finance':
        return { icon: Calculator, color: '#059669', bgColor: '#ECFDF5' };
      case 'IT':
        return { icon: Settings, color: '#3B82F6', bgColor: '#EFF6FF' };
      case 'Operations':
        return { icon: Briefcase, color: '#F59E0B', bgColor: '#FEF3C7' };
      default:
        return { icon: FileText, color: '#6B7280', bgColor: '#F9FAFB' };
    }
  };

  const handleEditPolicy = (policy) => {
    console.log('Edit policy:', policy);
    // Implement edit functionality
  };

  const handleDeletePolicy = (policy) => {
    setPolicyToDelete(policy);
    setShowDeleteModal(true);
    setDeletePassword('');
    setPasswordError('');
  };

  const handleConfirmDelete = async () => {
    if (!deletePassword.trim()) {
      setPasswordError('Password is required');
      return;
    }

    setIsDeleting(true);
    setPasswordError('');

    try {
      // Verify password with backend
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          password: deletePassword
        })
      });

      const data = await response.json();

      if (data.success) {
        // Password verified, proceed with deletion
        setPolicies(policies.filter(p => p.id !== policyToDelete.id));
        setShowDeleteModal(false);
        setPolicyToDelete(null);
        setDeletePassword('');
        
        // Show success message (you can add a toast notification here)
        console.log('Policy deleted successfully:', policyToDelete.title);
      } else {
        setPasswordError(data.message || 'Invalid password');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
      setPasswordError('Error verifying password. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setPolicyToDelete(null);
    setDeletePassword('');
    setPasswordError('');
  };

  const handlePDFPreview = (policy) => {
    console.log('Preview PDF:', policy);
    // Implement PDF preview
  };

  const handleDownload = (policy) => {
    console.log('Download policy:', policy);
    // Implement download functionality
  };

  const handleVersionHistory = (policy) => {
    console.log('Version history:', policy);
    // Implement version history
  };

  const handleAuditTrail = (policy) => {
    console.log('Audit trail:', policy);
    // Implement audit trail
  };

  const handleDuplicatePolicy = (policy) => {
    console.log('Duplicate policy:', policy);
    // Implement duplicate functionality
  };

  const handleArchivePolicy = (policy) => {
    console.log('Archive policy:', policy);
    // Implement archive functionality
  };

  const handleAcknowledge = (policy) => {
    console.log('Acknowledge policy:', policy);
    // Implement acknowledge functionality
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
              <HeaderLeft>
              <Greeting>Policy Management</Greeting>
              <Subtext>Manage and organize company policies and procedures</Subtext>
              </HeaderLeft>
            <HeaderRight>
              <ActionButton className="primary" onClick={() => navigate('/policy-create')}>
                  <Plus size={16} />
                  Create Policy
              </ActionButton>
              <ActionButton>
                <FileUp size={16} />
                Bulk Upload
              </ActionButton>
            </HeaderRight>
          </Header>

          {/* Search and Filter Section */}
          <SearchFilterSection>
            <SearchBar>
              <SearchInput
                type="text"
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            <FilterSelect
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="">All Categories</option>
                <option value="Security">Security</option>
                <option value="Privacy">Privacy</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Operations">Operations</option>
            </FilterSelect>
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
            <FilterSelect
                value={filters.department}
                onChange={(e) => setFilters({...filters, department: e.target.value})}
              >
                <option value="">All Departments</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
            </FilterSelect>
            </SearchBar>
          </SearchFilterSection>

          {/* Categorized Policies */}
          <PoliciesContainer>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#3B82F6',
                margin: '0 0 1rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FileText size={20} />
                Policies ({filteredPolicies.length})
              </h2>
            </div>

            {Object.entries(groupedPolicies).map(([category, categoryPolicies]) => {
              const categoryInfo = getCategoryInfo(category);
              const CategoryIconComponent = categoryInfo.icon;

              return (
                <CategorySection key={category}>
                  <CategoryHeader>
                    <CategoryIcon color={categoryInfo.color}>
                      <CategoryIconComponent size={14} />
                    </CategoryIcon>
                    <CategoryTitle>
                      {category} ({categoryPolicies.length})
                    </CategoryTitle>
                  </CategoryHeader>

                  <PoliciesList>
                    {categoryPolicies.map((policy) => (
                      <PolicyListItem key={policy.id}>
                        <PolicyInfo>
                          <PolicyTitle>{policy.title}</PolicyTitle>
                          <PolicyDescription>{policy.description}</PolicyDescription>
                <PolicyMeta>
                            <PolicyVersion>v{policy.version}</PolicyVersion>
                            <MetaTag type="status" status={policy.status}>
                              {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                            </MetaTag>
                            {policy.tags.slice(0, 2).map((tag, index) => (
                              <MetaTag key={index} type="tag">{tag}</MetaTag>
                            ))}
                </PolicyMeta>
                        </PolicyInfo>

                        <PolicyStats>
                          <StatItem>
                            <StatValue>{policy.acknowledgments}</StatValue>
                            <StatLabel>Acknowledged</StatLabel>
                          </StatItem>
                          <StatItem>
                            <StatValue>{policy.totalUsers}</StatValue>
                            <StatLabel>Total Users</StatLabel>
                          </StatItem>
                          <StatItem>
                            <StatValue>{Math.round((policy.acknowledgments / policy.totalUsers) * 100)}%</StatValue>
                            <StatLabel>Rate</StatLabel>
                          </StatItem>
                        </PolicyStats>
                
                <PolicyActions>
                          <PolicyButton
                            className="primary"
                            onClick={() => handleEditPolicy(policy)}
                          >
                            <Edit size={16} />
                            Edit
                          </PolicyButton>
                          <PolicyButton
                            className="danger"
                            onClick={() => handleDeletePolicy(policy)}
                          >
                            <Trash2 size={16} />
                            Remove
                          </PolicyButton>

                          <div style={{ position: 'relative' }} data-dropdown>
                            <MoreActionsButton
                              onClick={() => setOpenDropdown(openDropdown === policy.id ? null : policy.id)}
                            >
                              <MoreVertical size={16} />
                            </MoreActionsButton>

                            {openDropdown === policy.id && (
                              <DropdownMenu>
                                <DropdownItem onClick={() => handlePDFPreview(policy)}>
                    <Eye size={14} />
                                  Preview
                                </DropdownItem>
                                <DropdownItem onClick={() => handleDownload(policy)}>
                                  <Download size={14} />
                                  Download
                                </DropdownItem>
                                <DropdownItem onClick={() => handleVersionHistory(policy)}>
                                  <History size={14} />
                                  Version History
                                </DropdownItem>
                                <DropdownItem onClick={() => handleAuditTrail(policy)}>
                                  <Activity size={14} />
                                  Audit Trail
                                </DropdownItem>
                                <DropdownItem onClick={() => handleDuplicatePolicy(policy)}>
                    <Copy size={14} />
                    Duplicate
                                </DropdownItem>
                                <DropdownItem onClick={() => handleArchivePolicy(policy)}>
                      <Archive size={14} />
                      Archive
                                </DropdownItem>
                                <DropdownItem onClick={() => handleAcknowledge(policy)}>
                                  <CheckCircle size={14} />
                                  Acknowledge
                                </DropdownItem>
                              </DropdownMenu>
                            )}
                          </div>
                </PolicyActions>
                      </PolicyListItem>
                    ))}
                  </PoliciesList>
                </CategorySection>
              );
            })}
          </PoliciesContainer>
        </Container>
      </MainContent>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal>
          <ModalContent>
                <ModalHeader>
              <ModalTitle>Confirm Policy Deletion</ModalTitle>
              <CloseButton onClick={handleCancelDelete}>
                <X size={20} />
              </CloseButton>
                </ModalHeader>
                
            <ModalBody>
              <WarningBox>
                <WarningText>⚠️ Warning: This action cannot be undone!</WarningText>
                <WarningDescription>
                  You are about to permanently delete the policy "{policyToDelete?.title}". 
                  This will remove all associated data, acknowledgments, and version history.
                </WarningDescription>
              </WarningBox>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: '600', 
                  color: '#374151', 
                  marginBottom: '0.5rem' 
                }}>
                  Enter your password to confirm deletion:
                </label>
                <PasswordInput
                  type="password"
                  placeholder="Enter your password"
                  value={deletePassword}
                  onChange={(e) => {
                    setDeletePassword(e.target.value);
                    setPasswordError('');
                  }}
                  disabled={isDeleting}
                />
                {passwordError && (
                  <div style={{ 
                    color: '#DC2626', 
                    fontSize: '0.85rem', 
                    marginTop: '0.5rem' 
                  }}>
                    {passwordError}
                  </div>
                )}
              </div>
            </ModalBody>
                  
                  <ModalActions>
              <ModalButton 
                      className="secondary" 
                onClick={handleCancelDelete}
                disabled={isDeleting}
                    >
                      Cancel
              </ModalButton>
              <ModalButton 
                className="danger" 
                onClick={handleConfirmDelete}
                disabled={isDeleting || !deletePassword.trim()}
              >
                {isDeleting ? 'Deleting...' : 'Delete Policy'}
              </ModalButton>
                  </ModalActions>
              </ModalContent>
        </Modal>
          )}
    </Page>
  );
};

export default PolicyManagement;