import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FileText, 
  Download, 
  Eye, 
  Copy,
  Search,
  Filter,
  Tag,
  Calendar,
  User
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
  max-width: 1200px;
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

const SearchSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
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

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  min-width: 150px;
  
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const TemplateCard = styled.div`
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #3B82F6;
  }
`;

const TemplateHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const TemplateTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
  flex: 1;
`;

const TemplateCategory = styled.span`
  background: #EFF6FF;
  color: #1D4ED8;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

const TemplateDescription = styled.p`
  color: #64748B;
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem 0;
  line-height: 1.5;
`;

const TemplateMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const MetaTag = styled.span`
  background: #F3F4F6;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const TemplateActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 0.8rem;
  color: #374151;
  transition: all 0.2s;
  
  &:hover {
    background: #F9FAFB;
    border-color: #3B82F6;
    color: #3B82F6;
  }
  
  &.primary {
    background: #3B82F6;
    color: white;
    border-color: #3B82F6;
    
    &:hover {
      background: #2563EB;
    }
  }
`;

const PolicyTemplates = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const templates = [
    {
      id: 1,
      title: 'Data Protection Policy Template',
      description: 'Comprehensive template for data protection and privacy policies, including GDPR compliance requirements.',
      category: 'Privacy',
      tags: ['GDPR', 'Data Security', 'Privacy'],
      lastUpdated: '2024-01-15',
      createdBy: 'Admin User',
      downloads: 45
    },
    {
      id: 2,
      title: 'IT Security Guidelines Template',
      description: 'Template for IT security policies covering access control, password management, and system security.',
      category: 'Security',
      tags: ['IT Security', 'Access Control', 'Passwords'],
      lastUpdated: '2024-01-10',
      createdBy: 'IT Admin',
      downloads: 38
    },
    {
      id: 3,
      title: 'Remote Work Policy Template',
      description: 'Template for remote work policies including security requirements, equipment guidelines, and communication protocols.',
      category: 'HR',
      tags: ['Remote Work', 'HR', 'Security'],
      lastUpdated: '2024-01-08',
      createdBy: 'HR Manager',
      downloads: 52
    },
    {
      id: 4,
      title: 'Code of Conduct Template',
      description: 'Template for employee code of conduct covering ethical standards, behavior expectations, and disciplinary procedures.',
      category: 'HR',
      tags: ['Ethics', 'Behavior', 'Standards'],
      lastUpdated: '2024-01-05',
      createdBy: 'HR Director',
      downloads: 67
    },
    {
      id: 5,
      title: 'Financial Controls Policy Template',
      description: 'Template for financial controls and procedures covering expense management, approval processes, and reporting requirements.',
      category: 'Finance',
      tags: ['Finance', 'Controls', 'Expenses'],
      lastUpdated: '2024-01-03',
      createdBy: 'Finance Manager',
      downloads: 29
    },
    {
      id: 6,
      title: 'Incident Response Plan Template',
      description: 'Template for security incident response procedures including escalation, communication, and recovery processes.',
      category: 'Security',
      tags: ['Incident Response', 'Security', 'Emergency'],
      lastUpdated: '2024-01-01',
      createdBy: 'Security Officer',
      downloads: 41
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !categoryFilter || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handlePreview = (template) => {
    alert(`Previewing template: ${template.title}`);
  };

  const handleDownload = (template) => {
    alert(`Downloading template: ${template.title}`);
  };

  const handleUseTemplate = (template) => {
    alert(`Using template: ${template.title}`);
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <Greeting>Policy Templates</Greeting>
          </Header>

          <SearchSection>
            <SearchBar>
              <SearchInput
                type="text"
                placeholder="Search templates by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FilterSelect
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Security">Security</option>
                <option value="Privacy">Privacy</option>
                <option value="Compliance">Compliance</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </FilterSelect>
            </SearchBar>
          </SearchSection>

          <TemplatesGrid>
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id}>
                <TemplateHeader>
                  <TemplateTitle>{template.title}</TemplateTitle>
                  <TemplateCategory>{template.category}</TemplateCategory>
                </TemplateHeader>

                <TemplateDescription>{template.description}</TemplateDescription>

                <TemplateMeta>
                  {template.tags.map((tag, index) => (
                    <MetaTag key={index}>{tag}</MetaTag>
                  ))}
                </TemplateMeta>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '1rem',
                  fontSize: '0.8rem',
                  color: '#6B7280'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={12} />
                    Updated {template.lastUpdated}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={12} />
                    {template.createdBy}
                  </div>
                </div>

                <TemplateActions>
                  <ActionButton onClick={() => handlePreview(template)}>
                    <Eye size={14} />
                    Preview
                  </ActionButton>
                  <ActionButton onClick={() => handleDownload(template)}>
                    <Download size={14} />
                    Download
                  </ActionButton>
                  <ActionButton className="primary" onClick={() => handleUseTemplate(template)}>
                    <Copy size={14} />
                    Use Template
                  </ActionButton>
                </TemplateActions>
              </TemplateCard>
            ))}
          </TemplatesGrid>
        </Container>
      </MainContent>
    </Page>
  );
};

export default PolicyTemplates;
