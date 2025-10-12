import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
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

const NonCompliance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PageHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
  }

  p {
    margin: 6px 0 0;
    color: #475569;
    max-width: 520px;
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  input[type="search"], select {
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid #CBD5F5;
    font: inherit;
    background: #ffffff;
  }
`;

const Toast = styled.div`
  padding: 12px 16px;
  border-radius: 12px;
  background: #EEF2FF;
  border: 1px solid #CBD5F5;
  color: #1E3A8A;

  &.success {
    background: #DCFCE7;
    border-color: #BBF7D0;
    color: #166534;
  }

  &.error {
    background: #FEE2E2;
    border-color: #FECACA;
    color: #B91C1C;
  }
`;

const TableContainer = styled.section`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #E2E8F0;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  th, td {
    padding: 12px 16px;
    border-bottom: 1px solid #E2E8F0;
    text-align: left;
  }

  th {
    background: #F1F5F9;
    text-transform: uppercase;
    font-size: 0.75rem;
    color: #475569;
    letter-spacing: 0.4px;
  }

  tbody tr:hover td {
    background: #F8FAFC;
  }
`;

const MemberCell = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberName = styled.span`
  font-weight: 600;
`;

const ItemCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemTitle = styled.span`
  font-weight: 600;
`;

const ItemMeta = styled.span`
  font-size: 0.8rem;
  color: #64748B;
`;

const ReminderMeta = styled.span`
  display: inline-block;
  font-size: 0.85rem;
  color: #475569;
  margin-right: 8px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;

  &.alert {
    background: #FEE2E2;
    color: #B91C1C;
  }
`;

const Actions = styled.td`
  width: 200px;
  text-align: right;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid #CBD5F5;
  background: #ffffff;
  color: #0F172A;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-left: 8px;

  &:hover, &:focus-visible {
    background: #E2E8F0;
    outline: none;
  }

  &.danger {
    border-color: transparent;
    background: #E11D48;
    color: #ffffff;

    &:hover, &:focus-visible {
      background: #BE123C;
    }
  }
`;

const EmptyState = styled.div`
  padding: 24px;
  text-align: center;
  color: #64748B;
