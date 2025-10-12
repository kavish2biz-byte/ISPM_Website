import React, { useMemo, useState, useEffect } from "react";
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

const AssignmentWizard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AssignmentSteps = styled.nav`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
`;

const AssignmentStep = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 14px;
  padding: 12px 16px;
  border: 1px solid #CBD5F5;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &.is-active {
    border-color: #2563EB;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.1);
  }

  &.is-active .step-index {
    background: #2563EB;
    color: #ffffff;
  }
`;

const StepIndex = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #E2E8F0;
  display: grid;
  place-items: center;
  font-weight: 700;
`;

const AssignmentToast = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
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

  button {
    background: none;
    border: none;
    font-weight: 600;
    cursor: pointer;
    color: inherit;
  }
`;

const AssignmentPanel = styled.div`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
  padding: 24px;
`;

const AssignmentBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: #0F172A;
`;

const AssignmentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  h4 {
    margin: 0;
    font-size: 1rem;
  }

  label {
    font-weight: 600;
    color: #475569;
  }

  select, input[type="date"], textarea {
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid #CBD5F5;
    font: inherit;
    background: #ffffff;
  }

  textarea {
    min-height: 72px;
    resize: vertical;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 18px;

  label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
  }
`;

const MemberGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const MemberCard = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #E2E8F0;
  border-radius: 14px;
  padding: 12px;
  background: #F8FAFC;
  cursor: pointer;

  input[type="checkbox"] {
    margin: 0;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;

const MemberName = styled.span`
  display: block;
  font-weight: 600;
`;

const MemberMeta = styled.span`
  display: block;
  font-size: 0.8rem;
  color: #64748B;
`;

const AssignmentHint = styled.div`
  background: #F1F5F9;
  border-radius: 12px;
  padding: 14px 16px;
  color: #475569;
  font-size: 0.9rem;
`;

const CheckboxInline = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
`;

const AssignmentSummary = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;

  li {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    border-bottom: 1px dashed #E2E8F0;
    padding-bottom: 8px;
  }
`;

const AssignmentFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 12px;
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, filter 0.2s ease;
  background: #E2E8F0;
  color: #0F172A;

  &:hover:not(:disabled) {
    filter: brightness(0.96);
    outline: none;
  }

  &.primary {
    background: #2563EB;
    color: #ffffff;
  }

  &.primary:hover:not(:disabled) {
    background: #1D4ED8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AssignmentLog = styled.section`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #E2E8F0;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);

  h3 {
    margin: 0 0 14px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 12px;
  }

  li {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    background: #F8FAFC;

    p {
      margin: 0;
    }

    span {
      font-size: 0.8rem;
      color: #64748B;
    }
  }
`;

const AnalyticsSection = styled.section`
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #E2E8F0;
  padding: 20px;
  margin-bottom: 2rem;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #6B7280;
  font-size: 0.9rem;
  font-weight: 500;
`;

const RecentAssignments = styled.div`
  background: #F8FAFC;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
`;

const AssignmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #E2E8F0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const AssignmentInfo = styled.div`
  flex: 1;
`;

const AssignmentTitle = styled.div`
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.25rem;
`;

const AssignmentMeta = styled.div`
  font-size: 0.8rem;
  color: #6B7280;
`;

const AssignmentStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch(props.status) {
      case 'completed': return '#DCFCE7';
      case 'in-progress': return '#FEF3C7';
      case 'pending': return '#E0E7FF';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'completed': return '#166534';
      case 'in-progress': return '#92400E';
      case 'pending': return '#312E81';
      default: return '#6B7280';
    }
  }};
`;

const stepOrder = ["audience", "item", "schedule", "confirm"];

const teamMembers = [
  { id: "u_kasun", name: "Kasun Perera", department: "Engineering" },
  { id: "u_nimesha", name: "Nimesha Fernando", department: "Finance" },
  { id: "u_thilina", name: "Thilina Jay", department: "Marketing" },
  { id: "u_ishara", name: "Ishara Dias", department: "Operations" },
];

const departments = ["Engineering", "Finance", "Marketing", "Operations", "Sales"];

const catalog = [
  { id: "pol_email_security", type: "policy", title: "Email Security" },
  { id: "pol_remote_work", type: "policy", title: "Remote Work Guidelines" },
  { id: "pol_password_std", type: "policy", title: "Password Standard v2" },
  { id: "course_phishing_101", type: "course", title: "Phishing Awareness 101" },
  { id: "course_secure_browsing", type: "course", title: "Secure Browsing Basics" },
  { id: "course_incident_response", type: "course", title: "Incident Response Drill" },
];

