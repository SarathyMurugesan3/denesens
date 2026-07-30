import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, Unlock, ShieldAlert, Plus, Edit, Trash2, LogOut, Check, X,
  Briefcase, Package, Users, Eye, HelpCircle, ExternalLink, RefreshCw,
  Settings, BarChart3, Star, FolderGit2, Mail, Save, Sparkles, Building2, Phone, MapPin, Globe, Upload, Image
} from 'lucide-react';
import Modal from '../components/Modal';
import { 
  verifyAdminPasscode,
  fetchSettings, updateSettings,
  fetchStats, createStat, updateStat, deleteStat,
  fetchServices, createService, updateService, deleteService,
  fetchProducts, createProduct, updateProduct, deleteProduct,
  fetchPortfolio, createPortfolio, updatePortfolio, deletePortfolio,
  fetchTeam, createTeamMember, updateTeamMember, deleteTeamMember,
  fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  fetchContactSubmissions, subscribeCMSUpdate
} from '../services/api';

export const MasterAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Active Tab: 'settings', 'stats', 'services', 'products', 'portfolio', 'team', 'testimonials', 'contacts'
  const [activeTab, setActiveTab] = useState('settings');

  // CMS State
  const [settings, setSettings] = useState({
    brandName: 'DENESENS',
    tagline: 'BUILDING INTELLIGENT SOLUTIONS',
    heroBadge: 'DENESENS SOLUTIONS — LUXURY SOFTWARE ARCHITECTURE',
    heroHeadline: 'We Engineer Intelligent Software Solutions',
    heroSubheadline: 'Bridging high-end service engineering and robust in-house SaaS platforms. We build bespoke digital products, enterprise AI engines, and resilient cloud architectures with obsidian precision.',
    phone: '+91 96295 68373',
    email: 'contact@denesens.com',
    address: 'Salem, Tamil Nadu, India',
    logoUrl: '/logo.jpg',
    aboutTitle: 'Engineering High-Performance Digital Intelligence',
    aboutSubtitle: 'Denesens Solutions is a premier corporate software architecture firm based in Salem, Tamil Nadu, India. We fuse luxury design aesthetics with robust software engineering.',
    missionText: 'To empower forward-thinking organizations with intelligent, secure, and infinitely scalable software solutions—eliminating technical friction and accelerating enterprise innovation.',
    visionText: 'To stand as the global gold standard for luxury tech engineering—recognized for combining deep artificial intelligence, resilient cloud infrastructure, and unmatched visual design polish.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      whatsapp: 'https://wa.me/919629568373'
    }
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);

  // Lists
  const [stats, setStats] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Data Loading
  const [fetchingData, setFetchingData] = useState(false);

  // Modal controls
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('service');
  const [modalAction, setModalAction] = useState('create');
  const [selectedId, setSelectedId] = useState(null);

  // Form states
  const [statForm, setStatForm] = useState({ label: '', value: '', suffix: '', description: '', icon: 'Award', order: 0 });
  const [serviceForm, setServiceForm] = useState({ title: '', slug: '', category: 'Development', shortDesc: '', fullDesc: '', featuresText: '', icon: 'Code', tagsText: '', order: 0 });
  const [productForm, setProductForm] = useState({ name: '', slug: '', tagline: '', description: '', featuresText: '', techStackText: '', status: 'Live', demoUrl: '#', badge: 'Enterprise SaaS', order: 0 });
  const [portfolioForm, setPortfolioForm] = useState({ title: '', slug: '', category: 'AI & Data Science', client: '', description: '', impact: '', tagsText: '', liveUrl: '#', order: 0 });
  const [teamForm, setTeamForm] = useState({ name: '', role: '', bio: '', initials: '', avatar: '', linkedin: '', twitter: '', github: '', order: 0 });
  const [testimonialForm, setTestimonialForm] = useState({ name: '', role: '', company: '', content: '', rating: 5, order: 0 });

  useEffect(() => {
    const cachedSecret = localStorage.getItem('admin_secret');
    if (cachedSecret) {
      setLoading(true);
      verifyAdminPasscode(cachedSecret)
        .then(() => {
          setIsAuthenticated(true);
          loadAllData();
        })
        .catch(() => {
          localStorage.removeItem('admin_secret');
        })
        .finally(() => setLoading(false));
    }
  }, []);

  // Real-time listener for instant CMS updates
  useEffect(() => {
    if (isAuthenticated) {
      const unsubscribe = subscribeCMSUpdate(() => {
        loadAllData();
      });
      return () => unsubscribe();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
    setFetchingData(true);
    try {
      const [stgData, statData, srvData, prodData, portData, teamData, testData, cntData] = await Promise.all([
        fetchSettings(),
        fetchStats(),
        fetchServices(),
        fetchProducts(),
        fetchPortfolio(),
        fetchTeam(),
        fetchTestimonials(),
        fetchContactSubmissions().catch(() => [])
      ]);
      if (stgData) setSettings(prev => ({ ...prev, ...stgData }));
      if (statData) setStats(statData);
      if (srvData) setServices(srvData);
      if (prodData) setProducts(prodData);
      if (portData) setPortfolio(portData);
      if (teamData) setTeam(teamData);
      if (testData) setTestimonials(testData);
      if (cntData) setContacts(cntData);
    } catch (err) {
      console.error('Failed to load CMS data:', err);
    } finally {
      setFetchingData(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    try {
      const res = await verifyAdminPasscode(passcode);
      if (res.success) {
        localStorage.setItem('admin_secret', passcode);
        setIsAuthenticated(true);
        loadAllData();
      }
    } catch (err) {
      setAuthError(err.error || 'Authentication failed. Please check your passcode.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_secret');
    setIsAuthenticated(false);
    setPasscode('');
  };

  const generateSlug = (text) => {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSavedSuccess(false);
    try {
      await updateSettings(settings);
      setSettingsSavedSuccess(true);
      setTimeout(() => setSettingsSavedSuccess(false), 3000);
    } catch (err) {
      alert('Failed to save settings: ' + (err.message || 'Error occurred'));
    } finally {
      setSavingSettings(false);
    }
  };

  // Base64 Image File Reader for Team Profile Uploads
  const handleAvatarFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamForm(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Create Modals
  const openCreateModal = (type) => {
    setModalType(type);
    setModalAction('create');
    setSelectedId(null);
    if (type === 'stat') {
      setStatForm({ label: '', value: '', suffix: '', description: '', icon: 'Award', order: stats.length + 1 });
    } else if (type === 'service') {
      setServiceForm({ title: '', slug: '', category: 'Development', shortDesc: '', fullDesc: '', featuresText: '', icon: 'Code', tagsText: '', order: services.length + 1 });
    } else if (type === 'product') {
      setProductForm({ name: '', slug: '', tagline: '', description: '', featuresText: '', techStackText: '', status: 'Live', demoUrl: '#', badge: 'Enterprise SaaS', order: products.length + 1 });
    } else if (type === 'portfolio') {
      setPortfolioForm({ title: '', slug: '', category: 'AI & Data Science', client: '', description: '', impact: '', tagsText: '', liveUrl: '#', order: portfolio.length + 1 });
    } else if (type === 'team') {
      setTeamForm({ name: '', role: '', bio: '', initials: '', avatar: '', linkedin: '', twitter: '', github: '', order: team.length + 1 });
    } else if (type === 'testimonial') {
      setTestimonialForm({ name: '', role: '', company: '', content: '', rating: 5, order: testimonials.length + 1 });
    }
    setModalOpen(true);
  };

  // Open Edit Modals
  const openEditModal = (type, item) => {
    setModalType(type);
    setModalAction('edit');
    setSelectedId(item._id);
    if (type === 'stat') {
      setStatForm({ label: item.label || '', value: item.value || '', suffix: item.suffix || '', description: item.description || '', icon: item.icon || 'Award', order: item.order || 0 });
    } else if (type === 'service') {
      setServiceForm({
        title: item.title || '',
        slug: item.slug || '',
        category: item.category || 'Development',
        shortDesc: item.shortDesc || '',
        fullDesc: item.fullDesc || '',
        featuresText: item.features ? item.features.join('\n') : '',
        icon: item.icon || 'Code',
        tagsText: item.tags ? item.tags.join(', ') : '',
        order: item.order || 0
      });
    } else if (type === 'product') {
      setProductForm({
        name: item.name || '',
        slug: item.slug || '',
        tagline: item.tagline || '',
        description: item.description || '',
        featuresText: item.features ? item.features.join('\n') : '',
        techStackText: item.techStack ? item.techStack.join(', ') : '',
        status: item.status || 'Live',
        demoUrl: item.demoUrl || '#',
        badge: item.badge || 'Enterprise SaaS',
        order: item.order || 0
      });
    } else if (type === 'portfolio') {
      setPortfolioForm({
        title: item.title || '',
        slug: item.slug || '',
        category: item.category || 'AI & Data Science',
        client: item.client || '',
        description: item.description || '',
        impact: item.impact || '',
        tagsText: item.tags ? item.tags.join(', ') : '',
        liveUrl: item.liveUrl || '#',
        order: item.order || 0
      });
    } else if (type === 'team') {
      setTeamForm({
        name: item.name || '',
        role: item.role || '',
        bio: item.bio || '',
        initials: item.initials || '',
        avatar: item.avatar || '',
        linkedin: item.socialLinks?.linkedin || '',
        twitter: item.socialLinks?.twitter || '',
        github: item.socialLinks?.github || '',
        order: item.order || 0
      });
    } else if (type === 'testimonial') {
      setTestimonialForm({
        name: item.name || '',
        role: item.role || '',
        company: item.company || '',
        content: item.content || '',
        rating: item.rating || 5,
        order: item.order || 0
      });
    }
    setModalOpen(true);
  };

  // Submit Handlers
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'stat') {
        const payload = { ...statForm };
        if (modalAction === 'create') await createStat(payload);
        else await updateStat(selectedId, payload);
      } else if (modalType === 'service') {
        const payload = {
          ...serviceForm,
          features: serviceForm.featuresText.split('\n').map(s => s.trim()).filter(Boolean),
          tags: serviceForm.tagsText.split(',').map(s => s.trim()).filter(Boolean)
        };
        if (modalAction === 'create') await createService(payload);
        else await updateService(selectedId, payload);
      } else if (modalType === 'product') {
        const payload = {
          ...productForm,
          features: productForm.featuresText.split('\n').map(s => s.trim()).filter(Boolean),
          techStack: productForm.techStackText.split(',').map(s => s.trim()).filter(Boolean)
        };
        if (modalAction === 'create') await createProduct(payload);
        else await updateProduct(selectedId, payload);
      } else if (modalType === 'portfolio') {
        const payload = {
          ...portfolioForm,
          tags: portfolioForm.tagsText.split(',').map(s => s.trim()).filter(Boolean)
        };
        if (modalAction === 'create') await createPortfolio(payload);
        else await updatePortfolio(selectedId, payload);
      } else if (modalType === 'team') {
        const payload = {
          name: teamForm.name,
          role: teamForm.role,
          bio: teamForm.bio,
          initials: teamForm.initials || teamForm.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase(),
          avatar: teamForm.avatar,
          socialLinks: { linkedin: teamForm.linkedin, twitter: teamForm.twitter, github: teamForm.github },
          order: teamForm.order
        };
        if (modalAction === 'create') await createTeamMember(payload);
        else await updateTeamMember(selectedId, payload);
      } else if (modalType === 'testimonial') {
        const payload = { ...testimonialForm };
        if (modalAction === 'create') await createTestimonial(payload);
        else await updateTestimonial(selectedId, payload);
      }
      setModalOpen(false);
      loadAllData();
    } catch (err) {
      alert('Operation failed: ' + (err.error || err.message || 'Error'));
    }
  };

  // Delete Handler
  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      if (type === 'stat') await deleteStat(id);
      else if (type === 'service') await deleteService(id);
      else if (type === 'product') await deleteProduct(id);
      else if (type === 'portfolio') await deletePortfolio(id);
      else if (type === 'team') await deleteTeamMember(id);
      else if (type === 'testimonial') await deleteTestimonial(id);
      loadAllData();
    } catch (err) {
      alert('Failed to delete item.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4 py-20 relative overflow-hidden">
        <div className="w-full max-w-md p-8 rounded-3xl bg-dark-900 border border-gold-400/40 shadow-gold-glow relative z-10 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 p-0.5 mx-auto flex items-center justify-center shadow-gold-glow">
              <div className="w-full h-full rounded-full bg-dark-950 flex items-center justify-center text-gold-300">
                <Lock className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold font-heading text-white">SECRET ADMIN CMS</h1>
            <p className="text-xs text-gold-400 font-semibold tracking-widest uppercase">Denesens Corporate Management Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Secret Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter secret admin passcode"
                className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-gold-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 text-sm"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 font-bold uppercase tracking-widest text-xs shadow-gold-glow transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? 'AUTHENTICATING...' : 'ENTER SECRET ADMIN CMS'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-dark-950 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-dark-900 border border-gold-400/30 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-gold-400 p-0.5 bg-dark-950 flex items-center justify-center text-gold-300 shadow-gold-glow">
              <Unlock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-heading text-white">SECRET ADMIN CMS</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gold-400/20 text-gold-300 border border-gold-400/40">
                  REAL-TIME INSTANT SYNC ACTIVE
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Any additions, edits, or deletions instantly update the live website without page reload.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              disabled={fetchingData}
              className="px-4 py-2 rounded-xl bg-dark-800 border border-gold-500/30 text-gold-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${fetchingData ? 'animate-spin' : ''}`} />
              <span>REFRESH DATA</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 hover:bg-red-900/60 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>

        {/* CMS Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-dark-800 scrollbar-none">
          {[
            { id: 'settings', label: 'Site Content & Hero', icon: Settings, count: null },
            { id: 'stats', label: 'Stats & Metrics', icon: BarChart3, count: stats.length },
            { id: 'services', label: 'Services', icon: Briefcase, count: services.length },
            { id: 'products', label: 'Products & SaaS', icon: Package, count: products.length },
            { id: 'portfolio', label: 'Portfolio Cases', icon: FolderGit2, count: portfolio.length },
            { id: 'team', label: 'Executive Team', icon: Users, count: team.length },
            { id: 'testimonials', label: 'Testimonials', icon: Star, count: testimonials.length },
            { id: 'contacts', label: 'Contact Messages', icon: Mail, count: contacts.length }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl font-medium text-xs tracking-wider uppercase flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gold-gradient text-dark-950 font-bold shadow-gold-glow'
                    : 'bg-dark-900 text-gray-300 hover:bg-dark-850 hover:text-gold-300 border border-gold-500/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-dark-950 text-gold-300' : 'bg-dark-800 text-gold-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ----------------- TAB 1: SITE CONTENT & HERO SETTINGS ----------------- */}
        {activeTab === 'settings' && (
          <div className="p-8 rounded-3xl bg-dark-900 border border-gold-400/30 shadow-xl space-y-8">
            <div className="flex items-center justify-between border-b border-dark-800 pb-4">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Site Global Content & Hero Configuration</h2>
                <p className="text-xs text-gray-400 mt-1">Edit main hero text, headlines, contact numbers, address, email, and corporate values.</p>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={savingSettings}
                className="px-6 py-2.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 font-bold uppercase tracking-widest text-xs shadow-gold-glow flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>{savingSettings ? 'SAVING...' : 'SAVE ALL SETTINGS'}</span>
              </button>
            </div>

            {settingsSavedSuccess && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Website settings successfully saved and updated across live website!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">Brand Name</label>
                  <input
                    type="text"
                    value={settings.brandName}
                    onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">Tagline</label>
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">Hero Top Badge Text</label>
                <input
                  type="text"
                  value={settings.heroBadge}
                  onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">Hero Main Headline</label>
                <input
                  type="text"
                  value={settings.heroHeadline}
                  onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">Hero Subheadline</label>
                <textarea
                  rows={3}
                  value={settings.heroSubheadline}
                  onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-dark-800">
                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">Contact Phone</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">Contact Email</label>
                  <input
                    type="text"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">Office Address</label>
                  <input
                    type="text"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-dark-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">About Page & Vision Content</h3>
                <div>
                  <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">About Page Subtitle</label>
                  <textarea
                    rows={2}
                    value={settings.aboutSubtitle}
                    onChange={(e) => setSettings({ ...settings, aboutSubtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm focus:border-gold-400 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">Mission Statement</label>
                    <textarea
                      rows={3}
                      value={settings.missionText}
                      onChange={(e) => setSettings({ ...settings, missionText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gold-300 uppercase tracking-wider mb-2">Vision Statement</label>
                    <textarea
                      rows={3}
                      value={settings.visionText}
                      onChange={(e) => setSettings({ ...settings, visionText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm focus:border-gold-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-dark-800">
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="px-8 py-3 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 font-bold uppercase tracking-widest text-xs shadow-gold-glow flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingSettings ? 'SAVING...' : 'SAVE ALL SETTINGS'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ----------------- TAB 2: STATS & METRICS ----------------- */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Key Metrics & Statistics</h2>
                <p className="text-xs text-gray-400 mt-1">Manage stat counters displayed across the Home and About pages.</p>
              </div>
              <button
                onClick={() => openCreateModal('stat')}
                className="px-4 py-2.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 font-bold uppercase tracking-widest text-xs shadow-gold-glow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>ADD NEW STAT</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map(stat => (
                <div key={stat._id} className="p-6 rounded-3xl bg-dark-900 border border-gold-500/20 shadow-xl space-y-4 relative group">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold font-heading gold-text">{stat.value}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal('stat', stat)} className="p-2 rounded-lg bg-dark-800 text-gold-300 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete('stat', stat._id)} className="p-2 rounded-lg bg-red-950/50 text-red-400 hover:text-white transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{stat.label}</h3>
                    <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 3: SERVICES ----------------- */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Services Directory</h2>
                <p className="text-xs text-gray-400 mt-1">Manage bespoke corporate services offered by Denesens Solutions.</p>
              </div>
              <button
                onClick={() => openCreateModal('service')}
                className="px-4 py-2.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 font-bold uppercase tracking-widest text-xs shadow-gold-glow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>ADD SERVICE</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(srv => (
                <div key={srv._id} className="p-6 rounded-3xl bg-dark-900 border border-gold-500/20 shadow-xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20">
                        {srv.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal('service', srv)} className="p-1.5 rounded-lg bg-dark-800 text-gold-300 hover:text-white transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete('service', srv._id)} className="p-1.5 rounded-lg bg-red-950/50 text-red-400 hover:text-white transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white">{srv.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-3">{srv.shortDesc}</p>
                  </div>

                  <div className="pt-4 border-t border-dark-800 flex items-center justify-between text-[11px] text-gray-400">
                    <span>Order: #{srv.order}</span>
                    <span>{srv.features?.length || 0} Features</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 4: PRODUCTS ----------------- */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">In-House SaaS Products</h2>
                <p className="text-xs text-gray-400 mt-1">Manage Denesens proprietary SaaS engines and developer platforms.</p>
              </div>
              <button
                onClick={() => openCreateModal('product')}
                className="px-4 py-2.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 font-bold uppercase tracking-widest text-xs shadow-gold-glow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>ADD PRODUCT</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map(prod => (
                <div key={prod._id} className="p-6 rounded-3xl bg-dark-900 border border-gold-500/20 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {prod.badge}
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal('product', prod)} className="p-1.5 rounded-lg bg-dark-800 text-gold-300 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete('product', prod._id)} className="p-1.5 rounded-lg bg-red-950/50 text-red-400 hover:text-white transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{prod.name}</h3>
                    <p className="text-xs text-gold-300 mt-0.5 italic">{prod.tagline}</p>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-3">{prod.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 5: PORTFOLIO ----------------- */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Portfolio Case Studies</h2>
                <p className="text-xs text-gray-400 mt-1">Showcase high-impact enterprise projects delivered to clients.</p>
              </div>
              <button
                onClick={() => openCreateModal('portfolio')}
                className="px-4 py-2.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 font-bold uppercase tracking-widest text-xs shadow-gold-glow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>ADD CASE STUDY</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {portfolio.map(port => (
                <div key={port._id} className="p-6 rounded-3xl bg-dark-900 border border-gold-500/20 shadow-xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20">
                        {port.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal('portfolio', port)} className="p-1.5 rounded-lg bg-dark-800 text-gold-300 hover:text-white transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete('portfolio', port._id)} className="p-1.5 rounded-lg bg-red-950/50 text-red-400 hover:text-white transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white">{port.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-3">{port.description}</p>
                    {port.impact && (
                      <p className="text-xs text-gold-300 font-semibold italic bg-dark-850 p-2.5 rounded-xl border border-gold-500/20">
                        "{port.impact}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 6: TEAM MEMBERS ----------------- */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Executive Team Roster</h2>
                <p className="text-xs text-gray-400 mt-1">Manage corporate leaders (CEO, CTO, Marketing Lead) and profile pictures saved directly in MongoDB Atlas.</p>
              </div>
              <button
                onClick={() => openCreateModal('team')}
                className="px-4 py-2.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 font-bold uppercase tracking-widest text-xs shadow-gold-glow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>ADD TEAM MEMBER</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {team.map(member => (
                <div key={member._id} className="p-6 rounded-3xl bg-dark-900 border border-gold-500/20 shadow-xl text-center space-y-4">
                  {/* Round Gold Ring Profile Picture */}
                  <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-300 p-1 shadow-gold-glow">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-dark-950 flex items-center justify-center text-gold-300 font-bold text-2xl">
                        {member.initials}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    <p className="text-xs font-bold text-gold-400 uppercase tracking-widest">{member.role}</p>
                  </div>
                  <p className="text-xs text-gray-400 italic">"{member.bio}"</p>
                  <div className="pt-4 border-t border-dark-800 flex items-center justify-center gap-3">
                    <button onClick={() => openEditModal('team', member)} className="px-3 py-1.5 rounded-lg bg-dark-800 text-gold-300 hover:text-white text-xs font-semibold flex items-center gap-1">
                      <Edit className="w-3.5 h-3.5" /> Edit Member
                    </button>
                    <button onClick={() => handleDelete('team', member._id)} className="px-3 py-1.5 rounded-lg bg-red-950/50 text-red-400 hover:text-white text-xs font-semibold flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 7: TESTIMONIALS ----------------- */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-heading text-white">Client Testimonials & Reviews</h2>
                <p className="text-xs text-gray-400 mt-1">Manage client reviews shown on the Home and About pages.</p>
              </div>
              <button
                onClick={() => openCreateModal('testimonial')}
                className="px-4 py-2.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 font-bold uppercase tracking-widest text-xs shadow-gold-glow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>ADD TESTIMONIAL</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map(t => (
                <div key={t._id} className="p-6 rounded-3xl bg-dark-900 border border-gold-500/20 shadow-xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex text-gold-400 gap-1">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold-400" />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal('testimonial', t)} className="p-1.5 rounded-lg bg-dark-800 text-gold-300 hover:text-white transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete('testimonial', t._id)} className="p-1.5 rounded-lg bg-red-950/50 text-red-400 hover:text-white transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 italic">"{t.content}"</p>
                  </div>
                  <div className="pt-4 border-t border-dark-800">
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-gold-400">{t.role} — {t.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 8: CONTACT SUBMISSIONS ----------------- */}
        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold font-heading text-white">Received Contact Inquiries</h2>
              <p className="text-xs text-gray-400 mt-1">Inquiries submitted by users via the website contact form.</p>
            </div>

            <div className="space-y-4">
              {contacts.length === 0 ? (
                <div className="p-12 text-center text-gray-400 bg-dark-900 rounded-3xl border border-dark-800">
                  No contact messages received yet.
                </div>
              ) : (
                contacts.map(c => (
                  <div key={c._id} className="p-6 rounded-3xl bg-dark-900 border border-gold-500/20 shadow-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dark-800 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-white">{c.name}</h3>
                        <p className="text-xs text-gold-400">{c.email} {c.phone ? `| ${c.phone}` : ''} {c.company ? `| ${c.company}` : ''}</p>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 bg-dark-800 px-3 py-1 rounded-full uppercase tracking-wider">
                        Subject: {c.subject}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 whitespace-pre-wrap">{c.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>

      {/* ----------------- EDIT / CREATE MODAL ----------------- */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={`${modalAction === 'create' ? 'Add New' : 'Edit'} ${modalType.toUpperCase()}`}>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          
          {/* STAT FORM */}
          {modalType === 'stat' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Metric Value (e.g., 150+)</label>
                <input type="text" required value={statForm.value} onChange={e=>setStatForm({...statForm, value: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Label (e.g., Enterprise Projects Delivered)</label>
                <input type="text" required value={statForm.label} onChange={e=>setStatForm({...statForm, label: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Short Description</label>
                <input type="text" value={statForm.description} onChange={e=>setStatForm({...statForm, description: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
            </>
          )}

          {/* SERVICE FORM */}
          {modalType === 'service' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Title</label>
                <input type="text" required value={serviceForm.title} onChange={e=>setServiceForm({...serviceForm, title: e.target.value, slug: generateSlug(e.target.value)})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Short Description</label>
                <textarea rows={2} required value={serviceForm.shortDesc} onChange={e=>setServiceForm({...serviceForm, shortDesc: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Key Features (One per line)</label>
                <textarea rows={3} value={serviceForm.featuresText} onChange={e=>setServiceForm({...serviceForm, featuresText: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
            </>
          )}

          {/* PRODUCT FORM */}
          {modalType === 'product' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Product Name</label>
                <input type="text" required value={productForm.name} onChange={e=>setProductForm({...productForm, name: e.target.value, slug: generateSlug(e.target.value)})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Tagline</label>
                <input type="text" required value={productForm.tagline} onChange={e=>setProductForm({...productForm, tagline: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Description</label>
                <textarea rows={3} required value={productForm.description} onChange={e=>setProductForm({...productForm, description: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
            </>
          )}

          {/* PORTFOLIO FORM */}
          {modalType === 'portfolio' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Case Study Title</label>
                <input type="text" required value={portfolioForm.title} onChange={e=>setPortfolioForm({...portfolioForm, title: e.target.value, slug: generateSlug(e.target.value)})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Client Name</label>
                <input type="text" value={portfolioForm.client} onChange={e=>setPortfolioForm({...portfolioForm, client: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Description</label>
                <textarea rows={3} required value={portfolioForm.description} onChange={e=>setPortfolioForm({...portfolioForm, description: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Key Business Impact</label>
                <input type="text" value={portfolioForm.impact} onChange={e=>setPortfolioForm({...portfolioForm, impact: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
            </>
          )}

          {/* TEAM FORM WITH AVATAR IMAGE FILE UPLOAD AND ATLAS STORE */}
          {modalType === 'team' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Full Name</label>
                <input type="text" required value={teamForm.name} onChange={e=>setTeamForm({...teamForm, name: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Role / Title (e.g. CEO, CTO)</label>
                <input type="text" required value={teamForm.role} onChange={e=>setTeamForm({...teamForm, role: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              
              {/* Profile Picture Upload & Atlas Storage */}
              <div className="p-4 rounded-xl bg-dark-850 border border-gold-500/30 space-y-3">
                <label className="block text-xs font-semibold text-gold-300 uppercase">Profile Picture (Stored in MongoDB Atlas)</label>
                <div className="flex items-center gap-4">
                  {teamForm.avatar ? (
                    <img src={teamForm.avatar} alt="Preview" className="w-14 h-14 rounded-full object-cover border-2 border-gold-400 shadow-gold-glow flex-shrink-0" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-dark-950 border border-gold-500/30 flex items-center justify-center text-gold-300 font-bold text-lg flex-shrink-0">
                      {teamForm.initials || 'IMG'}
                    </div>
                  )}
                  <div className="space-y-1.5 flex-grow">
                    <span className="text-[11px] text-gray-400 block">Choose image file from computer (Auto-converts for Atlas storage):</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileUpload}
                      className="text-xs text-gray-300 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-gold-500/20 file:text-gold-300 hover:file:bg-gold-500/30"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block mb-1">Or enter direct Image URL:</span>
                  <input
                    type="text"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={teamForm.avatar}
                    onChange={e => setTeamForm({ ...teamForm, avatar: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-dark-900 border border-gold-500/20 text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Bio Description</label>
                <textarea rows={2} required value={teamForm.bio} onChange={e=>setTeamForm({...teamForm, bio: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
            </>
          )}

          {/* TESTIMONIAL FORM */}
          {modalType === 'testimonial' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Client Name</label>
                <input type="text" required value={testimonialForm.name} onChange={e=>setTestimonialForm({...testimonialForm, name: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Role & Company</label>
                <input type="text" required value={testimonialForm.role} onChange={e=>setTestimonialForm({...testimonialForm, role: e.target.value})} placeholder="e.g. VP of Technology" className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm mb-2" />
                <input type="text" required value={testimonialForm.company} onChange={e=>setTestimonialForm({...testimonialForm, company: e.target.value})} placeholder="e.g. Apex Global" className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gold-300 uppercase mb-1">Review Content</label>
                <textarea rows={3} required value={testimonialForm.content} onChange={e=>setTestimonialForm({...testimonialForm, content: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-dark-850 border border-gold-500/30 text-white text-sm" />
              </div>
            </>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-dark-800">
            <button type="button" onClick={()=>setModalOpen(false)} className="px-4 py-2 rounded-xl bg-dark-800 text-gray-300 text-xs font-semibold">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-xl bg-gold-gradient text-dark-950 text-xs font-bold uppercase tracking-widest shadow-gold-glow">
              Save Item
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default MasterAdmin;
