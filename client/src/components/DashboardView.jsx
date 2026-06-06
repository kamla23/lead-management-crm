import LeadTable from './LeadTable';
import { 
  Plus, 
  Users, 
  UserPlus, 
  PhoneCall, 
  Award, 
  CheckCircle2, 
  XCircle 
} from 'lucide-react';
import './DashboardView.css';

function DashboardView({ stats, list, query, setquery, filt, setfilt, page, setpage, pages, setcur, setopen, dellead, load }) {
  
  const cardConfigs = [
    { label: 'Total Leads', count: stats.total || 0, icon: Users, class: 'total' },
    { label: 'New', count: stats.New || stats.new || 0, icon: UserPlus, class: 'new' },
    { label: 'Contacted', count: stats.Contacted || stats.contacted || 0, icon: PhoneCall, class: 'contacted' },
    { label: 'Qualified', count: stats.Qualified || stats.qualified || 0, icon: Award, class: 'qualified' },
    { label: 'Converted', count: stats.Converted || stats.converted || 0, icon: CheckCircle2, class: 'converted' },
    { label: 'Lost', count: stats.Lost || stats.lost || 0, icon: XCircle, class: 'lost' },
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="header-title">
          <h1>CRM Dashboard</h1>
          <p>Overview of your sales pipeline and lead activities.</p>
        </div>
        <button className="add-lead-btn" onClick={() => { setcur(null); setopen(true); }}>
          <Plus className="btn-icon" /> <span>Add Lead</span>
        </button>
      </header>

      <div className="metrics-grid">
        {cardConfigs.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <div key={index} className={`metric-card ${card.class}`}>
              <div className="card-content">
                <span className="card-label">{card.label}</span>
                <h2 className="card-count">{card.count}</h2>
              </div>
              <div className="card-icon-wrapper">
                <IconComponent className="card-icon" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-content-table">
        <LeadTable 
          list={list} query={query} setquery={setquery} filt={filt} setfilt={setfilt} 
          page={page} setpage={setpage} pages={pages}
          onedit={(item) => { setcur(item); setopen(true); }} 
          ondel={async (id) => { if(confirm("Delete?")) { await dellead(id); load(); } }} 
        />
      </div>
    </div>
  );
}

export default DashboardView;