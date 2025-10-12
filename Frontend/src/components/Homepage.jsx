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

/* Styled Components */
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

const SearchWrapper = styled.div`
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 2px solid var(--border);
  border-radius: 9999px;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--secondary);
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="21 21l-4.35-4.35"/>
  </svg>
);

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

const Main = styled.main`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  overflow: hidden;
  padding-top: 4rem;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.10);
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem 2rem;
  color: var(--white);
  margin-top: 3rem;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  color: var(--white);
  font-weight: 800;
  margin-bottom: 1rem;
  font-family: 'Outfit', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--white);
  text-align: center;
  max-width: 600px;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

const AuthButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 1rem 3rem;
  border-radius: 9999px;
  font-size: 1.25rem;
  font-weight: 600;
  border: none !important;
  outline: none !important;
  min-width: 200px;
  transition: all 0.3s ease;
  ${({ variant }) =>
    variant === 'primary'
      ? `
    background: var(--primary);
    color: var(--white);
    box-shadow: 0 4px 14px rgba(30,58,138,0.3);
    
    &:hover {
      background: var(--white);
      color: var(--primary);
      transform: translateY(-2px);
      border: none !important;
    }
  `
      : `
    background: rgba(255, 255, 255, 0.9);
    color: var(--primary);
    
    &:hover {
      background: var(--primary);
      color: var(--white);
      transform: translateY(-2px);
      border: none !important;
    }
  `}
`;

const ContentSection = styled.section`
  background: linear-gradient(135deg, #F8FAFC 0%, #EBF4FF 100%);
  padding: 8rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  color: var(--primary);
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Inter', sans-serif;
`;

const SectionText = styled.p`
  font-size: 1.2rem;
  color: var(--accent);
  text-align: center;
  max-width: 700px;
  line-height: 1.8;
  margin-bottom: 5rem;
  font-weight: 500;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  max-width: 1200px;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 2.5rem;
  border-radius: 24px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(30, 58, 138, 0.08);
  position: relative;
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 20px 40px rgba(30, 58, 138, 0.15);
    background: rgba(255, 255, 255, 0.6);
    border: 2px solid var(--secondary);
  }
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: var(--white);
  font-size: 1.5rem;
  box-shadow: 0 4px 16px rgba(30, 58, 138, 0.2);
`;

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11C15.4,11 16,11.4 16,12V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V12C8,11.4 8.4,11 9,11V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
  </svg>
);

const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5 2.45,5.4 1,6.5V21.16C1,21.41 1.25,21.66 1.5,21.66C1.6,21.66 1.65,21.59 1.75,21.59C3.1,20.94 5.05,20.68 6.5,20.68C8.45,20.68 10.55,21.1 12,22C13.35,21.15 15.8,20.68 17.5,20.68C19.15,20.68 20.85,20.92 22.25,21.81C22.35,21.86 22.4,21.93 22.5,21.93C22.75,21.93 23,21.68 23,21.43V7.5C23,7.06 22.81,6.66 22.5,6.5C21.05,5.4 18.95,5 17,5C15.8,5 13.35,5.15 12,6C10.55,5.05 8.45,5 6.5,5Z"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z"/>
  </svg>
);

const FeatureTitle = styled.h3`
  color: var(--primary);
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
`;

const FeatureDescription = styled.p`
  color: var(--accent);
  line-height: 1.7;
  font-size: 1rem;
  font-weight: 500;
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

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
`;

const ContactIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--white);
    color: var(--primary);
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const FooterBottomLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--white);
  }
`;

