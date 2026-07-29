import axios from 'axios';

const API_BASE = '/api';

export const fetchServices = async () => {
  try {
    const res = await axios.get(`${API_BASE}/services`);
    return res.data.data;
  } catch (err) {
    console.warn('[API Client] Services fetch fallback');
    return [];
  }
};

export const fetchProducts = async () => {
  try {
    const res = await axios.get(`${API_BASE}/products`);
    return res.data.data;
  } catch (err) {
    console.warn('[API Client] Products fetch fallback');
    return [];
  }
};

export const fetchTeam = async () => {
  try {
    const res = await axios.get(`${API_BASE}/team`);
    return res.data.data;
  } catch (err) {
    console.warn('[API Client] Team fetch fallback');
    return [];
  }
};

export const submitContactForm = async (formData) => {
  try {
    const res = await axios.post(`${API_BASE}/contact`, formData);
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    }
    throw { success: false, error: 'Network error or backend server unavailable.' };
  }
};

// Admin Helpers
const getAdminHeaders = () => {
  const secret = localStorage.getItem('admin_secret') || '';
  return {
    headers: {
      'x-admin-secret': secret,
      'Content-Type': 'application/json'
    }
  };
};

export const verifyAdminPasscode = async (password) => {
  try {
    const res = await axios.post(`${API_BASE}/admin/verify`, { password });
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    }
    throw { success: false, error: 'Network error or invalid passcode.' };
  }
};

// Services CRUD
export const createService = async (serviceData) => {
  const res = await axios.post(`${API_BASE}/services`, serviceData, getAdminHeaders());
  return res.data.data;
};

export const updateService = async (id, serviceData) => {
  const res = await axios.put(`${API_BASE}/services/${id}`, serviceData, getAdminHeaders());
  return res.data.data;
};

export const deleteService = async (id) => {
  const res = await axios.delete(`${API_BASE}/services/${id}`, getAdminHeaders());
  return res.data;
};

// Products CRUD
export const createProduct = async (productData) => {
  const res = await axios.post(`${API_BASE}/products`, productData, getAdminHeaders());
  return res.data.data;
};

export const updateProduct = async (id, productData) => {
  const res = await axios.put(`${API_BASE}/products/${id}`, productData, getAdminHeaders());
  return res.data.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_BASE}/products/${id}`, getAdminHeaders());
  return res.data;
};

// Team CRUD
export const createTeamMember = async (teamData) => {
  const res = await axios.post(`${API_BASE}/team`, teamData, getAdminHeaders());
  return res.data.data;
};

export const updateTeamMember = async (id, teamData) => {
  const res = await axios.put(`${API_BASE}/team/${id}`, teamData, getAdminHeaders());
  return res.data.data;
};

export const deleteTeamMember = async (id) => {
  const res = await axios.delete(`${API_BASE}/team/${id}`, getAdminHeaders());
  return res.data;
};
