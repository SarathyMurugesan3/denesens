import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, Unlock, ShieldAlert, Plus, Edit, Trash2, LogOut, Check, X,
  Briefcase, Package, Users, Eye, HelpCircle, ExternalLink, RefreshCw
} from 'lucide-react';
import Modal from '../components/Modal';
import { 
  verifyAdminPasscode, 
  fetchServices, createService, updateService, deleteService,
  fetchProducts, createProduct, updateProduct, deleteProduct,
  fetchTeam, createTeamMember, updateTeamMember, deleteTeamMember
} from '../services/api';

export const MasterAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Active Tab: 'services', 'products', 'team'
  const [activeTab, setActiveTab] = useState('services');

  // Lists
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [team, setTeam] = useState([]);

  // Data Loading
  const [fetchingData, setFetchingData] = useState(false);

  // Modal controls
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('service'); // 'service', 'product', 'team'
  const [modalAction, setModalAction] = useState('create'); // 'create', 'edit'
  const [selectedId, setSelectedId] = useState(null);

  // Form states
  const [serviceForm, setServiceForm] = useState({
    title: '',
    slug: '',
    category: 'Development',
    shortDesc: '',
    fullDesc: '',
    featuresText: '',
    icon: 'Code',
    tagsText: '',
    order: 0
  });

  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    featuresText: '',
    techStackText: '',
    status: 'Live',
    demoUrl: '#',
    badge: 'Enterprise SaaS',
    order: 0
  });

  const [teamForm, setTeamForm] = useState({
    name: '',
    role: '',
    bio: '',
    initials: '',
    linkedin: '',
    twitter: '',
    github: '',
    order: 0
  });

  // Verify auth token on load
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

  const loadAllData = async () => {
    setFetchingData(true);
    try {
      const [srvData, prodData, teamData] = await Promise.all([
        fetchServices(),
        fetchProducts(),
        fetchTeam()
      ]);
      setServices(srvData);
      setProducts(prodData);
      setTeam(teamData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
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

  // Helper to auto-generate slugs
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Service form auto slug trigger
  const handleServiceTitleChange = (val) => {
    setServiceForm(prev => ({
      ...prev,
      title: val,
      slug: prev.slug === '' || prev.slug === generateSlug(prev.title) ? generateSlug(val) : prev.slug
    }));
  };

  // Product form auto slug trigger
  const handleProductNameChange = (val) => {
    setProductForm(prev => ({
      ...prev,
      name: val,
      slug: prev.slug === '' || prev.slug === generateSlug(prev.name) ? generateSlug(val) : prev.slug
    }));
  };

  // Open Create Modals
  const openCreateModal = (type) => {
    setModalType(type);
    setModalAction('create');
    setSelectedId(null);
    if (type === 'service') {
      setServiceForm({
        title: '',
        slug: '',
        category: 'Development',
        shortDesc: '',
        fullDesc: '',
        featuresText: '',
        icon: 'Code',
        tagsText: '',
        order: services.length + 1
      });
    } else if (type === 'product') {
      setProductForm({
        name: '',
        slug: '',
        tagline: '',
        description: '',
        featuresText: '',
        techStackText: '',
        status: 'Live',
        demoUrl: '#',
        badge: 'Enterprise SaaS',
        order: products.length + 1
      });
    } else if (type === 'team') {
      setTeamForm({
        name: '',
        role: '',
        bio: '',
        initials: '',
        linkedin: '',
        twitter: '',
        github: '',
        order: team.length + 1
      });
    }
    setModalOpen(true);
  };

  // Open Edit Modals
  const openEditModal = (type, item) => {
    setModalType(type);
    setModalAction('edit');
    setSelectedId(item._id);
    if (type === 'service') {
      setServiceForm({
        title: item.title || '',
        slug: item.slug || '',
        category: item.category || 'Development',
        shortDesc: item.shortDesc || '',
        fullDesc: item.fullDesc || '',
        featuresText: Array.isArray(item.features) ? item.features.join('\n') : '',
        icon: item.icon || 'Code',
        tagsText: Array.isArray(item.tags) ? item.tags.join(', ') : '',
        order: item.order || 0
      });
    } else if (type === 'product') {
      setProductForm({
        name: item.name || '',
        slug: item.slug || '',
        tagline: item.tagline || '',
        description: item.description || '',
        featuresText: Array.isArray(item.features) ? item.features.join('\n') : '',
        techStackText: Array.isArray(item.techStack) ? item.techStack.join(', ') : '',
        status: item.status || 'Live',
        demoUrl: item.demoUrl || '#',
        badge: item.badge || 'Enterprise SaaS',
        order: item.order || 0
      });
    } else if (type === 'team') {
      setTeamForm({
        name: item.name || '',
        role: item.role || '',
        bio: item.bio || '',
        initials: item.initials || '',
        linkedin: item.socialLinks?.linkedin || '',
        twitter: item.socialLinks?.twitter || '',
        github: item.socialLinks?.github || '',
        order: item.order || 0
      });
    }
    setModalOpen(true);
  };

  // Delete Action handlers
  const handleDeleteItem = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      if (type === 'service') {
        await deleteService(id);
        setServices(prev => prev.filter(item => item._id !== id));
      } else if (type === 'product') {
        await deleteProduct(id);
        setProducts(prev => prev.filter(item => item._id !== id));
      } else if (type === 'team') {
        await deleteTeamMember(id);
        setTeam(prev => prev.filter(item => item._id !== id));
      }
    } catch (err) {
      alert(`Deletion failed: ${err.message || 'Error occurred'}`);
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modalType === 'service') {
        const data = {
          ...serviceForm,
          features: serviceForm.featuresText.split('\n').map(x => x.trim()).filter(Boolean),
          tags: serviceForm.tagsText.split(',').map(x => x.trim()).filter(Boolean)
        };
        if (modalAction === 'create') {
          const res = await createService(data);
          setServices(prev => [...prev, res].sort((a, b) => a.order - b.order));
        } else {
          const res = await updateService(selectedId, data);
          setServices(prev => prev.map(item => item._id === selectedId ? res : item).sort((a, b) => a.order - b.order));
        }
      } else if (modalType === 'product') {
        const data = {
          ...productForm,
          features: productForm.featuresText.split('\n').map(x => x.trim()).filter(Boolean),
          techStack: productForm.techStackText.split(',').map(x => x.trim()).filter(Boolean)
        };
        if (modalAction === 'create') {
          const res = await createProduct(data);
          setProducts(prev => [...prev, res].sort((a, b) => a.order - b.order));
        } else {
          const res = await updateProduct(selectedId, data);
          setProducts(prev => prev.map(item => item._id === selectedId ? res : item).sort((a, b) => a.order - b.order));
        }
      } else if (modalType === 'team') {
        const data = {
          name: teamForm.name,
          role: teamForm.role,
          bio: teamForm.bio,
          initials: teamForm.initials.toUpperCase(),
          order: Number(teamForm.order) || 0,
          socialLinks: {
            linkedin: teamForm.linkedin || '#',
            twitter: teamForm.twitter || '#',
            github: teamForm.github || '#'
          }
        };
        if (modalAction === 'create') {
          const res = await createTeamMember(data);
          setTeam(prev => [...prev, res].sort((a, b) => a.order - b.order));
        } else {
          const res = await updateTeamMember(selectedId, data);
          setTeam(prev => prev.map(item => item._id === selectedId ? res : item).sort((a, b) => a.order - b.order));
        }
      }
      setModalOpen(false);
    } catch (err) {
      alert(`Save failed: ${err.message || 'Error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  // Auth Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-28 pb-10 flex flex-col items-center justify-center bg-dark-900 text-gray-200">
        <div className="w-full max-w-md p-8 rounded-3xl bg-dark-850 border border-gold-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Lock className="w-8 h-8 animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold font-heading text-white gold-text">Master Terminal</h1>
            <p className="text-xs text-gray-400">
              Authorized admin credentials required to enable real-time updates and website editing options.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-gray-400 mb-2">
                Security Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••••"
                className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-3.5 text-white text-sm outline-none transition-all placeholder:text-dark-700"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 font-bold uppercase tracking-widest text-xs py-4 rounded-xl shadow-gold-glow active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Decrypting...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen pt-28 pb-20 bg-dark-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-dark-850 border border-gold-500/20 p-6 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold tracking-widest uppercase">
              <Unlock className="w-3.5 h-3.5" />
              <span>Secure Session Established</span>
            </div>
            <h1 className="text-3xl font-extrabold font-heading text-white">Master Admin Panel</h1>
            <p className="text-xs text-gray-400">
              Manage database records for products, services, and core leadership team in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadAllData}
              disabled={fetchingData}
              className="px-4 py-2.5 text-xs font-semibold tracking-wider uppercase border border-dark-700 bg-dark-900 rounded-lg hover:border-gold-500/30 hover:text-white transition-all flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${fetchingData ? 'animate-spin' : ''}`} />
              <span>Reload Data</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 text-xs font-semibold tracking-wider uppercase border border-red-500/20 bg-red-500/5 text-red-400 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-all flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="grid grid-cols-3 gap-2 md:w-fit border border-dark-700/60 bg-dark-850 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all ${
              activeTab === 'services'
                ? 'bg-gold-gradient text-dark-950 font-bold shadow-gold-glow'
                : 'text-gray-400 hover:text-white hover:bg-dark-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">Services</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all ${
              activeTab === 'products'
                ? 'bg-gold-gradient text-dark-950 font-bold shadow-gold-glow'
                : 'text-gray-400 hover:text-white hover:bg-dark-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span className="hidden sm:inline">Products</span>
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all ${
              activeTab === 'team'
                ? 'bg-gold-gradient text-dark-950 font-bold shadow-gold-glow'
                : 'text-gray-400 hover:text-white hover:bg-dark-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Leadership</span>
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-dark-850 border border-dark-800 rounded-3xl p-6 sm:p-8 min-h-[400px]">
          {fetchingData && (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-400 space-y-2">
              <RefreshCw className="w-8 h-8 animate-spin text-gold-400" />
              <p className="text-xs uppercase tracking-widest font-semibold">Retrieving records...</p>
            </div>
          )}

          {!fetchingData && activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-gold-400" />
                  <span>Services Registry ({services.length})</span>
                </h2>
                <button
                  onClick={() => openCreateModal('service')}
                  className="bg-gold-gradient text-dark-950 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New</span>
                </button>
              </div>

              {services.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-dark-700 rounded-2xl text-gray-500 text-xs uppercase tracking-widest font-semibold">
                  No service records found in repository.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map(item => (
                    <div key={item._id} className="bg-dark-900 border border-dark-700/60 rounded-2xl p-5 hover:border-gold-500/30 transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-gold-500/10 px-2 py-0.5 rounded text-gold-400 border border-gold-500/20">
                            {item.category}
                          </span>
                          <span className="text-xs font-semibold text-gray-500">Order: {item.order}</span>
                        </div>
                        <h3 className="text-base font-bold text-white">{item.title}</h3>
                        <p className="text-xs text-gray-400 line-clamp-2">{item.shortDesc}</p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-dark-800/80 mt-4">
                        <span className="text-[10px] text-dark-700 font-mono select-all">{item._id}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal('service', item)}
                            className="p-2 border border-dark-700 hover:border-gold-400/40 text-gray-400 hover:text-gold-300 rounded-lg transition-colors"
                            title="Edit Service"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem('service', item._id)}
                            className="p-2 border border-dark-700 hover:border-red-500/40 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!fetchingData && activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Package className="w-5 h-5 text-gold-400" />
                  <span>Product Ecosystem ({products.length})</span>
                </h2>
                <button
                  onClick={() => openCreateModal('product')}
                  className="bg-gold-gradient text-dark-950 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New</span>
                </button>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-dark-700 rounded-2xl text-gray-500 text-xs uppercase tracking-widest font-semibold">
                  No product records found in database.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map(item => (
                    <div key={item._id} className="bg-dark-900 border border-dark-700/60 rounded-2xl p-6 hover:border-gold-500/30 transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <span className="text-[10px] font-bold tracking-widest uppercase bg-gold-500/10 px-2 py-0.5 rounded text-gold-400 border border-gold-500/20">
                              {item.badge}
                            </span>
                            <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${
                              item.status === 'Live' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                              item.status === 'Beta' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                              'bg-purple-500/10 border-purple-500/20 text-purple-400'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-gray-500">Order: {item.order}</span>
                        </div>
                        <h3 className="text-base font-bold text-white">{item.name}</h3>
                        <p className="text-xs text-gold-300 italic">{item.tagline}</p>
                        <p className="text-xs text-gray-400 line-clamp-3">{item.description}</p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-dark-800/80 mt-5">
                        <span className="text-[10px] text-dark-700 font-mono select-all">{item._id}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal('product', item)}
                            className="p-2 border border-dark-700 hover:border-gold-400/40 text-gray-400 hover:text-gold-300 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem('product', item._id)}
                            className="p-2 border border-dark-700 hover:border-red-500/40 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!fetchingData && activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-5 h-5 text-gold-400" />
                  <span>Leadership Registry ({team.length})</span>
                </h2>
                <button
                  onClick={() => openCreateModal('team')}
                  className="bg-gold-gradient text-dark-950 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New</span>
                </button>
              </div>

              {team.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-dark-700 rounded-2xl text-gray-500 text-xs uppercase tracking-widest font-semibold">
                  No team members found.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {team.map(item => (
                    <div key={item._id} className="bg-dark-900 border border-dark-700/60 rounded-2xl p-5 hover:border-gold-500/30 transition-all flex flex-col justify-between text-center">
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-gold-600 to-gold-300 p-0.5 shadow-gold-glow">
                          <div className="w-full h-full rounded-full bg-dark-950 flex items-center justify-center text-gold-400 font-extrabold tracking-widest">
                            {item.initials}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-white">{item.name}</h3>
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-gold-500/10 px-2 py-0.5 rounded text-gold-400 border border-gold-500/20 inline-block">
                            {item.role}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed italic line-clamp-3">"{item.bio}"</p>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-dark-800/80 mt-5">
                        <span className="text-[10px] text-dark-700 font-mono select-all">{item._id}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal('team', item)}
                            className="p-2 border border-dark-700 hover:border-gold-400/40 text-gray-400 hover:text-gold-300 rounded-lg transition-colors"
                            title="Edit Team Member"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem('team', item._id)}
                            className="p-2 border border-dark-700 hover:border-red-500/40 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
                            title="Delete Team Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Editor Modal Overlay */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${modalAction === 'create' ? 'Create' : 'Edit'} ${
          modalType === 'service' ? 'Service Profile' :
          modalType === 'product' ? 'Product Profile' : 'Leader Profile'
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {modalType === 'service' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Service Title</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.title}
                    onChange={(e) => handleServiceTitleChange(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Unique Slug (URL component)</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.slug}
                    onChange={(e) => setServiceForm(p => ({ ...p, slug: generateSlug(e.target.value) }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Category</label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-3 py-2.5 text-white text-sm outline-none transition-all"
                  >
                    <option value="Development">Development</option>
                    <option value="Intelligence">Intelligence</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Design & Strategy">Design & Strategy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Lucide Icon name</label>
                  <input
                    type="text"
                    value={serviceForm.icon}
                    onChange={(e) => setServiceForm(p => ({ ...p, icon: e.target.value }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">List Order</label>
                  <input
                    type="number"
                    value={serviceForm.order}
                    onChange={(e) => setServiceForm(p => ({ ...p, order: Number(e.target.value) }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Short Description</label>
                <input
                  type="text"
                  required
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm(p => ({ ...p, shortDesc: e.target.value }))}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Full Description</label>
                <textarea
                  rows={4}
                  required
                  value={serviceForm.fullDesc}
                  onChange={(e) => setServiceForm(p => ({ ...p, fullDesc: e.target.value }))}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">
                  Features & Modules (one per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g.&#10;Microservices Architecture&#10;High-throughput APIs"
                  value={serviceForm.featuresText}
                  onChange={(e) => setServiceForm(p => ({ ...p, featuresText: e.target.value }))}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all placeholder:text-dark-700"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Node.js, Microservices"
                  value={serviceForm.tagsText}
                  onChange={(e) => setServiceForm(p => ({ ...p, tagsText: e.target.value }))}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all placeholder:text-dark-700"
                />
              </div>
            </>
          )}

          {modalType === 'product' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Product Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => handleProductNameChange(e.target.value)}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Unique Slug (URL component)</label>
                  <input
                    type="text"
                    required
                    value={productForm.slug}
                    onChange={(e) => setProductForm(p => ({ ...p, slug: generateSlug(e.target.value) }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Badge Title</label>
                  <input
                    type="text"
                    required
                    value={productForm.badge}
                    onChange={(e) => setProductForm(p => ({ ...p, badge: e.target.value }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Status</label>
                  <select
                    value={productForm.status}
                    onChange={(e) => setProductForm(p => ({ ...p, status: e.target.value }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-3 py-2.5 text-white text-sm outline-none transition-all"
                  >
                    <option value="Live">Live</option>
                    <option value="Beta">Beta</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Order</label>
                  <input
                    type="number"
                    value={productForm.order}
                    onChange={(e) => setProductForm(p => ({ ...p, order: Number(e.target.value) }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Tagline</label>
                  <input
                    type="text"
                    required
                    value={productForm.tagline}
                    onChange={(e) => setProductForm(p => ({ ...p, tagline: e.target.value }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Demo URL</label>
                  <input
                    type="text"
                    required
                    value={productForm.demoUrl}
                    onChange={(e) => setProductForm(p => ({ ...p, demoUrl: e.target.value }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Description</label>
                <textarea
                  rows={4}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm(p => ({ ...p, description: e.target.value }))}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">
                  Capabilities & Features (one per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g.&#10;RAG Vector Search Engine&#10;Multi-tenant Access Control"
                  value={productForm.featuresText}
                  onChange={(e) => setProductForm(p => ({ ...p, featuresText: e.target.value }))}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all placeholder:text-dark-700"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Node.js, Rust, Redis"
                  value={productForm.techStackText}
                  onChange={(e) => setProductForm(p => ({ ...p, techStackText: e.target.value }))}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all placeholder:text-dark-700"
                />
              </div>
            </>
          )}

          {modalType === 'team' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Full Name</label>
                  <input
                    type="text"
                    required
                    value={teamForm.name}
                    onChange={(e) => setTeamForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Initials (max 3 chars)</label>
                  <input
                    type="text"
                    required
                    maxLength={3}
                    placeholder="DS"
                    value={teamForm.initials}
                    onChange={(e) => setTeamForm(p => ({ ...p, initials: e.target.value.toUpperCase() }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Role / Title</label>
                  <input
                    type="text"
                    required
                    value={teamForm.role}
                    onChange={(e) => setTeamForm(p => ({ ...p, role: e.target.value }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">List Order</label>
                  <input
                    type="number"
                    value={teamForm.order}
                    onChange={(e) => setTeamForm(p => ({ ...p, order: Number(e.target.value) }))}
                    className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1 font-semibold">Short Bio / Quote</label>
                <textarea
                  rows={3}
                  required
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm(p => ({ ...p, bio: e.target.value }))}
                  className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-4 py-2.5 text-white text-sm outline-none transition-all"
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Social Network Links</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 mb-0.5">LinkedIn</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={teamForm.linkedin}
                      onChange={(e) => setTeamForm(p => ({ ...p, linkedin: e.target.value }))}
                      className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-3 py-2 text-white text-xs outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 mb-0.5">Twitter / X</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={teamForm.twitter}
                      onChange={(e) => setTeamForm(p => ({ ...p, twitter: e.target.value }))}
                      className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-3 py-2 text-white text-xs outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase text-gray-400 mb-0.5">GitHub</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={teamForm.github}
                      onChange={(e) => setTeamForm(p => ({ ...p, github: e.target.value }))}
                      className="w-full bg-dark-900 border border-dark-700 focus:border-gold-500 rounded-xl px-3 py-2 text-white text-xs outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-dark-700 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-dark-700 text-gray-400 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-gold-glow"
            >
              {loading ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MasterAdmin;
