import { Edit2, Trash2, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import './LeadTable.css';

function LeadTable({ list, query, setquery, filt, setfilt, page, setpage, pages, onedit, ondel }) {
  
  const getBadgeClass = (status) => {
    switch (status) {
      case 'New': return 'badge badge-new';
      case 'Contacted': return 'badge badge-contacted';
      case 'Qualified': return 'badge badge-qualified';
      case 'Converted': return 'badge badge-converted';
      case 'Lost': return 'badge badge-lost';
      default: return 'badge';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleDateString('en-GB'); 
  };

  return (
    <div className="table-wrapper">
      <div className="table-controls">
        <div className="search-box">
          <Search className="control-icon" />
          <input 
            type="text" 
            placeholder="Search leads..." 
            value={query} 
            onChange={(e) => { setquery(e.target.value); setpage(1); }} 
          />
        </div>

        <div className="filter-box">
          <Filter className="control-icon" />
          <select value={filt} onChange={(e) => { setfilt(e.target.value); setpage(1); }}>
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((item) => (
                <tr key={item._id}>
                  <td className="lead-date">{formatDate(item.date || item.createdAt)}</td>
                  <td className="lead-name">{item.name}</td>
                  <td>{item.company || '-'}</td>
                  <td>{item.email}</td>
                  <td className="lead-phone">{item.phone}</td>
                  <td><span className={getBadgeClass(item.status)}>{item.status}</span></td>
                  

                  <td className="lead-notes" title={item.notes}>
                    {item.notes || '-'}
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit" onClick={() => onedit(item)}>
                        <Edit2 className="action-icon" />
                      </button>
                      <button className="action-btn delete" onClick={() => ondel(item._id)}>
                        <Trash2 className="action-icon" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>

                <td colSpan="8" className="no-data">No leads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="pagination">
          <button className="pag-btn" disabled={page === 1} onClick={() => setpage(prev => Math.max(prev - 1, 1))}>
            <ChevronLeft className="pag-icon" />
          </button>
          <span className="pag-info">Page {page} of {pages}</span>
          <button className="pag-btn" disabled={page === pages} onClick={() => setpage(prev => Math.min(prev + 1, pages))}>
            <ChevronRight className="pag-icon" />
          </button>
        </div>
      )}
    </div>
  );
}

export default LeadTable;