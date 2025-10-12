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

const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const CertificateCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #E2E8F0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CertificateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const CertificateTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  flex: 1;
`;

const CertificateStatus = styled.span`
  background: ${props => 
    props.status === 'active' ? '#D1FAE5' : 
    props.status === 'expired' ? '#FEE2E2' : '#FEF3C7'
  };
  color: ${props => 
    props.status === 'active' ? '#065F46' : 
    props.status === 'expired' ? '#991B1B' : '#92400E'
  };
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const CertificateDescription = styled.p`
  color: #64748B;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const CertificateMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #6B7280;
`;

const CertificateActions = styled.div`
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

const VerificationSection = styled.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
`;

const VerificationTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.5rem 0;
`;

const VerificationCode = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: #6B7280;
  background: white;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #E5E7EB;
`;

export default function MyCertificates({ user, onLogout }) {
  const [certificates] = useState([
    {
      id: 1,
      title: 'Security Awareness Certificate',
      description: 'Certificate of completion for Security Awareness Training covering basic security practices and threat awareness.',
      status: 'active',
      issuedDate: '2025-01-15',
      expiryDate: '2025-07-15',
      issuer: 'SecureGuard Training',
      verificationCode: 'SG-SEC-2025-001',
      category: 'Security'
    },
    {
      id: 2,
      title: 'GDPR Compliance Certificate',
      description: 'Certificate demonstrating understanding of GDPR requirements and data protection best practices.',
      status: 'active',
      issuedDate: '2025-01-10',
      expiryDate: '2025-07-10',
      issuer: 'SecureGuard Training',
      verificationCode: 'SG-GDPR-2025-002',
      category: 'Compliance'
    },
    {
      id: 3,
      title: 'Password Security Certificate',
      description: 'Certificate for completion of Password Security Best Practices training program.',
      status: 'expired',
      issuedDate: '2024-06-15',
      expiryDate: '2024-12-15',
      issuer: 'SecureGuard Training',
      verificationCode: 'SG-PWD-2024-003',
      category: 'Security'
    },
    {
      id: 4,
      title: 'Remote Work Security Certificate',
      description: 'Certificate for Remote Work Security Guidelines training completion.',
      status: 'pending',
      issuedDate: '2025-01-20',
      expiryDate: '2025-07-20',
      issuer: 'SecureGuard Training',
      verificationCode: 'SG-RWS-2025-004',
      category: 'Remote Work'
    },
    {
      id: 5,
      title: 'Phishing Awareness Certificate',
      description: 'Certificate for completion of Phishing Awareness Training covering email security and social engineering prevention.',
      status: 'active',
      issuedDate: '2025-01-12',
      expiryDate: '2025-07-12',
      issuer: 'SecureGuard Training',
      verificationCode: 'SG-PHI-2025-005',
      category: 'Security'
    },
    {
      id: 6,
      title: 'Incident Response Certificate',
      description: 'Certificate demonstrating knowledge of security incident response procedures and protocols.',
      status: 'active',
      issuedDate: '2025-01-08',
      expiryDate: '2025-07-08',
      issuer: 'SecureGuard Training',
      verificationCode: 'SG-IR-2025-006',
      category: 'Security'
    },
    {
      id: 7,
      title: 'Data Protection Specialist Certificate',
      description: 'Advanced certificate for data protection, privacy laws, and secure data handling practices.',
      status: 'active',
      issuedDate: '2025-01-05',
      expiryDate: '2025-07-05',
      issuer: 'SecureGuard Training',
      verificationCode: 'SG-DP-2025-007',
      category: 'Compliance'
    },
    {
      id: 8,
      title: 'Access Control Management Certificate',
      description: 'Certificate for understanding access control systems, user permissions, and privilege management.',
      status: 'pending',
      issuedDate: '2025-01-22',
      expiryDate: '2025-07-22',
      issuer: 'SecureGuard Training',
      verificationCode: 'SG-AC-2025-008',
      category: 'Security'
    }
  ]);

  const stats = {
    total: certificates.length,
    active: certificates.filter(c => c.status === 'active').length,
    expired: certificates.filter(c => c.status === 'expired').length,
    pending: certificates.filter(c => c.status === 'pending').length
  };

  const handleDownloadCertificate = (id) => {
    console.log('Downloading certificate:', id);
    // In a real app, this would trigger a PDF download
  };

  const handleVerifyCertificate = (code) => {
    console.log('Verifying certificate:', code);
    // In a real app, this would verify the certificate
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <Title>My Certificates</Title>
            <BackButton to="/employee-dashboard">← Back to Dashboard</BackButton>
          </Header>

          <StatsSection>
            <StatCard>
              <StatNumber>{stats.total}</StatNumber>
              <StatLabel>Total Certificates</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.active}</StatNumber>
              <StatLabel>Active</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.expired}</StatNumber>
              <StatLabel>Expired</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{stats.pending}</StatNumber>
              <StatLabel>Pending</StatLabel>
            </StatCard>
          </StatsSection>

          <CertificatesGrid>
            {certificates.map(certificate => (
              <CertificateCard key={certificate.id}>
                <CertificateHeader>
                  <CertificateTitle>{certificate.title}</CertificateTitle>
                  <CertificateStatus status={certificate.status}>{certificate.status}</CertificateStatus>
                </CertificateHeader>
                
                <CertificateDescription>{certificate.description}</CertificateDescription>
                
                <CertificateMeta>
                  <span>Issued: {certificate.issuedDate}</span>
                  <span>Category: {certificate.category}</span>
                </CertificateMeta>
                
                <CertificateMeta>
                  <span>Expires: {certificate.expiryDate}</span>
                  <span>Issuer: {certificate.issuer}</span>
                </CertificateMeta>

                <VerificationSection>
                  <VerificationTitle>Verification Code</VerificationTitle>
                  <VerificationCode>{certificate.verificationCode}</VerificationCode>
                </VerificationSection>
                
                <CertificateActions>
                  {certificate.status === 'active' && (
                    <>
                      <ActionButton 
                        variant="primary" 
                        onClick={() => handleDownloadCertificate(certificate.id)}
                      >
                        Download PDF
                      </ActionButton>
                      <ActionButton 
                        variant="success" 
                        onClick={() => handleVerifyCertificate(certificate.verificationCode)}
                      >
                        Verify
                      </ActionButton>
                    </>
                  )}
                  {certificate.status === 'expired' && (
                    <ActionButton>Renew Certificate</ActionButton>
                  )}
                  {certificate.status === 'pending' && (
                    <ActionButton>View Progress</ActionButton>
                  )}
                </CertificateActions>
              </CertificateCard>
            ))}
          </CertificatesGrid>
        </Container>
      </MainContent>
    </Page>
  );
}