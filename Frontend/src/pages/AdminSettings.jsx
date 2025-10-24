import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Settings, 
  Save, 
  RefreshCw,
  Bell,
  Shield,
  Database,
  Mail,
  Key,
  Users,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Upload,
  Download
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
  max-width: 1400px;
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

const Subtitle = styled.p`
  color: #64748B;
  margin: 0.5rem 0 0 0;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
`;

const SettingsCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bgColor || '#EFF6FF'};
  color: ${props => props.color || '#3B82F6'};
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`;

const CardDescription = styled.p`
  color: #64748B;
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
`;

const SettingGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const SettingLabel = styled.label`
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const SettingInput = styled.input`
  width: 100%;
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

const SettingSelect = styled.select`
  width: 100%;
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

const SettingTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
`;

const ToggleInput = styled.input`
  position: relative;
  width: 44px;
  height: 24px;
  appearance: none;
  background: #D1D5DB;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:checked {
    background: #3B82F6;
  }

  &:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s;
  }

  &:checked:before {
    transform: translateX(20px);
  }
`;

const ToggleLabel = styled.span`
  font-weight: 500;
  color: #374151;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  font-weight: 500;
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

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => {
    switch(props.status) {
      case 'active': return '#ECFDF5';
      case 'inactive': return '#FEF2F2';
      case 'warning': return '#FEF3C7';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return '#059669';
      case 'inactive': return '#DC2626';
      case 'warning': return '#D97706';
      default: return '#374151';
    }
  }};
