import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Target, 
  Award, 
  TrendingUp, 
  Filter, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  Star,
  Calendar,
  User,
  FileText,
  BarChart3,
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

const TrainingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const TrainingCard = styled.div`
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

const TrainingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  margin-top: 2.5rem;
`;

const TrainingTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
`;

const TrainingStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => 
    props.status === 'published' ? '#D1FAE5' : 
    props.status === 'draft' ? '#FEF3C7' : '#EFF6FF'
  };
  color: ${props => 
    props.status === 'published' ? '#065F46' : 
    props.status === 'draft' ? '#92400E' : '#1E40AF'
  };
`;

const TrainingDescription = styled.p`
  color: #6B7280;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const TrainingMeta = styled.div`
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
  background: linear-gradient(90deg, #3B82F6, #1D4ED8);
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const TrainingActions = styled.div`
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
`;

const CreateTrainingModal = styled.div`
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
  max-width: 600px;
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

export default function TrainingManagement({ user, onLogout }) {
  const [trainings, setTrainings] = useState([
    {
      id: 1,
      title: 'Security Awareness Training',
      description: 'Comprehensive training covering basic security practices, threat awareness, and incident reporting procedures.',
      status: 'published',
      category: 'Security',
      duration: 30,
      difficulty: 'Beginner',
      enrolledUsers: 45,
      completedUsers: 32,
      rating: 4.8,
      instructor: 'Sarah Johnson',
      lastUpdated: '2025-01-20'
    },
    {
      id: 2,
      title: 'GDPR Compliance Training',
      description: 'Understanding GDPR requirements, data protection principles, and compliance procedures for handling personal data.',
      status: 'published',
      category: 'Compliance',
      duration: 45,
      difficulty: 'Intermediate',
      enrolledUsers: 38,
      completedUsers: 28,
      rating: 4.6,
      instructor: 'Michael Chen',
      lastUpdated: '2025-01-18'
    },
    {
      id: 3,
      title: 'Advanced Security Training',
      description: 'Advanced security concepts including threat modeling, risk assessment, and security architecture principles.',
      status: 'draft',
      category: 'Security',
      duration: 60,
      difficulty: 'Advanced',
      enrolledUsers: 0,
      completedUsers: 0,
      rating: 0,
      instructor: 'David Rodriguez',
      lastUpdated: '2025-01-15'
    },
    {
      id: 4,
      title: 'Password Security Best Practices',
      description: 'Master password creation, management, and multi-factor authentication implementation across various platforms.',
      status: 'published',
      category: 'Security',
      duration: 20,
      difficulty: 'Beginner',
      enrolledUsers: 52,
      completedUsers: 41,
      rating: 4.9,
      instructor: 'Lisa Park',
      lastUpdated: '2025-01-19'
    },
    {
      id: 5,
      title: 'Remote Work Security Guidelines',
      description: 'Essential security practices for remote work environments, including VPN usage and secure communication.',
      status: 'published',
      category: 'Remote Work',
      duration: 25,
      difficulty: 'Beginner',
      enrolledUsers: 67,
      completedUsers: 58,
      rating: 4.7,
      instructor: 'Alex Thompson',
      lastUpdated: '2025-01-21'
    },
    {
      id: 6,
      title: 'Phishing Awareness & Prevention',
      description: 'Learn to identify phishing attempts, social engineering tactics, and how to protect against email-based attacks.',
      status: 'published',
      category: 'Security',
      duration: 35,
      difficulty: 'Intermediate',
      enrolledUsers: 43,
      completedUsers: 36,
      rating: 4.5,
      instructor: 'Emma Wilson',
      lastUpdated: '2025-01-17'
    },
    {
      id: 7,
      title: 'Data Privacy & Protection',
      description: 'Understanding data classification, privacy laws, and implementing proper data handling procedures.',
      status: 'published',
      category: 'Compliance',
      duration: 40,
      difficulty: 'Intermediate',
      enrolledUsers: 29,
      completedUsers: 22,
      rating: 4.4,
      instructor: 'James Miller',
      lastUpdated: '2025-01-16'
    },
    {
      id: 8,
      title: 'Incident Response Training',
      description: 'Comprehensive training on security incident response procedures, escalation protocols, and recovery processes.',
      status: 'draft',
      category: 'Security',
      duration: 50,
      difficulty: 'Advanced',
      enrolledUsers: 0,
      completedUsers: 0,
      rating: 0,
      instructor: 'Rachel Green',
      lastUpdated: '2025-01-14'
    },
    {
      id: 9,
      title: 'Cloud Security Fundamentals',
      description: 'Introduction to cloud security concepts, shared responsibility model, and best practices for cloud environments.',
      status: 'published',
      category: 'Cloud Security',
      duration: 35,
      difficulty: 'Intermediate',
      enrolledUsers: 34,
      completedUsers: 27,
      rating: 4.6,
      instructor: 'Kevin Lee',
      lastUpdated: '2025-01-20'
    },
    {
      id: 10,
      title: 'Mobile Device Security',
      description: 'Securing mobile devices, BYOD policies, and protecting sensitive data on smartphones and tablets.',
      status: 'published',
      category: 'Mobile Security',
      duration: 30,
      difficulty: 'Beginner',
      enrolledUsers: 41,
      completedUsers: 33,
      rating: 4.3,
      instructor: 'Maria Garcia',
      lastUpdated: '2025-01-18'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newTraining, setNewTraining] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    difficulty: ''
  });

  const categories = ['Security', 'Compliance', 'Remote Work', 'Cloud Security', 'Mobile Security'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || training.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || training.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    totalTrainings: trainings.length,
    publishedTrainings: trainings.filter(t => t.status === 'published').length,
    totalEnrolled: trainings.reduce((sum, t) => sum + t.enrolledUsers, 0),
    completionRate: trainings.length > 0 ? 
      Math.round(trainings.reduce((sum, t) => sum + (t.enrolledUsers > 0 ? (t.completedUsers / t.enrolledUsers) * 100 : 0), 0) / trainings.length) : 0
  };

  const handleCreateTraining = (e) => {
    e.preventDefault();
    const training = {
      id: trainings.length + 1,
      ...newTraining,
      status: 'draft',
      enrolledUsers: 0,
      completedUsers: 0,
      rating: 0,
      instructor: user?.name || 'Admin',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setTrainings([...trainings, training]);
    setNewTraining({ title: '', description: '', category: '', duration: '', difficulty: '' });
    setShowCreateModal(false);
    alert('Training created successfully!');
  };

  const handleDeleteTraining = (id) => {
    if (window.confirm('Are you sure you want to delete this training?')) {
      setTrainings(trainings.filter(training => training.id !== id));
      alert('Training deleted successfully!');
    }
  };

  const handlePublishTraining = (id) => {
    setTrainings(trainings.map(training => 
      training.id === id ? { ...training, status: 'published' } : training
    ));
    alert('Training published successfully!');
  };

  const handleDuplicateTraining = (id) => {
    const training = trainings.find(t => t.id === id);
    const duplicatedTraining = {
      ...training,
      id: trainings.length + 1,
      title: `${training.title} (Copy)`,
      status: 'draft',
      enrolledUsers: 0,
      completedUsers: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setTrainings([...trainings, duplicatedTraining]);
    alert('Training duplicated successfully!');
  };

  const handleExportTraining = (id) => {
    const training = trainings.find(t => t.id === id);
    alert(`Exporting training: ${training.title}\n\nThis would generate:\n- Training content PDF\n- Participant list\n- Completion certificates\n- Analytics report`);
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
                  <BookOpen size={24} />
                  Training Management
                </h1>
                <p>Create, manage, and track training programs across your organization</p>
              </HeaderLeft>
              <HeaderActions>
                <ActionBtn className="primary" onClick={() => setShowCreateModal(true)}>
                  <Plus size={16} />
                  Create Training
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
                <UserRole>Training Manager</UserRole>
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
                <BookOpen size={20} />
              </StatIcon>
              <StatNumber>{stats.totalTrainings}</StatNumber>
              <StatLabel>Total Trainings</StatLabel>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #10B981, #059669)">
                <CheckCircle size={20} />
              </StatIcon>
              <StatNumber>{stats.publishedTrainings}</StatNumber>
              <StatLabel>Published</StatLabel>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #F59E0B, #D97706)">
                <Users size={20} />
              </StatIcon>
              <StatNumber>{stats.totalEnrolled}</StatNumber>
              <StatLabel>Total Enrolled</StatLabel>
            </StatCard>

            <StatCard>
              <StatIcon bgColor="linear-gradient(135deg, #8B5CF6, #7C3AED)">
                <TrendingUp size={20} />
              </StatIcon>
              <StatNumber>{stats.completionRate}%</StatNumber>
              <StatLabel>Completion Rate</StatLabel>
            </StatCard>
          </StatsGrid>

          <FiltersSection>
            <SearchBox>
              <Search size={20} />
              <input
                type="text"
                placeholder="Search trainings..."
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
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </FilterSelect>
          </FiltersSection>

          <TrainingGrid>
            {filteredTrainings.map(training => (
              <TrainingCard key={training.id}>
                <CategoryBadge>{training.category}</CategoryBadge>
                
                <TrainingHeader>
                  <TrainingTitle>{training.title}</TrainingTitle>
                  <TrainingStatus status={training.status}>{training.status}</TrainingStatus>
                </TrainingHeader>
                
                <TrainingDescription>{training.description}</TrainingDescription>
                
                <TrainingMeta>
                  <MetaItem>
                    <Clock size={14} />
                    <span>{training.duration} minutes</span>
                  </MetaItem>
                  <MetaItem>
                    <User size={14} />
                    <span>{training.instructor}</span>
                  </MetaItem>
                </TrainingMeta>
                
                <TrainingMeta>
                  <MetaItem>
                    <Target size={14} />
                    <span>{training.difficulty}</span>
                  </MetaItem>
                  <MetaItem>
                    <Star size={14} />
                    <span>{training.rating > 0 ? training.rating : 'N/A'}</span>
                  </MetaItem>
                </TrainingMeta>
                
                <TrainingMeta>
                  <MetaItem>
                    <Users size={14} />
                    <span>{training.enrolledUsers} enrolled</span>
                  </MetaItem>
                  <MetaItem>
                    <CheckCircle size={14} />
                    <span>{training.completedUsers} completed</span>
                  </MetaItem>
                </TrainingMeta>

                {training.enrolledUsers > 0 && (
                  <>
                    <ProgressBar>
                      <ProgressFill 
                        percentage={(training.completedUsers / training.enrolledUsers) * 100} 
                      />
                    </ProgressBar>
                    <TrainingMeta>
                      <span>Completion Rate: {Math.round((training.completedUsers / training.enrolledUsers) * 100)}%</span>
                    </TrainingMeta>
                  </>
                )}
                
                <TrainingActions>
                  <ActionButton className="primary">
                    <Edit size={14} />
                    Edit
                  </ActionButton>
                  <ActionButton className="secondary">
                    <Eye size={14} />
                    Preview
                  </ActionButton>
                  {training.status === 'draft' && (
                    <ActionButton className="success" onClick={() => handlePublishTraining(training.id)}>
                      <Play size={14} />
                      Publish
                    </ActionButton>
                  )}
                  <ActionButton className="secondary" onClick={() => handleDuplicateTraining(training.id)}>
                    <FileText size={14} />
                    Duplicate
                  </ActionButton>
                  <ActionButton className="secondary" onClick={() => handleExportTraining(training.id)}>
                    <Download size={14} />
                    Export
                  </ActionButton>
                  <ActionButton className="danger" onClick={() => handleDeleteTraining(training.id)}>
                    <Trash2 size={14} />
                    Delete
                  </ActionButton>
                </TrainingActions>
              </TrainingCard>
            ))}
          </TrainingGrid>

          {showCreateModal && (
            <CreateTrainingModal onClick={() => setShowCreateModal(false)}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <ModalTitle>Create New Training</ModalTitle>
                  <CloseButton onClick={() => setShowCreateModal(false)}>×</CloseButton>
                </ModalHeader>
                
                <form onSubmit={handleCreateTraining}>
                  <FormGroup>
                    <Label>Training Title</Label>
                    <Input
                      type="text"
                      value={newTraining.title}
                      onChange={(e) => setNewTraining({...newTraining, title: e.target.value})}
                      placeholder="Enter training title"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Description</Label>
                    <TextArea
                      value={newTraining.description}
                      onChange={(e) => setNewTraining({...newTraining, description: e.target.value})}
                      placeholder="Describe the training content and objectives"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Category</Label>
                    <Select
                      value={newTraining.category}
                      onChange={(e) => setNewTraining({...newTraining, category: e.target.value})}
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </Select>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Duration (minutes)</Label>
                    <Input
                      type="number"
                      value={newTraining.duration}
                      onChange={(e) => setNewTraining({...newTraining, duration: e.target.value})}
                      placeholder="Enter duration in minutes"
                      min="1"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Difficulty Level</Label>
                    <Select
                      value={newTraining.difficulty}
                      onChange={(e) => setNewTraining({...newTraining, difficulty: e.target.value})}
                      required
                    >
                      <option value="">Select difficulty</option>
                      {difficulties.map(difficulty => (
                        <option key={difficulty} value={difficulty}>{difficulty}</option>
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
                      Create Training
                    </ActionButton>
                  </ModalActions>
                </form>
              </ModalContent>
            </CreateTrainingModal>
          )}
        </Container>
      </MainContent>
    </Page>
  );
}