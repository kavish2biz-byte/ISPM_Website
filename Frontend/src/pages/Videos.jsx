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

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const VideoCard = styled.div`
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

const VideoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const VideoTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
`;

const VideoStatus = styled.span`
  background: ${props => 
    props.status === 'watched' ? '#D1FAE5' : 
    props.status === 'in-progress' ? '#FEF3C7' : '#F3F4F6'
  };
  color: ${props => 
    props.status === 'watched' ? '#065F46' : 
    props.status === 'in-progress' ? '#92400E' : '#374151'
  };
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const VideoDescription = styled.p`
  color: #64748B;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const VideoMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #6B7280;
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

const VideoActions = styled.div`
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

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
  margin: 2rem 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const YouTubeSection = styled.div`
  margin-top: 3rem;
`;

const YouTubeDescription = styled.p`
  color: #6B7280;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const YouTubeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
`;

const YouTubeCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const YouTubeThumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const YouTubeDuration = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const PlayButton = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
  background: rgba(255, 0, 0, 0.9);
    border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  opacity: 0;

  ${YouTubeCard}:hover & {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const YouTubeInfo = styled.div`
  padding: 1rem;
`;

const YouTubeTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const YouTubeChannel = styled.div`
  font-size: 0.9rem;
  color: #6B7280;
  margin-bottom: 0.5rem;
`;

const YouTubeMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #9CA3AF;
  margin-bottom: 0.75rem;
`;

