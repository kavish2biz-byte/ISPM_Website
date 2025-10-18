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

const QuizzesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const QuizCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const QuizHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
`;

const QuizTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
`;

const QuizStatus = styled.span`
  background: ${props => 
    props.status === 'passed' ? '#D1FAE5' : 
    props.status === 'failed' ? '#FEE2E2' : 
    props.status === 'in-progress' ? '#FEF3C7' : '#F3F4F6'
  };
  color: ${props => 
    props.status === 'passed' ? '#065F46' : 
    props.status === 'failed' ? '#991B1B' : 
    props.status === 'in-progress' ? '#92400E' : '#374151'
  };
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const QuizDescription = styled.p`
  color: #64748B;
  margin: 0.25rem 0 0.5rem 0;
  line-height: 1.5;
`;

const QuizMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #6B7280;
`;

const ScoreSection = styled.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: #E5E7EB;
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #1D4ED8);
  width: ${props => Math.max(0, Math.min(100, props.$value || 0))}%;
  transition: width 0.3s ease;
`;

const ScoreTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
`;

const ScoreValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => 
    props.score >= 80 ? '#10B981' : 
    props.score >= 60 ? '#F59E0B' : '#EF4444'
  };
`;

const QuizActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
`;

const ActionButton = styled.button`
  background: ${props => 
    props.variant === 'primary' ? '#3B82F6' : 
    props.variant === 'success' ? '#10B981' : 
    props.variant === 'warning' ? '#F59E0B' : '#6B7280'
  };
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => 
      props.variant === 'primary' ? '#2563EB' : 
      props.variant === 'success' ? '#059669' : 
      props.variant === 'warning' ? '#D97706' : '#4B5563'
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

export default function Quizzes({ user, onLogout }) {
  const [quizzes] = useState([
    {
      id: 1,
      title: 'Security Awareness Quiz',
      description: 'Test your knowledge of basic security practices, threat awareness, and incident reporting procedures.',
      status: 'passed',
      score: 85,
      maxScore: 100,
      questions: 20,
      duration: '15 minutes',
      category: 'Security',
      completedDate: '2025-01-15',
      attempts: 1
    },
    {
      id: 2,
      title: 'GDPR Compliance Quiz',
      description: 'Assess your understanding of GDPR requirements, data protection principles, and compliance procedures.',
      status: 'failed',
      score: 55,
      maxScore: 100,
      questions: 25,
      duration: '20 minutes',
      category: 'Compliance',
      completedDate: '2025-01-18',
      attempts: 2
    },
    {
      id: 3,
      title: 'Password Security Quiz',
      description: 'Evaluate your knowledge of password management, multi-factor authentication, and credential security.',
      status: 'not-started',
      score: null,
      maxScore: 100,
      questions: 15,
      duration: '10 minutes',
      category: 'Security',
      assignedDate: '2025-01-20',
      attempts: 0
    },
    {
      id: 4,
      title: 'Remote Work Security Quiz',
      description: 'Test your understanding of secure remote work practices, VPN usage, and device management.',
      status: 'in-progress',
      score: null,
      maxScore: 100,
      questions: 18,
      duration: '12 minutes',
      category: 'Remote Work',
      startedDate: '2025-01-22',
      attempts: 1,
      progressPercent: 45
    },
    {
      id: 5,
      title: 'Phishing Simulation Quiz',
      description: 'Identify phishing attempts, suspicious links, and social engineering tactics.',
      status: 'not-started',
      score: null,
      maxScore: 100,
      questions: 12,
      duration: '10 minutes',
      category: 'Security',
      assignedDate: '2025-02-01',
      attempts: 0
    },
    {
      id: 6,
      title: 'Data Classification Quiz',
      description: 'Learn how to classify and handle data according to company policy.',
      status: 'in-progress',
      score: null,
      maxScore: 100,
      questions: 16,
      duration: '12 minutes',
      category: 'Compliance',
      startedDate: '2025-02-02',
      attempts: 1,
      progressPercent: 30
    },
    {
      id: 7,
      title: 'Secure Coding Basics',
      description: 'Understand OWASP Top 10 and secure coding practices to prevent vulnerabilities.',
      status: 'not-started',
      score: null,
      maxScore: 100,
      questions: 20,
      duration: '15 minutes',
      category: 'Development',
      assignedDate: '2025-02-03',
      attempts: 0
    }
  ]);

  const stats = {
    total: quizzes.length,
    passed: quizzes.filter(q => q.status === 'passed').length,
    failed: quizzes.filter(q => q.status === 'failed').length,
    notStarted: quizzes.filter(q => q.status === 'not-started').length,
    averageScore: Math.round(quizzes.filter(q => q.score !== null).reduce((acc, q) => acc + q.score, 0) / quizzes.filter(q => q.score !== null).length) || 0
  };

  const handleStartQuiz = (id) => {
    console.log('Starting quiz:', id);
    // In a real app, this would start the quiz
  };

  const handleContinueQuiz = (id) => {
    console.log('Continuing quiz:', id);
    // In a real app, this would continue the quiz
  };

  const handleRetakeQuiz = (id) => {
    console.log('Retaking quiz:', id);
    // In a real app, this would retake the quiz
  };

  const handleReviewQuiz = (id) => {
    console.log('Reviewing quiz:', id);
    // In a real app, this would show quiz review
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <Title>Quizzes</Title>
            <BackButton to="/employee-dashboard">← Back to Dashboard</BackButton>
          </Header>

          <StatsSection>
            <StatCard>
              <StatNumber>{stats.total}</StatNumber>
              <StatLabel>Total Quizzes</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.passed}</StatNumber>
              <StatLabel>Passed</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.failed}</StatNumber>
              <StatLabel>Failed</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.averageScore}%</StatNumber>
              <StatLabel>Average Score</StatLabel>
            </StatCard>
          </StatsSection>

          <QuizzesGrid>
            {quizzes.map(quiz => (
              <QuizCard key={quiz.id}>
                <QuizHeader>
                  <QuizTitle>{quiz.title}</QuizTitle>
                  <QuizStatus status={quiz.status}>{quiz.status.replace('-', ' ')}</QuizStatus>
                </QuizHeader>
                
                <QuizDescription>{quiz.description}</QuizDescription>
                
                <QuizMeta>
                  <span>{quiz.questions} Questions</span>
                  <span>{quiz.duration}</span>
                </QuizMeta>
                
                <QuizMeta>
                  <span>{quiz.category}</span>
                  <span>Attempts: {quiz.attempts}</span>
                </QuizMeta>

                {(quiz.score !== null || quiz.status === 'in-progress') && (
                  <ScoreSection>
                    <ScoreTitle>
                      {quiz.status === 'in-progress' ? 'Progress' : 'Latest Score'}
                    </ScoreTitle>
                    {quiz.status === 'in-progress' ? (
                      <>
                        <ProgressBar>
                          <ProgressFill $value={quiz.progressPercent || 0} />
                        </ProgressBar>
                        <div style={{ marginTop: '0.5rem', color: '#374151', fontWeight: 600 }}>
                          {Math.round(quiz.progressPercent || 0)}%
                        </div>
                      </>
                    ) : (
                      <ScoreValue score={quiz.score}>{quiz.score}/{quiz.maxScore}</ScoreValue>
                    )}
                  </ScoreSection>
                )}
                
                <QuizMeta>
                  {quiz.status === 'passed' && (
                    <span>Completed: {quiz.completedDate}</span>
                  )}
                  {quiz.status === 'failed' && (
                    <span>Last attempt: {quiz.completedDate}</span>
                  )}
                  {quiz.status === 'not-started' && (
                    <span>Assigned: {quiz.assignedDate}</span>
                  )}
                  {quiz.status === 'in-progress' && (
                    <span>Started: {quiz.startedDate}</span>
                  )}
                </QuizMeta>
                
                <QuizActions>
                  {quiz.status === 'not-started' && (
                    <ActionButton 
                      variant="primary" 
                      onClick={() => handleStartQuiz(quiz.id)}
                    >
                      Start Quiz
                    </ActionButton>
                  )}
                  {quiz.status === 'in-progress' && (
                    <ActionButton 
                      variant="primary" 
                      onClick={() => handleContinueQuiz(quiz.id)}
                    >
                      Continue Quiz
                    </ActionButton>
                  )}
                  {quiz.status === 'passed' && (
                    <>
                      <ActionButton 
                        variant="success" 
                        onClick={() => handleReviewQuiz(quiz.id)}
                      >
                        Review
                      </ActionButton>
                      <ActionButton 
                        variant="warning" 
                        onClick={() => handleRetakeQuiz(quiz.id)}
                      >
                        Retake
                      </ActionButton>
                    </>
                  )}
                  {quiz.status === 'failed' && (
                    <>
                      <ActionButton 
                        variant="warning" 
                        onClick={() => handleRetakeQuiz(quiz.id)}
                      >
                        Retake Quiz
                      </ActionButton>
                      <ActionButton 
                        onClick={() => handleReviewQuiz(quiz.id)}
                      >
                        Review
                      </ActionButton>
                    </>
                  )}
                </QuizActions>
              </QuizCard>
            ))}
          </QuizzesGrid>
        </Container>
      </MainContent>
    </Page>
  );
}