`;

const ActivityLog = styled.section`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #E2E8F0;
  padding: 20px;

  h3 {
    margin: 0 0 12px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
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

const overdueSeed = [
  {
    id: "nc_1",
    userId: "u_kasun",
    name: "Kasun Perera",
    itemId: "pol_email_security",
    itemTitle: "Email Security",
    itemType: "policy",
    dueAt: "2025-09-20",
    daysLate: 5,
    lastRemindedAt: "2025-09-21T08:15:00Z",
    escalate: false,
  },
  {
    id: "nc_2",
    userId: "u_nimesha",
    name: "Nimesha Fernando",
    itemId: "pol_remote_work",
    itemTitle: "Remote Work Guidelines",
    itemType: "policy",
    dueAt: "2025-09-18",
    daysLate: 7,
    lastRemindedAt: "2025-09-19T09:00:00Z",
    escalate: false,
  },
  {
    id: "nc_3",
    userId: "u_thilina",
    name: "Thilina Jay",
    itemId: "course_phishing_101",
    itemTitle: "Phishing Awareness 101",
    itemType: "course",
    dueAt: "2025-09-19",
    daysLate: 6,
    lastRemindedAt: null,
    escalate: false,
  },
  {
    id: "nc_4",
    userId: "u_ishara",
    name: "Ishara Dias",
    itemId: "course_secure_browsing",
    itemTitle: "Secure Browsing Basics",
    itemType: "course",
    dueAt: "2025-09-22",
    daysLate: 3,
    lastRemindedAt: "2025-09-22T07:30:00Z",
    escalate: true,
  },
];

const formatDate = (value) => {
  try {
    return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch (err) {
    return value;
  }
};

const formatTimeAgo = (value) => {
  if (!value) {
    return "—";
  }
  const diffMs = Date.now() - new Date(value).getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} h ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} d ago`;
};

function NonComplianceComponent({ user, onLogout }) {
  const [rows, setRows] = useState(overdueSeed);
  const [activity, setActivity] = useState([
    { id: 'log_1', message: 'Reminder email sent to Kasun (Email Security)', timestamp: '2h ago' },
    { id: 'log_2', message: 'Escalated Remote Work Guidelines for Ishara', timestamp: 'Yesterday' },
  ]);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dashboardData, setDashboardData] = useState(null);

  // Subscribe to data changes
  useEffect(() => {
    const unsubscribe = dashboardDataService.subscribe((data) => {
      setDashboardData(data);
      // Update rows with real-time data from assignments
      const realTimeRows = data.assignments
        .filter(assignment => assignment.status === 'overdue')
        .map(assignment => {
          const user = data.users.find(u => u.id === assignment.userId);
          const item = data.policies.find(p => p.id === assignment.itemId) || 
                      data.courses.find(c => c.id === assignment.itemId);
          return {
            id: assignment.id,
            userName: user?.name || 'Unknown User',
            userEmail: user?.email || 'unknown@company.com',
            itemTitle: item?.title || 'Unknown Item',
            itemType: assignment.itemType,
            dueDate: assignment.dueDate,
            daysOverdue: Math.max(0, Math.floor((new Date() - new Date(assignment.dueDate)) / (1000 * 60 * 60 * 24))),
            department: user?.department || 'Unknown',
            status: 'overdue'
          };
        });
      setRows(realTimeRows.length > 0 ? realTimeRows : overdueSeed);
    });

    // Initialize data
    const initialData = dashboardDataService.getAllData();
    setDashboardData(initialData);

    return unsubscribe;
  }, []);

  const filteredRows = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();
    return rows.filter((row) => {
      if (filterType !== 'all' && row.itemType !== filterType) {
        return false;
      }
      if (!needle) {
        return true;
      }
      const haystack = `${row.name} ${row.itemTitle}`.toLowerCase();
      return haystack.includes(needle);
    });
  }, [filterType, rows, searchTerm]);

  const addActivity = (message) => {
    setActivity((prev) => [
      { id: `log_${Date.now()}`, message, timestamp: 'Just now' },
      ...prev,
    ].slice(0, 8));
  };

  const showToast = (message, tone = 'info') => {
    setToast({ message, tone });
    setTimeout(() => setToast(null), 4000);
  };

  const handleReminder = (row) => {
    setRows((prev) => prev.map((entry) => (
      entry.id === row.id
        ? { ...entry, lastRemindedAt: new Date().toISOString() }
        : entry
    )));
    addActivity(`Reminder queued for ${row.name} (${row.itemTitle}).`);
    showToast('Reminder queued for delivery.', 'success');
  };

  const handleEscalate = (row) => {
    setRows((prev) => prev.map((entry) => (
      entry.id === row.id
        ? { ...entry, escalate: true }
        : entry
    )));
    addActivity(`Escalation captured for ${row.name} (${row.itemTitle}).`);
    showToast('Escalation recorded and sent to stakeholders.', 'success');
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <HeaderContent>
              <Title>Non-Compliance Follow-up</Title>
              <Subtitle>Only overdue policies and training appear here. Use quick actions to remind or escalate.</Subtitle>
            </HeaderContent>
            <UserProfile>
              <UserAvatar>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
              </UserAvatar>
              <UserInfo>
                <UserDisplayName>{user?.name || 'Manager'}</UserDisplayName>
                <UserRole>Compliance Manager</UserRole>
              </UserInfo>
              <LogoutButton onClick={() => {
                onLogout();
              }}>
                Logout
              </LogoutButton>
            </UserProfile>
          </Header>

          <NonCompliance>
            <PageHeader>
              <div>
                <h2>Non-compliance follow-up</h2>
                <p>Only overdue policies and training appear here. Use quick actions to remind or escalate.</p>
              </div>
              <Filters>
                <input
                  type="search"
                  placeholder="Search by name or item"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <select value={filterType} onChange={(event) => setFilterType(event.target.value)}>
                  <option value="all">All types</option>
                  <option value="policy">Policies</option>
                  <option value="course">Courses</option>
                </select>
              </Filters>
            </PageHeader>

            {toast && (
              <Toast className={`non-compliance__toast--${toast.tone}`} role="status">
                <span>{toast.message}</span>
              </Toast>
            )}

            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Item</th>
                    <th>Due</th>
                    <th>Days late</th>
                    <th>Last reminded</th>
                    <th className="actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <MemberCell>
                          <MemberName>{row.name}</MemberName>
                        </MemberCell>
                      </td>
                      <td>
                        <ItemCell>
                          <ItemTitle>{row.itemTitle}</ItemTitle>
                          <ItemMeta>{row.itemType === 'course' ? 'Course' : 'Policy'}</ItemMeta>
                        </ItemCell>
                      </td>
                      <td>{formatDate(row.dueAt)}</td>
                      <td>{row.daysLate}</td>
                      <td>
                        <ReminderMeta>{formatTimeAgo(row.lastRemindedAt)}</ReminderMeta>
                        {row.escalate && <Tag className="alert">Escalated</Tag>}
                      </td>
                      <Actions>
                        <Button type="button" onClick={() => handleReminder(row)}>
                          Remind
                        </Button>
                        <Button type="button" className="danger" onClick={() => handleEscalate(row)}>
                          Escalate
                        </Button>
                      </Actions>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {filteredRows.length === 0 && (
                <EmptyState>All caught up! No overdue records match the current filters.</EmptyState>
              )}
            </TableContainer>

            <ActivityLog>
              <h3>Activity log</h3>
              <ul>
                {activity.map((entry) => (
                  <li key={entry.id}>
                    <p>{entry.message}</p>
                    <span>{entry.timestamp}</span>
                  </li>
                ))}
              </ul>
            </ActivityLog>
          </NonCompliance>
        </Container>
      </MainContent>
    </Page>
  );
}

export default NonComplianceComponent;