const seedAssignments = [
  {
    id: "log_1",
    message: "Assigned Remote Work Guidelines to Operations",
    when: "Today, 10:12 AM",
  },
  {
    id: "log_2",
    message: "Queued Phishing Awareness 101 for Marketing",
    when: "Yesterday, 3:45 PM",
  },
];

const defaultDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().slice(0, 10);
};

const buildSummary = (state) => {
  const audienceLabel = state.audience === "users"
    ? `${state.userIds.length} user${state.userIds.length === 1 ? "" : "s"}`
    : `${state.department} department`;

  const item = catalog.find((entry) => entry.id === state.itemId);

  return {
    audience: audienceLabel,
    item: item ? `${item.type === "policy" ? "Policy" : "Course"}: ${item.title}` : "-",
    dueAt: state.dueAt,
    notify: state.notify,
  };
};

function AssignmentManagement({ user, onLogout }) {
  const [step, setStep] = useState(stepOrder[0]);
  const [toast, setToast] = useState(null);
  const [logs, setLogs] = useState(seedAssignments);
  const [dashboardData, setDashboardData] = useState(null);
  const [assignmentAnalytics, setAssignmentAnalytics] = useState(null);

  // Subscribe to data changes
  useEffect(() => {
    const unsubscribe = dashboardDataService.subscribe((data) => {
      setDashboardData(data);
      setAssignmentAnalytics(dashboardDataService.getTrainingAnalytics());
    });

    // Initialize data
    const initialData = dashboardDataService.getAllData();
    setDashboardData(initialData);
    setAssignmentAnalytics(dashboardDataService.getTrainingAnalytics());

    return unsubscribe;
  }, []);

  const [assignment, setAssignment] = useState({
    audience: "users",
    userIds: [],
    department: departments[0],
    itemType: "policy",
    itemId: catalog.find((entry) => entry.type === "policy")?.id ?? "",
    dueAt: defaultDueDate(),
    notify: true,
  });

  const selectedItem = useMemo(
    () => catalog.find((entry) => entry.id === assignment.itemId) ?? null,
    [assignment.itemId]
  );

  const filteredCatalog = useMemo(
    () => catalog.filter((entry) => entry.type === assignment.itemType),
    [assignment.itemType]
  );

  const goToStep = (target) => {
    if (stepOrder.includes(target)) {
      setStep(target);
    }
  };

  const handleAudienceChange = (event) => {
    const { name, value, checked, type } = event.target;

    if (name === "audience") {
      if (value === "department") {
        setAssignment((prev) => ({
          ...prev,
          audience: "department",
          userIds: [],
        }));
      } else {
        setAssignment((prev) => ({
          ...prev,
          audience: "users",
        }));
      }
      return;
    }

    if (name === "member" && type === "checkbox") {
      setAssignment((prev) => {
        const exists = prev.userIds.includes(value);
        const nextUserIds = exists
          ? prev.userIds.filter((id) => id !== value)
          : [...prev.userIds, value];
        return { ...prev, userIds: nextUserIds };
      });
      return;
    }

    if (name === "department") {
      setAssignment((prev) => ({ ...prev, department: value }));
    }
  };

  const handleItemChange = (event) => {
    const { name, value } = event.target;
    if (name === "itemType") {
      const nextType = value;
      const nextItem = catalog.find((entry) => entry.type === nextType);
      setAssignment((prev) => ({
        ...prev,
        itemType: nextType,
        itemId: nextItem ? nextItem.id : "",
      }));
      return;
    }
    if (name === "itemId") {
      setAssignment((prev) => ({ ...prev, itemId: value }));
    }
  };

  const handleScheduleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setAssignment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateAudience = () => {
    if (assignment.audience === "users" && assignment.userIds.length === 0) {
      setToast({ tone: "error", message: "Select at least one team member." });
      return false;
    }

    if (assignment.audience === "department" && !assignment.department) {
      setToast({ tone: "error", message: "Choose a department to continue." });
      return false;
    }

    return true;
  };

  const validateItem = () => {
    if (!assignment.itemId) {
      setToast({ tone: "error", message: "Pick a policy or course to assign." });
      return false;
    }
    return true;
  };

  const validateSchedule = () => {
    if (!assignment.dueAt) {
      setToast({ tone: "error", message: "Select a due date." });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex === stepOrder.length - 1) {
      return;
    }

    const nextStep = stepOrder[currentIndex + 1];
    if (step === 'audience' && !validateAudience()) {
      return;
    }
    if (step === 'item' && !validateItem()) {
      return;
    }
    if (step === 'schedule' && !validateSchedule()) {
      return;
    }
    setToast(null);
    setStep(nextStep);
  };

  const handleBack = () => {
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex === 0) {
      return;
    }
    setToast(null);
    setStep(stepOrder[currentIndex - 1]);
  };

  const handleAssign = () => {
    if (!validateSchedule()) {
      return;
    }

    const audienceLabel = assignment.audience === "users"
      ? `${assignment.userIds.length} user${assignment.userIds.length === 1 ? '' : 's'}`
      : `${assignment.department} department`;

    const item = selectedItem?.title ?? 'selected item';

    // Create new assignment in data service
    if (assignment.audience === "users") {
      assignment.userIds.forEach(userId => {
        const newAssignment = {
          id: `assignment_${Date.now()}_${userId}`,
          title: item,
          type: assignment.itemType,
          dueDate: assignment.dueAt,
          status: 'pending',
          assignedDate: new Date().toISOString()
        };
        dashboardDataService.addAssignment(userId, newAssignment);
      });
    } else {
      // Assign to department
      const departmentUsers = dashboardData?.users.filter(u => u.department === assignment.department) || [];
      departmentUsers.forEach(user => {
        const newAssignment = {
          id: `assignment_${Date.now()}_${user.id}`,
          title: item,
          type: assignment.itemType,
          dueDate: assignment.dueAt,
          status: 'pending',
          assignedDate: new Date().toISOString()
        };
        dashboardDataService.addAssignment(user.id, newAssignment);
      });
    }

    setLogs((prev) => [
      {
        id: `log_${Date.now()}`,
        message: `Assignment scheduled: ${item} → ${audienceLabel}`,
        when: 'Just now',
      },
      ...prev,
    ].slice(0, 6));

    setToast({
      tone: 'success',
      message: `Assignment prepared for ${audienceLabel}.`,
    });

    setAssignment({
      audience: 'users',
      userIds: [],
      department: departments[0],
      itemType: 'policy',
      itemId: catalog.find((entry) => entry.type === 'policy')?.id ?? '',
      dueAt: defaultDueDate(),
      notify: true,
    });

    setStep(stepOrder[0]);
  };

  const summary = useMemo(() => buildSummary(assignment), [assignment]);

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <HeaderContent>
              <Title>Assignment Management</Title>
              <Subtitle>Create targeted policy or course assignments in three quick steps.</Subtitle>
            </HeaderContent>
            <UserProfile>
              <UserAvatar>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
              </UserAvatar>
              <UserInfo>
                <UserDisplayName>{user?.name || 'Manager'}</UserDisplayName>
                <UserRole>Assignment Manager</UserRole>
              </UserInfo>
              <LogoutButton onClick={() => {
                onLogout();
              }}>
                Logout
              </LogoutButton>
            </UserProfile>
          </Header>

          <AssignmentWizard>
            <AssignmentSteps>
              {stepOrder.map((key, index) => {
                const labels = {
                  audience: 'Audience',
                  item: 'Item',
                  schedule: 'Schedule',
                  confirm: 'Confirm',
                };

                return (
                  <AssignmentStep
                    key={key}
                    type="button"
                    className={step === key ? 'is-active' : ''}
                    onClick={() => goToStep(key)}
                  >
                    <StepIndex className="step-index">{index + 1}</StepIndex>
                    <span>{labels[key]}</span>
                  </AssignmentStep>
                );
              })}
            </AssignmentSteps>

            {toast && (
              <AssignmentToast className={`assignment-toast--${toast.tone}`} role="status">
                <span>{toast.message}</span>
                <button type="button" onClick={() => setToast(null)}>Dismiss</button>
              </AssignmentToast>
            )}

            <AssignmentPanel>
              {step === 'audience' && (
                <AssignmentBody>
                  <AssignmentSection>
                    <h3>Who should receive this?</h3>
                    <RadioGroup>
                      <label>
                        <input
                          type="radio"
                          name="audience"
                          value="users"
                          checked={assignment.audience === 'users'}
                          onChange={handleAudienceChange}
                        />
                        Specific users
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="audience"
                          value="department"
                          checked={assignment.audience === 'department'}
                          onChange={handleAudienceChange}
                        />
                        Department
                      </label>
                    </RadioGroup>
                  </AssignmentSection>

                  {assignment.audience === 'users' && (
                    <AssignmentSection>
                      <h4>Select team members</h4>
                      <MemberGrid>
                        {teamMembers.map((member) => (
                          <MemberCard key={member.id}>
                            <input
                              type="checkbox"
                              name="member"
                              value={member.id}
                              checked={assignment.userIds.includes(member.id)}
                              onChange={handleAudienceChange}
                            />
                            <div>
                              <MemberName>{member.name}</MemberName>
                              <MemberMeta>{member.department}</MemberMeta>
                            </div>
                          </MemberCard>
                        ))}
                      </MemberGrid>
                    </AssignmentSection>
                  )}

                  {assignment.audience === 'department' && (
                    <AssignmentSection>
                      <label htmlFor="department">Select a department</label>
                      <select
                        id="department"
                        name="department"
                        value={assignment.department}
                        onChange={handleAudienceChange}
                      >
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </AssignmentSection>
                  )}
                </AssignmentBody>
              )}

              {step === 'item' && (
                <AssignmentBody>
                  <AssignmentSection>
                    <h3>Select the item</h3>
                    <RadioGroup>
                      <label>
                        <input
                          type="radio"
                          name="itemType"
                          value="policy"
                          checked={assignment.itemType === 'policy'}
                          onChange={handleItemChange}
                        />
                        Policies
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="itemType"
                          value="course"
                          checked={assignment.itemType === 'course'}
                          onChange={handleItemChange}
                        />
                        Courses
                      </label>
                    </RadioGroup>
                  </AssignmentSection>
                  <AssignmentSection>
                    <label htmlFor="itemId">Pick one {assignment.itemType}</label>
                    <select
                      id="itemId"
                      name="itemId"
                      value={assignment.itemId}
                      onChange={handleItemChange}
                    >
                      {filteredCatalog.map((entry) => (
                        <option key={entry.id} value={entry.id}>
                          {entry.title}
                        </option>
                      ))}
                    </select>
                  </AssignmentSection>
                  {selectedItem && (
                    <AssignmentHint>
                      <p>
                        <strong>Summary:</strong> {selectedItem.title} is a {selectedItem.type}.
                        Assigning this item will create new progress records for your selected audience.
                      </p>
                    </AssignmentHint>
                  )}
                </AssignmentBody>
              )}

              {step === 'schedule' && (
                <AssignmentBody>
                  <AssignmentSection>
                    <label htmlFor="dueAt">Due date</label>
                    <input
                      id="dueAt"
                      name="dueAt"
                      type="date"
                      value={assignment.dueAt}
                      onChange={handleScheduleChange}
                    />
                  </AssignmentSection>
                  <AssignmentSection>
                    <CheckboxInline>
                      <input
                        type="checkbox"
                        name="notify"
                        checked={assignment.notify}
                        onChange={handleScheduleChange}
                      />
                      Send notification immediately after assigning
                    </CheckboxInline>
                  </AssignmentSection>
                </AssignmentBody>
              )}

              {step === 'confirm' && (
                <AssignmentBody>
                  <AssignmentSection>
                    <h3>Review assignment</h3>
                    <AssignmentSummary>
                      <li>
                        <span>Audience</span>
                        <span>{summary.audience}</span>
                      </li>
                      <li>
                        <span>Item</span>
                        <span>{summary.item}</span>
                      </li>
                      <li>
                        <span>Due date</span>
                        <span>{summary.dueAt}</span>
                      </li>
                      <li>
                        <span>Notify immediately</span>
                        <span>{summary.notify ? 'Yes' : 'No'}</span>
                      </li>
                    </AssignmentSummary>
                  </AssignmentSection>
                  <AssignmentHint>
                    <p>
                      Confirming will queue a request to <code>POST /manager/assign</code> using the form data shown above.
                      You can wire this into Firebase by creating assignment docs and seeding pending progress records.
                    </p>
                  </AssignmentHint>
                </AssignmentBody>
              )}
            </AssignmentPanel>

            <AssignmentFooter>
              <Button type="button" onClick={handleBack} disabled={step === stepOrder[0]}>
                Back
              </Button>
              {step !== stepOrder[stepOrder.length - 1] ? (
                <Button type="button" className="primary" onClick={handleNext}>
                  Continue
                </Button>
              ) : (
                <Button type="button" className="primary" onClick={handleAssign}>
                  Assign
                </Button>
              )}
            </AssignmentFooter>

            <AssignmentLog>
              <h3>Recent assignment activity</h3>
              <ul>
                {logs.map((entry) => (
                  <li key={entry.id}>
                    <p>{entry.message}</p>
                    <span>{entry.when}</span>
                  </li>
                ))}
              </ul>
            </AssignmentLog>
          </AssignmentWizard>
        </Container>
      </MainContent>
    </Page>
  );
}

export default AssignmentManagement;
