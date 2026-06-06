import axios from 'axios';

const url = 'http://localhost:5000/api/leads';

export const getleads = (q = '', st = '', p = 1) => {
  const queryStr = q.trim();
  
  // स्टेटस को बैकएंड के लिए तैयार करना (Original, Lowercase, और Uppercase तीनों फॉर्मेट में)
  const statusLower = st ? st.toLowerCase() : '';
  const statusUpper = st ? st.toUpperCase() : '';

  // 💡 केस 1: अगर सर्च बॉक्स में कुछ लिखा है (Name, Email, Company)
  if (queryStr !== '') {
    return axios.get(
      `${url}/search?query=${queryStr}&search=${queryStr}&status=${st}&statusValue=${statusLower}&leadStatus=${st}&page=${p}`
    );
  }

  // 💡 केस 2: अगर केवल ड्रॉपडाउन फ़िल्टर (New, Converted, Lost...) चुना गया है
  // हम बैकएंड के भ्रम को दूर करने के लिए सभी संभावित कीवर्ड्स भेज रहे हैं
  return axios.get(
    `${url}?status=${st}&statusValue=${statusLower}&leadStatus=${st}&filter=${st}&page=${p}`
  );
};

export const getstats = () => axios.get(`${url}/stats`); 
export const addlead = (val) => axios.post(url, val);
export const uplead = (id, val) => axios.put(`${url}/${id}`, val);
export const dellead = (id) => axios.delete(`${url}/${id}`);