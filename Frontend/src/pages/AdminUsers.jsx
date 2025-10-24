import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Users,
  UserPlus,
  Edit,
  UserX,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Building,
  Award,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MoreVertical,
  Grid3X3,
  List,
  Activity,
  AlertCircle,
  Download,
  Upload,
  Trash2,
  UserCheck,
  LogOut
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

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2563EB;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.active ? '#3B82F6' : '#D1D5DB'};
  border-radius: 6px;
  background: ${props => props.active ? '#EFF6FF' : 'white'};
  color: ${props => props.active ? '#3B82F6' : '#64748B'};
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#EFF6FF' : '#F9FAFB'};
    border-color: #3B82F6;
  }
`;

const CategorySection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E2E8F0;
`;

const CategoryTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #3B82F6;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CategoryCount = styled.span`
  background: #EFF6FF;
  color: #3B82F6;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const UsersList = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 120px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #F8FAFC;
  border-bottom: 1px solid #E5E7EB;
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
`;

const ListRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 120px;
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

const ListCell = styled.div`
  font-size: 0.9rem;
  color: #374151;
`;

const SessionBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => {
    const activity = props.status || '';
    if (activity.includes('Active now')) return '#F0FDF4';
    if (activity.includes('Active 1 hr ago') || activity.includes('Active 6 hrs ago') || activity.includes('Active today')) return '#EFF6FF';
    if (activity.includes('Active 1 day ago') || activity.includes('Active 3 days ago')) return '#FEF3C7';
    if (activity.includes('Active 1 week ago') || activity.includes('Active 2 weeks ago')) return '#FEE2E2';
    if (activity.includes('Active long time ago')) return '#F3F4F6';
    if (activity.includes('Inactive')) return '#FEE2E2';
    // Fallback for old status values
    switch(props.status) {
      case 'active': return '#DCFCE7';
      case 'recent': return '#FEF3C7';
      case 'inactive': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    const activity = props.status || '';
    if (activity.includes('Active now')) return '#166534';
    if (activity.includes('Active 1 hr ago') || activity.includes('Active 6 hrs ago') || activity.includes('Active today')) return '#1D4ED8';
    if (activity.includes('Active 1 day ago') || activity.includes('Active 3 days ago')) return '#92400E';
    if (activity.includes('Active 1 week ago') || activity.includes('Active 2 weeks ago')) return '#991B1B';
    if (activity.includes('Active long time ago')) return '#374151';
    if (activity.includes('Inactive')) return '#991B1B';
    // Fallback for old status values
    switch(props.status) {
      case 'active': return '#166534';
      case 'recent': return '#92400E';
      case 'inactive': return '#991B1B';
      default: return '#374151';
    }
  }};
`;

const DepartmentBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  background: #EFF6FF;
  color: #3B82F6;
`;

const ListUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ListAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
`;

const ListActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E2E8F0;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #3B82F6;
  margin: 0;
`;

const ModalBody = styled.div`
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
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

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
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

const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

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

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  background: white;
  font-size: 0.9rem;
  color: #374151;
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const UserCard = styled.div`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s;

  &:hover {
    border-color: #3B82F6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
  }
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
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
  flex: 1;
`;

const UserName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0 0 0.25rem 0;
`;

const UserEmail = styled.p`
  color: #64748B;
  font-size: 0.9rem;
  margin: 0;
`;

const UserRole = styled.span`
  background: ${props => {
    switch(props.role) {
      case 'admin': return '#FEF3C7';
      case 'manager': return '#EFF6FF';
      case 'employee': return '#ECFDF5';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.role) {
      case 'admin': return '#D97706';
      case 'manager': return '#1D4ED8';
      case 'employee': return '#059669';
      default: return '#374151';
    }
  }};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const UserDetails = styled.div`
  margin-bottom: 1rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748B;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const UserActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionBtn = styled.button`
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

  &.danger {
    background: #EF4444;
    color: white;
    border-color: #EF4444;

    &:hover {
      background: #DC2626;
    }
  }
