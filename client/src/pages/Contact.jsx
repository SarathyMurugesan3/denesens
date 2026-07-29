import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Send, CheckCircle2, AlertCircle, Linkedin, Twitter, Instagram } from 'lucide-react';
import GoldOrnament from '../components/GoldOrnament';
import { submitContactForm } from '../services/api';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Custom Software Development',
    message: ''
  });

  const [status, setStatus] = useState({ loading: false, success: null, error: null });

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
    <div className="pt-28 pb-20 min-h-screen bg-dark-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-widest uppercase text-gold-400">GET IN TOUCH</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
            Let's Engineer Your Next Milestone
          </h1>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
            Have a project in mind, need technical consulting, or wish to explore our proprietary SaaS tools? We look forward to hearing from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-dark-850 border border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
            <h2 className="text-2xl font-bold font-heading text-white gold-text">
              Direct Inquiry Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alexander Vance"
                    className="w-full bg-dark-900 border border-gold-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@enterprise.com"
                    className="w-full bg-dark-900 border border-gold-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 96295 68373"
                    className="w-full bg-dark-900 border border-gold-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Denesens Partner Corp"
                    className="w-full bg-dark-900 border border-gold-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Subject / Area of Interest *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-dark-900 border border-gold-500/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                >
                  <option value="Custom Software Development">Custom Software Development</option>
                  <option value="Web & Mobile App Engineering">Web & Mobile App Engineering</option>
                  <option value="AI / ML & Knowledge Engines">AI / ML & Knowledge Engines</option>
                  <option value="Cloud DevOps Infrastructure">Cloud DevOps Infrastructure</option>
                  <option value="SaaS Products Demo Request">SaaS Products Demo Request</option>
                  <option value="Technology Advisory & Consulting">Technology Advisory & Consulting</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  Detailed Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Outline your timeline, desired deliverables, and technical requirements..."
                  className="w-full bg-dark-900 border border-gold-500/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>

              {/* Status Feedback Alerts */}
              {status.success && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{status.success}</span>
                </div>
              )}

              {status.error && (
                <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 text-xs font-extrabold tracking-widest uppercase text-dark-950 bg-gold-gradient hover:bg-gold-gradient-hover rounded-xl shadow-gold-glow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{status.loading ? 'Transmitting Submission...' : 'Submit Inquiry'}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Contact Details & Embedded Google Map */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Info Box */}
            <div className="bg-dark-850 border border-gold-500/30 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold font-heading text-white">Corporate Contact Information</h3>
              
              <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-400">Phone</p>
                    <a href="tel:+919629568373" className="text-white font-semibold hover:text-gold-300 transition-colors">
                      +91 96295 68373
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-400">HQ Location</p>
                    <p className="text-white font-semibold">Salem, Tamil Nadu, India</p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0 mt-1">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase font-bold text-gray-400">Official Website</p>
                    <a href="https://www.Denesens.com" target="_blank" rel="noreferrer" className="text-gold-400 font-semibold hover:underline">
                      www.Denesens.com
                    </a>
                  </div>
                </li>
              </ul>

              {/* Social Channels */}
              <div className="pt-4 border-t border-dark-700 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Follow Our Updates</p>
                <div className="flex items-center space-x-3">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-dark-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-dark-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-dark-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map (Salem, Tamil Nadu, India) */}
            <div className="rounded-3xl overflow-hidden border border-gold-500/30 h-64 shadow-xl relative">
              <iframe
                title="Denesens Location Salem Tamil Nadu"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125026.069634731!2d78.08160352528741!3d11.653713098522336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1ccf52cba0b%3A0xee9989007068ca0e!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.9) contrast(1.2) invert(0.9)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
