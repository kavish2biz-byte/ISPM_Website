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
  padding: 4rem 2rem;
  flex: 1;
`;

const Section = styled.section`
  margin-bottom: 5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 800;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border-radius: 2px;
  }
`;

const Content = styled.div`
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text);
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-lg);
  text-align: center;
  transition: var(--transition);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(30, 58, 138, 0.1);
  }
`;

const CardIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 50%;
  margin: 0 auto var(--space-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--primary);
  margin-bottom: var(--space-md);
`;

const CardText = styled.p`
  color: var(--accent);
  line-height: 1.6;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
`;

const TeamCard = styled.div`
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-lg);
  text-align: center;
`;

const TeamPhoto = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 50%;
  margin: 0 auto var(--space-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 2rem;
  font-weight: 700;
`;

const TeamName = styled.h4`
  font-size: 1.2rem;
  color: var(--primary);
  margin-bottom: var(--space-sm);
`;

const TeamRole = styled.div`
  color: var(--secondary);
  font-weight: 600;
  margin-bottom: var(--space-sm);
`;

const TeamBio = styled.p`
  font-size: 0.9rem;
  color: var(--accent);
  line-height: 1.5;
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

export default function AboutUs() {
  const values = [
    {
      icon: '🛡️',
      title: 'Security First',
      description: 'We prioritize security in everything we do, ensuring robust protection for our clients\' digital assets and sensitive information.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We continuously innovate and adapt to emerging threats, providing cutting-edge solutions for modern security challenges.'
    },
    {
      icon: '🤝',
      title: 'Trust',
      description: 'Building lasting relationships through transparency, reliability, and consistent delivery of exceptional security services.'
    },
    {
      icon: '📈',
      title: 'Excellence',
      description: 'We strive for excellence in all our endeavors, from training programs to policy implementation and compliance management.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Security Officer',
      bio: 'Over 15 years of experience in cybersecurity and risk management, leading enterprise security initiatives.',
      initials: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Training',
      bio: 'Expert in security awareness training with a passion for educating teams on best practices and threat prevention.',
      initials: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Compliance Manager',
      bio: 'Specializes in regulatory compliance and policy development, ensuring organizations meet industry standards.',
      initials: 'ER'
    },
    {
      name: 'David Thompson',
      role: 'Technical Lead',
      bio: 'Technical architect with deep expertise in security infrastructure and implementation strategies.',
      initials: 'DT'
    }
  ];

  useEffect(() => {
    document.title = 'About Us - SecureGuard';
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
          <HeaderTitle>About SecureGuard</HeaderTitle>
          <HeaderSubtitle>Protecting organizations through comprehensive security solutions</HeaderSubtitle>
        </Header>

      <Container>
        <Section>
          <SectionTitle>Our Mission</SectionTitle>
          <Content>
            At SecureGuard, we are dedicated to strengthening organizational security postures through 
            comprehensive policy management, awareness training, and compliance solutions. We believe 
            that security is not just about technology—it's about empowering people with the knowledge 
            and tools they need to protect what matters most.
          </Content>
          <Content>
            Founded on the principle that effective security starts with education, we provide 
            organizations with the resources, training, and support needed to build a culture of 
            security awareness. Our platform combines cutting-edge technology with proven 
            methodologies to deliver measurable results in security enhancement.
          </Content>
        </Section>

        <Section>
          <SectionTitle>Our Values</SectionTitle>
          <Grid>
            {values.map((value, index) => (
              <Card key={index}>
                <CardIcon>{value.icon}</CardIcon>
                <CardTitle>{value.title}</CardTitle>
                <CardText>{value.description}</CardText>
              </Card>
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionTitle>What We Do</SectionTitle>
          <Content>
            SecureGuard provides a comprehensive suite of security management tools and services designed 
            to help organizations of all sizes improve their security posture. Our platform includes:
          </Content>
          <Grid>
            <Card>
              <CardIcon>📋</CardIcon>
              <CardTitle>Policy Management</CardTitle>
              <CardText>
                Centralized creation, distribution, and tracking of security policies with 
                automated updates and compliance monitoring across your organization.
              </CardText>
            </Card>
            <Card>
              <CardIcon>🎓</CardIcon>
              <CardTitle>Training Programs</CardTitle>
              <CardText>
                Interactive security awareness training modules tailored to different roles 
                and skill levels, with progress tracking and certification management.
              </CardText>
            </Card>
            <Card>
              <CardIcon>📊</CardIcon>
              <CardTitle>Analytics & Reporting</CardTitle>
              <CardText>
                Comprehensive reporting and analytics to track progress, identify gaps, 
                and measure the effectiveness of your security initiatives.
              </CardText>
            </Card>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Our Team</SectionTitle>
          <Content>
            Our team consists of experienced security professionals, trainers, and technology experts 
            who are passionate about helping organizations build stronger security cultures.
          </Content>
          <TeamGrid>
            {team.map((member, index) => (
              <TeamCard key={index}>
                <TeamPhoto>{member.initials}</TeamPhoto>
                <TeamName>{member.name}</TeamName>
                <TeamRole>{member.role}</TeamRole>
                <TeamBio>{member.bio}</TeamBio>
              </TeamCard>
            ))}
          </TeamGrid>
        </Section>

        <Section>
          <SectionTitle>Why Choose SecureGuard?</SectionTitle>
          <Content>
            With years of experience in cybersecurity and a deep understanding of organizational 
            challenges, SecureGuard is your trusted partner in building a comprehensive security 
            program. We combine industry best practices with innovative technology to deliver 
            solutions that are both effective and easy to implement.
          </Content>
          <Content>
            Our commitment to continuous improvement means we're always evolving our platform 
            to address emerging threats and changing compliance requirements. When you choose 
            SecureGuard, you're not just getting a product—you're gaining a partner dedicated 
            to your long-term security success.
          </Content>
        </Section>
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