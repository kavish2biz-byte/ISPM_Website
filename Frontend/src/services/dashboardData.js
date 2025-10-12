// Centralized dashboard data service for better synchronization
export class DashboardDataService {
  constructor() {
    this.data = {
      users: [
        {
          id: 'u1',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@ispm.com',
          role: 'manager',
          department: 'Operations',
          status: 'active',
          lastLogin: '2025-01-25T10:30:00Z',
          progress: {
            trainingCompleted: 8,
            totalTraining: 12,
            policiesAcknowledged: 15,
            totalPolicies: 18,
            certificatesEarned: 6,
            overallProgress: 85
          },
          assignments: [
            { id: 'a1', title: 'Security Awareness Training', type: 'course', dueDate: '2025-02-01', status: 'completed' },
            { id: 'a2', title: 'GDPR Policy Review', type: 'policy', dueDate: '2025-01-30', status: 'pending' },
            { id: 'a3', title: 'Incident Response Training', type: 'course', dueDate: '2025-02-15', status: 'in-progress' }
          ]
        },
        {
          id: 'u2',
          name: 'Michael Chen',
          email: 'michael.chen@ispm.com',
          role: 'employee',
          department: 'Engineering',
          status: 'active',
          lastLogin: '2025-01-25T09:15:00Z',
          progress: {
            trainingCompleted: 5,
            totalTraining: 12,
            policiesAcknowledged: 12,
            totalPolicies: 18,
            certificatesEarned: 3,
            overallProgress: 65
          },
          assignments: [
            { id: 'a4', title: 'Secure Coding Practices', type: 'course', dueDate: '2025-02-05', status: 'completed' },
            { id: 'a5', title: 'Data Privacy Policy', type: 'policy', dueDate: '2025-01-28', status: 'overdue' },
            { id: 'a6', title: 'Security Awareness Training', type: 'course', dueDate: '2025-02-10', status: 'in-progress' }
          ]
        },
        {
          id: 'u3',
          name: 'Emily Davis',
          email: 'emily.davis@ispm.com',
          role: 'employee',
          department: 'Finance',
          status: 'active',
          lastLogin: '2025-01-24T16:45:00Z',
          progress: {
            trainingCompleted: 10,
            totalTraining: 12,
            policiesAcknowledged: 16,
            totalPolicies: 18,
            certificatesEarned: 8,
            overallProgress: 92
          },
          assignments: [
            { id: 'a7', title: 'Financial Security Protocols', type: 'policy', dueDate: '2025-01-20', status: 'completed' },
            { id: 'a8', title: 'Anti-Fraud Training', type: 'course', dueDate: '2025-02-01', status: 'completed' },
            { id: 'a9', title: 'Data Classification Policy', type: 'policy', dueDate: '2025-02-08', status: 'pending' }
          ]
        },
        {
          id: 'u4',
          name: 'David Wilson',
          email: 'david.wilson@ispm.com',
          role: 'employee',
          department: 'Marketing',
          status: 'active',
          lastLogin: '2025-01-25T14:20:00Z',
          progress: {
            trainingCompleted: 3,
            totalTraining: 12,
            policiesAcknowledged: 8,
            totalPolicies: 18,
            certificatesEarned: 2,
            overallProgress: 45
          },
          assignments: [
            { id: 'a10', title: 'Social Media Security', type: 'course', dueDate: '2025-01-22', status: 'overdue' },
            { id: 'a11', title: 'Brand Protection Policy', type: 'policy', dueDate: '2025-02-12', status: 'pending' },
            { id: 'a12', title: 'Security Awareness Training', type: 'course', dueDate: '2025-02-20', status: 'not-started' }
          ]
        },
        {
          id: 'u5',
          name: 'Lisa Rodriguez',
          email: 'lisa.rodriguez@ispm.com',
          role: 'employee',
          department: 'HR',
          status: 'active',
          lastLogin: '2025-01-25T11:30:00Z',
          progress: {
            trainingCompleted: 7,
            totalTraining: 12,
            policiesAcknowledged: 14,
            totalPolicies: 18,
            certificatesEarned: 5,
            overallProgress: 78
          },
          assignments: [
            { id: 'a13', title: 'Employee Data Protection', type: 'policy', dueDate: '2025-01-25', status: 'completed' },
            { id: 'a14', title: 'HR Security Training', type: 'course', dueDate: '2025-02-03', status: 'in-progress' },
            { id: 'a15', title: 'Confidentiality Agreement', type: 'policy', dueDate: '2025-02-18', status: 'pending' }
          ]
        }
      ],
      policies: [
        {
          id: 'p1',
          title: 'Information Security Policy',
          category: 'Security',
          status: 'active',
          version: '2.1',
          lastUpdated: '2025-01-15',
          assignedTo: ['Engineering', 'Operations'],
          acknowledgments: 12,
          totalUsers: 15,
          priority: 'high'
        },
        {
          id: 'p2',
          title: 'Data Privacy Policy',
          category: 'Privacy',
          status: 'active',
          version: '1.8',
          lastUpdated: '2025-01-10',
          assignedTo: ['All Departments'],
          acknowledgments: 18,
          totalUsers: 20,
          priority: 'high'
        },
        {
          id: 'p3',
          title: 'Remote Work Guidelines',
          category: 'Operations',
          status: 'draft',
          version: '1.0',
          lastUpdated: '2025-01-20',
          assignedTo: ['Operations', 'Engineering'],
          acknowledgments: 0,
          totalUsers: 8,
          priority: 'medium'
        }
      ],
      trainings: [
        {
          id: 't1',
          title: 'Security Awareness Training',
          category: 'Security',
          status: 'active',
          duration: '45 minutes',
          assignedTo: ['All Departments'],
          completions: 15,
          totalUsers: 20,
          lastUpdated: '2025-01-12'
        },
        {
          id: 't2',
          title: 'Phishing Prevention',
          category: 'Security',
          status: 'active',
          duration: '30 minutes',
          assignedTo: ['All Departments'],
          completions: 12,
          totalUsers: 20,
          lastUpdated: '2025-01-08'
        },
        {
          id: 't3',
          title: 'GDPR Compliance',
          category: 'Compliance',
          status: 'draft',
          duration: '60 minutes',
          assignedTo: ['Finance', 'HR'],
          completions: 0,
          totalUsers: 6,
          lastUpdated: '2025-01-22'
        }
      ],
      metrics: {
        totalUsers: 20,
        activeUsers: 18,
        totalPolicies: 15,
        activePolicies: 12,
        totalTrainings: 10,
        activeTrainings: 8,
        complianceRate: 87,
        overdueItems: 5,
        completedThisWeek: 23,
        pendingApprovals: 3
      }
    };
    
    this.listeners = [];
  }