export default function Homepage() {
  useEffect(() => {
    document.title = 'SecureGuard';
  }, []);

  return (
    <>
      <GlobalStyles />
      <Page>
        <Navbar>
          <NavContainer>
            <Logo src="/images/logo.png" alt="SecureGuard Logo" />
            <SearchWrapper>
              <SearchInput placeholder="Search policies, training, and more..." />
              <SearchButton aria-label="Search">
                <SearchIcon />
              </SearchButton>
            </SearchWrapper>
            <NavLinks>
              <NavLink to="/about">About Us</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </NavLinks>
          </NavContainer>
        </Navbar>

        <Main>
          <VideoBackground
            src="/videos/intro.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <VideoOverlay />
          
          <HeroContent>
            <HeroTitle>SecureGuard</HeroTitle>
            <HeroSubtitle>
              Strengthening your organization's security posture through comprehensive
              policy management and awareness training
            </HeroSubtitle>
            <AuthButtons>
              <Button as={Link} to="/login" variant="primary">Login</Button>
              <Button as={Link} to="/signup" variant="secondary">Sign Up</Button>
            </AuthButtons>
          </HeroContent>
        </Main>

        <ContentSection>
          <SectionTitle>Why Choose SecureGuard?</SectionTitle>
          <SectionText>
            Our comprehensive platform provides everything your organization needs to maintain 
            robust security policies, conduct effective training, and ensure compliance across 
            all departments and teams.
          </SectionText>
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>
                <ShieldIcon />
              </FeatureIcon>
              <FeatureTitle>Policy Management</FeatureTitle>
              <FeatureDescription>
                Centralized policy creation, distribution, and tracking with automated updates and compliance monitoring.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <BookIcon />
              </FeatureIcon>
              <FeatureTitle>Training Programs</FeatureTitle>
              <FeatureDescription>
                Interactive security awareness training modules tailored to different roles and skill levels.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>
                <ChartIcon />
              </FeatureIcon>
              <FeatureTitle>Analytics & Reports</FeatureTitle>
              <FeatureDescription>
                Comprehensive reporting and analytics to track progress, identify gaps, and measure effectiveness.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </ContentSection>

        <Footer>
          <FooterContainer>
            <FooterContent>
              <FooterSection>
                <FooterTitle>SecureGuard</FooterTitle>
                <FooterText>
                  Strengthening your organization's security posture through comprehensive 
                  policy management and awareness training. We help businesses build 
                  robust security cultures.
                </FooterText>
                <SocialLinks>
                  <SocialLink href="#" aria-label="LinkedIn">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </SocialLink>
                  <SocialLink href="#" aria-label="Twitter">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </SocialLink>
                  <SocialLink href="#" aria-label="GitHub">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </SocialLink>
                </SocialLinks>
              </FooterSection>

              <FooterSection>
                <FooterTitle>Quick Links</FooterTitle>
                <FooterLinks>
                  <FooterLink to="/about">About Us</FooterLink>
                  <FooterLink to="/contact">Contact Us</FooterLink>
                  <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
                  <FooterLink to="/policies">Security Policies</FooterLink>
                </FooterLinks>
              </FooterSection>


              <FooterSection>
                <FooterTitle>Contact Info</FooterTitle>
                <ContactInfo>
                  <ContactItem>
                    <ContactIcon>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </ContactIcon>
                    123 Security Street, Tech City, TC 12345
                  </ContactItem>
                  <ContactItem>
                    <ContactIcon>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </ContactIcon>
                    +1 (555) 123-4567
                  </ContactItem>
                  <ContactItem>
                    <ContactIcon>
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </ContactIcon>
                    support@secureguard.com
                  </ContactItem>
                </ContactInfo>
              </FooterSection>
            </FooterContent>

            <FooterBottom>
              <FooterBottomLinks>
                <FooterBottomLink to="/privacy-policy">Privacy Policy</FooterBottomLink>
                <FooterBottomLink to="/policies">Terms of Service</FooterBottomLink>
                <FooterBottomLink to="/contact">Support</FooterBottomLink>
                <FooterBottomLink to="/about">About</FooterBottomLink>
              </FooterBottomLinks>
              <div>© 2025 SecureGuard. All rights reserved. | Strengthening Security Through Education</div>
            </FooterBottom>
          </FooterContainer>
        </Footer>
      </Page>
    </>
  );
}
