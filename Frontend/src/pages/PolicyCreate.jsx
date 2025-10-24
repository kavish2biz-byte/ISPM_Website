import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FileText, 
  Upload, 
  Save, 
  X, 
  Plus,
  Calendar,
  Tag,
  Users,
  Building,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
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
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Greeting = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FileUpload = styled.div`
  border: 2px dashed #D1D5DB;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #3B82F6;
    background: #F8FAFF;
  }
`;

const UploadIcon = styled.div`
  color: #6B7280;
  margin-bottom: 0.5rem;
`;

const UploadText = styled.div`
  color: #374151;
  font-weight: 500;
`;

const UploadSubtext = styled.div`
  color: #6B7280;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TagStyled = styled.span`
  background: #EFF6FF;
  color: #1D4ED8;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TagInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 4px;
  font-size: 0.8rem;
  width: 120px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  ${props => props.variant === 'primary' ? `
    background: #3B82F6;
    color: white;
    border: none;
    
    &:hover {
      background: #2563EB;
    }
  ` : `
    background: white;
    color: #374151;
    border: 1px solid #D1D5DB;
    
    &:hover {
      background: #F9FAFB;
      border-color: #9CA3AF;
    }
  `}
`;

const PolicyCreate = ({ user, onLogout }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    department: '',
    effectiveDate: '',
    version: '1.0',
    acknowledgmentsRequired: true,
    tags: [],
    newTag: ''
  });

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTag = () => {
    if (formData.newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ''
      }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Creating policy:', formData, file);
    alert('Policy created successfully!');
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <Greeting>Create New Policy</Greeting>
          </Header>

          <FormContainer>
            <form onSubmit={handleSubmit}>
              {/* Basic Information */}
              <FormSection>
                <SectionTitle>
                  <FileText size={20} />
                  Basic Information
                </SectionTitle>
                
                <FormGrid>
                  <FormGroup>
                    <Label>Policy Title *</Label>
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter policy title"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Version *</Label>
                    <Input
                      type="text"
                      name="version"
                      value={formData.version}
                      onChange={handleInputChange}
                      placeholder="1.0"
                      required
                    />
                  </FormGroup>
                </FormGrid>

                <FormGroup>
                  <Label>Description *</Label>
                  <TextArea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter policy description"
                    required
                  />
                </FormGroup>
              </FormSection>

              {/* Classification */}
              <FormSection>
                <SectionTitle>
                  <Tag size={20} />
                  Classification
                </SectionTitle>
                
                <FormGrid>
                  <FormGroup>
                    <Label>Category *</Label>
                    <Select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Security">Security</option>
                      <option value="Privacy">Privacy</option>
                      <option value="Compliance">Compliance</option>
                      <option value="HR">HR</option>
                      <option value="IT">IT</option>
                      <option value="Operations">Operations</option>
                    </Select>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Department *</Label>
                    <Select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Sales">Sales</option>
                      <option value="Operations">Operations</option>
                    </Select>
                  </FormGroup>
                </FormGrid>

                <FormGroup>
                  <Label>Effective Date *</Label>
                  <Input
                    type="date"
                    name="effectiveDate"
                    value={formData.effectiveDate}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </FormSection>

              {/* Tags */}
              <FormSection>
                <SectionTitle>
                  <Tag size={20} />
                  Tags
                </SectionTitle>
                
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <TagInput
                    type="text"
                    value={formData.newTag}
                    onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
                    placeholder="Add tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag}>
                    <Plus size={14} />
                    Add
                  </Button>
                </div>
                
                <TagContainer>
                  {formData.tags.map((tag, index) => (
                    <TagStyled key={index}>
                      {tag}
                      <X size={12} onClick={() => handleRemoveTag(tag)} style={{ cursor: 'pointer' }} />
                    </TagStyled>
                  ))}
                </TagContainer>
              </FormSection>

              {/* File Upload */}
              <FormSection>
                <SectionTitle>
                  <Upload size={20} />
                  Policy Document
                </SectionTitle>
                
                <FileUpload onClick={() => document.getElementById('file-upload').click()}>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <UploadIcon>
                    <Upload size={32} />
                  </UploadIcon>
                  <UploadText>
                    {file ? file.name : 'Click to upload policy document'}
                  </UploadText>
                  <UploadSubtext>
                    PDF, DOC, DOCX files only (Max 10MB)
                  </UploadSubtext>
                </FileUpload>
              </FormSection>

              {/* Settings */}
              <FormSection>
                <SectionTitle>
                  <AlertCircle size={20} />
                  Settings
                </SectionTitle>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    name="acknowledgmentsRequired"
                    checked={formData.acknowledgmentsRequired}
                    onChange={handleInputChange}
                  />
                  <Label style={{ margin: 0 }}>Require user acknowledgments</Label>
                </div>
              </FormSection>

              <ButtonGroup>
                <Button type="button">
                  <X size={16} />
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  <Save size={16} />
                  Create Policy
                </Button>
              </ButtonGroup>
            </form>
          </FormContainer>
        </Container>
      </MainContent>
    </Page>
  );
};

export default PolicyCreate;
