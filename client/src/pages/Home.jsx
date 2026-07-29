import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Cpu, Users, Award, CheckCircle, Sparkles, MessageSquare, PhoneCall } from 'lucide-react';
import NetworkBackground from '../components/NetworkBackground';
import GoldOrnament from '../components/GoldOrnament';
import StatCounter from '../components/StatCounter';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import { fetchServices, fetchProducts, fetchTeam, submitContactForm } from '../services/api';

export const Home = () => {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [team, setTeam] = useState([]);
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

  useEffect(() => {
    fetchServices().then(res => setServices(res.slice(0, 4)));
    fetchProducts().then(res => setProducts(res.slice(0, 2)));
    fetchTeam().then(res => setTeam(res));
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
    <div className="relative min-h-screen bg-dark-900 overflow-x-hidden">
      
      {/* ----------------- 1. HERO SECTION ----------------- */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <NetworkBackground />

        {/* Reusable Decorative Side Borders */}
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-850 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-widest uppercase shadow-gold-glow"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>DENESENS SOLUTIONS — LUXURY SOFTWARE ARCHITECTURE</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading text-white tracking-tight leading-[1.1]"
          >
            We Engineer <br className="hidden sm:block" />
            <span className="gold-text">Intelligent Software Solutions</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed"
          >
            Bridging high-end service engineering and robust in-house SaaS platforms. We build bespoke digital products, enterprise AI engines, and resilient cloud architectures with obsidian precision.
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase text-dark-950 bg-gold-gradient hover:bg-gold-gradient-hover rounded-xl shadow-gold-glow-lg transition-all duration-300 active:scale-95"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase text-gold-300 bg-dark-850 hover:bg-dark-800 border border-gold-500/40 hover:border-gold-400 rounded-xl transition-all duration-300 active:scale-95"
            >
              <span>View Products</span>
              <Cpu className="w-4 h-4 text-gold-400" />
            </Link>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-gray-400 max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 py-2 px-3 bg-dark-850/50 rounded-lg border border-dark-800">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Zero-Downtime SLA</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 bg-dark-850/50 rounded-lg border border-dark-800">
              <Zap className="w-4 h-4 text-gold-400" />
              <span>Sub-second Latency</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 bg-dark-850/50 rounded-lg border border-dark-800">
              <Award className="w-4 h-4 text-gold-400" />
              <span>Luxury Quality UX</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 bg-dark-850/50 rounded-lg border border-dark-800">
              <Users className="w-4 h-4 text-gold-400" />
              <span>Dedicated Squads</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ----------------- 2. ABOUT US TEASER STRIP ----------------- */}
      <section className="py-16 bg-dark-950 border-y border-gold-500/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4">
              <span className="text-xs font-semibold tracking-widest uppercase text-gold-400">ABOUT DENESENS</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white mt-2">
                A Fusion of Innovation & Sophistication
              </h2>
            </div>

            <div className="lg:col-span-8 text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                Founded with a mission to deliver elite corporate software, Denesens Solutions empowers global enterprises and modern startups with intelligent technical capabilities. Whether crafting tailor-made cloud applications or deploying our in-house SaaS platforms, we combine high aesthetics with rock-solid engineering.
              </p>
              <div className="flex items-center gap-6 pt-2">
                <Link to="/about" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-white transition-colors">
                  <span>Learn Our Story & Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- 3. STATS & IMPACT COUNTERS ----------------- */}
      <section className="py-16 bg-dark-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="p-6 rounded-2xl bg-dark-850 border border-gold-500/20">
              <StatCounter end={45} suffix="+" />
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-2 font-semibold">Enterprise Projects</p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-850 border border-gold-500/20">
              <StatCounter end={99} suffix="%" />
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-2 font-semibold">Client Retention</p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-850 border border-gold-500/20">
              <StatCounter end={3} suffix="+" />
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-2 font-semibold">In-House SaaS Products</p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-850 border border-gold-500/20">
              <StatCounter end={24} suffix="/7" />
              <p className="text-xs uppercase tracking-widest text-gray-400 mt-2 font-semibold">System Monitoring</p>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- 4. SERVICES PREVIEW ----------------- */}
      <section className="py-20 bg-dark-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold-400">SERVICE OFFERINGS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Bespoke Software Engineering Services
            </h2>
            <p className="text-sm text-gray-400">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-dark-850 border border-gold-500/30 text-xs font-bold uppercase tracking-widest text-gold-300 hover:bg-gold-500/10 transition-colors"
            >
              <span>View All 6 Core Service Areas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ----------------- 5. PRODUCTS PREVIEW ----------------- */}
      <section className="py-20 bg-dark-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold-400">IN-HOUSE SAAS SHOWCASE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Proprietary Product Ecosystem
            </h2>
            <p className="text-sm text-gray-400">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-dark-850 border border-gold-500/30 text-xs font-bold uppercase tracking-widest text-gold-300 hover:bg-gold-500/10 transition-colors"
            >
              <span>Explore Product Suite & Request Access</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ----------------- 6. WHY CHOOSE US ----------------- */}
      <section className="py-20 bg-dark-950 border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold-400">WHY DENESENS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Built On Integrity, Agility & Precision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-8 rounded-2xl bg-dark-850 border border-gold-500/20 hover:border-gold-500/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white">Deep Expertise</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Engineers with proven experience scaling high-concurrency cloud applications and enterprise AI models.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-dark-850 border border-gold-500/20 hover:border-gold-500/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white">Agile Execution</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Rapid sprint cycles with transparent code repositories, automated testing pipelines, and daily updates.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-dark-850 border border-gold-500/20 hover:border-gold-500/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white">Total Transparency</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                No hidden costs or scope creep. Clear technical roadmaps, explicit SLA commitments, and full IP transfer.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-dark-850 border border-gold-500/20 hover:border-gold-500/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white">Dedicated Support</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Post-launch maintenance, 24/7 incident response options, and proactive security updates.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ----------------- 7. TEAM HIGHLIGHT STRIP ----------------- */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-semibold tracking-widest uppercase text-gold-400">LEADERSHIP TEAM</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Driven By Technologists & Strategists
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member._id} className="p-8 rounded-2xl bg-dark-850 border border-gold-500/20 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-gold-300 p-0.5 shadow-gold-glow">
                  <div className="w-full h-full rounded-full bg-dark-950 flex items-center justify-center text-gold-400 font-heading font-extrabold text-xl">
                    {member.initials}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">{member.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold mt-1">{member.role}</p>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ----------------- 8. QUICK CONTACT BANNER ----------------- */}
      <section className="py-20 bg-dark-950 border-t border-gold-500/20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-dark-850 via-dark-900 to-dark-950 border border-gold-500/30 p-8 sm:p-12 shadow-2xl space-y-8 relative overflow-hidden">
            
            <div className="text-center space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-gold-400">LET'S CONNECT</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                Ready to Build Something Intelligent?
              </h2>
              <p className="text-sm text-gray-400 max-w-xl mx-auto">
                Reach out to our leadership team directly for custom software quotes, SaaS demos, or technology consulting.
              </p>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  required
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  className="w-full bg-dark-900 border border-gold-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                />
                <input
                  type="email"
                  placeholder="Your Email Address *"
                  required
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full bg-dark-900 border border-gold-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  className="w-full bg-dark-900 border border-gold-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                />
                <input
                  type="text"
                  placeholder="Company / Organization"
                  value={contactData.company}
                  onChange={(e) => setContactData({ ...contactData, company: e.target.value })}
                  className="w-full bg-dark-900 border border-gold-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <select
                  value={contactData.subject}
                  onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                  className="w-full bg-dark-900 border border-gold-500/20 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-gold-500 focus:text-white"
                >
                  <option value="Custom Software Development">Custom Software Development</option>
                  <option value="Web & Mobile App Engineering">Web & Mobile App Engineering</option>
                  <option value="AI / ML & Knowledge Engines">AI / ML & Knowledge Engines</option>
                  <option value="Cloud DevOps Infrastructure">Cloud DevOps Infrastructure</option>
                  <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                  <option value="IT & Technology Consulting">IT & Technology Consulting</option>
                  <option value="SaaS Demo & Partnership Inquiry">SaaS Demo & Partnership Inquiry</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <textarea
                placeholder="Briefly describe your project requirements..."
                rows="3"
                required
                value={contactData.message}
                onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                className="w-full bg-dark-900 border border-gold-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 resize-none"
              />

              {formStatus.success && (
                <p className="text-xs text-emerald-400 bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/30 text-center font-medium">
                  ✓ {formStatus.success}
                </p>
              )}
              {formStatus.error && (
                <p className="text-xs text-rose-400 bg-rose-950/40 p-3 rounded-lg border border-rose-500/30 text-center font-medium">
                  ✕ {formStatus.error}
                </p>
              )}

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={formStatus.loading}
                  className="w-full sm:w-auto px-10 py-3.5 text-xs font-extrabold tracking-widest uppercase text-dark-950 bg-gold-gradient hover:bg-gold-gradient-hover rounded-xl shadow-gold-glow transition-all disabled:opacity-50"
                >
                  {formStatus.loading ? 'Transmitting...' : 'Send Direct Message'}
                </button>
              </div>
            </form>

          </div>
        </div>
      </section>

      {/* Detail Modals */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || ''}
      >
        {selectedService && (
          <div className="space-y-6">
            <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase">
              Category: {selectedService.category}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Key Capabilities:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.features?.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-dark-700 flex justify-end">
              <Link
                to="/contact"
                onClick={() => setSelectedService(null)}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-dark-950 bg-gold-gradient rounded-lg shadow-gold-glow"
              >
                Inquire For This Service
              </Link>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.name || ''}
      >
        {selectedProduct && (
          <div className="space-y-6">
            <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase">
              {selectedProduct.tagline}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Tech Stack & Tools:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.techStack?.map((t, i) => (
                  <span key={i} className="text-xs bg-dark-900 text-gold-300 px-3 py-1 rounded border border-gold-500/30">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-dark-700 flex justify-end">
              <Link
                to="/contact"
                onClick={() => setSelectedProduct(null)}
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-dark-950 bg-gold-gradient rounded-lg shadow-gold-glow"
              >
                Request Product Demo
              </Link>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default Home;
