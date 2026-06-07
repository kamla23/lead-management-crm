import axios from 'axios';

 const url = "https://lead-management-crm-ap4b.onrender.com/api/leads";

export const getleads = (q = '', st = '', p = 1) => {
  const queryStr = q.trim();
  

  const statusLower = st ? st.toLowerCase() : '';

  if (queryStr !== '') {
    return axios.get(
      `${url}/search?query=${queryStr}&search=${queryStr}&status=${st}&statusValue=${statusLower}&leadStatus=${st}&page=${p}`
    );
  }

 
  return axios.get(
    `${url}?status=${st}&statusValue=${statusLower}&leadStatus=${st}&filter=${st}&page=${p}`
  );
};

export const getstats = () => axios.get(`${url}/stats`); 
export const addlead = (val) => axios.post(url, val);
export const uplead = (id, val) => axios.put(`${url}/${id}`, val);
export const dellead = (id) => axios.delete(`${url}/${id}`);