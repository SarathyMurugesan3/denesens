import axios from 'axios';

const API_BASE = '/api';

// Live Event Broadcaster for Instant Page Updates without Reload
const cmsChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('denesens_cms_channel') : null;

export const emitCMSUpdate = (topic = 'general') => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('denesens_cms_update', { detail: { topic, timestamp: Date.now() } }));
  }
  if (cmsChannel) {
    try {
      cmsChannel.postMessage({ topic, timestamp: Date.now() });
    } catch (e) {
      // Ignore broadcast errors
    }
  }
};

export const subscribeCMSUpdate = (callback) => {
  if (typeof window === 'undefined') return () => {};

  const handleCustomEvent = (e) => callback(e.detail);
  window.addEventListener('denesens_cms_update', handleCustomEvent);

  let handleMessage = null;
  if (cmsChannel) {
    handleMessage = (e) => callback(e.data);
    cmsChannel.addEventListener('message', handleMessage);
  }

  return () => {
    window.removeEventListener('denesens_cms_update', handleCustomEvent);
    if (cmsChannel && handleMessage) {
      cmsChannel.removeEventListener('message', handleMessage);
    }
  };
};

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

export const fetchSettings = async () => {
  try {
    const res = await axios.get(`${API_BASE}/settings`);
    return res.data.data;
  } catch (err) {
    console.warn('[API Client] Settings fetch fallback');
    return null;
  }
};

export const fetchStats = async () => {
  try {
    const res = await axios.get(`${API_BASE}/settings/stats`);
    return res.data.data;
  } catch (err) {
    console.warn('[API Client] Stats fetch fallback');
    return [];
  }
};

export const fetchPortfolio = async () => {
  try {
    const res = await axios.get(`${API_BASE}/portfolio`);
    return res.data.data;
  } catch (err) {
    console.warn('[API Client] Portfolio fetch fallback');
    return [];
  }
};

export const fetchTestimonials = async () => {
  try {
    const res = await axios.get(`${API_BASE}/testimonials`);
    return res.data.data;
  } catch (err) {
    console.warn('[API Client] Testimonials fetch fallback');
    return [];
  }
};

export const submitContactForm = async (formData) => {
  try {
    const res = await axios.post(`${API_BASE}/contact`, formData);
    emitCMSUpdate('contact');
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

export const verifyAdminPasscode = async (password, username = '') => {
  try {
    const res = await axios.post(`${API_BASE}/admin/verify`, { password, username });
    return res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    }
    throw { success: false, error: 'Network error or invalid credentials.' };
  }
};

// Admin Member Access Control
export const fetchAdminMembers = async () => {
  try {
    const res = await axios.get(`${API_BASE}/admin/members`, getAdminHeaders());
    return res.data.data;
  } catch (err) {
    console.warn('[API Client] Admin members fetch fallback');
    return [];
  }
};

export const createAdminMember = async (memberData) => {
  const res = await axios.post(`${API_BASE}/admin/members`, memberData, getAdminHeaders());
  return res.data.data;
};

export const deleteAdminMember = async (id) => {
  const res = await axios.delete(`${API_BASE}/admin/members/${id}`, getAdminHeaders());
  return res.data;
};

// Site Settings Admin
export const updateSettings = async (settingsData) => {
  const res = await axios.put(`${API_BASE}/settings`, settingsData, getAdminHeaders());
  emitCMSUpdate('settings');
  return res.data.data;
};

// Stats CRUD
export const createStat = async (statData) => {
  const res = await axios.post(`${API_BASE}/settings/stats`, statData, getAdminHeaders());
  emitCMSUpdate('stats');
  return res.data.data;
};

export const updateStat = async (id, statData) => {
  const res = await axios.put(`${API_BASE}/settings/stats/${id}`, statData, getAdminHeaders());
  emitCMSUpdate('stats');
  return res.data.data;
};

export const deleteStat = async (id) => {
  const res = await axios.delete(`${API_BASE}/settings/stats/${id}`, getAdminHeaders());
  emitCMSUpdate('stats');
  return res.data;
};

// Services CRUD
export const createService = async (serviceData) => {
  const res = await axios.post(`${API_BASE}/services`, serviceData, getAdminHeaders());
  emitCMSUpdate('services');
  return res.data.data;
};

export const updateService = async (id, serviceData) => {
  const res = await axios.put(`${API_BASE}/services/${id}`, serviceData, getAdminHeaders());
  emitCMSUpdate('services');
  return res.data.data;
};

export const deleteService = async (id) => {
  const res = await axios.delete(`${API_BASE}/services/${id}`, getAdminHeaders());
  emitCMSUpdate('services');
  return res.data;
};

// Products CRUD
export const createProduct = async (productData) => {
  const res = await axios.post(`${API_BASE}/products`, productData, getAdminHeaders());
  emitCMSUpdate('products');
  return res.data.data;
};

export const updateProduct = async (id, productData) => {
  const res = await axios.put(`${API_BASE}/products/${id}`, productData, getAdminHeaders());
  emitCMSUpdate('products');
  return res.data.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_BASE}/products/${id}`, getAdminHeaders());
  emitCMSUpdate('products');
  return res.data;
};

// Team CRUD
export const createTeamMember = async (teamData) => {
  const res = await axios.post(`${API_BASE}/team`, teamData, getAdminHeaders());
  emitCMSUpdate('team');
  return res.data.data;
};

export const updateTeamMember = async (id, teamData) => {
  const res = await axios.put(`${API_BASE}/team/${id}`, teamData, getAdminHeaders());
  emitCMSUpdate('team');
  return res.data.data;
};

export const deleteTeamMember = async (id) => {
  const res = await axios.delete(`${API_BASE}/team/${id}`, getAdminHeaders());
  emitCMSUpdate('team');
  return res.data;
};

// Portfolio CRUD
export const createPortfolio = async (portfolioData) => {
  const res = await axios.post(`${API_BASE}/portfolio`, portfolioData, getAdminHeaders());
  emitCMSUpdate('portfolio');
  return res.data.data;
};

export const updatePortfolio = async (id, portfolioData) => {
  const res = await axios.put(`${API_BASE}/portfolio/${id}`, portfolioData, getAdminHeaders());
  emitCMSUpdate('portfolio');
  return res.data.data;
};

export const deletePortfolio = async (id) => {
  const res = await axios.delete(`${API_BASE}/portfolio/${id}`, getAdminHeaders());
  emitCMSUpdate('portfolio');
  return res.data;
};

// Testimonials CRUD
export const createTestimonial = async (testimonialData) => {
  const res = await axios.post(`${API_BASE}/testimonials`, testimonialData, getAdminHeaders());
  emitCMSUpdate('testimonials');
  return res.data.data;
};

export const updateTestimonial = async (id, testimonialData) => {
  const res = await axios.put(`${API_BASE}/testimonials/${id}`, testimonialData, getAdminHeaders());
  emitCMSUpdate('testimonials');
  return res.data.data;
};

export const deleteTestimonial = async (id) => {
  const res = await axios.delete(`${API_BASE}/testimonials/${id}`, getAdminHeaders());
  emitCMSUpdate('testimonials');
  return res.data;
};

// Contact Submissions Admin
export const fetchContactSubmissions = async () => {
  const res = await axios.get(`${API_BASE}/contact`, getAdminHeaders());
  return res.data.data;
};
