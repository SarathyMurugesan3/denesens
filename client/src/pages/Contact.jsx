import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Send, CheckCircle2, AlertCircle, Linkedin, Twitter, Github } from 'lucide-react';
import GoldOrnament from '../components/GoldOrnament';
import { submitContactForm, fetchSettings } from '../services/api';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Custom Software Development',
    message: ''
  });

  const [settings, setSettings] = useState({
    phone: '+91 96295 68373',
    email: 'contact@denesens.com',
    address: 'Salem, Tamil Nadu, India',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    }
  });

  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  useEffect(() => {
    fetchSettings().then(res => { if (res) setSettings(res); });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await submitContactForm(formData);
      setStatus({
        loading: false,
        success: response.message || 'Thank you for contacting Denesens Solutions! Our executive team will reach out within 24 hours.',
        error: null
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: 'Custom Software Development',
        message: ''
      });
    } catch (err) {
      setStatus({
        loading: false,
        success: null,
        error: err.error || 'Unable to transmit message. Please check network connection or call us directly.'
      });
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-dark-950 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest uppercase text-gold-400">GET IN TOUCH</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
            <span className="gold-text">Let's Engineer Your Next Milestone</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Have a project in mind, need technical consulting, or wish to explore our proprietary SaaS tools? We look forward to hearing from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-dark-900 border border-gold-400/30 rounded-3xl p-8 sm:p-10 shadow-gold-glow space-y-6">
            <h2 className="text-2xl font-bold font-heading text-white gold-text">
              Direct Inquiry Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alexander Vance"
                    className="w-full bg-dark-850 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alexander@company.com"
                    className="w-full bg-dark-850 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 96295 68373"
                    className="w-full bg-dark-850 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Apex Global Corp"
                    className="w-full bg-dark-850 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-2">
                  Primary Interest / Service Area *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-dark-850 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-400"
                >
                  <option value="Custom Software Development">Custom Software Development</option>
                  <option value="Web & Mobile App Development">Web & Mobile App Development</option>
                  <option value="AI/ML & Data Solutions">AI/ML & Data Solutions</option>
                  <option value="Cloud & DevOps Infrastructure">Cloud & DevOps Infrastructure</option>
                  <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                  <option value="IT & Technology Consulting">IT & Technology Consulting</option>
                  <option value="In-House SaaS Platforms">In-House SaaS Platforms</option>
                  <option value="Other Business Inquiry">Other Business Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gold-300 mb-2">
                  Project Description & Technical Brief *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Outline your timeline, goals, and technical specs..."
                  className="w-full bg-dark-850 border border-gold-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                />
              </div>

              {status.success && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>{status.success}</span>
                </div>
              )}

              {status.error && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-dark-950 font-bold uppercase tracking-widest text-xs shadow-gold-glow flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {status.loading ? (
                  <span>TRANSMITTING INQUIRY...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>SUBMIT INQUIRY</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-dark-900 border border-gold-400/30 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold font-heading text-white">Corporate Headquarters</h3>
              
              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gold-400">Office Location</h4>
                    <p className="text-white mt-0.5">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gold-400">Direct Phone</h4>
                    <a href={`tel:${settings.phone?.replace(/\s+/g, '')}`} className="text-white hover:text-gold-300 transition-colors mt-0.5 block font-semibold">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gold-400">Email Address</h4>
                    <a href={`mailto:${settings.email}`} className="text-white hover:text-gold-300 transition-colors mt-0.5 block font-semibold">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-gold-400">Corporate Domain</h4>
                    <a href="https://www.denesens.com" target="_blank" rel="noreferrer" className="text-white hover:text-gold-300 transition-colors mt-0.5 block font-semibold">
                      www.denesens.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Connection Card */}
            <div className="p-8 rounded-3xl bg-dark-900 border border-gold-400/30 space-y-4 shadow-xl text-center">
              <h3 className="text-lg font-bold font-heading text-white">Connect With Us</h3>
              <p className="text-xs text-gray-300">Follow our technical engineering publications and updates across platforms.</p>
              <div className="flex items-center justify-center space-x-4 pt-2">
                <a href={settings.socialLinks?.linkedin || '#'} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gold-400/40 flex items-center justify-center text-gold-400 hover:text-white hover:bg-gold-500/20 transition-all shadow-gold-glow">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={settings.socialLinks?.twitter || '#'} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gold-400/40 flex items-center justify-center text-gold-400 hover:text-white hover:bg-gold-500/20 transition-all shadow-gold-glow">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href={settings.socialLinks?.github || '#'} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gold-400/40 flex items-center justify-center text-gold-400 hover:text-white hover:bg-gold-500/20 transition-all shadow-gold-glow">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
