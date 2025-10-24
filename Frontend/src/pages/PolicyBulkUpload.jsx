import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Trash2,
  Eye,
  X
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

const UploadContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const UploadArea = styled.div`
  border: 2px dashed #D1D5DB;
  border-radius: 8px;
  padding: 3rem;
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
  margin-bottom: 1rem;
`;

const UploadText = styled.div`
  color: #374151;
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const UploadSubtext = styled.div`
  color: #6B7280;
  font-size: 0.9rem;
`;

const FileList = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FileIcon = styled.div`
  color: #3B82F6;
`;

const FileDetails = styled.div`
  flex: 1;
`;

const FileName = styled.div`
  font-weight: 500;
  color: #1E293B;
  margin-bottom: 0.25rem;
`;

const FileSize = styled.div`
  color: #6B7280;
  font-size: 0.8rem;
`;

const FileStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 1rem;
`;

const StatusIcon = styled.div`
  color: ${props => props.status === 'success' ? '#10B981' : props.status === 'error' ? '#EF4444' : '#F59E0B'};
`;

const StatusText = styled.div`
  font-size: 0.8rem;
  color: ${props => props.status === 'success' ? '#10B981' : props.status === 'error' ? '#EF4444' : '#F59E0B'};
`;

const FileActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #F9FAFB;
    border-color: #9CA3AF;
  }
  
  ${props => props.variant === 'danger' && `
    &:hover {
      background: #FEF2F2;
      border-color: #EF4444;
      color: #EF4444;
    }
  `}
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

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #E5E7EB;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #3B82F6;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const PolicyBulkUpload = ({ user, onLogout }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newFiles = uploadedFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      status: 'pending',
      progress: 0
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleUpload = async () => {
    setUploading(true);
    
    // Simulate upload progress
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Update status to uploading
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { ...f, status: 'uploading' } : f
      ));
      
      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, progress } : f
        ));
      }
      
      // Set final status
      const success = Math.random() > 0.1; // 90% success rate
      setFiles(prev => prev.map(f => 
        f.id === file.id ? { 
          ...f, 
          status: success ? 'success' : 'error',
          progress: 100
        } : f
      ));
    }
    
    setUploading(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} />;
      case 'error':
        return <AlertCircle size={16} />;
      case 'uploading':
        return <Upload size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success':
        return 'Uploaded';
      case 'error':
        return 'Failed';
      case 'uploading':
        return 'Uploading...';
      default:
        return 'Pending';
    }
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <Greeting>Bulk Upload Policies</Greeting>
          </Header>

          <UploadContainer>
            <UploadArea onClick={() => document.getElementById('bulk-upload').click()}>
              <input
                id="bulk-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <UploadIcon>
                <Upload size={48} />
              </UploadIcon>
              <UploadText>
                Click to upload multiple policy files
              </UploadText>
              <UploadSubtext>
                PDF, DOC, DOCX files only (Max 10MB each)
              </UploadSubtext>
            </UploadArea>
          </UploadContainer>

          {files.length > 0 && (
            <FileList>
              <h3 style={{ margin: '0 0 1rem 0', color: '#1E293B' }}>
                Files to Upload ({files.length})
              </h3>
              
              {files.map((file) => (
                <FileItem key={file.id}>
                  <FileInfo>
                    <FileIcon>
                      <FileText size={20} />
                    </FileIcon>
                    <FileDetails>
                      <FileName>{file.name}</FileName>
                      <FileSize>{file.size}</FileSize>
                      {file.status === 'uploading' && (
                        <ProgressBar>
                          <ProgressFill progress={file.progress} />
                        </ProgressBar>
                      )}
                    </FileDetails>
                  </FileInfo>
                  
                  <FileStatus>
                    <StatusIcon status={file.status}>
                      {getStatusIcon(file.status)}
                    </StatusIcon>
                    <StatusText status={file.status}>
                      {getStatusText(file.status)}
                    </StatusText>
                  </FileStatus>
                  
                  <FileActions>
                    <ActionButton title="Preview">
                      <Eye size={14} />
                    </ActionButton>
                    <ActionButton 
                      variant="danger" 
                      onClick={() => handleRemoveFile(file.id)}
                      title="Remove"
                    >
                      <Trash2 size={14} />
                    </ActionButton>
                  </FileActions>
                </FileItem>
              ))}
            </FileList>
          )}

          {files.length > 0 && (
            <ButtonGroup>
              <Button>
                <X size={16} />
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={handleUpload}
                disabled={uploading}
              >
                <Upload size={16} />
                {uploading ? 'Uploading...' : 'Upload All Files'}
              </Button>
            </ButtonGroup>
          )}
        </Container>
      </MainContent>
    </Page>
  );
};

export default PolicyBulkUpload;
