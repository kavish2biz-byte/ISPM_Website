import React from "react";
import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Sidebar from '../components/shared/Sidebar';
import { dashboardDataService } from '../services/dashboardData';

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
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 0.5rem 0;
`;

const Subtitle = styled.p`
  color: #6B7280;
  margin: 0;
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
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserDisplayName = styled.div`
  font-weight: 600;
  color: #1F2937;
  font-size: 1rem;
`;

const UserRole = styled.div`
  color: #6B7280;
  font-size: 0.85rem;
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

const TeamManagement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Toolbar = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  h2 {
    font-size: 1.75rem;
    margin: 0 0 6px;
  }

  p {
    margin: 0;
    color: #475569;
  }
`;

const CTAButton = styled.button`
  background: #2563EB;
  color: #fff;
  border: none;
  padding: 12px 22px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #1D4ED8;
  }
`;

const Toast = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #CBD5F5;
  background: #EEF2FF;
  color: #1E3A8A;

  &.success {
    border-color: #BBF7D0;
    background: #DCFCE7;
    color: #166534;
  }

  &.error {
    border-color: #FECACA;
    background: #FEE2E2;
    color: #B91C1C;
  }
`;

const Metrics = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
`;

const Metric = styled.article`
  background: #fff;
  border-radius: 16px;
  padding: 18px;
  border: 1px solid #E2E8F0;
`;

const MetricLabel = styled.p`
  margin: 0 0 8px;
  color: #64748B;
  font-size: 0.85rem;
`;

const MetricValue = styled.p`
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
  color: #0F172A;
`;

const Form = styled.form`
  background: #fff;
  border: 1px solid #E2E8F0;
  border-radius: 18px;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 18px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.8rem;
    color: #475569;
  }

  input, select {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #CBD5F5;
    font: inherit;
  }
`;

const FormActions = styled.div`
  display: flex;
  align-items: flex-end;

  button {
    padding: 12px 22px;
    border-radius: 12px;
    border: none;
    background: #2563EB;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }
`;

const Panel = styled.section`
  background: #fff;
  border-radius: 18px;
  border: 1px solid #E2E8F0;
`;

const Filters = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  border-bottom: 1px solid #E2E8F0;

  input, select {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #CBD5F5;
    font: inherit;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 14px 18px;
    border-bottom: 1px solid #E2E8F0;
    text-align: left;
    color: #0F172A;
  }

  th {
    background: #F1F5F9;
    color: #475569;
    font-weight: 600;
  }
`;

const TableActions = styled.td`
  text-align: right;
  width: 200px;
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #E0E7FF;
  color: #312E81;
  display: grid;
  place-items: center;
  font-weight: 600;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;

  &.is-active {
    background: #DCFCE7;
    color: #15803D;
  }

  &.is-inactive {
    background: #FEE2E2;
    color: #B91C1C;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    padding: 8px 14px;
    border-radius: 10px;
    border: 1px solid #CBD5F5;
    background: transparent;
    cursor: pointer;
    font-weight: 600;
    color: #475569;

    &:hover {
      background: #E0E7FF;
    }

    &:last-child {
      border-color: #FECACA;
      color: #B91C1C;

      &:hover {
        background: #FEE2E2;
      }
    }
  }
`;

const EmptyState = styled.td`
  text-align: center;
  color: #64748B;
  padding: 28px;
`;

const ProfileModal = styled.aside`
  background: #fff;
  border: 1px solid #E2E8F0;
  border-radius: 18px;
  padding: 20px;
  max-width: 420px;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    h3 {
      margin: 0;
      font-size: 1.25rem;
    }

    button {
      background: none;
      border: none;
      color: #2563EB;
      cursor: pointer;
      font-weight: 600;
    }
  }
`;

const ProfileBody = styled.div`
  display: grid;
  gap: 8px;
  color: #475569;
`;

const ProfileSection = styled.div`
  margin-top: 18px;

  h4 {
    margin: 0 0 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 8px;

    li {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: #475569;
    }
  }
