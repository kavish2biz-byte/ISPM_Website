import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

/* GlobalStyles */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    :root {
      --primary: #1E3A8A;
      --secondary: #2563EB;
      --accent: #64748B;
      --bg: #F1F5F9;
      --text: #0F172A;
      --white: #FFFFFF;
      --border: #E2E8F0;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      line-height: 1.6;
    }
    a { text-decoration: none; color: inherit; }
    button { 
      font-family: inherit; 
      cursor: pointer; 
      background: none; 
      border: none !important; 
      outline: none !important; 
    }
  `}</style>
);

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.nav`
  background: var(--white);
  padding: 1rem 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 2.5rem;
  width: auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: var(--accent);
  font-weight: 500;
  text-decoration: none;
  &:hover { color: var(--primary); }
`;

const Header = styled.header`
  background: var(--primary);
  color: var(--white);
  padding: 4rem 2rem 2rem;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  color: white;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-lg);
  flex: 1;
`;

const Section = styled.section`
  margin-bottom: var(--space-xl);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: var(--primary);
  margin-bottom: var(--space-lg);
`;

const Content = styled.div`
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text);
  margin-bottom: var(--space-lg);
`;

const LastUpdated = styled.div`
  background: var(--bg);
  padding: var(--space-md);
  border-radius: var(--radius-sm);
  color: var(--accent);
  font-size: 0.9rem;
  margin-bottom: var(--space-lg);
  text-align: center;
`;

const PolicySection = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
`;

const SubTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--primary);
  margin-bottom: var(--space-md);
`;

const SubSubTitle = styled.h4`
  font-size: 1.2rem;
  color: var(--secondary);
  margin-bottom: var(--space-sm);
  margin-top: var(--space-md);
`;

const List = styled.ul`
  margin-left: var(--space-lg);
  margin-bottom: var(--space-md);
  
  li {
    margin-bottom: var(--space-sm);
    line-height: 1.6;
  }
