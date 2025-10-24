import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F8FAFC 0%, #EBF4FF 100%);
  padding: 2rem;
`;

const LoginContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 450px;
  position: relative;
  overflow: hidden;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  height: 3rem;
  width: auto;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  color: #1E3A8A;
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  font-family: 'Inter', sans-serif;
`;

const Subtitle = styled.p`
  color: #64748B;
  font-size: 1rem;
  margin-bottom: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #374151;
  font-weight: 600;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 2px solid #E2E8F0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #F8FAFC;
  
  &:focus {
    outline: none;
    border-color: #1E3A8A;
    background: white;
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const PasswordInput = styled(Input)`
  padding-right: 3rem;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #64748B;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
  
  &:hover {
    color: #1E3A8A;
  }
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #374151;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: #1E3A8A;
`;

const ForgotLink = styled(Link)`
  color: #1E3A8A;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #1e40af;
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(30, 58, 138, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #E2E8F0;
  }
  
  span {
    padding: 0 1rem;
    color: #64748B;
    font-size: 0.9rem;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.875rem;
  border: 2px solid #E2E8F0;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #1E3A8A;
    background: #F8FAFC;
  }
`;

const SignupPrompt = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #E2E8F0;
  color: #64748B;
  font-size: 0.9rem;
`;

const SignupLink = styled(Link)`
  color: #1E3A8A;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
  
  &:hover {
    color: #1e40af;
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  color: #6B7280;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  color: #16A34A;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      
      if (!formData.email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }

      // Clear any existing tokens to prevent JWT malformed errors
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      // Try backend API call first
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setSuccess('Login successful! Redirecting...');
          
          // Store user data and token in localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          
          // Redirect based on user role immediately
          setTimeout(() => {
            switch (data.user.role) {
              case 'admin':
                window.location.href = '/admin-dashboard';
                break;
              case 'manager':
                window.location.href = '/manager-dashboard';
                break;
              case 'employee':
                window.location.href = '/employee-dashboard';
                break;
              default:
                window.location.href = '/employee-dashboard';
            }
          }, 1000);
        } else {
          setError(data.message || 'Login failed. Please try again.');
        }
      } catch (fetchError) {
        console.error('Backend API error:', fetchError);
        
        // Fallback to dummy credentials if backend is not available
        const dummyUsers = [
          { email: 'admin@ispm.com', password: 'admin123', role: 'admin', name: 'Admin User' },
          { email: 'manager@ispm.com', password: 'manager123', role: 'manager', name: 'Manager Smith' },
          { email: 'employee@ispm.com', password: 'employee123', role: 'employee', name: 'John Employee' },
          { email: 'sarah.johnson@ispm.com', password: 'sarah123', role: 'employee', name: 'Sarah Johnson' },
          { email: 'mike.wilson@ispm.com', password: 'mike123', role: 'manager', name: 'Mike Wilson' }
        ];

        const dummyUser = dummyUsers.find(user => 
          user.email === formData.email && user.password === formData.password
        );

        if (dummyUser) {
          setSuccess('Login successful! Redirecting...');
          
          // Store user data and token in localStorage
          const mockToken = 'mock-jwt-token-' + Date.now();
          localStorage.setItem('token', mockToken);
          localStorage.setItem('user', JSON.stringify(dummyUser));
          
          // Redirect based on user role immediately
          setTimeout(() => {
            switch (dummyUser.role) {
              case 'admin':
                window.location.href = '/admin-dashboard';
                break;
              case 'manager':
                window.location.href = '/manager-dashboard';
                break;
              case 'employee':
                window.location.href = '/employee-dashboard';
                break;
                default:
                  window.location.href = '/employee-dashboard';
            }
          }, 1000);
        } else {
          // Check if email exists but password is wrong
          const userExists = dummyUsers.find(user => user.email === formData.email);
          if (userExists) {
            setError('Incorrect password. Please try again.');
          } else {
            setError('User not found. Please check your email address.');
          }
        }
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setError('');

    try {
      if (!forgotEmail) {
        setError('Please enter your email address');
        return;
      }

      if (!forgotEmail.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }

      // Check if it's a dummy user email
      const dummyUsers = [
        'admin@ispm.com',
        'manager@ispm.com', 
        'employee@ispm.com',
        'sarah.johnson@ispm.com',
        'mike.wilson@ispm.com'
      ];

            if (dummyUsers.includes(forgotEmail)) {
              const password = forgotEmail.includes('admin') ? 'admin123' :
                              forgotEmail.includes('manager') ? 'manager123' :
                              forgotEmail.includes('sarah') ? 'sarah123' :
                              forgotEmail.includes('mike') ? 'mike123' : 'employee123';

              setSuccess(`Password reset instructions sent to ${forgotEmail}. For demo purposes, your password is: ${password}`);
              setShowForgotPassword(false);
              setForgotEmail('');
            } else {
              setError('Email not found in our system. Please check your email address.');
              
              // Try backend API call as fallback
              try {
                const response = await fetch('/api/auth/forgot-password', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email: forgotEmail }),
                });

                const data = await response.json();

                if (data.success) {
                  setSuccess('Password reset instructions sent to your email');
                  setShowForgotPassword(false);
                  setForgotEmail('');
                } else {
                  setError(data.message || 'Failed to send reset instructions');
                }
              } catch (backendError) {
                console.error('Backend forgot password error:', backendError);
                // Error already set above for dummy users
              }
            }

    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Unable to send reset instructions. Please contact your administrator.');
    } finally {
      setForgotLoading(false);
    }
  };


  return (
    <Page>
      <LoginContainer>
        <LoginHeader>
          <Logo src="/images/logo.png" alt="SecureGuard Logo" />
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to your SecureGuard account</Subtitle>
        </LoginHeader>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <PasswordContainer>
              <PasswordInput
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <ToggleButton
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                  </svg>
                )}
              </ToggleButton>
            </PasswordContainer>
          </FormGroup>

          <RememberForgot>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </CheckboxContainer>
            <ForgotLink as="button" type="button" onClick={() => setShowForgotPassword(true)}>
              Forgot password?
            </ForgotLink>
          </RememberForgot>

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </LoginButton>
        </Form>

        <SignupPrompt>
          Don't have an account? <SignupLink to="/signup">Sign up here</SignupLink>
        </SignupPrompt>


        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }} onClick={() => setShowForgotPassword(false)}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              width: '90%',
              maxWidth: '400px',
              maxHeight: '80vh',
              overflowY: 'auto'
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#1F2937',
                  margin: 0
                }}>Reset Password</h2>
                <button
                  onClick={() => setShowForgotPassword(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    color: '#6B7280',
                    cursor: 'pointer',
                    padding: '0.25rem'
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleForgotPassword}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    <label style={{
                      fontWeight: 600,
                      color: '#374151',
                      fontSize: '0.9rem'
                    }}>Email Address</label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      style={{
                        padding: '0.75rem',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    style={{
                      background: 'linear-gradient(135deg, #6B7280, #4B5563)',
                      color: 'white',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      opacity: forgotLoading ? 0.6 : 1
                    }}
                  >
                    {forgotLoading ? 'Sending...' : 'Send Reset Instructions'}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}
      </LoginContainer>
    </Page>
  );
}