  // Subscribe to data changes
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // Notify all listeners of data changes
  notify() {
    this.listeners.forEach(listener => listener(this.data));
  }

  // Get all data
  getAllData() {
    return this.data;
  }

  // Get users data
  getUsers() {
    return this.data.users;
  }

  // Get policies data
  getPolicies() {
    return this.data.policies;
  }

  // Get trainings data
  getTrainings() {
    return this.data.trainings;
  }

  // Get metrics
  getMetrics() {
    return this.data.metrics;
  }

  // Update user progress
  updateUserProgress(userId, progressData) {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      user.progress = { ...user.progress, ...progressData };
      this.notify();
    }
  }

  // Update assignment status
  updateAssignmentStatus(userId, assignmentId, status) {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      const assignment = user.assignments.find(a => a.id === assignmentId);
      if (assignment) {
        assignment.status = status;
        this.notify();
      }
    }
  }

  // Add new assignment
  addAssignment(userId, assignment) {
    const user = this.data.users.find(u => u.id === userId);
    if (user) {
      user.assignments.push(assignment);
      this.notify();
    }
  }

  // Update metrics
  updateMetrics() {
    const users = this.data.users;
    const policies = this.data.policies;
    const trainings = this.data.trainings;
    
    // Calculate real-time metrics
    this.data.metrics = {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      totalPolicies: policies.length,
      activePolicies: policies.filter(p => p.status === 'active').length,
      totalTrainings: trainings.length,
      activeTrainings: trainings.filter(t => t.status === 'active').length,
      complianceRate: Math.round((users.reduce((sum, u) => sum + u.progress.overallProgress, 0) / users.length) || 0),
      overdueItems: users.reduce((sum, u) => sum + u.assignments.filter(a => a.status === 'overdue').length, 0),
      completedThisWeek: users.reduce((sum, u) => sum + u.assignments.filter(a => a.status === 'completed').length, 0),
      pendingApprovals: policies.filter(p => p.status === 'draft').length + trainings.filter(t => t.status === 'draft').length
    };
    
    this.notify();
  }

  // Get team overview data
  getTeamOverview() {
    const users = this.data.users;
    return {
      totalMembers: users.length,
      activeMembers: users.filter(u => u.status === 'active').length,
      averageProgress: Math.round(users.reduce((sum, u) => sum + u.progress.overallProgress, 0) / users.length),
      departmentBreakdown: users.reduce((acc, user) => {
        if (!acc[user.department]) {
          acc[user.department] = { total: 0, active: 0, avgProgress: 0 };
        }
        acc[user.department].total++;
        if (user.status === 'active') acc[user.department].active++;
        acc[user.department].avgProgress += user.progress.overallProgress;
        return acc;
      }, {}),
      recentActivity: users.map(u => ({
        user: u.name,
        department: u.department,
        activity: 'Completed training',
        time: new Date().toISOString(),
        type: 'success'
      })).slice(0, 5)
    };
  }

  // Get compliance data
  getComplianceData() {
    const users = this.data.users;
    const policies = this.data.policies;
    
    return {
      overallCompliance: Math.round(users.reduce((sum, u) => sum + u.progress.overallProgress, 0) / users.length),
      policyCompliance: Math.round((users.reduce((sum, u) => sum + u.progress.policiesAcknowledged, 0) / (users.length * 18)) * 100),
      trainingCompliance: Math.round((users.reduce((sum, u) => sum + u.progress.trainingCompleted, 0) / (users.length * 12)) * 100),
      overdueItems: users.reduce((sum, u) => sum + u.assignments.filter(a => a.status === 'overdue').length, 0),
      pendingItems: users.reduce((sum, u) => sum + u.assignments.filter(a => a.status === 'pending').length, 0),
      completedItems: users.reduce((sum, u) => sum + u.assignments.filter(a => a.status === 'completed').length, 0),
      trends: this.generateComplianceTrends()
    };
  }

  // Generate compliance trends data
  generateComplianceTrends() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, index) => ({
      day,
      compliance: Math.floor(Math.random() * 20) + 80, // Random between 80-100
      completions: Math.floor(Math.random() * 10) + 1, // Random between 1-10
      overdue: Math.floor(Math.random() * 5) // Random between 0-4
    }));
  }

  // Get training analytics
  getTrainingAnalytics() {
    const users = this.data.users;
    const trainings = this.data.trainings;
    
    return {
      totalAssignments: users.reduce((sum, u) => sum + u.assignments.filter(a => a.type === 'course').length, 0),
      completedAssignments: users.reduce((sum, u) => sum + u.assignments.filter(a => a.type === 'course' && a.status === 'completed').length, 0),
      inProgressAssignments: users.reduce((sum, u) => sum + u.assignments.filter(a => a.type === 'course' && a.status === 'in-progress').length, 0),
      overdueAssignments: users.reduce((sum, u) => sum + u.assignments.filter(a => a.type === 'course' && a.status === 'overdue').length, 0),
      popularTrainings: trainings.map(t => ({
        title: t.title,
        completions: t.completions,
        completionRate: Math.round((t.completions / t.totalUsers) * 100)
      })),
      departmentProgress: users.reduce((acc, user) => {
        if (!acc[user.department]) {
          acc[user.department] = { total: 0, completed: 0 };
        }
        acc[user.department].total += user.assignments.filter(a => a.type === 'course').length;
        acc[user.department].completed += user.assignments.filter(a => a.type === 'course' && a.status === 'completed').length;
        return acc;
      }, {})
    };
  }

  // Get policy analytics
  getPolicyAnalytics() {
    const users = this.data.users;
    const policies = this.data.policies;
    
    return {
      totalPolicies: policies.length,
      activePolicies: policies.filter(p => p.status === 'active').length,
      draftPolicies: policies.filter(p => p.status === 'draft').length,
      totalAssignments: users.reduce((sum, u) => sum + u.assignments.filter(a => a.type === 'policy').length, 0),
      acknowledgedAssignments: users.reduce((sum, u) => sum + u.assignments.filter(a => a.type === 'policy' && a.status === 'completed').length, 0),
      pendingAssignments: users.reduce((sum, u) => sum + u.assignments.filter(a => a.type === 'policy' && a.status === 'pending').length, 0),
      overdueAssignments: users.reduce((sum, u) => sum + u.assignments.filter(a => a.type === 'policy' && a.status === 'overdue').length, 0),
      policyBreakdown: policies.map(p => ({
        title: p.title,
        acknowledgments: p.acknowledgments,
        totalUsers: p.totalUsers,
        acknowledgmentRate: Math.round((p.acknowledgments / p.totalUsers) * 100)
      }))
    };
  }
}

// Create singleton instance
export const dashboardDataService = new DashboardDataService();