`;

const ContactInfo = styled.div`
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: var(--white);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  text-align: center;
`;

const Footer = styled.footer`
  background: linear-gradient(135deg, var(--primary) 0%, #1e40af 100%);
  color: var(--white);
  padding: 4rem 2rem 2rem;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  color: var(--white);
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  
  &:hover { 
    color: var(--white);
    text-decoration: underline;
    transform: translateX(4px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy - SecureGuard';
  }, []);

  return (
    <>
      <GlobalStyles />
      <Page>
        <Navbar>
          <NavContainer>
            <Logo src="/images/logo.png" alt="SecureGuard Logo" />
            <NavLinks>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </NavLinks>
          </NavContainer>
        </Navbar>

        <Header>
          <HeaderTitle>Privacy Policy</HeaderTitle>
          <HeaderSubtitle>Your privacy and data protection are our top priorities</HeaderSubtitle>
        </Header>

      <Container>
        <LastUpdated>
          <strong>Last Updated:</strong> September 26, 2025
        </LastUpdated>

        <Section>
          <Content>
            At SecureGuard, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
            security management platform and related services.
          </Content>
        </Section>

        <PolicySection>
          <SubTitle>1. Information We Collect</SubTitle>
          
          <SubSubTitle>1.1 Personal Information</SubSubTitle>
          <Content>
            We may collect personal information that you voluntarily provide to us, including:
          </Content>
          <List>
            <li>Name, email address, and contact information</li>
            <li>Professional details such as job title and organization</li>
            <li>Account credentials and authentication information</li>
            <li>Training progress and certification records</li>
            <li>Communications and support requests</li>
          </List>

          <SubSubTitle>1.2 Technical Information</SubSubTitle>
          <Content>
            We automatically collect certain technical information when you use our platform:
          </Content>
          <List>
            <li>Device information, browser type, and operating system</li>
            <li>IP address and general location information</li>
            <li>Usage patterns, feature interactions, and session data</li>
            <li>Log files and performance metrics</li>
          </List>
        </PolicySection>

        <PolicySection>
          <SubTitle>2. How We Use Your Information</SubTitle>
          <Content>
            We use the collected information for the following purposes:
          </Content>
          <List>
            <li>Provide, maintain, and improve our security management services</li>
            <li>Deliver personalized training content and track your progress</li>
            <li>Communicate with you about your account, updates, and important notices</li>
            <li>Provide customer support and respond to your inquiries</li>
            <li>Analyze usage patterns to enhance platform functionality</li>
            <li>Ensure platform security and prevent unauthorized access</li>
            <li>Comply with legal obligations and regulatory requirements</li>
          </List>
        </PolicySection>

        <PolicySection>
          <SubTitle>3. Information Sharing and Disclosure</SubTitle>
          <Content>
            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
          </Content>
          <List>
            <li><strong>With Your Organization:</strong> Training progress and certification data may be shared with your employer or organization administrators</li>
            <li><strong>Service Providers:</strong> We may engage trusted third-party service providers to assist in platform operations, subject to strict confidentiality agreements</li>
            <li><strong>Legal Requirements:</strong> We may disclose information when required by law, legal process, or to protect our rights and safety</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction</li>
          </List>
        </PolicySection>

        <PolicySection>
          <SubTitle>4. Data Security</SubTitle>
          <Content>
            We implement comprehensive security measures to protect your information:
          </Content>
          <List>
            <li>End-to-end encryption for data transmission and storage</li>
            <li>Multi-factor authentication and access controls</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Employee training on data protection and privacy practices</li>
            <li>Compliance with industry-standard security frameworks</li>
          </List>
        </PolicySection>

        <PolicySection>
          <SubTitle>5. Data Retention</SubTitle>
          <Content>
            We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy:
          </Content>
          <List>
            <li>Account information is retained while your account is active</li>
            <li>Training records are maintained for certification and compliance purposes</li>
            <li>Technical logs are typically retained for 90 days for security monitoring</li>
            <li>Communication records may be retained for customer service purposes</li>
          </List>
        </PolicySection>

        <PolicySection>
          <SubTitle>6. Your Rights and Choices</SubTitle>
          <Content>
            You have several rights regarding your personal information:
          </Content>
          <List>
            <li><strong>Access:</strong> Request information about what personal data we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal requirements</li>
            <li><strong>Portability:</strong> Request a copy of your data in a machine-readable format</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
          </List>
        </PolicySection>

        <PolicySection>
          <SubTitle>7. Cookies and Tracking Technologies</SubTitle>
          <Content>
            We use cookies and similar tracking technologies to enhance your experience:
          </Content>
          <List>
            <li>Essential cookies for platform functionality and security</li>
            <li>Performance cookies to analyze usage and improve services</li>
            <li>Preference cookies to remember your settings and customizations</li>
          </List>
          <Content>
            You can manage your cookie preferences through your browser settings, though disabling certain cookies may affect platform functionality.
          </Content>
        </PolicySection>

        <PolicySection>
          <SubTitle>8. International Data Transfers</SubTitle>
          <Content>
            If you are located outside the country where our servers are located, your information may be transferred to and processed in countries with different privacy laws. We ensure appropriate safeguards are in place for such transfers, including:
          </Content>
          <List>
            <li>Standard contractual clauses approved by relevant authorities</li>
            <li>Adequacy decisions recognizing equivalent privacy protections</li>
            <li>Certification under recognized privacy frameworks</li>
          </List>
        </PolicySection>

        <PolicySection>
          <SubTitle>9. Children's Privacy</SubTitle>
          <Content>
            Our platform is designed for business and professional use and is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete such information promptly.
          </Content>
        </PolicySection>

        <PolicySection>
          <SubTitle>10. Changes to This Privacy Policy</SubTitle>
          <Content>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will:
          </Content>
          <List>
            <li>Post the updated policy on our platform with a new effective date</li>
            <li>Notify users of material changes via email or platform notifications</li>
            <li>Provide a clear summary of significant changes</li>
            <li>Obtain additional consent if required by applicable law</li>
          </List>
        </PolicySection>

        <ContactInfo>
          <SubTitle style={{ color: 'var(--white)', marginBottom: 'var(--space-md)' }}>
            Contact Us About Privacy
          </SubTitle>
          <Content style={{ color: 'var(--white)' }}>
            If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </Content>
          <Content style={{ color: 'var(--white)' }}>
            <strong>Email:</strong> privacy@secureguard.com<br />
            <strong>Phone:</strong> +1 (555) 123-4567<br />
            <strong>Address:</strong> 123 Security Boulevard, Cyber City, CC 12345
          </Content>
        </ContactInfo>
      </Container>

        <Footer>
          <FooterContainer>
            <FooterContent>
              <FooterSection>
                <FooterTitle>SecureGuard</FooterTitle>
                <FooterText>
                  Strengthening your organization's security posture through comprehensive 
                  policy management and awareness training.
                </FooterText>
              </FooterSection>

              <FooterSection>
                <FooterTitle>Quick Links</FooterTitle>
                <FooterLinks>
                  <FooterLink to="/">Home</FooterLink>
                  <FooterLink to="/about">About Us</FooterLink>
                  <FooterLink to="/contact">Contact Us</FooterLink>
                  <FooterLink to="/policies">Security Policies</FooterLink>
                </FooterLinks>
              </FooterSection>


              <FooterSection>
                <FooterTitle>Contact Info</FooterTitle>
                <FooterText>
                  📍 123 Security Street, Tech City, TC 12345<br />
                  📞 +1 (555) 123-4567<br />
                  📧 support@secureguard.com
                </FooterText>
              </FooterSection>
            </FooterContent>

            <FooterBottom>
              <div>© 2025 SecureGuard. All rights reserved. | Strengthening Security Through Education</div>
            </FooterBottom>
          </FooterContainer>
        </Footer>
      </Page>
    </>
  );
}