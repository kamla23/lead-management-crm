import { useState, useEffect, useCallback } from 'react';
import { getleads, getstats, dellead, addlead, uplead } from './services/api';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import LeadsView from './components/LeadsView';
import AnalyticsView from './components/AnalyticsView';
import SettingsView from './components/SettingsView';
import LeadModal from './components/LeadModal';
import './App.css';

function App() {
  const [list, setlist] = useState([]);
  const [stats, setstats] = useState({ total: 0, New: 0, Contacted: 0, Qualified: 0, Converted: 0, Lost: 0 });
  const [query, setquery] = useState('');
  const [filt, setfilt] = useState('');
  const [page, setpage] = useState(1);
  const [pages, setpages] = useState(1);
  const [open, setopen] = useState(false);
  const [cur, setcur] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const loadData = useCallback(async () => {
    try {
      const leadRes = await getleads(query, filt, page);
      if (leadRes.data) {
        if (Array.isArray(leadRes.data)) {
          setlist(leadRes.data);
          setpages(1);
        } else {
          setlist(leadRes.data.leads || leadRes.data.data || []);
          setpages(leadRes.data.totalPages || 1);
        }
      }
      const statsRes = await getstats();
      if (statsRes.data) setstats(statsRes.data);
    } catch (err) { 
      console.error("Error loading data:", err); 
    }
  }, [query, filt, page]);

  useEffect(() => { 
    // Run loadData asynchronously off the render call stack to avoid
    // calling setState synchronously inside the effect body.
    let cancelled = false;
    const fetchData = async () => {
      try {
        await loadData();
      } catch (err) {
        if (!cancelled) console.error(err);
      }
    };
    // Ensure the call runs on the next tick (prevents sync setState warnings)
    const timer = setTimeout(fetchData, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [loadData]);

  const handleSaveLead = async (data) => {
    try {
      let phone = data.phone ? data.phone.replace(/\s+/g, '') : '';
      if (!phone.startsWith('+')) {
        phone = phone.startsWith('91') && phone.length > 10 ? '+' + phone : '+91' + phone;
      }
      let name = data.name ? data.name.trim().replace(/\s+/g, ' ') : '';
      if (name) {
        name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
      const finalData = { ...data, name, phone, company: data.company || data.companyName };

      if (cur) await uplead(cur._id, finalData);
      else await addlead(finalData);
      
      setquery(''); setfilt(''); setpage(1); setopen(false);
      await loadData(); 
    } catch (err) { 
      alert(err.response?.data?.messages?.[0] || "Error while saving lead."); 
    }
  };

  const sharedProps = { list, query, setquery, filt, setfilt, page, setpage, pages, setcur, setopen, dellead, load: loadData, stats };

  return (
    <div className="dash-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {activeTab === 'dashboard' && <DashboardView {...sharedProps} />}
        {activeTab === 'leads' && <LeadsView {...sharedProps} />}
        {activeTab === 'analytics' && <AnalyticsView stats={stats} />}
        {activeTab === 'settings' && <SettingsView />}
      </main>
      <LeadModal open={open} onclose={() => setopen(false)} onsave={handleSaveLead} cur={cur} />
    </div>
  );
}

export default App;