`;

const AdminUsers = ({ user, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    department: 'Engineering'
  });
  const [creating, setCreating] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState(null);
  const [deactivatePassword, setDeactivatePassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isDeactivating, setIsDeactivating] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Try to fetch from API first
        try {
          const response = await fetch(`/api/users?_t=${Date.now()}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          });
          const data = await response.json();
          
          if (data.success) {
            setUsers(data.users || []);
            setFilteredUsers(data.users || []);
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.log('API not available, using sample data');
        }

        // Generate users including dashboard users
        const generateDummyUsers = () => {
          const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Chris', 'Lisa', 'Robert', 'Jennifer', 'Amanda', 'Kevin', 'Maria', 'Tom', 'Sophie', 'James', 'Rachel', 'Alex', 'Emma', 'Daniel', 'Olivia', 'William', 'Sophia', 'Matthew', 'Isabella', 'Anthony', 'Mia', 'Joshua', 'Charlotte', 'Andrew', 'Amelia', 'Ryan', 'Harper', 'Brandon', 'Evelyn', 'Tyler', 'Abigail', 'Austin', 'Emily', 'Jordan', 'Madison', 'Dylan', 'Avery', 'Caleb', 'Sofia', 'Lucas', 'Chloe', 'Ethan', 'Victoria', 'Noah', 'Grace', 'Mason', 'Zoey', 'Jack', 'Samantha', 'Logan', 'Natalie', 'Benjamin', 'Addison', 'Carter', 'Lily', 'Samuel', 'Aubrey', 'Owen', 'Brooklyn', 'Gabriel', 'Ella', 'Henry', 'Kaylee', 'Jackson', 'Kinsley', 'Sebastian', 'Makayla', 'Aiden', 'Peyton', 'Joseph', 'Hailey', 'Luke', 'Taylor', 'Hunter', 'Leah', 'Jayden', 'Savannah', 'Wyatt', 'Mackenzie', 'Grayson', 'Serenity', 'Julian', 'Autumn', 'Cameron', 'Kylie', 'Levi', 'Stella', 'Liam', 'Brianna', 'Cooper', 'Arianna', 'Hudson', 'Maya', 'Elijah', 'Melody', 'Aaron', 'Allison', 'Colton', 'Madelyn', 'Connor', 'Aubree'];

          const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz', 'Hayes'];

          const departments = ['Engineering', 'HR', 'Finance', 'Sales', 'Marketing', 'Operations', 'IT', 'Support', 'Legal', 'Admin'];
          const roles = ['admin', 'manager', 'employee'];

          const users = [];

          // Add dashboard users first
          const dashboardUsers = [
            { name: 'Sarah Johnson', role: 'manager', department: 'Engineering', email: 'sarah.johnson@company.com', phone: '+1-555-0101' },
            { name: 'Mike Chen', role: 'employee', department: 'Finance', email: 'mike.chen@company.com', phone: '+1-555-0102' },
            { name: 'Emily Davis', role: 'admin', department: 'HR', email: 'emily.davis@company.com', phone: '+1-555-0103' },
            { name: 'David Wilson', role: 'employee', department: 'Sales', email: 'david.wilson@company.com', phone: '+1-555-0104' },
            { name: 'Lisa Brown', role: 'manager', department: 'Operations', email: 'lisa.brown@company.com', phone: '+1-555-0105' }
          ];

          dashboardUsers.forEach((user, index) => {
            const isActive = Math.random() > 0.1;
            const currentSession = isActive && Math.random() > 0.7;
            const daysSinceLastLogin = Math.floor(Math.random() * 7);
            const hoursSinceLastLogin = Math.floor(Math.random() * 24);
            
            let activityLevel;
            if (isActive) {
              if (currentSession) {
                activityLevel = 'Active now';
              } else if (daysSinceLastLogin === 0 && hoursSinceLastLogin < 1) {
                activityLevel = 'Active 1 hr ago';
              } else if (daysSinceLastLogin === 0 && hoursSinceLastLogin < 6) {
                activityLevel = 'Active 6 hrs ago';
              } else if (daysSinceLastLogin === 0) {
                activityLevel = 'Active today';
              } else if (daysSinceLastLogin === 1) {
                activityLevel = 'Active 1 day ago';
              } else if (daysSinceLastLogin <= 3) {
                activityLevel = 'Active 3 days ago';
              } else {
                activityLevel = 'Active 1 week ago';
              }
            } else {
              activityLevel = 'Inactive';
            }
            
            users.push({
              _id: `dashboard-${index + 1}`,
              name: user.name,
              email: user.email,
              role: user.role,
              department: user.department,
              isActive,
              lastLogin: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString(),
              createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
              phone: user.phone,
              loginCount: Math.floor(Math.random() * 50) + 20,
              currentSession,
              activityLevel
            });
          });

          // Generate additional users
          for (let i = 1; i <= 95; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const name = `${firstName} ${lastName}`;
            const role = i <= 2 ? 'admin' : (i <= 12 ? 'manager' : 'employee');
            const department = departments[Math.floor(Math.random() * departments.length)];

            // Generate realistic session data
            const loginCount = Math.floor(Math.random() * 200) + 10;

            // Generate activity level with time-based indicators
            const daysSinceLastLogin = Math.floor(Math.random() * 30);
            const hoursSinceLastLogin = Math.floor(Math.random() * 24);
            const isActive = Math.random() > 0.1; // 90% active users
            const currentSession = isActive && Math.random() > 0.7; // 30% of active users have current session
            
            let activityLevel;
            if (isActive) {
              if (currentSession) {
                activityLevel = 'Active now';
              } else if (daysSinceLastLogin === 0 && hoursSinceLastLogin < 1) {
                activityLevel = 'Active 1 hr ago';
              } else if (daysSinceLastLogin === 0 && hoursSinceLastLogin < 6) {
                activityLevel = 'Active 6 hrs ago';
              } else if (daysSinceLastLogin === 0) {
                activityLevel = 'Active today';
              } else if (daysSinceLastLogin === 1) {
                activityLevel = 'Active 1 day ago';
              } else if (daysSinceLastLogin <= 3) {
                activityLevel = 'Active 3 days ago';
              } else if (daysSinceLastLogin <= 7) {
                activityLevel = 'Active 1 week ago';
              } else if (daysSinceLastLogin <= 14) {
                activityLevel = 'Active 2 weeks ago';
              } else {
                activityLevel = 'Active long time ago';
              }
            } else {
              activityLevel = 'Inactive';
            }

            let lastLogin;
            if (currentSession || daysSinceLastLogin === 0) {
              lastLogin = new Date().toISOString();
            } else {
              lastLogin = new Date(Date.now() - daysSinceLastLogin * 24 * 60 * 60 * 1000).toISOString();
            }

            users.push({
              _id: i.toString(),
              name,
              email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
              role,
              department,
              isActive,
              lastLogin,
              createdAt: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
              phone: `+1-555-${(1000 + i).toString().slice(1)}`,
              loginCount,
              currentSession,
              activityLevel
            });
          }

          return users;
        };

        const sampleUsers = generateDummyUsers();

        setUsers(sampleUsers);
        setFilteredUsers(sampleUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]); // Re-fetch when user changes

  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter(user =>
        statusFilter === 'active' ? user.isActive : !user.isActive
      );
    }

    // Sort by active status first, then by current session
    filtered.sort((a, b) => {
      if (a.isActive && !b.isActive) return -1;
      if (!a.isActive && b.isActive) return 1;
      if (a.currentSession && !b.currentSession) return -1;
      if (!a.currentSession && b.currentSession) return 1;
      return new Date(b.lastLogin) - new Date(a.lastLogin);
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Categorize users for display
  const categorizedUsers = {
    activeWithSession: filteredUsers.filter(user => user.isActive && user.currentSession),
    active: filteredUsers.filter(user => user.isActive && !user.currentSession),
    inactive: filteredUsers.filter(user => !user.isActive)
  };

  const handleUserAction = async (userId, action) => {
    if (action === 'create') {
      setShowCreateModal(true);
      return;
    }

    if (action === 'deactivate') {
      const user = users.find(u => u._id === userId);
      setUserToDeactivate(user);
      setShowDeactivateModal(true);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action })
      });

      if (response.ok) {
        // Refresh users list
        const usersResponse = await fetch('/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const usersData = await usersResponse.json();

        if (usersData.success) {
          setUsers(usersData.users || []);
        }
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleConfirmDeactivate = async () => {
    if (!deactivatePassword.trim()) {
      setPasswordError('Password is required');
      return;
    }

    setIsDeactivating(true);
    setPasswordError('');

    try {
      const token = localStorage.getItem('token');
      
      // First verify password
      const verifyResponse = await fetch('/api/auth/verify-password', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: deactivatePassword })
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        setPasswordError('Invalid password');
        setIsDeactivating(false);
        return;
      }

      // Deactivate user
      const response = await fetch(`/api/users/${userToDeactivate._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'deactivate' })
      });

      if (response.ok) {
        // Update local state
        setUsers(prev => prev.map(user => 
          user._id === userToDeactivate._id 
            ? { ...user, isActive: false, activityLevel: 'inactive' }
            : user
        ));
        
        setShowDeactivateModal(false);
        setUserToDeactivate(null);
        setDeactivatePassword('');
        alert('User deactivated successfully!');
      } else {
        alert('Failed to deactivate user');
      }
    } catch (error) {
      console.error('Error deactivating user:', error);
      alert('Failed to deactivate user. Please try again.');
    } finally {
      setIsDeactivating(false);
    }
  };

  const handleCancelDeactivate = () => {
    setShowDeactivateModal(false);
    setUserToDeactivate(null);
    setDeactivatePassword('');
    setPasswordError('');
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createForm)
      });

      const data = await response.json();

      if (data.success) {
        setUsers(prev => [...prev, data.user]);
        setShowCreateModal(false);
        setCreateForm({
          name: '',
          email: '',
          password: '',
          role: 'employee',
          department: 'Engineering'
        });
        alert('User created successfully!');
      } else {
        alert(data.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setCreateForm({
      name: '',
      email: '',
      password: '',
      role: 'employee',
      department: 'Engineering'
    });
  };

  if (loading) {
    return (
      <Page>
        <Sidebar user={user} onLogout={onLogout} />
        <MainContent>
          <Container>
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div style={{ fontSize: '1.5rem', color: '#64748B' }}>Loading users...</div>
            </div>
          </Container>
        </MainContent>
      </Page>
    );
  }

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <div>
              <Greeting>User Management</Greeting>
              <Subtext>Manage system users and their permissions ({filteredUsers.length} of {users.length} users)</Subtext>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <ViewToggle>
                <ToggleButton
                  active={viewMode === 'grid'}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 size={14} />
                  Grid
                </ToggleButton>
                <ToggleButton
                  active={viewMode === 'list'}
                  onClick={() => setViewMode('list')}
                >
                  <List size={14} />
                  List
                </ToggleButton>
              </ViewToggle>
              <ActionButton onClick={() => handleUserAction(null, 'create')}>
                <UserPlus size={16} />
                Add New User
              </ActionButton>
            </div>
          </Header>

          <SearchFilterSection>
            <SearchInput>
              <SearchIcon />
              <SearchField
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInput>

            <FilterSelect
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </FilterSelect>

            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FilterSelect>
          </SearchFilterSection>

          {/* Active Users with Current Session */}
          {categorizedUsers.activeWithSession.length > 0 && (
            <CategorySection>
              <CategoryHeader>
                <CategoryTitle>
                  <Activity size={20} />
                  Active Users (Currently Online)
                </CategoryTitle>
                <CategoryCount>{categorizedUsers.activeWithSession.length}</CategoryCount>
              </CategoryHeader>
              {viewMode === 'grid' ? (
                <UsersGrid>
                  {categorizedUsers.activeWithSession.map((user) => (
                    <UserCard key={user._id}>
                      <UserHeader>
                        <UserAvatar>
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </UserAvatar>
                        <UserInfo>
                          <UserName>{user.name}</UserName>
                          <UserEmail>{user.email}</UserEmail>
                        </UserInfo>
                        <UserRole role={user.role}>
                          {user.role}
                        </UserRole>
                      </UserHeader>

                      <UserDetails>
                        <DetailItem>
                          <Building size={18} />
                          {user.department}
                        </DetailItem>
                        <DetailItem>
                          <Phone size={18} />
                          {user.phone}
                        </DetailItem>
                        <DetailItem>
                          <Award size={18} />
                          Login count: {user.loginCount}
                        </DetailItem>
                        <DetailItem>
                          <Activity size={18} />
                          <SessionBadge status="active">{user.activityLevel}</SessionBadge>
                        </DetailItem>
                      </UserDetails>

                      <UserActions>
                        <ActionBtn onClick={() => handleUserAction(user._id, 'edit')}>
                          <Edit size={16} />
                          Edit Info
                        </ActionBtn>
                        <ActionBtn onClick={() => handleUserAction(user._id, 'view')}>
                          <Eye size={16} />
                          View
                        </ActionBtn>
                        <ActionBtn className="danger" onClick={() => handleUserAction(user._id, 'deactivate')}>
                          <UserX size={16} />
                          Deactivate
                        </ActionBtn>
                      </UserActions>
                    </UserCard>
                  ))}
                </UsersGrid>
              ) : (
                <UsersList>
                  <ListHeader>
                    <div>User</div>
                    <div>Role</div>
                    <div>Department</div>
                    <div>Login Count</div>
                    <div>Activity</div>
                    <div>Actions</div>
                  </ListHeader>
                  {categorizedUsers.activeWithSession.map((user) => (
                    <ListRow key={user._id}>
                      <ListUserInfo>
                        <ListAvatar>
                          {user.name.charAt(0).toUpperCase()}
                        </ListAvatar>
                        <div>
                          <div style={{ fontWeight: '600', color: '#3B82F6' }}>{user.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{user.email}</div>
                        </div>
                      </ListUserInfo>
                      <DepartmentBadge>{user.role}</DepartmentBadge>
                      <ListCell>{user.department}</ListCell>
                      <ListCell>{user.loginCount} logins</ListCell>
                      <ListCell>
                        <SessionBadge status="active">{user.activityLevel}</SessionBadge>
                      </ListCell>
                      <ListActions>
                        <ActionBtn onClick={() => handleUserAction(user._id, 'edit')}>
                          <Edit size={14} />
                        </ActionBtn>
                        <ActionBtn onClick={() => handleUserAction(user._id, 'view')}>
                          <Eye size={14} />
                        </ActionBtn>
                        <ActionBtn className="danger" onClick={() => handleUserAction(user._id, 'deactivate')}>
                          <UserX size={14} />
                        </ActionBtn>
                      </ListActions>
                    </ListRow>
                  ))}
                </UsersList>
              )}
            </CategorySection>
          )}

          {/* Active Users */}
          {categorizedUsers.active.length > 0 && (
            <CategorySection>
              <CategoryHeader>
                <CategoryTitle>
                  <CheckCircle size={20} />
                  Active Users
                </CategoryTitle>
                <CategoryCount>{categorizedUsers.active.length}</CategoryCount>
              </CategoryHeader>
              {viewMode === 'grid' ? (
                <UsersGrid>
                  {categorizedUsers.active.map((user) => (
                    <UserCard key={user._id}>
                      <UserHeader>
                        <UserAvatar>
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </UserAvatar>
                        <UserInfo>
                          <UserName>{user.name}</UserName>
                          <UserEmail>{user.email}</UserEmail>
                        </UserInfo>
                        <UserRole role={user.role}>
                          {user.role}
                        </UserRole>
                      </UserHeader>

                      <UserDetails>
                        <DetailItem>
                          <Building size={18} />
                          {user.department}
                        </DetailItem>
                        <DetailItem>
                          <Phone size={18} />
                          {user.phone}
                        </DetailItem>
                        <DetailItem>
                          <Award size={18} />
                          Login count: {user.loginCount}
                        </DetailItem>
                        <DetailItem>
                          <Activity size={18} />
                          <SessionBadge status="recent">{user.activityLevel}</SessionBadge>
                        </DetailItem>
                      </UserDetails>

                      <UserActions>
                        <ActionBtn onClick={() => handleUserAction(user._id, 'edit')}>
                          <Edit size={16} />
                          Edit Info
                        </ActionBtn>
                        <ActionBtn onClick={() => handleUserAction(user._id, 'view')}>
                          <Eye size={16} />
                          View
                        </ActionBtn>
                        <ActionBtn className="danger" onClick={() => handleUserAction(user._id, 'deactivate')}>
                          <UserX size={16} />
                          Deactivate
                        </ActionBtn>
                      </UserActions>
                    </UserCard>
                  ))}
                </UsersGrid>
              ) : (
                <UsersList>
                  <ListHeader>
                    <div>User</div>
                    <div>Role</div>
                    <div>Department</div>
                    <div>Login Count</div>
                    <div>Activity</div>
                    <div>Actions</div>
                  </ListHeader>
                  {categorizedUsers.active.map((user) => (
                    <ListRow key={user._id}>
                      <ListUserInfo>
                        <ListAvatar>
                          {user.name.charAt(0).toUpperCase()}
                        </ListAvatar>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1E293B' }}>{user.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{user.email}</div>
                        </div>
                      </ListUserInfo>
                      <DepartmentBadge>{user.role}</DepartmentBadge>
                      <ListCell>{user.department}</ListCell>
                      <ListCell>{user.loginCount} logins</ListCell>
                      <ListCell>
                        <SessionBadge status="recent">{user.activityLevel}</SessionBadge>
                      </ListCell>
                      <ListActions>
                        <ActionBtn onClick={() => handleUserAction(user._id, 'edit')}>
                          <Edit size={14} />
                        </ActionBtn>
                        <ActionBtn onClick={() => handleUserAction(user._id, 'view')}>
                          <Eye size={14} />
                        </ActionBtn>
                        <ActionBtn className="danger" onClick={() => handleUserAction(user._id, 'deactivate')}>
                          <UserX size={14} />
                        </ActionBtn>
                      </ListActions>
                    </ListRow>
                  ))}
                </UsersList>
              )}
            </CategorySection>
          )}

          {/* Inactive Users */}
          {categorizedUsers.inactive.length > 0 && (
            <CategorySection>
              <CategoryHeader>
                <CategoryTitle>
                  <XCircle size={20} />
                  Inactive Users
                </CategoryTitle>
                <CategoryCount>{categorizedUsers.inactive.length}</CategoryCount>
              </CategoryHeader>
              {viewMode === 'grid' ? (
                <UsersGrid>
                  {categorizedUsers.inactive.map((user) => (
                    <UserCard key={user._id}>
                      <UserHeader>
                        <UserAvatar>
                          {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </UserAvatar>
                        <UserInfo>
                          <UserName>{user.name}</UserName>
                          <UserEmail>{user.email}</UserEmail>
                        </UserInfo>
                        <UserRole role={user.role}>
                          {user.role}
                        </UserRole>
                      </UserHeader>

                      <UserDetails>
                        <DetailItem>
                          <Building size={18} />
                          {user.department}
                        </DetailItem>
                        <DetailItem>
                          <Phone size={18} />
                          {user.phone}
                        </DetailItem>
                        <DetailItem>
                          <MapPin size={18} />
                          {user.location}
                        </DetailItem>
                        <DetailItem>
                          <Clock size={18} />
                          Last login: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                        </DetailItem>
                        <DetailItem>
                          <Award size={18} />
                          Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                        </DetailItem>
                        <DetailItem>
                          <Activity size={18} />
                          <SessionBadge status="inactive">Inactive</SessionBadge>
                        </DetailItem>
                      </UserDetails>

                      <UserActions>
                        <ActionBtn onClick={() => handleUserAction(user._id, 'edit')}>
                          <Edit size={16} />
                          Edit Info
                        </ActionBtn>
                        <ActionBtn onClick={() => handleUserAction(user._id, 'view')}>
                          <Eye size={16} />
                          View
                        </ActionBtn>
                        <ActionBtn className="primary" onClick={() => handleUserAction(user._id, 'activate')}>
                          <CheckCircle size={16} />
                          Activate
                        </ActionBtn>
                      </UserActions>
                    </UserCard>
                  ))}
                </UsersGrid>
              ) : (
                <UsersList>
                  <ListHeader>
                    <div>User</div>
                    <div>Role</div>
                    <div>Department</div>
                    <div>Last Login</div>
                    <div>Join Date</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </ListHeader>
                  {categorizedUsers.inactive.map((user) => (
                    <ListRow key={user._id}>
                      <ListUserInfo>
                        <ListAvatar>
                          {user.name.charAt(0).toUpperCase()}
                        </ListAvatar>
                        <div>
                          <div style={{ fontWeight: '600', color: '#6B7280' }}>{user.name}</div>
                          <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>{user.email}</div>
                        </div>
                      </ListUserInfo>
                      <DepartmentBadge>{user.role}</DepartmentBadge>
                      <ListCell>{user.department}</ListCell>
                      <ListCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</ListCell>
                      <ListCell>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</ListCell>
                      <ListCell>
                        <SessionBadge status="inactive">Inactive</SessionBadge>
                      </ListCell>
                      <ListActions>
                        <ActionBtn onClick={() => handleUserAction(user._id, 'edit')}>
                          <Edit size={14} />
                        </ActionBtn>
                        <ActionBtn onClick={() => handleUserAction(user._id, 'view')}>
                          <Eye size={14} />
                        </ActionBtn>
                        <ActionBtn className="primary" onClick={() => handleUserAction(user._id, 'activate')}>
                          <CheckCircle size={14} />
                        </ActionBtn>
                      </ListActions>
                    </ListRow>
                  ))}
                </UsersList>
              )}
            </CategorySection>
          )}

          {filteredUsers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
              <Users size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No users found</div>
              <div>Try adjusting your search or filters</div>
            </div>
          )}
        </Container>
      </MainContent>

      {/* Create User Modal */}
      {showCreateModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Create New User</ModalTitle>
              <button
                onClick={handleCloseModal}
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
            </ModalHeader>

            <form onSubmit={handleCreateUser}>
              <ModalBody>
                <FormGroup>
                  <FormLabel>Full Name</FormLabel>
                  <FormInput
                    type="text"
                    value={createForm.name}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Email Address</FormLabel>
                  <FormInput
                    type="email"
                    value={createForm.email}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Password</FormLabel>
                  <FormInput
                    type="password"
                    value={createForm.password}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Role</FormLabel>
                  <FormSelect
                    value={createForm.role}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, role: e.target.value }))}
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </FormSelect>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Department</FormLabel>
                  <FormSelect
                    value={createForm.department}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, department: e.target.value }))}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="IT">IT</option>
                    <option value="Support">Support</option>
                    <option value="Legal">Legal</option>
                    <option value="Admin">Admin</option>
                  </FormSelect>
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <button
                  type="button"
                  onClick={handleCloseModal}
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
                  type="submit"
                  disabled={creating}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: creating ? 'not-allowed' : 'pointer',
                    fontWeight: '500',
                    opacity: creating ? 0.7 : 1
                  }}
                >
                  {creating ? 'Creating...' : 'Create User'}
                </button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      )}

      {/* Deactivate User Modal */}
      {showDeactivateModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Deactivate User</ModalTitle>
              <button
                onClick={handleCancelDeactivate}
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
            </ModalHeader>

            <ModalBody>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '1rem', fontWeight: '600', color: '#1E293B', marginBottom: '0.5rem' }}>
                  Confirm Deactivation
                </div>
                <div style={{ color: '#64748B', marginBottom: '1rem' }}>
                  Are you sure you want to deactivate <strong>{userToDeactivate?.name}</strong>? 
                  This action will prevent them from accessing the system.
                </div>
              </div>

              <FormGroup>
                <FormLabel>Enter your password to confirm</FormLabel>
                <FormInput
                  type="password"
                  value={deactivatePassword}
                  onChange={(e) => setDeactivatePassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                {passwordError && (
                  <div style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    {passwordError}
                  </div>
                )}
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <button
                type="button"
                onClick={handleCancelDeactivate}
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
                type="button"
                onClick={handleConfirmDeactivate}
                disabled={isDeactivating}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#EF4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: isDeactivating ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  opacity: isDeactivating ? 0.7 : 1
                }}
              >
                {isDeactivating ? 'Deactivating...' : 'Deactivate User'}
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Page>
  );
};

export default AdminUsers;