`;

const AuditLog = styled.section`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #E2E8F0;
  padding: 20px;
  display: grid;
  gap: 16px;

  h3 {
    margin: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 12px;

    li {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      border-radius: 12px;
      border: 1px solid #E2E8F0;
      background: #F8FAFC;

      p {
        margin: 0;
      }

      span {
        font-size: 0.8rem;
        color: #64748B;
      }
    }
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const ChartTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1F2937;
`;

const TeamOverviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const OverviewCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  text-align: center;
`;

const OverviewNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 0.5rem;
`;

const OverviewLabel = styled.div`
  color: #6B7280;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #E2E8F0;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.color || '#3B82F6'};
  width: ${props => props.percentage || 0}%;
  transition: width 0.3s ease;
`;

const DepartmentCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const DepartmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const DepartmentName = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1F2937;
`;

const DepartmentStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 0.75rem;
  background: #F8FAFC;
  border-radius: 8px;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: #6B7280;
  font-weight: 500;
`;

const roles = ["employee", "manager", "admin"];
const departments = ["HR", "Finance", "Engineering", "Sales", "Operations"];
const initialRows = [
  { id: "u1", name: "Nimal Perera", email: "nimal@company.com", role: "employee", department: "Engineering", active: true },
  { id: "u2", name: "Sithmi Jay", email: "sithmi@company.com", role: "employee", department: "Sales", active: true },
  { id: "u3", name: "Kasun Silva", email: "kasun@company.com", role: "manager", department: "Operations", active: true },
  { id: "u4", name: "Ishara Fernando", email: "ishara@company.com", role: "employee", department: "HR", active: false },
];

const memberInsights = {
  u1: {
    progress: [
      { label: "Email Security", percent: 100 },
      { label: "Remote Work", percent: 60 },
      { label: "Phishing 101", percent: 40 },
    ],
    recent: [
      { title: "Policy: Email Security", status: "Acknowledged" },
      { title: "Course: Secure Browsing", status: "60% complete" },
    ],
  },
  u2: {
    progress: [
      { label: "Sales Playbook", percent: 80 },
      { label: "Phishing 101", percent: 100 },
    ],
    recent: [
      { title: "Course: Phishing 101", status: "Completed" },
      { title: "Policy: Remote Work", status: "Pending" },
    ],
  },
  u3: {
    progress: [
      { label: "Manager Handbook", percent: 100 },
      { label: "Incident Response", percent: 75 },
    ],
    recent: [
      { title: "Policy: Manager Handbook", status: "Acknowledged" },
      { title: "Course: Incident Response", status: "In progress" },
    ],
  },
  u4: {
    progress: [
      { label: "HR Basics", percent: 20 },
      { label: "Phishing 101", percent: 0 },
    ],
    recent: [
      { title: "Course: HR Basics", status: "20% complete" },
      { title: "Policy: Code of Conduct", status: "Pending" },
    ],
  },
};

function TeamManagementComponent({ user, onLogout }) {
  const [query, setQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [deptFilter, setDeptFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rows, setRows] = React.useState([]);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    role: roles[0],
    department: departments[0],
    status: "active",
  });
  const [auditLog, setAuditLog] = React.useState([
    { id: "log_1", message: "Imported initial roster from CSV", timestamp: "Yesterday" },
  ]);
  const [toast, setToast] = React.useState(null);
  const [teamOverview, setTeamOverview] = React.useState(null);
  const [dashboardData, setDashboardData] = React.useState(null);

  // Subscribe to data changes
  React.useEffect(() => {
    const unsubscribe = dashboardDataService.subscribe((data) => {
      setDashboardData(data);
      setRows(data.users);
      setTeamOverview(dashboardDataService.getTeamOverview());
    });

    // Initialize data
    const initialData = dashboardDataService.getAllData();
    setDashboardData(initialData);
    setRows(initialData.users);
    setTeamOverview(dashboardDataService.getTeamOverview());

    return unsubscribe;
  }, []);

  const filteredRows = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((member) => {
      const matchesQuery =
        !needle ||
        member.name.toLowerCase().includes(needle) ||
        member.email.toLowerCase().includes(needle);
      const matchesRole = roleFilter === "all" || member.role === roleFilter;
      const matchesDept = deptFilter === "all" || member.department === deptFilter;
      const matchesStatus =
        statusFilter === "all" || (statusFilter === "active" ? member.active : !member.active);
      return matchesQuery && matchesRole && matchesDept && matchesStatus;
    });
  }, [rows, query, roleFilter, deptFilter, statusFilter]);

  const metrics = React.useMemo(() => {
    const activeMembers = rows.filter((member) => member.active).length;
    const pendingMembers = rows.length - activeMembers;
    const completionRate = rows.length === 0 ? 0 : Math.round((activeMembers / rows.length) * 100);

    return [
      { label: "Total Members", value: rows.length },
      { label: "Active Members", value: activeMembers },
      { label: "Pending Invites", value: pendingMembers },
      { label: "Completion Rate", value: `${completionRate}%` },
    ];
  }, [rows]);

  const pushAudit = (message) => {
    setAuditLog((prev) => [
      { id: `log_${Date.now()}`, message, timestamp: "Just now" },
      ...prev,
    ].slice(0, 8));
  };

  const showToastMessage = (message, tone = "info") => {
    setToast({ message, tone });
    setTimeout(() => setToast(null), 3500);
  };

  const handleFormFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleAddMember = (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      showToastMessage("Provide a name and email before adding a member.", "error");
      return;
    }

    const nextMember = {
      id: `u${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
      department: formData.department,
      active: formData.status === "active",
    };

    setRows((previous) => [...previous, nextMember]);
    setFormData({ name: "", email: "", role: roles[0], department: departments[0], status: "active" });
    setShowAddForm(false);
    pushAudit(`Added ${nextMember.name} to the team (${nextMember.role}, ${nextMember.department}).`);
    showToastMessage(`Added ${nextMember.name} to your team.`, "success");
  };

  const handleRoleChange = (id, value) => {
    const member = rows.find((entry) => entry.id === id);
    if (!member) {
      return;
    }
    setRows((previous) => previous.map((entry) => (entry.id === id ? { ...entry, role: value } : entry)));
    setSelectedMember((prev) => (prev && prev.id === id ? { ...prev, role: value } : prev));
    pushAudit(`Updated ${member.name}'s role to ${value}.`);
    showToastMessage(`Role updated for ${member.name}.`, "success");
  };

  const handleDepartmentChange = (id, value) => {
    const member = rows.find((entry) => entry.id === id);
    if (!member) {
      return;
    }
    setRows((previous) => previous.map((entry) => (entry.id === id ? { ...entry, department: value } : entry)));
    setSelectedMember((prev) => (prev && prev.id === id ? { ...prev, department: value } : prev));
    pushAudit(`Moved ${member.name} to the ${value} department.`);
    showToastMessage(`Department updated for ${member.name}.`, "success");
  };

  const handleRemove = (id) => {
    const member = rows.find((entry) => entry.id === id);
    setRows((previous) => previous.filter((entry) => entry.id !== id));
    if (selectedMember?.id === id) {
      setSelectedMember(null);
    }
    if (member) {
      pushAudit(`Removed ${member.name} from your managed team.`);
      showToastMessage(`${member.name} removed from the team.`, "success");
    }
  };

  const openProfile = (member) => {
    const insights = memberInsights[member.id] ?? { progress: [], recent: [] };
    setSelectedMember({ ...member, ...insights });
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <HeaderContent>
              <Title>Team Management</Title>
              <Subtitle>Maintain the company roster, roles, and compliance status from a single workspace.</Subtitle>
            </HeaderContent>
            <UserProfile>
              <UserAvatar>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
              </UserAvatar>
              <UserInfo>
                <UserDisplayName>{user?.name || 'Manager'}</UserDisplayName>
                <UserRole>Team Manager</UserRole>
              </UserInfo>
              <LogoutButton onClick={() => {
                onLogout();
              }}>
                Logout
              </LogoutButton>
            </UserProfile>
          </Header>

          <TeamManagement>
            <Toolbar>
              <div>
                <h2>Team Management</h2>
                <p>Maintain the company roster, roles, and compliance status from a single workspace.</p>
              </div>
              <CTAButton
                type="button"
                onClick={() => setShowAddForm((previous) => !previous)}
              >
                {showAddForm ? "Close" : "Add Member"}
              </CTAButton>
            </Toolbar>

            {toast && (
              <Toast className={`team-toast--${toast.tone}`} role="status">
                <span>{toast.message}</span>
              </Toast>
            )}

            {teamOverview && (
              <>
                <TeamOverviewGrid>
                  <OverviewCard>
                    <OverviewNumber>{teamOverview.totalMembers}</OverviewNumber>
                    <OverviewLabel>Total Team Members</OverviewLabel>
                    <ProgressBar>
                      <ProgressFill percentage={100} color="#3B82F6" />
                    </ProgressBar>
                  </OverviewCard>
                  <OverviewCard>
                    <OverviewNumber>{teamOverview.activeMembers}</OverviewNumber>
                    <OverviewLabel>Active Members</OverviewLabel>
                    <ProgressBar>
                      <ProgressFill percentage={(teamOverview.activeMembers / teamOverview.totalMembers) * 100} color="#10B981" />
                    </ProgressBar>
                  </OverviewCard>
                  <OverviewCard>
                    <OverviewNumber>{teamOverview.averageProgress}%</OverviewNumber>
                    <OverviewLabel>Average Progress</OverviewLabel>
                    <ProgressBar>
                      <ProgressFill percentage={teamOverview.averageProgress} color="#F59E0B" />
                    </ProgressBar>
                  </OverviewCard>
                  <OverviewCard>
                    <OverviewNumber>{Object.keys(teamOverview.departmentBreakdown).length}</OverviewNumber>
                    <OverviewLabel>Departments</OverviewLabel>
                    <ProgressBar>
                      <ProgressFill percentage={100} color="#8B5CF6" />
                    </ProgressBar>
                  </OverviewCard>
                </TeamOverviewGrid>

                <ChartsGrid>
                  <ChartCard>
                    <ChartTitle>Department Distribution</ChartTitle>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={Object.entries(teamOverview.departmentBreakdown).map(([dept, data]) => ({
                            name: dept,
                            value: data.total,
                            active: data.active
                          }))}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}`}
                        >
                          {Object.entries(teamOverview.departmentBreakdown).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'][index % 5]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartCard>

                  <ChartCard>
                    <ChartTitle>Team Progress by Department</ChartTitle>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={Object.entries(teamOverview.departmentBreakdown).map(([dept, data]) => ({
                        department: dept,
                        progress: Math.round(data.avgProgress / data.total),
                        members: data.total
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="progress" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </ChartsGrid>

                <DepartmentCard>
                  <DepartmentHeader>
                    <DepartmentName>Department Breakdown</DepartmentName>
                  </DepartmentHeader>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {Object.entries(teamOverview.departmentBreakdown).map(([dept, data]) => (
                      <div key={dept} style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '8px' }}>
                        <h5 style={{ margin: '0 0 0.5rem 0', color: '#1F2937' }}>{dept}</h5>
                        <DepartmentStats>
                          <StatItem>
                            <StatNumber>{data.total}</StatNumber>
                            <StatLabel>Total</StatLabel>
                          </StatItem>
                          <StatItem>
                            <StatNumber>{data.active}</StatNumber>
                            <StatLabel>Active</StatLabel>
                          </StatItem>
                          <StatItem>
                            <StatNumber>{Math.round(data.avgProgress / data.total)}%</StatNumber>
                            <StatLabel>Avg Progress</StatLabel>
                          </StatItem>
                        </DepartmentStats>
                      </div>
                    ))}
                  </div>
                </DepartmentCard>
              </>
            )}

            <Metrics>
              {metrics.map((metric) => (
                <Metric key={metric.label}>
                  <MetricLabel>{metric.label}</MetricLabel>
                  <MetricValue>{metric.value}</MetricValue>
                </Metric>
              ))}
            </Metrics>

            {showAddForm && (
              <Form onSubmit={handleAddMember}>
                <FormField>
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleFormFieldChange}
                    placeholder="Jane Doe"
                  />
                </FormField>
                <FormField>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormFieldChange}
                    placeholder="jane@company.com"
                  />
                </FormField>
                <FormField>
                  <label htmlFor="role">Role</label>
                  <select id="role" name="role" value={formData.role} onChange={handleFormFieldChange}>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField>
                  <label htmlFor="department">Department</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleFormFieldChange}
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField>
                  <label htmlFor="status">Status</label>
                  <select id="status" name="status" value={formData.status} onChange={handleFormFieldChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </FormField>
                <FormActions>
                  <button type="submit">Save Member</button>
                </FormActions>
              </Form>
            )}

            <Panel>
              <Filters>
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
                  <option value="all">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <select value={deptFilter} onChange={(event) => setDeptFilter(event.target.value)}>
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </Filters>

              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th className="team-table__actions">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((member) => (
                      <tr key={member.id}>
                        <td>
                          <MemberInfo>
                            <Avatar>
                              {member.name
                                .split(" ")
                                .filter(Boolean)
                                .map((part) => part[0])
                                .join("")}
                            </Avatar>
                            <span>{member.name}</span>
                          </MemberInfo>
                        </td>
                        <td>{member.email}</td>
                        <td>
                          <select
                            value={member.role}
                            onChange={(event) => handleRoleChange(member.id, event.target.value)}
                          >
                            {roles.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select
                            value={member.department}
                            onChange={(event) => handleDepartmentChange(member.id, event.target.value)}
                          >
                            {departments.map((dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <StatusBadge className={member.active ? "is-active" : "is-inactive"}>
                            {member.active ? "Active" : "Inactive"}
                          </StatusBadge>
                        </td>
                        <TableActions>
                          <ActionButtons>
                            <button type="button" onClick={() => openProfile(member)}>
                              View
                            </button>
                            <button type="button" onClick={() => handleRemove(member.id)}>
                              Remove
                            </button>
                          </ActionButtons>
                        </TableActions>
                      </tr>
                    ))}
                    {filteredRows.length === 0 && (
                      <tr>
                        <EmptyState colSpan={6}>
                          No team members found.
                        </EmptyState>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </TableContainer>
            </Panel>

            {selectedMember && (
              <ProfileModal role="dialog" aria-modal="true">
                <header>
                  <h3>{selectedMember.name}</h3>
                  <button type="button" onClick={() => setSelectedMember(null)}>
                    Close
                  </button>
                </header>
                <ProfileBody>
                  <p><strong>Email:</strong> {selectedMember.email}</p>
                  <p><strong>Role:</strong> {selectedMember.role}</p>
                  <p><strong>Department:</strong> {selectedMember.department}</p>
                  <p><strong>Status:</strong> {selectedMember.active ? "Active" : "Inactive"}</p>
                  <ProfileSection>
                    <h4>Progress summary</h4>
                    <ul>
                      {selectedMember.progress?.map((record) => (
                        <li key={record.label}>
                          <span>{record.label}</span>
                          <span>{record.percent}%</span>
                        </li>
                      )) || <li>No progress data available.</li>}
                    </ul>
                  </ProfileSection>
                  <ProfileSection>
                    <h4>Recent assignments</h4>
                    <ul>
                      {selectedMember.recent?.map((record, index) => (
                        <li key={`${record.title}-${index}`}>
                          <span>{record.title}</span>
                          <span>{record.status}</span>
                        </li>
                      )) || <li>No recent activity recorded.</li>}
                    </ul>
                  </ProfileSection>
                </ProfileBody>
              </ProfileModal>
            )}

            <AuditLog>
              <h3>Audit log</h3>
              <ul>
                {auditLog.map((entry) => (
                  <li key={entry.id}>
                    <p>{entry.message}</p>
                    <span>{entry.timestamp}</span>
                  </li>
                ))}
              </ul>
            </AuditLog>
          </TeamManagement>
        </Container>
      </MainContent>
    </Page>
  );
}

export default TeamManagementComponent;
