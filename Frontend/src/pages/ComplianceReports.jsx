import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
`;

const BackButton = styled(Link)`
  background: #6B7280;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #4B5563;
    transform: translateY(-2px);
  }
`;

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ReportCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ReportTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
`;

const ReportIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ReportDescription = styled.p`
  color: #64748B;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ReportMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #6B7280;
`;

const ReportActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: ${props => 
    props.variant === 'primary' ? '#3B82F6' : 
    props.variant === 'success' ? '#10B981' : '#6B7280'
  };
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => 
      props.variant === 'primary' ? '#2563EB' : 
      props.variant === 'success' ? '#059669' : '#4B5563'
    };
  }
`;

const ComplianceMetrics = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const MetricCard = styled.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
  color: #6B7280;
  font-weight: 500;
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  margin-bottom: 2rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  background: #E5E7EB;
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressFill = styled.div`
  background: linear-gradient(90deg, #10B981, #059669);
  height: 100%;
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const ProgressText = styled.span`
  font-weight: 600;
  color: #1F2937;
`;

const ProgressPercentage = styled.span`
  color: #6B7280;
`;

export default function ComplianceReports({ user, onLogout }) {
  const [reports] = useState([
    {
      id: 1,
      title: 'Monthly Compliance Report',
      description: 'Comprehensive monthly overview of all compliance metrics, training completion rates, and policy acknowledgments.',
      icon: '📊',
      lastGenerated: '2025-01-15',
      type: 'Monthly',
      status: 'Available'
    },
    {
      id: 2,
      title: 'Training Completion Report',
      description: 'Detailed report showing training progress, completion rates, and outstanding requirements by department.',
      icon: '🎓',
      lastGenerated: '2025-01-14',
      type: 'Weekly',
      status: 'Available'
    },
    {
      id: 3,
      title: 'Policy Acknowledgment Report',
      description: 'Report tracking policy acknowledgments, read receipts, and compliance with policy update requirements.',
      icon: '📋',
      lastGenerated: '2025-01-13',
      type: 'Weekly',
      status: 'Available'
    },
    {
      id: 4,
      title: 'Security Incident Report',
      description: 'Monthly security incident summary including incident types, response times, and resolution status.',
      icon: '🚨',
      lastGenerated: '2025-01-12',
      type: 'Monthly',
      status: 'Available'
    },
    {
      id: 5,
      title: 'GDPR Compliance Report',
      description: 'Specialized report for GDPR compliance tracking, data processing activities, and privacy impact assessments.',
      icon: '🔒',
      lastGenerated: '2025-01-11',
      type: 'Monthly',
      status: 'Available'
    },
    {
      id: 6,
      title: 'User Access Audit Report',
      description: 'Quarterly audit report of user access rights, permission changes, and access control compliance.',
      icon: '🔑',
      lastGenerated: '2025-01-10',
      type: 'Quarterly',
      status: 'Available'
    }
  ]);

  const [complianceData] = useState({
    overallCompliance: 87,
    trainingCompletion: 92,
    policyAcknowledgment: 85,
    incidentResponse: 94,
    gdprCompliance: 89
  });

  const [progressData] = useState([
    { label: 'Security Training', percentage: 92, completed: 46, total: 50 },
    { label: 'Policy Acknowledgment', percentage: 85, completed: 34, total: 40 },
    { label: 'GDPR Training', percentage: 78, completed: 31, total: 40 },
    { label: 'Incident Response', percentage: 96, completed: 24, total: 25 },
    { label: 'Password Security', percentage: 88, completed: 44, total: 50 }
  ]);

  const handleGenerateReport = (reportId) => {
    console.log(`Generating report ${reportId}`);
    // In a real application, this would trigger report generation
  };

  const handleDownloadReport = (reportId) => {
    console.log(`Downloading report ${reportId}`);
    // In a real application, this would download the report
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <Title>Compliance Reports</Title>
            <ActionButtons>
              <BackButton to="/admin-dashboard">← Back to Dashboard</BackButton>
              <Button>📈 Generate Custom Report</Button>
            </ActionButtons>
          </Header>

          <ComplianceMetrics>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1F2937', marginBottom: '1rem' }}>
              Current Compliance Metrics
            </h3>
            <MetricsGrid>
              <MetricCard>
                <MetricValue>{complianceData.overallCompliance}%</MetricValue>
                <MetricLabel>Overall Compliance</MetricLabel>
              </MetricCard>
              <MetricCard>
                <MetricValue>{complianceData.trainingCompletion}%</MetricValue>
                <MetricLabel>Training Completion</MetricLabel>
              </MetricCard>
              <MetricCard>
                <MetricValue>{complianceData.policyAcknowledgment}%</MetricValue>
                <MetricLabel>Policy Acknowledgment</MetricLabel>
              </MetricCard>
              <MetricCard>
                <MetricValue>{complianceData.incidentResponse}%</MetricValue>
                <MetricLabel>Incident Response</MetricLabel>
              </MetricCard>
              <MetricCard>
                <MetricValue>{complianceData.gdprCompliance}%</MetricValue>
                <MetricLabel>GDPR Compliance</MetricLabel>
              </MetricCard>
            </MetricsGrid>
          </ComplianceMetrics>

          <ChartContainer>
            <ChartTitle>Training Progress Overview</ChartTitle>
            {progressData.map((item, index) => (
              <div key={index}>
                <ProgressLabel>
                  <ProgressText>{item.label}</ProgressText>
                  <ProgressPercentage>{item.percentage}%</ProgressPercentage>
                </ProgressLabel>
                <ProgressBar>
                  <ProgressFill percentage={item.percentage} />
                </ProgressBar>
              </div>
            ))}
          </ChartContainer>

          <ReportsGrid>
            {reports.map(report => (
              <ReportCard key={report.id}>
                <ReportHeader>
                  <div>
                    <ReportIcon>{report.icon}</ReportIcon>
                    <ReportTitle>{report.title}</ReportTitle>
                  </div>
                </ReportHeader>
                
                <ReportDescription>{report.description}</ReportDescription>
                
                <ReportMeta>
                  <span>Type: {report.type}</span>
                  <span>Last Generated: {report.lastGenerated}</span>
                </ReportMeta>
                
                <ReportMeta>
                  <span>Status: {report.status}</span>
                </ReportMeta>
                
                <ReportActions>
                  <ActionButton 
                    variant="primary" 
                    onClick={() => handleGenerateReport(report.id)}
                  >
                    Generate
                  </ActionButton>
                  <ActionButton 
                    variant="success" 
                    onClick={() => handleDownloadReport(report.id)}
                  >
                    Download
                  </ActionButton>
                  <ActionButton>View Details</ActionButton>
                </ReportActions>
              </ReportCard>
            ))}
          </ReportsGrid>
        </Container>
      </MainContent>
    </Page>
  );
}

