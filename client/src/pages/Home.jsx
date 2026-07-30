import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Cpu, Users, Award, CheckCircle, Sparkles, Star, PhoneCall } from 'lucide-react';
import NetworkBackground from '../components/NetworkBackground';
import GoldOrnament from '../components/GoldOrnament';
import StatCounter from '../components/StatCounter';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import { 
  fetchSettings, fetchStats, fetchServices, fetchProducts, fetchPortfolio, fetchTestimonials, submitContactForm, subscribeCMSUpdate 
} from '../services/api';

export const Home = () => {
  const [settings, setSettings] = useState({
    heroBadge: 'DENESENS SOLUTIONS — LUXURY SOFTWARE ARCHITECTURE',
    heroHeadline: 'We Engineer Intelligent Software Solutions',
    heroSubheadline: 'Bridging high-end service engineering and robust in-house SaaS platforms. We build bespoke digital products, enterprise AI engines, and resilient cloud architectures.'
  });
  const [stats, setStats] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Quick contact form state
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Custom Software Development',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ loading: false, success: null, error: null });

  const loadData = () => {
    fetchSettings().then(res => { if (res) setSettings(res); });
    fetchStats().then(res => setStats(res));
    fetchServices().then(res => setServices(res.slice(0, 4)));
    fetchProducts().then(res => setProducts(res.slice(0, 2)));
    fetchPortfolio().then(res => setPortfolio(res.slice(0, 3)));
    fetchTestimonials().then(res => setTestimonials(res));
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeCMSUpdate(() => {
      loadData();
    });
    return () => unsubscribe();
  }, []);

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: null, error: null });
    try {
      const res = await submitContactForm(contactData);
      setFormStatus({ loading: false, success: res.message || 'Inquiry received!', error: null });
      setContactData({ name: '', email: '', phone: '', company: '', subject: 'Custom Software Development', message: '' });
    } catch (err) {
      setFormStatus({ loading: false, success: null, error: err.error || 'Failed to submit.' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-slate-800 overflow-x-hidden">
      
      {/* ----------------- 1. HERO SECTION ----------------- */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <NetworkBackground />

        {/* Decorative Side Gold Ornaments */}
        <div className="absolute left-6 top-1/3 z-10 hidden xl:block">
          <GoldOrnament direction="vertical" />
        </div>
        <div className="absolute right-6 top-1/3 z-10 hidden xl:block">
          <GoldOrnament direction="vertical" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold-100 border border-gold-400/50 text-gold-800 text-xs font-extrabold tracking-widest uppercase shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>{settings.heroBadge}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-slate-900 tracking-tight leading-[1.1]"
          >
            <span className="gold-text">{settings.heroHeadline}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            {settings.heroSubheadline}
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase text-slate-950 bg-gold-gradient hover:bg-gold-gradient-hover rounded-xl shadow-md transition-all duration-300 active:scale-95"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-all duration-300 active:scale-95 shadow-sm"
            >
              <span>View Products</span>
              <Cpu className="w-4 h-4 text-gold-600" />
            </Link>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold text-slate-700 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 py-3 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-gold-600" />
              <span>Zero-Downtime SLA</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-3 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <Zap className="w-4 h-4 text-gold-600" />
              <span>Sub-second Latency</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-3 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <Award className="w-4 h-4 text-gold-600" />
              <span>Luxury Quality UX</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-3 px-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <Users className="w-4 h-4 text-gold-600" />
              <span>Dedicated Squads</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ----------------- 2. ABOUT US STRIP ----------------- */}
      <section className="py-16 bg-slate-50 border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4">
              <span className="text-xs font-bold tracking-widest uppercase text-gold-700">ABOUT DENESENS</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 mt-2">
                A Fusion of Innovation & Sophistication
              </h2>
            </div>

            <div className="lg:col-span-8 text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-medium">
              <p>
                {settings.aboutSubtitle || 'Founded with a mission to deliver elite corporate software, Denesens Solutions empowers global enterprises and modern startups with intelligent technical capabilities.'}
              </p>
              <div className="flex items-center gap-6 pt-2">
                <Link to="/about" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700 hover:text-slate-900 transition-colors">
                  <span>Learn Our Story & Executive Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- 3. STATS COUNTERS ----------------- */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => {
              const numVal = parseInt(stat.value) || 0;
              const textSuffix = stat.value.replace(/^[0-9]+/, '') || stat.suffix || '';
              return (
                <div key={stat._id || idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-card">
                  {numVal > 0 ? (
                    <StatCounter end={numVal} suffix={textSuffix} />
                  ) : (
                    <span className="font-heading font-extrabold text-3xl sm:text-4xl text-gold-700">{stat.value}</span>
                  )}
                  <p className="text-xs uppercase tracking-widest text-slate-900 mt-2 font-bold">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- 4. SERVICES PREVIEW ----------------- */}
      <section className="py-20 bg-slate-50 border-t border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest uppercase text-gold-700">SERVICE OFFERINGS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Bespoke Software Engineering Services
            </h2>
            <p className="text-sm text-slate-600">
              Tailored development designed specifically for complex enterprise workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} onSelect={setSelectedService} />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-xs font-bold uppercase tracking-widest text-slate-900 hover:bg-slate-100 transition-colors shadow-sm"
            >
              <span>View All Core Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ----------------- 5. PRODUCTS PREVIEW ----------------- */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest uppercase text-gold-700">IN-HOUSE SAAS SHOWCASE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
              Proprietary SaaS Ecosystem
            </h2>
            <p className="text-sm text-slate-600">
              Turnkey software platforms developed in-house to supercharge operations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} onSelect={setSelectedProduct} />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-xs font-bold uppercase tracking-widest text-slate-900 hover:bg-slate-100 transition-colors shadow-sm"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ----------------- 6. TESTIMONIALS SECTION ----------------- */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-slate-50 border-t border-slate-200 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="text-xs font-bold tracking-widest uppercase text-gold-700">CLIENT REVIEWS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900">
                Trusted by Enterprise Leaders
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map(t => (
                <div key={t._id} className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-card relative">
                  <div className="flex text-gold-500 gap-1">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{t.content}"
                  </p>
                  <div className="pt-4 border-t border-slate-100">
                    <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                    <p className="text-xs text-gold-700 font-bold">{t.role} — {t.company}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ----------------- 7. QUICK INQUIRY FORM ----------------- */}
      <section className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-luxury space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-gold-700">CONNECT WITH OUR ARCHITECTS</span>
              <h2 className="text-3xl font-extrabold font-heading text-slate-900">Initiate a Project Consultation</h2>
              <p className="text-xs text-slate-600 font-medium">Tell us about your technical goals and our principal engineers will respond within 24 hours.</p>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-gold-500 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Corporate Email</label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-gold-500 text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Project Brief & Details</label>
                <textarea
                  rows={4}
                  required
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  placeholder="Describe your software, AI, or cloud infrastructure requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-gold-500 text-sm font-medium"
                />
              </div>

              {formStatus.success && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{formStatus.success}</span>
                </div>
              )}

              {formStatus.error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                  {formStatus.error}
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus.loading}
                className="w-full py-4 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-slate-950 font-bold uppercase tracking-widest text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                {formStatus.loading ? 'TRANSMITTING...' : 'SUBMIT INQUIRY'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)} title={selectedService.title}>
          <div className="space-y-4 text-slate-700">
            <p className="text-sm leading-relaxed">{selectedService.fullDesc || selectedService.shortDesc}</p>
            {selectedService.features && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold-700">Core Features</h4>
                <ul className="grid grid-cols-1 gap-2 text-xs">
                  {selectedService.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} title={selectedProduct.name}>
          <div className="space-y-4 text-slate-700">
            <p className="text-xs text-gold-700 font-semibold italic">{selectedProduct.tagline}</p>
            <p className="text-sm leading-relaxed">{selectedProduct.description}</p>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default Home;
