import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './LeadModal.css';

function LeadModal({ open, onclose, onsave, cur }) {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    status: 'New',
    notes: '',
    date: getTodayDate()
  });

  useEffect(() => {
    if (cur) {
      const dateSource = cur.date ?? cur.createdAt;
      const formattedDate = dateSource ? new Date(dateSource).toISOString().split('T')[0] : getTodayDate();

      const newForm = {
        name: cur.name || '',
        email: cur.email || '',
        phone: cur.phone || '',
        company: cur.company || cur.companyName || '',
        status: cur.status || 'New',
        notes: cur.notes || '',
        date: formattedDate
      };

      const timer = setTimeout(() => {
        setFormData((prev) => {
          const same = prev.name === newForm.name &&
            prev.email === newForm.email &&
            prev.phone === newForm.phone &&
            prev.company === newForm.company &&
            prev.status === newForm.status &&
            prev.notes === newForm.notes &&
            prev.date === newForm.date;
          return same ? prev : newForm;
        });
      }, 0);

      return () => clearTimeout(timer);
    } else {
      const newForm = { name: '', email: '', phone: '', company: '', status: 'New', notes: '', date: getTodayDate() };
      const timer = setTimeout(() => {
        setFormData((prev) => {
          const same = prev.name === newForm.name &&
            prev.email === newForm.email &&
            prev.phone === newForm.phone &&
            prev.company === newForm.company &&
            prev.status === newForm.status &&
            prev.notes === newForm.notes &&
            prev.date === newForm.date;
          return same ? prev : newForm;
        });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [cur, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onsave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{cur ? 'Edit Lead Details' : 'Create New Lead'}</h2>
          <button className="close-btn" onClick={onclose}>
            <X className="modal-icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your Full Name" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your Email..." />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your Phone Number" />
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Enter your Company Name" />
          </div>
          <div className="form-group">
            <label>Lead Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          <div className="form-group">
            <label>Lead Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Additional Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Enter details about this lead..." rows="2" />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onclose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Lead</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadModal;