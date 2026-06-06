import { LayoutDashboard, Users, BarChart3, Settings } from 'lucide-react';
import './Sidebar.css';

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>InstaCRM</h2>
      </div>
      <nav className="sidebar-nav">
        <button 
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`} 
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard className="nav-icon" />
          Dashboard
        </button>

        <button 
          className={`nav-btn ${activeTab === 'leads' ? 'active' : ''}`} 
          onClick={() => setActiveTab('leads')}
        >
          <Users className="nav-icon" />
          All Leads
        </button>

        <button 
          className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`} 
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart3 className="nav-icon" />
          Analytics
        </button>

        <button 
          className={`nav-btn ${activeTab === 'settings' ? 'active' : ''}`} 
          onClick={() => setActiveTab('settings')}
        >
          <Settings className="nav-icon" />
          Settings
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;