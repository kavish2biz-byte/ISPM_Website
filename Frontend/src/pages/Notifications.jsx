import React, { useMemo, useState } from 'react';
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  margin: 0;
  color: #1E3A8A;
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tab = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid #CBD5E1;
  background: ${props => props.$active ? '#1E3A8A' : '#FFFFFF'};
  color: ${props => props.$active ? '#FFFFFF' : '#1E293B'};
  font-weight: 600;
  cursor: pointer;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Item = styled.li`
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #FFFFFF;
  background: ${props => props.$type === 'policy' ? '#0EA5E9' : props.$type === 'training' ? '#22C55E' : props.$type === 'system' ? '#F59E0B' : '#6366F1'};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
  align-self: center;
`;

const ActionBtn = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #CBD5E1;
  background: #FFFFFF;
  cursor: pointer;
  font-weight: 600;
  color: #1E293B;
`;

export default function Notifications({ user, onLogout }) {
  const [active, setActive] = useState('all');

  const notifications = useMemo(() => ([
    { id: 1, type: 'policy', title: 'Policy Update: Data Handling', desc: 'Please review and acknowledge the updated Data Handling Policy.', cta: { label: 'Review Policy', to: '/policies' }, time: '2h ago' },
    { id: 2, type: 'training', title: 'Training Assigned: Phishing Awareness', desc: 'A new training course has been assigned. Complete by next Friday.', cta: { label: 'Start Training', to: '/my-training' }, time: 'Yesterday' },
    { id: 3, type: 'system', title: 'Password Expiring Soon', desc: 'Your password will expire in 5 days. Update to avoid interruption.', cta: { label: 'Change Password', to: '/profile' }, time: '2 days ago' },
    { id: 4, type: 'alert', title: 'Overdue Acknowledgement', desc: 'You have 1 overdue policy acknowledgement.', cta: { label: 'View Items', to: '/policies' }, time: '3 days ago' },
    { id: 5, type: 'training', title: 'Quiz Available: Secure Coding', desc: 'A new quiz is available to test your knowledge.', cta: { label: 'Take Quiz', to: '/quizzes' }, time: '4 days ago' },
    { id: 6, type: 'policy', title: 'New Remote Work Policy', desc: 'A new remote work policy has been published.', cta: { label: 'Review Policy', to: '/policies' }, time: '5 days ago' },
    { id: 7, type: 'system', title: 'Profile Incomplete', desc: 'Complete your profile details for better personalization.', cta: { label: 'Update Profile', to: '/profile' }, time: '6 days ago' },
    { id: 8, type: 'alert', title: 'Training Overdue', desc: 'Your Cyber Hygiene training is overdue.', cta: { label: 'Resume Training', to: '/my-training' }, time: '1 week ago' },
    { id: 9, type: 'training', title: 'New Video: Secure Email', desc: 'Watch the latest security awareness video.', cta: { label: 'Watch Video', to: '/videos' }, time: '1 week ago' },
    { id: 10, type: 'policy', title: 'Annual Policy Attestation', desc: 'Please attest to company policies for the new year.', cta: { label: 'Attest Now', to: '/policies' }, time: '2 weeks ago' },
  ]), []);

  const filtered = useMemo(() => active === 'all' ? notifications : notifications.filter(n => n.type === active), [active, notifications]);

  const markAllAsRead = () => {
    // Placeholder for future API call
    alert('All notifications marked as read');
  };

  const muteCategory = (cat) => {
    // Placeholder for future preference save
    alert(`Muted ${cat} notifications`);
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <Title>Notifications</Title>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <ActionBtn onClick={markAllAsRead}>Mark all as read</ActionBtn>
              <ActionBtn onClick={() => muteCategory(active)} disabled={active==='all'}>Mute category</ActionBtn>
            </div>
          </Header>

          <CategoryTabs>
            {['all','policy','training','system','alert'].map(cat => (
              <Tab key={cat} $active={active===cat} onClick={() => setActive(cat)}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Tab>
            ))}
          </CategoryTabs>

          <div style={{ height: '12px' }} />

          <List>
            {filtered.map(n => (
              <Item key={n.id}>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.25rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                    <Badge $type={n.type}>{n.type.toUpperCase()}</Badge>
                    <span style={{ color:'#64748B', fontSize:'0.8rem' }}>{n.time}</span>
                  </div>
                  <h3 style={{ margin:'0', color:'#0F172A' }}>{n.title}</h3>
                  <p style={{ margin:'0', color:'#475569' }}>{n.desc}</p>
                </div>
                <Actions>
                  <ActionBtn onClick={() => alert('Marked as read')}>Mark as read</ActionBtn>
                  <Link to={n.cta.to} style={{ textDecoration:'none' }}>
                    <ActionBtn>{n.cta.label}</ActionBtn>
                  </Link>
                </Actions>
              </Item>
            ))}
          </List>
        </Container>
      </MainContent>
    </Page>
  );
}