const YouTubeVideoDescription = styled.p`
  font-size: 0.9rem;
  color: #6B7280;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default function Videos({ user, onLogout }) {
  const [videos] = useState([
    {
      id: 1,
      title: 'Introduction to Information Security',
      description: 'Learn the fundamentals of information security, including threats, vulnerabilities, and basic protection measures.',
      status: 'watched',
      progress: 100,
      duration: '15 minutes',
      category: 'Security',
      watchedDate: '2025-01-15',
      instructor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      title: 'GDPR Compliance Essentials',
      description: 'Understanding the General Data Protection Regulation and its implications for data handling and privacy.',
      status: 'in-progress',
      progress: 65,
      duration: '20 minutes',
      category: 'Compliance',
      lastWatched: '2025-01-20',
      instructor: 'Legal Team'
    },
    {
      id: 3,
      title: 'Password Security Best Practices',
      description: 'Master the art of creating and managing secure passwords, including multi-factor authentication setup.',
      status: 'not-started',
      progress: 0,
      duration: '12 minutes',
      category: 'Security',
      assignedDate: '2025-01-18',
      instructor: 'IT Security Team'
    },
    {
      id: 4,
      title: 'Remote Work Security Guidelines',
      description: 'Essential security practices for remote workers including VPN usage, secure communications, and device management.',
      status: 'not-started',
      progress: 0,
      duration: '18 minutes',
      category: 'Remote Work',
      assignedDate: '2025-01-22',
      instructor: 'Remote Work Team'
    },
    {
      id: 5,
      title: 'Phishing Awareness Training',
      description: 'Recognize and avoid phishing attacks, social engineering tactics, and suspicious email patterns.',
      status: 'watched',
      progress: 100,
      duration: '10 minutes',
      category: 'Security',
      watchedDate: '2025-01-12',
      instructor: 'Security Awareness Team'
    },
    {
      id: 6,
      title: 'Incident Response Procedures',
      description: 'Step-by-step guide to reporting security incidents and following proper response protocols.',
      status: 'in-progress',
      progress: 30,
      duration: '25 minutes',
      category: 'Security',
      lastWatched: '2025-01-21',
      instructor: 'Incident Response Team'
    },
    {
      id: 7,
      title: 'Cloud Security Fundamentals',
      description: 'Essential security practices for cloud environments and data protection in the cloud.',
      status: 'not-started',
      progress: 0,
      duration: '30 minutes',
      category: 'Cloud Security',
      assignedDate: '2025-01-25',
      instructor: 'Cloud Security Team'
    },
    {
      id: 8,
      title: 'Mobile Device Security',
      description: 'Best practices for securing mobile devices and protecting corporate data on mobile platforms.',
      status: 'watched',
      progress: 100,
      duration: '18 minutes',
      category: 'Mobile Security',
      watchedDate: '2025-01-18',
      instructor: 'Mobile Security Team'
    },
    {
      id: 9,
      title: 'Social Engineering Defense',
      description: 'Recognize and defend against social engineering attacks and manipulation tactics.',
      status: 'in-progress',
      progress: 45,
      duration: '22 minutes',
      category: 'Security',
      lastWatched: '2025-01-23',
      instructor: 'Security Awareness Team'
    },
    {
      id: 10,
      title: 'Data Backup and Recovery',
      description: 'Essential procedures for backing up critical data and recovering from system failures.',
      status: 'not-started',
      progress: 0,
      duration: '20 minutes',
      category: 'Operations',
      assignedDate: '2025-01-26',
      instructor: 'IT Operations Team'
    },
    {
      id: 11,
      title: 'Network Security Essentials',
      description: 'Understanding network security principles, firewalls, and secure network configurations.',
      status: 'watched',
      progress: 100,
      duration: '28 minutes',
      category: 'Network Security',
      watchedDate: '2025-01-16',
      instructor: 'Network Security Team'
    },
    {
      id: 12,
      title: 'Email Security Best Practices',
      description: 'Secure email communication, recognizing malicious emails, and protecting against email-based attacks.',
      status: 'in-progress',
      progress: 60,
      duration: '15 minutes',
      category: 'Security',
      lastWatched: '2025-01-24',
      instructor: 'Email Security Team'
    }
  ]);

  const stats = {
    total: videos.length,
    watched: videos.filter(v => v.status === 'watched').length,
    inProgress: videos.filter(v => v.status === 'in-progress').length,
    notStarted: videos.filter(v => v.status === 'not-started').length,
    totalDuration: videos.reduce((acc, v) => acc + parseInt(v.duration), 0)
  };

  const handleWatchVideo = (id) => {
    console.log('Watching video:', id);
    // In a real app, this would open the video player
  };

  const handleContinueVideo = (id) => {
    console.log('Continuing video:', id);
    // In a real app, this would continue the video from where it left off
  };

  const handleRewatchVideo = (id) => {
    console.log('Rewatching video:', id);
    // In a real app, this would restart the video
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
      <Title>Training Videos</Title>
            <BackButton to="/employee-dashboard">← Back to Dashboard</BackButton>
          </Header>

          <StatsSection>
            <StatCard>
              <StatNumber>{stats.total}</StatNumber>
              <StatLabel>Total Videos</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.watched}</StatNumber>
              <StatLabel>Watched</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.inProgress}</StatNumber>
              <StatLabel>In Progress</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.totalDuration}m</StatNumber>
              <StatLabel>Total Duration</StatLabel>
            </StatCard>
          </StatsSection>

          <SectionTitle>🎓 Internal Training Videos</SectionTitle>
          <VideosGrid>
            {videos.map(video => (
              <VideoCard key={video.id}>
                <VideoHeader>
                  <VideoTitle>{video.title}</VideoTitle>
                  <VideoStatus status={video.status}>{video.status.replace('-', ' ')}</VideoStatus>
                </VideoHeader>
                
                <VideoDescription>{video.description}</VideoDescription>
                
                <VideoMeta>
                  <span>{video.duration}</span>
                  <span>{video.category}</span>
                </VideoMeta>
                
                <VideoMeta>
                  <span>Instructor: {video.instructor}</span>
                  <span>{video.progress}% Complete</span>
                </VideoMeta>

                {video.status !== 'not-started' && (
                  <ProgressBar>
                    <ProgressFill progress={video.progress} />
                  </ProgressBar>
                )}
                
                <VideoMeta>
                  {video.status === 'watched' && (
                    <span>Watched: {video.watchedDate}</span>
                  )}
                  {video.status === 'in-progress' && (
                    <span>Last watched: {video.lastWatched}</span>
                  )}
                  {video.status === 'not-started' && (
                    <span>Assigned: {video.assignedDate}</span>
                  )}
                </VideoMeta>
                
                <VideoActions>
                  {video.status === 'not-started' && (
                    <ActionButton 
                      variant="primary" 
                      onClick={() => handleWatchVideo(video.id)}
                    >
                      ▶ Watch Video
                    </ActionButton>
                  )}
                  {video.status === 'in-progress' && (
                    <ActionButton 
                      variant="primary" 
                      onClick={() => handleContinueVideo(video.id)}
                    >
                      ▶ Continue Watching
                    </ActionButton>
                  )}
                  {video.status === 'watched' && (
                    <ActionButton 
                      variant="success" 
                      onClick={() => handleRewatchVideo(video.id)}
                    >
                      🔄 Rewatch
                    </ActionButton>
                  )}
                </VideoActions>
              </VideoCard>
            ))}
          </VideosGrid>

          <YouTubeSection>
            <SectionTitle>📺 Recommended YouTube Videos</SectionTitle>
            <YouTubeDescription>
              Curated security and compliance videos from trusted YouTube channels to supplement your training.
            </YouTubeDescription>
            <YouTubeGrid>
              {[
                {
                  id: 1,
                  title: 'Cybersecurity Fundamentals - Complete Course',
                  channel: 'Cybersecurity Academy',
                  duration: '2:15:30',
                  views: '1.2M views',
                  uploadDate: '2 months ago',
                  description: 'Comprehensive introduction to cybersecurity concepts, threats, and best practices.',
                  thumbnail: 'https://img.youtube.com/vi/inWWhr5tnEA/maxresdefault.jpg',
                  url: 'https://youtube.com/watch?v=inWWhr5tnEA'
                },
                {
                  id: 2,
                  title: 'GDPR Compliance Explained Simply',
                  channel: 'Privacy Matters',
                  duration: '18:45',
                  views: '856K views',
                  uploadDate: '3 weeks ago',
                  description: 'Easy-to-understand explanation of GDPR requirements and implementation strategies.',
                  thumbnail: 'https://img.youtube.com/vi/7l1r6yVJ3no/maxresdefault.jpg',
                  url: 'https://youtube.com/watch?v=7l1r6yVJ3no'
                },
                {
                  id: 3,
                  title: 'Password Security Best Practices 2025',
                  channel: 'Security First',
                  duration: '12:30',
                  views: '445K views',
                  uploadDate: '1 week ago',
                  description: 'Latest password security recommendations including passphrase techniques.',
                  thumbnail: 'https://img.youtube.com/vi/OpZgA3VZvY8/maxresdefault.jpg',
                  url: 'https://youtube.com/watch?v=OpZgA3VZvY8'
                },
                {
                  id: 4,
                  title: 'Phishing Attack Simulation and Defense',
                  channel: 'Ethical Hacking Tutorials',
                  duration: '25:12',
                  views: '678K views',
                  uploadDate: '1 month ago',
                  description: 'Real-world phishing examples and how to identify and defend against them.',
                  thumbnail: 'https://img.youtube.com/vi/Y7zNlEMD9I4/maxresdefault.jpg',
                  url: 'https://youtube.com/watch?v=Y7zNlEMD9I4'
                },
                {
                  id: 5,
                  title: 'Cloud Security Fundamentals',
                  channel: 'Cloud Security Institute',
                  duration: '32:18',
                  views: '234K views',
                  uploadDate: '2 weeks ago',
                  description: 'Essential cloud security concepts for AWS, Azure, and Google Cloud.',
                  thumbnail: 'https://img.youtube.com/vi/3Gq1jAQCnw0/maxresdefault.jpg',
                  url: 'https://youtube.com/watch?v=3Gq1jAQCnw0'
                },
                {
                  id: 6,
                  title: 'Mobile Device Security Best Practices',
                  channel: 'Mobile Security Pro',
                  duration: '15:42',
                  views: '189K views',
                  uploadDate: '5 days ago',
                  description: 'Securing smartphones and tablets in corporate environments.',
                  thumbnail: 'https://img.youtube.com/vi/7x6nIq8YaR4/maxresdefault.jpg',
                  url: 'https://youtube.com/watch?v=7x6nIq8YaR4'
                }
              ].map(video => (
                <YouTubeCard key={video.id} onClick={() => window.open(video.url, '_blank')}>
                  <YouTubeThumbnail>
                    <img src={video.thumbnail} alt={video.title} />
                    <YouTubeDuration>{video.duration}</YouTubeDuration>
                    <PlayButton>▶</PlayButton>
                  </YouTubeThumbnail>
                  <YouTubeInfo>
                    <YouTubeTitle>{video.title}</YouTubeTitle>
                    <YouTubeChannel>{video.channel}</YouTubeChannel>
                    <YouTubeMeta>
                      <span>{video.views}</span>
                      <span>{video.uploadDate}</span>
                    </YouTubeMeta>
                    <YouTubeVideoDescription>{video.description}</YouTubeVideoDescription>
                  </YouTubeInfo>
                </YouTubeCard>
              ))}
            </YouTubeGrid>
          </YouTubeSection>
        </Container>
      </MainContent>
    </Page>
  );
}