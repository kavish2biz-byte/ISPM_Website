import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #F8FAFC 0%, #EBF4FF 100%);
  padding: 2rem;
`;

const SignupContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  position: relative;
  overflow: hidden;
`;

const SignupHeader = styled.div`
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

const Select = styled.select`
  padding: 0.875rem 1rem;
  border: 2px solid #E2E8F0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #F8FAFC;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #1E3A8A;
    background: white;
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
  }
  
  option {
    color: #374151;
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

const CheckboxContainer = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #374151;
  line-height: 1.5;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: #1E3A8A;
  margin-top: 0.125rem;
  flex-shrink: 0;
`;

const TermsText = styled.span`
  color: #64748B;
  
  a {
    color: #1E3A8A;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignupButton = styled.button`
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



const LoginPrompt = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #E2E8F0;
  color: #64748B;
  font-size: 0.9rem;
`;

const LoginLink = styled(Link)`
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
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #DC2626;
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

const PasswordRequirements = styled.div`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #64748B;
`;

const RequirementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  ${({ $isValid }) => $isValid && `
    color: #16A34A;
  `}
`;

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    return requirements;
  };

  const passwordRequirements = validatePassword(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Basic validation
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.department) {
        setError('Please fill in all required fields');
        return;
      }
      
      if (!formData.email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      if (!Object.values(passwordRequirements).every(req => req)) {
        setError('Password does not meet all requirements');
        return;
      }
      
      if (!agreeToTerms) {
        setError('Please agree to the Terms of Service and Privacy Policy');
        return;
      }

      if (isLoading) {
        return; // Prevent multiple submissions
      }

      setIsLoading(true);
      setError('');
      setSuccess('');
      
      // Validate department
      const validDepartments = ['HR', 'Finance', 'Engineering', 'Sales', 'Operations'];
      if (!validDepartments.includes(formData.department)) {
        setError(`Invalid department selected: ${formData.department}`);
        return;
      }

      // Prepare data for API call
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        department: formData.department,
        role: 'employee' // Always set to employee for signup
      };

      console.log('Sending signup data:', userData);
      
      // Determine API base URL with fallback to localhost:5001
      const API_BASE = '';

      // Make API call to signup endpoint
      const response = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      console.log('Response status:', response.status);
      console.log('Response data:', result);

      if (response.ok && result.success) {
        setSuccess('Account created successfully! Redirecting to login...');

        // Redirect to login after successful registration
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
      
    } catch (error) {
      console.error('Signup error:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <SignupContainer>
        <SignupHeader>
          <Logo src="/images/logo.png" alt="SecureGuard Logo" />
          <Title>Create Account</Title>
          <Subtitle>Join SecureGuard and strengthen your organization's security</Subtitle>
        </SignupHeader>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          <FormGroup>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="department">Department *</Label>
            <Select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select your department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password *</Label>
            <PasswordContainer>
              <PasswordInput
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
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
            
            {formData.password && (
              <PasswordRequirements>
                <RequirementItem $isValid={passwordRequirements.length}>
                  {passwordRequirements.length ? '✓' : '○'} At least 8 characters
                </RequirementItem>
                <RequirementItem $isValid={passwordRequirements.uppercase}>
                  {passwordRequirements.uppercase ? '✓' : '○'} One uppercase letter
                </RequirementItem>
                <RequirementItem $isValid={passwordRequirements.lowercase}>
                  {passwordRequirements.lowercase ? '✓' : '○'} One lowercase letter
                </RequirementItem>
                <RequirementItem $isValid={passwordRequirements.number}>
                  {passwordRequirements.number ? '✓' : '○'} One number
                </RequirementItem>
                <RequirementItem $isValid={passwordRequirements.special}>
                  {passwordRequirements.special ? '✓' : '○'} One special character
                </RequirementItem>
              </PasswordRequirements>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <PasswordContainer>
              <PasswordInput
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              <ToggleButton
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
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

          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <TermsText>
              I agree to the <Link to="/policies">Terms of Service</Link> and <Link to="/privacy-policy">Privacy Policy</Link>
            </TermsText>
          </CheckboxContainer>

          <SignupButton type="submit" disabled={isLoading || !agreeToTerms}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </SignupButton>
        </Form>

        <LoginPrompt>
          Already have an account? <LoginLink to="/login">Sign in here</LoginLink>
        </LoginPrompt>
      </SignupContainer>
    </Page>
  );
}
