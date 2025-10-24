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
  color: #3B82F6;
  margin: 0;
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

const TrainingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
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
`;

const TrainingTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #3B82F6;
  margin: 0;
  flex: 1;
`;

const TrainingStatus = styled.span`
  background: ${props => 
    props.status === 'completed' ? '#D1FAE5' : 
    props.status === 'in-progress' ? '#FEF3C7' : '#F3F4F6'
  };
  color: ${props => 
    props.status === 'completed' ? '#065F46' : 
    props.status === 'in-progress' ? '#92400E' : '#374151'
  };
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const TrainingDescription = styled.p`
  color: #64748B;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #3B82F6, #1D4ED8);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const TrainingMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #6B7280;
`;

const TrainingActions = styled.div`
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

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
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
  color: #3B82F6;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #64748B;
  font-size: 0.9rem;
`;

export default function MyTraining({ user, onLogout }) {
  const [trainings] = useState([
    {
      id: 1,
      title: 'Security Awareness Training',
      description: 'Comprehensive training covering basic security practices, threat awareness, and incident reporting procedures.',
      status: 'completed',
      progress: 100,
      duration: '30 minutes',
      category: 'Security',
      completedDate: '2025-01-15'
    },
    {
      id: 2,
      title: 'GDPR Compliance Training',
      description: 'Understanding data protection regulations, privacy rights, and compliance requirements under GDPR.',
      status: 'in-progress',
      progress: 65,
      duration: '45 minutes',
      category: 'Compliance',
      lastAccessed: '2025-01-20'
    },
    {
      id: 3,
      title: 'Password Security Best Practices',
      description: 'Advanced password management techniques, multi-factor authentication, and secure credential practices.',
      status: 'not-started',
      progress: 0,
      duration: '20 minutes',
      category: 'Security',
      assignedDate: '2025-01-18'
    },
    {
      id: 4,
      title: 'Remote Work Security Guidelines',
      description: 'Best practices for secure remote work including VPN usage, secure communications, and device management.',
      status: 'not-started',
      progress: 0,
      duration: '25 minutes',
      category: 'Remote Work',
      assignedDate: '2025-01-22'
    }
  ]);

  const stats = {
    completed: trainings.filter(t => t.status === 'completed').length,
    inProgress: trainings.filter(t => t.status === 'in-progress').length,
    notStarted: trainings.filter(t => t.status === 'not-started').length,
    totalTime: trainings.reduce((acc, t) => acc + parseInt(t.duration), 0)
  };

  const handleStartTraining = (id) => {
    // In a real app, this would start the training
    console.log('Starting training:', id);
  };

  const handleContinueTraining = (id) => {
    // In a real app, this would continue the training
    console.log('Continuing training:', id);
  };

  const handleRetakeTraining = (id) => {
    // In a real app, this would retake the training
    console.log('Retaking training:', id);
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <Title>My Training</Title>
            <BackButton to="/employee-dashboard">← Back to Dashboard</BackButton>
          </Header>

          <StatsSection>
            <StatCard>
              <StatNumber>{stats.completed}</StatNumber>
              <StatLabel>Completed</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.inProgress}</StatNumber>
              <StatLabel>In Progress</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.notStarted}</StatNumber>
              <StatLabel>Not Started</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.totalTime}m</StatNumber>
              <StatLabel>Total Duration</StatLabel>
            </StatCard>
          </StatsSection>

          <TrainingGrid>
            {trainings.map(training => (
              <TrainingCard key={training.id}>
                <TrainingHeader>
                  <TrainingTitle>{training.title}</TrainingTitle>
                  <TrainingStatus status={training.status}>{training.status.replace('-', ' ')}</TrainingStatus>
                </TrainingHeader>
                
                <TrainingDescription>{training.description}</TrainingDescription>
                
                <ProgressBar>
                  <ProgressFill progress={training.progress} />
                </ProgressBar>
                
                <TrainingMeta>
                  <span>{training.duration}</span>
                  <span>{training.category}</span>
                </TrainingMeta>
                
                <TrainingMeta>
                  {training.status === 'completed' && (
                    <span>Completed: {training.completedDate}</span>
                  )}
                  {training.status === 'in-progress' && (
                    <span>Last accessed: {training.lastAccessed}</span>
                  )}
                  {training.status === 'not-started' && (
                    <span>Assigned: {training.assignedDate}</span>
                  )}
                  <span>{training.progress}% Complete</span>
                </TrainingMeta>
                
                <TrainingActions>
                  {training.status === 'not-started' && (
                    <ActionButton 
                      variant="primary" 
                      onClick={() => handleStartTraining(training.id)}
                    >
                      Start Training
                    </ActionButton>
                  )}
                  {training.status === 'in-progress' && (
                    <ActionButton 
                      variant="primary" 
                      onClick={() => handleContinueTraining(training.id)}
                    >
                      Continue
                    </ActionButton>
                  )}
                  {training.status === 'completed' && (
                    <ActionButton 
                      variant="success" 
                      onClick={() => handleRetakeTraining(training.id)}
                    >
                      Retake
                    </ActionButton>
                  )}
                  <ActionButton>View Details</ActionButton>
                </TrainingActions>
              </TrainingCard>
            ))}
          </TrainingGrid>
        </Container>
      </MainContent>
    </Page>
  );
}