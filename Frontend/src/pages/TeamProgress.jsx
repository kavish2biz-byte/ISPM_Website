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

const TeamProgress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PageHeader = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
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

const ExportButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 12px;
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  background: #2563EB;
  color: #ffffff;

  &:hover {
    background: #1D4ED8;
  }
`;

const Filters = styled.section`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #E2E8F0;
  padding: 20px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #475569;

  label {
    font-size: 0.8rem;
    font-weight: 600;
  }

  select, input[type="search"] {
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid #CBD5F5;
    font: inherit;
    background: #ffffff;
  }
`;

const TableContainer = styled.section`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #E2E8F0;
  padding: 0 0 12px;
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
    color: #475569;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  tbody tr:hover td {
    background: #F8FAFC;
  }
`;

const MemberCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MemberName = styled.span`
  font-weight: 600;
`;

const MemberMeta = styled.span`
  font-size: 0.8rem;
  color: #64748B;
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

const ProgressMeter = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  border-radius: 999px;
  background: #E2E8F0;
  overflow: hidden;

  span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: #2563EB;
  }
`;

const ProgressValue = styled.span`
  font-weight: 600;
  color: #0F172A;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #E2E8F0;
  color: #475569;
  text-transform: capitalize;

  &.success {
    background: #DCFCE7;
    color: #166534;
  }

  &.pending {
    background: #FEF08A;
    color: #92400E;
  }

  &.danger {
    background: #FEE2E2;
    color: #B91C1C;
  }
`;

const EmptyState = styled.div`
  padding: 24px;
  text-align: center;
  color: #64748B;
`;

const Pagination = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 12px;
    border: 1px solid transparent;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
    background: #E2E8F0;
    color: #0F172A;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: #D1D5DB;
    }
  }

  span {
    color: #475569;
    font-weight: 500;
  }

  @media (max-width: 640px) {
    flex-direction: column;

    button {
      width: 100%;
    }
  }
`;

const courseItems = [
  { id: "course_phishing_101", type: "course", title: "Phishing Awareness 101" },
  { id: "course_secure_browsing", type: "course", title: "Secure Browsing Basics" },
  { id: "course_incident_response", type: "course", title: "Incident Response Drill" },
];

const policyItems = [
  { id: "pol_email_security", type: "policy", title: "Email Security" },
  { id: "pol_remote_work", type: "policy", title: "Remote Work Guidelines" },
  { id: "pol_password_std", type: "policy", title: "Password Standard v2" },
];

const progressSeed = [
  {
    id: "row_1",
    member: "Kasun Perera",
    department: "Engineering",
    itemId: "course_phishing_101",
    itemTitle: "Phishing Awareness 101",
    itemType: "course",
    progress: 40,
    status: "pending",
    dueAt: "2025-10-05",
    lastActivity: "2025-09-18T06:00:00Z",
  },
  {
    id: "row_2",
    member: "Nimesha Fernando",
    department: "Finance",
    itemId: "course_phishing_101",
    itemTitle: "Phishing Awareness 101",
    itemType: "course",
    progress: 100,
    status: "passed",
    dueAt: "2025-09-22",
    lastActivity: "2025-09-20T07:12:00Z",
  },
  {
    id: "row_3",
    member: "Thilina Jay",
    department: "Marketing",
    itemId: "pol_email_security",
    itemTitle: "Email Security",
    itemType: "policy",
    progress: 0,
    status: "pending",
    dueAt: "2025-09-28",
    lastActivity: "2025-09-16T04:00:00Z",
  },
  {
    id: "row_4",
    member: "Ishara Dias",
    department: "Operations",
    itemId: "pol_remote_work",
    itemTitle: "Remote Work Guidelines",
    itemType: "policy",
    progress: 100,
    status: "passed",
    dueAt: "2025-09-18",
    lastActivity: "2025-09-18T11:00:00Z",
  },
  {
    id: "row_5",
    member: "Sajini Ranasinghe",
    department: "Sales",
    itemId: "course_secure_browsing",
    itemTitle: "Secure Browsing Basics",
    itemType: "course",
    progress: 65,
    status: "pending",
    dueAt: "2025-10-02",
    lastActivity: "2025-09-19T09:40:00Z",
  },
  {
    id: "row_6",
    member: "Kasun Perera",
    department: "Engineering",
    itemId: "pol_password_std",
    itemTitle: "Password Standard v2",
    itemType: "policy",
    progress: 0,
    status: "overdue",
    dueAt: "2025-09-15",
    lastActivity: "2025-09-20T08:10:00Z",
  },
  {
    id: "row_7",
    member: "Nimesha Fernando",
    department: "Finance",
    itemId: "course_secure_browsing",
    itemTitle: "Secure Browsing Basics",
    itemType: "course",
    progress: 25,
    status: "pending",
    dueAt: "2025-10-07",
    lastActivity: "2025-09-21T12:00:00Z",
  },
  {
    id: "row_8",
    member: "Ishara Dias",
    department: "Operations",
    itemId: "course_phishing_101",
    itemTitle: "Phishing Awareness 101",
    itemType: "course",
    progress: 80,
    status: "pending",
    dueAt: "2025-09-29",
    lastActivity: "2025-09-22T07:55:00Z",
  },
];

