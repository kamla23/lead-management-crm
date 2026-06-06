import { useState, useEffect } from 'react';
import { User, Settings, Database, CloudLightning, Sun, Moon } from 'lucide-react';
import './SettingsView.css';

function SettingsView() {
  const [darkMode, setDarkMode] = useState(false);
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [profile, setProfile] = useState({
    name: localStorage.getItem('crm_admin_name') || 'Admin User',
    email: localStorage.getItem('crm_admin_email') || 'admin@crm.com'
  });

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${API_BASE_URL}/leads?page=1&limit=1`)
      .then((res) => {
        if (res.ok) setBackendStatus('Online');
        else setBackendStatus('Error');
      })
      .catch(() => setBackendStatus('Offline'));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    localStorage.setItem('crm_admin_name', profile.name);
    localStorage.setItem('crm_admin_email', profile.email);
    alert('Profile updated successfully!');
  };


  const handleExportData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leads?limit=1000`);
      const data = await response.json();
      
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data.leads || data, null, 2)
      )}`;
      
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', 'crm_leads_backup.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (error) {
      console.error('Error exporting backup:', error);
      alert('Failed to export backup. Is backend running?');
    }
  };

  const handleResetDatabase = async () => {
    const confirmReset = window.confirm(
      'WARNING: Are you sure you want to permanently delete ALL leads from the database?'
    );
    
    if (!confirmReset) return;

    try {

      const response = await fetch(`${API_BASE_URL}/leads/clear-all`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Database cleared successfully! Refreshing dashboard...');
        window.location.reload();
      } else {
        alert('Failed to reset database. Check API endpoint rules.');
      }
    } catch (error) {
      console.error('Error clearing database:', error);
      alert('Error connecting to backend server to clear data.');
    }
  };

  return (
    <div className="settings-page">
      <header className="head">
        <h1>System Settings</h1>
      </header>

      <div className="settings-container">
        
        <div className="settings-card">
          <div className="card-header">
            <User className="card-icon" />
            <h3>Profile Settings</h3>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={profile.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={profile.email} 
                onChange={handleInputChange} 
              />
            </div>
            <button className="settings-btn save-btn" onClick={saveProfile}>
              Update Profile
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <Settings className="card-icon" />
            <h3>Preferences</h3>
          </div>
          <div className="card-body">
            <div className="toggle-group">
              <div className="toggle-info">
                <span>Interface Theme</span>
                <p>Switch between light and dark display modes.</p>
              </div>
              <button 
                className={`theme-toggle-btn ${darkMode ? 'dark' : 'light'}`}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <Moon className="toggle-icon" /> : <Sun className="toggle-icon" />}
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </button>
            </div>

            <div className="form-group margin-top-md">
              <label>Default Lead Status</label>
              <select defaultValue="New">
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
              </select>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <div className="card-header">
            <CloudLightning className="card-icon" />
            <h3>System Connection</h3>
          </div>
          <div className="card-body">
            <div className="status-row">
              <span className="status-label">Backend Status:</span>
              <span className={`status-badge ${backendStatus.toLowerCase()}`}>
                {backendStatus}
              </span>
            </div>
            <div className="status-row">
              <span className="status-label">API Gateway:</span>
              <code className="api-code">{API_BASE_URL}</code>
            </div>
          </div>
        </div>

        <div className="settings-card danger-zone">
          <div className="card-header">
            <Database className="card-icon" />
            <h3>Data Management</h3>
          </div>
          <div className="card-body">
            <p className="danger-desc">Administrative actions for managing CRM records.</p>
            <div className="actions-row">
              <button className="settings-btn export-btn" onClick={handleExportData}>
                Export Backup (JSON)
              </button>
              <button className="settings-btn reset-btn" onClick={handleResetDatabase}>
                Reset Database
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SettingsView;