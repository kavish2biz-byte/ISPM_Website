import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  BarChart3,
  TrendingUp,
  Users,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  Eye,
  Share2,
  Mail,
  FileUp,
  Plus
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

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor || '#EFF6FF'};
  color: ${props => props.color || '#3B82F6'};
`;

const StatTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748B;
  margin: 0;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 0.5rem;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: ${props => props.positive ? '#059669' : '#DC2626'};
`;

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ReportCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #3B82F6;
  }
`;

const ReportHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const ReportIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor || '#EFF6FF'};
  color: ${props => props.color || '#3B82F6'};
`;

const ReportTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
  flex: 1;
`;

const ReportStatus = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => {
    switch(props.status) {
      case 'completed': return '#F0FDF4';
      case 'generating': return '#FEF3C7';
      case 'failed': return '#FEE2E2';
      case 'none': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'completed': return '#059669';
      case 'generating': return '#D97706';
      case 'failed': return '#DC2626';
      case 'none': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const ReportDescription = styled.p`
  color: #64748B;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const ReportMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: #64748B;
`;

const ReportActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ReportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

  &.success {
    background: #10B981;
    color: white;
    border-color: #10B981;

    &:hover {
      background: #059669;
    }
  }

  &.warning {
    background: #F59E0B;
    color: white;
    border-color: #F59E0B;

    &:hover {
      background: #D97706;
    }
  }
`;