const statuses = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "passed", label: "Passed" },
  { value: "overdue", label: "Overdue" },
];

const pageSizeOptions = [5, 10, 20];

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

const formatDateTime = (value) => {
  try {
    return new Date(value).toLocaleString();
  } catch (err) {
    return value;
  }
};

const statusTone = (status) => {
  switch (status) {
    case 'passed':
      return 'status-badge status-badge--success';
    case 'pending':
      return 'status-badge status-badge--pending';
    case 'overdue':
      return 'status-badge status-badge--danger';
    default:
      return 'status-badge';
  }
};

function TeamProgressComponent({ user, onLogout }) {
  const [itemFilter, setItemFilter] = useState({ type: 'course', id: 'all' });
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilterValue, setStatusFilterValue] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [page, setPage] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);

  // Subscribe to data changes
  useEffect(() => {
    const unsubscribe = dashboardDataService.subscribe((data) => {
      setDashboardData(data);
    });

    // Initialize data
    const initialData = dashboardDataService.getAllData();
    setDashboardData(initialData);

    return unsubscribe;
  }, []);

  const allDepartments = useMemo(() => {
    const result = new Set(progressSeed.map((row) => row.department));
    return ['all', ...Array.from(result)];
  }, []);

  const itemsByType = useMemo(() => ({
    course: [{ id: 'all', title: 'All courses' }, ...courseItems],
    policy: [{ id: 'all', title: 'All policies' }, ...policyItems],
  }), []);

  const filteredRows = useMemo(() => {
    const needle = searchTerm.trim().toLowerCase();

    return progressSeed.filter((row) => {
      if (itemFilter.type && itemFilter.type !== row.itemType) {
        return false;
      }

      if (itemFilter.id !== 'all' && row.itemId !== itemFilter.id) {
        return false;
      }

      if (departmentFilter !== 'all' && row.department !== departmentFilter) {
        return false;
      }

      if (statusFilterValue !== 'all' && row.status !== statusFilterValue) {
        return false;
      }

      if (needle) {
        const haystack = `${row.member} ${row.itemTitle}`.toLowerCase();
        if (!haystack.includes(needle)) {
          return false;
        }
      }

      return true;
    });
  }, [departmentFilter, itemFilter, searchTerm, statusFilterValue]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const pageRows = filteredRows.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

  const handleItemTypeChange = (event) => {
    const nextType = event.target.value;
    setItemFilter({ type: nextType, id: 'all' });
    setPage(0);
  };

  const handleItemChange = (event) => {
    setItemFilter((prev) => ({ ...prev, id: event.target.value }));
    setPage(0);
  };

  const handleDepartmentChange = (event) => {
    setDepartmentFilter(event.target.value);
    setPage(0);
  };

  const handleStatusChange = (event) => {
    setStatusFilterValue(event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(0);
  };

  const goToPage = (direction) => {
    setPage((prev) => {
      if (direction === 'prev') {
        return Math.max(0, prev - 1);
      }
      if (direction === 'next') {
        return Math.min(totalPages - 1, prev + 1);
      }
      return prev;
    });
  };

  const handleExport = () => {
    const headers = ['Member', 'Department', 'Item', 'Progress', 'Due', 'Status', 'Last activity'];
    const rows = filteredRows.map((row) => [
      row.member,
      row.department,
      row.itemTitle,
      `${row.progress}%`,
      formatDate(row.dueAt),
      row.status,
      formatDateTime(row.lastActivity),
    ]);

    const csvData = [headers, ...rows]
      .map((record) => record.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'team-progress.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <HeaderContent>
              <Title>Team Progress Report</Title>
              <Subtitle>Filter by course or policy, then export matching records for stakeholder reporting.</Subtitle>
            </HeaderContent>
            <UserProfile>
              <UserAvatar>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
              </UserAvatar>
              <UserInfo>
                <UserDisplayName>{user?.name || 'Manager'}</UserDisplayName>
                <UserRole>Progress Manager</UserRole>
              </UserInfo>
              <LogoutButton onClick={() => {
                onLogout();
              }}>
                Logout
              </LogoutButton>
            </UserProfile>
          </Header>

          <TeamProgress>
            <PageHeader>
              <div>
                <h2>Team progress report</h2>
                <p>Filter by course or policy, then export matching records for stakeholder reporting.</p>
              </div>
              <ExportButton type="button" onClick={handleExport}>
                Export CSV
              </ExportButton>
            </PageHeader>

            <Filters>
              <FilterGroup>
                <label htmlFor="itemType">Type</label>
                <select id="itemType" value={itemFilter.type} onChange={handleItemTypeChange}>
                  <option value="course">Courses</option>
                  <option value="policy">Policies</option>
                </select>
              </FilterGroup>
              <FilterGroup>
                <label htmlFor="item">Item</label>
                <select id="item" value={itemFilter.id} onChange={handleItemChange}>
                  {itemsByType[itemFilter.type].map((entry) => (
                    <option key={entry.id} value={entry.id}>
                      {entry.title}
                    </option>
                  ))}
                </select>
              </FilterGroup>
              <FilterGroup>
                <label htmlFor="department">Department</label>
                <select id="department" value={departmentFilter} onChange={handleDepartmentChange}>
                  {allDepartments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All departments' : dept}
                    </option>
                  ))}
                </select>
              </FilterGroup>
              <FilterGroup>
                <label htmlFor="status">Status</label>
                <select id="status" value={statusFilterValue} onChange={handleStatusChange}>
                  {statuses.map((entry) => (
                    <option key={entry.value} value={entry.value}>
                      {entry.label}
                    </option>
                  ))}
                </select>
              </FilterGroup>
              <FilterGroup>
                <label htmlFor="search">Search</label>
                <input
                  id="search"
                  type="search"
                  placeholder="Search by member or item"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </FilterGroup>
              <FilterGroup>
                <label htmlFor="pageSize">Rows per page</label>
                <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </FilterGroup>
            </Filters>

            <TableContainer>
              <Table>
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Item</th>
                    <th>Progress</th>
                    <th>Due</th>
                    <th>Status</th>
                    <th>Last activity</th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <MemberCell>
                          <MemberName>{row.member}</MemberName>
                          <MemberMeta>{row.department}</MemberMeta>
                        </MemberCell>
                      </td>
                      <td>
                        <ItemCell>
                          <ItemTitle>{row.itemTitle}</ItemTitle>
                          <ItemMeta>{row.itemType === 'course' ? 'Course' : 'Policy'}</ItemMeta>
                        </ItemCell>
                      </td>
                      <td>
                        <ProgressMeter>
                          <ProgressBar>
                            <span style={{ width: `${Math.min(100, row.progress)}%` }} />
                          </ProgressBar>
                          <ProgressValue>{row.progress}%</ProgressValue>
                        </ProgressMeter>
                      </td>
                      <td>{formatDate(row.dueAt)}</td>
                      <td>
                        <StatusBadge className={statusTone(row.status)}>{row.status}</StatusBadge>
                      </td>
                      <td>{formatDateTime(row.lastActivity)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {pageRows.length === 0 && (
                <EmptyState>No progress records match the selected filters.</EmptyState>
              )}
            </TableContainer>

            <Pagination>
              <button type="button" onClick={() => goToPage('prev')} disabled={currentPage === 0}>
                Previous
              </button>
              <span>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => goToPage('next')}
                disabled={currentPage >= totalPages - 1}
              >
                Next
              </button>
            </Pagination>
          </TeamProgress>
        </Container>
      </MainContent>
    </Page>
  );
}

export default TeamProgressComponent;
