import React from 'react';
import styled from 'styled-components';
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
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1E3A8A;
  margin-bottom: 2rem;
  font-weight: 800;
`;

const PolicySection = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #1E3A8A;
  margin-bottom: 1.5rem;
  font-weight: 700;
  border-bottom: 2px solid #1E3A8A;
  padding-bottom: 0.5rem;
`;

const PolicyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const PolicyCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: all 0.3s ease;
  border-left: 4px solid ${props => props.category === 'company' ? '#1E3A8A' : props.category === 'it' ? '#059669' : props.category === 'hr' ? '#DC2626' : '#7C3AED'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const PolicyName = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 1rem;
`;

const PolicyDescription = styled.p`
  color: #64748B;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PolicyMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0.75rem;
  background: #F8FAFC;
  border-radius: 8px;
`;

const PolicyVersion = styled.span`
  font-size: 0.8rem;
  color: #64748B;
  background: #E2E8F0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const PolicyDate = styled.span`
  font-size: 0.8rem;
  color: #64748B;
`;

const CategoryBadge = styled.span`
  font-size: 0.75rem;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background: ${props => props.category === 'company' ? '#1E3A8A' : props.category === 'it' ? '#059669' : props.category === 'hr' ? '#DC2626' : '#7C3AED'};
  margin-bottom: 1rem;
  display: inline-block;
`;

const DownloadButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #1E3A8A, #2563EB);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
  }
`;

export default function Policies({ user, onLogout }) {
  const companyPolicies = [
    {
      id: 1,
      name: 'Code of Conduct & Ethics',
      description: 'Establishes the ethical standards and behavioral expectations for all employees.',
      version: 'v3.2',
      lastUpdated: 'Jan 15, 2025',
      category: 'company'
    },
    {
      id: 2,
      name: 'Anti-Discrimination & Harassment Policy',
      description: 'Prohibits discrimination and harassment in the workplace, ensuring a safe environment.',
      version: 'v2.8',
      lastUpdated: 'Jan 10, 2025',
      category: 'company'
    },
    {
      id: 3,
      name: 'Workplace Safety & Health Policy',
      description: 'Guidelines for maintaining a safe and healthy work environment for all employees.',
      version: 'v4.1',
      lastUpdated: 'Jan 8, 2025',
      category: 'company'
    },
    {
      id: 4,
      name: 'Remote Work Policy',
      description: 'Comprehensive guidelines for remote work arrangements and expectations.',
      version: 'v2.5',
      lastUpdated: 'Dec 28, 2024',
      category: 'company'
    }
  ];

  const itPolicies = [
    {
      id: 5,
      name: 'Information Security Policy',
      description: 'Comprehensive guidelines for protecting organizational information assets and data.',
      version: 'v4.3',
      lastUpdated: 'Jan 15, 2025',
      category: 'it'
    },
    {
      id: 6,
      name: 'Password & Authentication Policy',
      description: 'Standards for password creation, multi-factor authentication, and account security.',
      version: 'v3.1',
      lastUpdated: 'Jan 10, 2025',
      category: 'it'
    },
    {
      id: 7,
      name: 'Data Privacy & GDPR Compliance',
      description: 'Data protection regulations, privacy rights, and GDPR compliance requirements.',
      version: 'v5.0',
      lastUpdated: 'Jan 5, 2025',
      category: 'it'
    },
    {
      id: 8,
      name: 'Network Security Policy',
      description: 'Guidelines for network access, VPN usage, and secure network configurations.',
      version: 'v2.9',
      lastUpdated: 'Dec 30, 2024',
      category: 'it'
    },
    {
      id: 9,
      name: 'Software & Application Policy',
      description: 'Standards for software installation, licensing, and application security.',
      version: 'v2.7',
      lastUpdated: 'Dec 25, 2024',
      category: 'it'
    },
    {
      id: 10,
      name: 'Incident Response & Breach Notification',
      description: 'Procedures for handling security incidents and data breach notifications.',
      version: 'v3.4',
      lastUpdated: 'Dec 20, 2024',
      category: 'it'
    }
  ];

  const hrPolicies = [
    {
      id: 11,
      name: 'Employee Handbook',
      description: 'Comprehensive guide covering all employee rights, benefits, and company procedures.',
      version: 'v6.2',
      lastUpdated: 'Jan 12, 2025',
      category: 'hr'
    },
    {
      id: 12,
      name: 'Leave & Time Off Policy',
      description: 'Guidelines for vacation, sick leave, personal time, and other leave types.',
      version: 'v4.5',
      lastUpdated: 'Jan 8, 2025',
      category: 'hr'
    },
    {
      id: 13,
      name: 'Performance Management Policy',
      description: 'Standards for performance reviews, evaluations, and career development.',
      version: 'v3.8',
      lastUpdated: 'Dec 30, 2024',
      category: 'hr'
    },
    {
      id: 14,
      name: 'Compensation & Benefits Policy',
      description: 'Guidelines for salary, bonuses, benefits, and compensation adjustments.',
      version: 'v2.9',
      lastUpdated: 'Dec 25, 2024',
      category: 'hr'
    }
  ];

  const financePolicies = [
    {
      id: 15,
      name: 'Expense Reimbursement Policy',
      description: 'Guidelines for business expense reporting and reimbursement procedures.',
      version: 'v3.1',
      lastUpdated: 'Jan 10, 2025',
      category: 'finance'
    },
    {
      id: 16,
      name: 'Travel & Entertainment Policy',
      description: 'Standards for business travel, entertainment expenses, and approval processes.',
      version: 'v2.6',
      lastUpdated: 'Jan 5, 2025',
      category: 'finance'
    },
    {
      id: 17,
      name: 'Procurement & Vendor Management',
      description: 'Guidelines for vendor selection, contract management, and procurement processes.',
      version: 'v4.2',
      lastUpdated: 'Dec 28, 2024',
      category: 'finance'
    }
  ];

  const handleDownload = (policyName) => {
    alert(`Downloading ${policyName}.pdf...`);
  };

  const renderPolicyCard = (policy) => (
    <PolicyCard key={policy.id} category={policy.category}>
      <CategoryBadge category={policy.category}>
        {policy.category === 'company' ? 'Company' : 
         policy.category === 'it' ? 'IT Security' : 
         policy.category === 'hr' ? 'Human Resources' : 'Finance'}
      </CategoryBadge>
      <PolicyName>{policy.name}</PolicyName>
      <PolicyDescription>{policy.description}</PolicyDescription>
      <PolicyMeta>
        <PolicyVersion>{policy.version}</PolicyVersion>
        <PolicyDate>{policy.lastUpdated}</PolicyDate>
      </PolicyMeta>
      <DownloadButton onClick={() => handleDownload(policy.name)}>
        Download PDF
      </DownloadButton>
    </PolicyCard>
  );

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Title>Company Policies & Procedures</Title>
          
          <PolicySection>
            <SectionTitle>🏢 Company Policies</SectionTitle>
            <PolicyGrid>
              {companyPolicies.map(renderPolicyCard)}
            </PolicyGrid>
          </PolicySection>

          <PolicySection>
            <SectionTitle>🔒 IT Security Policies</SectionTitle>
            <PolicyGrid>
              {itPolicies.map(renderPolicyCard)}
            </PolicyGrid>
          </PolicySection>

          <PolicySection>
            <SectionTitle>👥 Human Resources Policies</SectionTitle>
            <PolicyGrid>
              {hrPolicies.map(renderPolicyCard)}
            </PolicyGrid>
          </PolicySection>

          <PolicySection>
            <SectionTitle>💰 Finance & Procurement Policies</SectionTitle>
            <PolicyGrid>
              {financePolicies.map(renderPolicyCard)}
            </PolicyGrid>
          </PolicySection>
        </Container>
      </MainContent>
    </Page>
  );
}