`;

const AdminSettings = ({ user, onLogout }) => {
  const [settings, setSettings] = useState({
    // System Settings
    systemName: 'SecureGuard ISPM',
    systemVersion: '2.1.0',
    maintenanceMode: false,
    debugMode: false,
    
    // Security Settings
    passwordMinLength: 8,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorAuth: true,
    
    // Email Settings
    smtpHost: 'smtp.company.com',
    smtpPort: 587,
    smtpUser: 'noreply@company.com',
    emailNotifications: true,
    
    // Database Settings
    dbBackupFrequency: 'daily',
    dbRetentionDays: 30,
    autoBackup: true,
    
    // Notification Settings
    policyAlerts: true,
    trainingReminders: true,
    complianceWarnings: true,
    systemUpdates: false
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    // Simulate saving settings
    setTimeout(() => {
      setSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      // Reset to default values
      setSettings({
        systemName: 'SecureGuard ISPM',
        systemVersion: '2.1.0',
        maintenanceMode: false,
        debugMode: false,
        passwordMinLength: 8,
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        twoFactorAuth: true,
        smtpHost: 'smtp.company.com',
        smtpPort: 587,
        smtpUser: 'noreply@company.com',
        emailNotifications: true,
        dbBackupFrequency: 'daily',
        dbRetentionDays: 30,
        autoBackup: true,
        policyAlerts: true,
        trainingReminders: true,
        complianceWarnings: true,
        systemUpdates: false
      });
      alert('Settings reset to default values.');
    }
  };

  const handleExportSettings = () => {
    const settingsJson = JSON.stringify(settings, null, 2);
    const blob = new Blob([settingsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'system-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSettings = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedSettings = JSON.parse(e.target.result);
            setSettings(importedSettings);
            alert('Settings imported successfully!');
          } catch (error) {
            alert('Error importing settings. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <Page>
      <Sidebar user={user} onLogout={onLogout} />
      <MainContent>
        <Container>
          <Header>
            <div>
              <Greeting>System Settings</Greeting>
              <Subtitle>Configure system preferences and security settings</Subtitle>
            </div>
            <ActionButtons>
              <ActionButton onClick={handleExportSettings}>
                <Download size={16} />
                Export
              </ActionButton>
              <ActionButton onClick={handleImportSettings}>
                <Upload size={16} />
                Import
              </ActionButton>
              <ActionButton onClick={handleResetSettings}>
                <RefreshCw size={16} />
                Reset
              </ActionButton>
              <ActionButton className="primary" onClick={handleSaveSettings} disabled={saving}>
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Settings'}
              </ActionButton>
            </ActionButtons>
          </Header>

          <SettingsGrid>
            {/* System Settings */}
            <SettingsCard>
              <CardHeader>
                <CardIcon bgColor="#EFF6FF" color="#3B82F6">
                  <Settings size={20} />
                </CardIcon>
                <div>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Basic system configuration</CardDescription>
                </div>
              </CardHeader>

              <SettingGroup>
                <SettingLabel>System Name</SettingLabel>
                <SettingInput
                  type="text"
                  value={settings.systemName}
                  onChange={(e) => handleSettingChange('systemName', e.target.value)}
                />
              </SettingGroup>

              <SettingGroup>
                <SettingLabel>System Version</SettingLabel>
                <SettingInput
                  type="text"
                  value={settings.systemVersion}
                  disabled
                />
              </SettingGroup>

              <SettingGroup>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                  />
                  <ToggleLabel>Maintenance Mode</ToggleLabel>
                </ToggleSwitch>
              </SettingGroup>

              <SettingGroup>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={settings.debugMode}
                    onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
                  />
                  <ToggleLabel>Debug Mode</ToggleLabel>
                </ToggleSwitch>
              </SettingGroup>
            </SettingsCard>

            {/* Security Settings */}
            <SettingsCard>
              <CardHeader>
                <CardIcon bgColor="#FEF2F2" color="#DC2626">
                  <Shield size={20} />
                </CardIcon>
                <div>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Authentication and security policies</CardDescription>
                </div>
              </CardHeader>

              <SettingGroup>
                <SettingLabel>Password Minimum Length</SettingLabel>
                <SettingInput
                  type="number"
                  value={settings.passwordMinLength}
                  onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
                  min="6"
                  max="20"
                />
              </SettingGroup>

              <SettingGroup>
                <SettingLabel>Session Timeout (minutes)</SettingLabel>
                <SettingInput
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  min="5"
                  max="120"
                />
              </SettingGroup>

              <SettingGroup>
                <SettingLabel>Max Login Attempts</SettingLabel>
                <SettingInput
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                  min="3"
                  max="10"
                />
              </SettingGroup>

              <SettingGroup>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  />
                  <ToggleLabel>Two-Factor Authentication</ToggleLabel>
                </ToggleSwitch>
              </SettingGroup>
            </SettingsCard>

            {/* Email Settings */}
            <SettingsCard>
              <CardHeader>
                <CardIcon bgColor="#ECFDF5" color="#059669">
                  <Mail size={20} />
                </CardIcon>
                <div>
                  <CardTitle>Email Settings</CardTitle>
                  <CardDescription>SMTP configuration and notifications</CardDescription>
                </div>
              </CardHeader>

              <SettingGroup>
                <SettingLabel>SMTP Host</SettingLabel>
                <SettingInput
                  type="text"
                  value={settings.smtpHost}
                  onChange={(e) => handleSettingChange('smtpHost', e.target.value)}
                />
              </SettingGroup>

              <SettingGroup>
                <SettingLabel>SMTP Port</SettingLabel>
                <SettingInput
                  type="number"
                  value={settings.smtpPort}
                  onChange={(e) => handleSettingChange('smtpPort', parseInt(e.target.value))}
                />
              </SettingGroup>

              <SettingGroup>
                <SettingLabel>SMTP Username</SettingLabel>
                <SettingInput
                  type="text"
                  value={settings.smtpUser}
                  onChange={(e) => handleSettingChange('smtpUser', e.target.value)}
                />
              </SettingGroup>

              <SettingGroup>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                  <ToggleLabel>Email Notifications</ToggleLabel>
                </ToggleSwitch>
              </SettingGroup>
            </SettingsCard>

            {/* Database Settings */}
            <SettingsCard>
              <CardHeader>
                <CardIcon bgColor="#F3F4F6" color="#6B7280">
                  <Database size={20} />
                </CardIcon>
                <div>
                  <CardTitle>Database Settings</CardTitle>
                  <CardDescription>Backup and maintenance configuration</CardDescription>
                </div>
              </CardHeader>

              <SettingGroup>
                <SettingLabel>Backup Frequency</SettingLabel>
                <SettingSelect
                  value={settings.dbBackupFrequency}
                  onChange={(e) => handleSettingChange('dbBackupFrequency', e.target.value)}
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </SettingSelect>
              </SettingGroup>

              <SettingGroup>
                <SettingLabel>Retention Days</SettingLabel>
                <SettingInput
                  type="number"
                  value={settings.dbRetentionDays}
                  onChange={(e) => handleSettingChange('dbRetentionDays', parseInt(e.target.value))}
                  min="7"
                  max="365"
                />
              </SettingGroup>

              <SettingGroup>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                  />
                  <ToggleLabel>Automatic Backup</ToggleLabel>
                </ToggleSwitch>
              </SettingGroup>
            </SettingsCard>

            {/* Notification Settings */}
            <SettingsCard>
              <CardHeader>
                <CardIcon bgColor="#FEF3C7" color="#D97706">
                  <Bell size={20} />
                </CardIcon>
                <div>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure system notifications</CardDescription>
                </div>
              </CardHeader>

              <SettingGroup>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={settings.policyAlerts}
                    onChange={(e) => handleSettingChange('policyAlerts', e.target.checked)}
                  />
                  <ToggleLabel>Policy Alerts</ToggleLabel>
                </ToggleSwitch>
              </SettingGroup>

              <SettingGroup>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={settings.trainingReminders}
                    onChange={(e) => handleSettingChange('trainingReminders', e.target.checked)}
                  />
                  <ToggleLabel>Training Reminders</ToggleLabel>
                </ToggleSwitch>
              </SettingGroup>

              <SettingGroup>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={settings.complianceWarnings}
                    onChange={(e) => handleSettingChange('complianceWarnings', e.target.checked)}
                  />
                  <ToggleLabel>Compliance Warnings</ToggleLabel>
                </ToggleSwitch>
              </SettingGroup>

              <SettingGroup>
                <ToggleSwitch>
                  <ToggleInput
                    type="checkbox"
                    checked={settings.systemUpdates}
                    onChange={(e) => handleSettingChange('systemUpdates', e.target.checked)}
                  />
                  <ToggleLabel>System Updates</ToggleLabel>
                </ToggleSwitch>
              </SettingGroup>
            </SettingsCard>

            {/* System Status */}
            <SettingsCard>
              <CardHeader>
                <CardIcon bgColor="#EFF6FF" color="#3B82F6">
                  <CheckCircle size={20} />
                </CardIcon>
                <div>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current system health and status</CardDescription>
                </div>
              </CardHeader>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Database Connection</span>
                  <StatusIndicator status="active">
                    <CheckCircle size={12} />
                    Active
                  </StatusIndicator>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Email Service</span>
                  <StatusIndicator status="active">
                    <CheckCircle size={12} />
                    Active
                  </StatusIndicator>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Backup Service</span>
                  <StatusIndicator status="warning">
                    <AlertTriangle size={12} />
                    Warning
                  </StatusIndicator>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Security Scanner</span>
                  <StatusIndicator status="active">
                    <CheckCircle size={12} />
                    Active
                  </StatusIndicator>
                </div>
              </div>
            </SettingsCard>
          </SettingsGrid>
        </Container>
      </MainContent>
    </Page>
  );
};

export default AdminSettings;
