import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    button { font-family: inherit; cursor: pointer; background: none; border: none !important; outline: none !important; }
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
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
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
  height: 2.2rem;
  width: auto;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.3rem;
`;

const NavLink = styled(Link)`
  color: var(--accent);
  font-weight: 500;
  &:hover { color: var(--primary); }
`;

const Header = styled.header`
  background: var(--primary);
  color: var(--white);
  padding: 3rem 2rem 1.5rem;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 2.6rem;
  margin-bottom: 0.7rem;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  color: white;
`;

const HeaderSubtitle = styled.p`
  font-size: 1.08rem;
  opacity: 0.93;
`;

const Container = styled.div`
  max-width: 1060px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
  flex: 1;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  margin-top: 1.5rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.8rem;
  }
`;

const ContactForm = styled.div`
  background: white;
  padding: 1.4rem 1.5rem 1.2rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
`;

const FormTitle = styled.h3`
  color: var(--primary);
  font-size: 1.3rem;
  margin-bottom: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.02rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Label = styled.label`
  color: var(--text);
  font-weight: 600;
  font-size: 0.93rem;
`;

const Input = styled.input`
  padding: 0.70rem 0.9rem;
  border: 2px solid var(--border);
  border-radius: 7px;
  font-size: 0.98rem;
  background: #F8FAFC;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: var(--primary);
    background: white;
    box-shadow: 0 0 0 2px rgba(30,58,138,0.1);
  }
  &::placeholder {
    color: #9CA3AF;
  }
`;

const TextArea = styled.textarea`
  padding: 0.70rem 0.9rem;
  border: 2px solid var(--border);
  border-radius: 7px;
  font-size: 0.98rem;
  background: #F8FAFC;
  min-height: 96px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;
  &:focus {
    outline: none;
    border-color: var(--primary);
    background: white;
    box-shadow: 0 0 0 2px rgba(30,58,138,0.1);
  }
  &::placeholder {
    color: #9CA3AF;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.2rem;
  cursor: pointer;
  transition: all 0.18s;
  &:hover {
    opacity: 0.92;
    box-shadow: 0 6px 18px rgba(30, 58, 138, 0.13);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  color: #16A34A;
  padding: 0.66rem 0.6rem;
  border-radius: 7px;
  font-size: 0.94rem;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 0.66rem 0.6rem;
  border-radius: 7px;
  font-size: 0.94rem;
  margin-bottom: 0.5rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const InfoCard = styled.div`
  background: white;
  padding: 1.1rem 1.2rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.018);
  }
`;

const InfoTitle = styled.h3`
  color: var(--primary);
  font-size: 1.08rem;
  margin-bottom: 0.38rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoText = styled.p`
  color: var(--accent);
  font-size: 0.97rem;
  line-height: 1.5;
  margin-bottom: 0.1rem;
`;

const MapContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-top: 1.15rem;
`;

const MapTitle = styled.h3`
  color: var(--primary);
  font-size: 1.17rem;
  margin-bottom: 0.7rem;
  font-weight: 600;
`;

const MapPlaceholder = styled.div`
  background: linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%);
  border: 2px dashed var(--border);
  border-radius: 7px;
  padding: 1.8rem;
  text-align: center;
  color: var(--accent);
  font-size: 0.98rem;
`;

const Footer = styled.footer`
  background: linear-gradient(135deg, var(--primary) 0%, #1e40af 100%);
  color: var(--white);
  padding: 3rem 2rem 1.1rem;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 2.2rem;
  margin-bottom: 2.3rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  color: var(--white);
  font-size: 1.09rem;
  font-weight: 700;
  margin-bottom: 0.7rem;
  font-family: 'Inter', sans-serif;
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin-bottom: 0.5rem;
  font-size: 0.93rem;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 0.93rem;
  transition: all 0.15s;
  &:hover { color: var(--white); text-decoration: underline; transform: translateX(3px); }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.17);
  padding-top: 1.4rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.89rem;
`;

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    document.title = 'Contact Us - SecureGuard';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1800));

      if (!formData.name || !formData.email || !formData.message) {
        setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' });
        return;
      }
      if (!formData.email.includes('@')) {
        setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' });
        return;
      }
      setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.' });
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch {
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <HeaderTitle>Contact Us</HeaderTitle>
          <HeaderSubtitle>Get in touch with our team</HeaderSubtitle>
        </Header>

        <Container>
          <ContentGrid>
            <ContactForm>
              <FormTitle>Send us a Message</FormTitle>
              <Form onSubmit={handleSubmit}>
                {submitStatus && (
                  submitStatus.type === 'success' ? (
                    <SuccessMessage>{submitStatus.message}</SuccessMessage>
                  ) : (
                    <ErrorMessage>{submitStatus.message}</ErrorMessage>
                  )
                )}

                <FormGroup>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="company">Company</Label>
                  <Input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Enter your company name" />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="subject">Subject</Label>
                  <Input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What is this about?" />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="message">Message *</Label>
                  <TextArea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us how we can help you..." required />
                </FormGroup>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </SubmitButton>
              </Form>
            </ContactForm>

            <ContactInfo>
              <InfoCard>
                <InfoTitle>📧 Email Us</InfoTitle>
                <InfoText>support@secureguard.com</InfoText>
                <InfoText>sales@secureguard.com</InfoText>
                <InfoText>info@secureguard.com</InfoText>
              </InfoCard>

              <InfoCard>
                <InfoTitle>📞 Call Us</InfoTitle>
                <InfoText>Main Office: +1 (555) 123-4567</InfoText>
                <InfoText>Sales: +1 (555) 123-4568</InfoText>
                <InfoText>Support: +1 (555) 123-4569</InfoText>
                <InfoText>Mon-Fri: 9:00 AM - 6:00 PM EST</InfoText>
              </InfoCard>

              <InfoCard>
                <InfoTitle>📍 Visit Us</InfoTitle>
                <InfoText>123 Security Boulevard</InfoText>
                <InfoText>Cyber City, CC 12345</InfoText>
                <InfoText>United States</InfoText>
                <InfoText>Parking available on-site</InfoText>
              </InfoCard>

              <InfoCard>
                <InfoTitle>⏰ Business Hours</InfoTitle>
                <InfoText>Monday - Friday: 9:00 AM - 6:00 PM</InfoText>
                <InfoText>Saturday: 10:00 AM - 4:00 PM</InfoText>
                <InfoText>Sunday: Closed</InfoText>
                <InfoText>Emergency support: 24/7</InfoText>
              </InfoCard>
            </ContactInfo>
          </ContentGrid>

          <MapContainer>
            <MapTitle>Our Location</MapTitle>
            <MapPlaceholder>
              🗺️ Interactive Map Coming Soon<br />
              <small>123 Security Boulevard, Cyber City, CC 12345</small>
            </MapPlaceholder>
          </MapContainer>
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
                  📧 [support@secureguard.com](mailto:support@secureguard.com)
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