const AdminReports = ({ user, onLogout }) => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'Compliance Summary Report',
      description: 'Comprehensive overview of policy compliance across all departments',
      type: 'compliance',
      status: 'completed',
      createdAt: '2024-01-15T10:30:00Z',
      fileSize: '2.4 MB',
      icon: FileText,
      bgColor: '#EFF6FF',
      color: '#3B82F6'
    },
    {
      id: 2,
      title: 'Training Progress Report',
      description: 'Detailed analysis of training completion rates and progress',
      type: 'training',
      status: 'completed',
      createdAt: '2024-01-14T14:20:00Z',
      fileSize: '1.8 MB',
      icon: BarChart3,
      bgColor: '#F0FDF4',
      color: '#10B981'
    },
    {
      id: 3,
      title: 'User Activity Report',
      description: 'Monthly user activity and engagement metrics',
      type: 'users',
      status: 'completed',
      createdAt: '2024-01-13T09:15:00Z',
      fileSize: '3.2 MB',
      icon: Users,
      bgColor: '#FEF3C7',
      color: '#F59E0B'
    },
    {
      id: 4,
      title: 'Security Audit Report',
      description: 'Quarterly security audit findings and recommendations',
      type: 'security',
      status: 'none',
      createdAt: null,
      fileSize: '0 MB',
      icon: AlertTriangle,
      bgColor: '#F3F4F6',
      color: '#6B7280'
    },
    {
      id: 5,
      title: 'Policy Acknowledgment Report',
      description: 'Status of policy acknowledgments by department and role',
      type: 'policies',
      status: 'completed',
      createdAt: '2024-01-11T11:30:00Z',
      fileSize: '1.5 MB',
      icon: CheckCircle,
      bgColor: '#F3E8FF',
      color: '#8B5CF6'
    },
    {
      id: 6,
      title: 'Monthly Performance Report',
      description: 'Overall system performance and key metrics summary',
      type: 'performance',
      status: 'failed',
      createdAt: '2024-01-10T08:20:00Z',
      fileSize: '0 MB',
      icon: TrendingUp,
      bgColor: '#FEE2E2',
      color: '#EF4444'
    },
    {
      id: 7,
      title: 'User Behavior Analytics Report',
      description: 'Analysis of user login patterns, session durations, and activity trends',
      type: 'behavior',
      status: 'completed',
      createdAt: '2024-01-09T13:45:00Z',
      fileSize: '2.1 MB',
      icon: TrendingUp,
      bgColor: '#F0F9FF',
      color: '#0EA5E9'
    },
    {
      id: 8,
      title: 'Policy Compliance Risk Assessment',
      description: 'Risk analysis of policy violations and compliance gaps by department',
      type: 'risk',
      status: 'completed',
      createdAt: '2024-01-08T10:20:00Z',
      fileSize: '1.9 MB',
      icon: AlertTriangle,
      bgColor: '#FEF2F2',
      color: '#EF4444'
    },
    {
      id: 9,
      title: 'Employee Training Behavior Report',
      description: 'Detailed analysis of training engagement, completion patterns, and learning outcomes',
      type: 'training-behavior',
      status: 'completed',
      createdAt: '2024-01-07T15:30:00Z',
      fileSize: '2.7 MB',
      icon: Users,
      bgColor: '#F0FDF4',
      color: '#10B981'
    }

  ]);

  const [metrics, setMetrics] = useState({
    totalReports: 9,
    completedReports: 7,
    generatingReports: 0,
    failedReports: 1,
    avgFileSize: '2.0 MB'
  });

  const handleGenerateReport = () => {
    alert('Generating new report...');
  };

  const handleDownloadReport = (report) => {
    if (report.status === 'completed') {
      alert(`Downloading ${report.title}...`);
    } else {
      alert('Report is not ready for download yet.');
    }
  };

  const handleShareReport = (report) => {
    alert(`Sharing ${report.title}...`);
  };

  const handleEmailReport = (report) => {
    alert(`Emailing ${report.title}...`);
  };

  const handlePreviewReport = (report) => {
    alert(`Previewing ${report.title}...`);
  };

  const handleRetryReport = (report) => {
    alert(`Retrying generation of ${report.title}...`);
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <div>
              <Greeting>Reports Dashboard</Greeting>
              <Subtext>Generate, manage, and download compliance reports</Subtext>
            </div>
            <ActionButtons>
              <ActionButton className="primary" onClick={handleGenerateReport}>
                <Plus size={16} />
                Generate Report
              </ActionButton>
            </ActionButtons>
          </Header>

          {/* Key Metrics */}
          <StatsGrid>
            <StatCard>
              <StatHeader>
                <StatIcon bgColor="#EFF6FF" color="#3B82F6">
                  <FileText size={20} />
                </StatIcon>
                <StatTitle>Total Reports</StatTitle>
              </StatHeader>
              <StatValue>{metrics.totalReports}</StatValue>
              <StatChange positive>
                <TrendingUp size={14} />
                +2 this week
              </StatChange>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon bgColor="#F0FDF4" color="#10B981">
                  <CheckCircle size={20} />
                </StatIcon>
                <StatTitle>Completed</StatTitle>
              </StatHeader>
              <StatValue>{metrics.completedReports}</StatValue>
              <StatChange positive>
                <TrendingUp size={14} />
                {Math.round((metrics.completedReports / metrics.totalReports) * 100)}% success rate
              </StatChange>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon bgColor="#FEF3C7" color="#F59E0B">
                  <Clock size={20} />
                </StatIcon>
                <StatTitle>Generating</StatTitle>
              </StatHeader>
              <StatValue>{metrics.generatingReports}</StatValue>
              <StatChange>
                <Clock size={14} />
                In progress
              </StatChange>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon bgColor="#FEE2E2" color="#EF4444">
                  <AlertTriangle size={20} />
                </StatIcon>
                <StatTitle>Failed</StatTitle>
              </StatHeader>
              <StatValue>{metrics.failedReports}</StatValue>
              <StatChange>
                <AlertTriangle size={14} />
                Needs attention
              </StatChange>
            </StatCard>

            <StatCard>
              <StatHeader>
                <StatIcon bgColor="#F0F9FF" color="#0EA5E9">
                  <FileUp size={20} />
                </StatIcon>
                <StatTitle>Avg File Size</StatTitle>
              </StatHeader>
              <StatValue>{metrics.avgFileSize}</StatValue>
              <StatChange>
                <FileUp size={14} />
                Optimized
              </StatChange>
            </StatCard>
          </StatsGrid>

          {/* Reports Grid */}
          <ReportsGrid>
            {reports.map((report) => {
              const IconComponent = report.icon;
              return (
                <ReportCard key={report.id}>
                  <ReportHeader>
                    <ReportIcon bgColor={report.bgColor} color={report.color}>
                      <IconComponent size={20} />
                    </ReportIcon>
                    <ReportTitle>{report.title}</ReportTitle>
                    <ReportStatus status={report.status}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </ReportStatus>
                  </ReportHeader>

                  <ReportDescription>{report.description}</ReportDescription>

                  <ReportMeta>
                    <span>Created: {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'Not generated'}</span>
                    <span>Size: {report.fileSize}</span>
                  </ReportMeta>

                  <ReportActions>
                    {report.status === 'completed' && (
                      <>
                        <ReportButton onClick={() => handleDownloadReport(report)}>
                          <Download size={14} />
                          Download
                        </ReportButton>
                        <ReportButton onClick={() => handlePreviewReport(report)}>
                          <Eye size={14} />
                          Preview
                        </ReportButton>
                        <ReportButton onClick={() => handleShareReport(report)}>
                          <Share2 size={14} />
                          Share
                        </ReportButton>
                        <ReportButton onClick={() => handleEmailReport(report)}>
                          <Mail size={14} />
                          Email
                        </ReportButton>
                      </>
                    )}
                    {report.status === 'generating' && (
                      <ReportButton className="warning">
                        <Clock size={14} />
                        Generating...
                      </ReportButton>
                    )}
                    {report.status === 'failed' && (
                      <>
                        <ReportButton className="primary" onClick={() => handleRetryReport(report)}>
                          <RefreshCw size={14} />
                          Retry
                        </ReportButton>
                        <ReportButton>
                          <AlertTriangle size={14} />
                          View Error
                        </ReportButton>
                      </>
                    )}
                    {report.status === 'none' && (
                      <ReportButton className="primary" onClick={() => handleGenerateReport()}>
                        <Plus size={14} />
                        Generate Report
                      </ReportButton>
                    )}
                  </ReportActions>
                </ReportCard>
              );
            })}
          </ReportsGrid>
        </Container>
      </MainContent>
    </Page>
  );
};

export default AdminReports;
