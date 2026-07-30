import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Linkedin, Twitter, Github, ArrowUpRight } from 'lucide-react';
import DenesensLogo from './DenesensLogo';
import GoldOrnament from './GoldOrnament';
import { fetchSettings, subscribeCMSUpdate } from '../services/api';

export const Footer = () => {
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

  const loadData = () => {
    fetchSettings().then(res => { if (res) setSettings(res); });
  };

  useEffect(() => {
    loadData();
    const unsubscribe = subscribeCMSUpdate(() => {
      loadData();
    });
    return () => unsubscribe();
  }, []);

  return (
    <footer className="relative bg-white text-slate-700 border-t border-slate-200 overflow-hidden">
      
      {/* Decorative Gold Top Separator Line */}
      <GoldOrnament direction="horizontal" className="my-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <DenesensLogo size="large" />
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm">
              Denesens Solutions is a luxury technology firm engineering bespoke software, high-throughput web/mobile platforms, intelligent AI engines, and enterprise SaaS products.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href={settings.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:text-gold-700 hover:bg-gold-50 hover:border-gold-400 transition-all shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks?.twitter || 'https://twitter.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:text-gold-700 hover:bg-gold-50 hover:border-gold-400 transition-all shadow-sm"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks?.github || 'https://github.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:text-gold-700 hover:bg-gold-50 hover:border-gold-400 transition-all shadow-sm"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gold-700">Navigation</h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link to="/" className="hover:text-gold-700 transition-colors flex items-center gap-1 group">
                  <span>Home</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-600" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-700 transition-colors flex items-center gap-1 group">
                  <span>About Us</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-600" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-700 transition-colors flex items-center gap-1 group">
                  <span>Services</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-600" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold-700 transition-colors flex items-center gap-1 group">
                  <span>Products</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-600" />
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-gold-700 transition-colors flex items-center gap-1 group">
                  <span>Portfolio</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-600" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-700 transition-colors flex items-center gap-1 group">
                  <span>Contact</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-600" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Services Offered */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gold-700">Offerings</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-semibold">
              <li><Link to="/services" className="hover:text-gold-700 transition-colors">Custom Software Dev</Link></li>
              <li><Link to="/services" className="hover:text-gold-700 transition-colors">Web & Mobile Apps</Link></li>
              <li><Link to="/services" className="hover:text-gold-700 transition-colors">AI/ML & Data Platforms</Link></li>
              <li><Link to="/services" className="hover:text-gold-700 transition-colors">Cloud & Kubernetes DevOps</Link></li>
              <li><Link to="/services" className="hover:text-gold-700 transition-colors">UI/UX Product Design</Link></li>
              <li><Link to="/products" className="hover:text-gold-700 transition-colors">In-House SaaS Products</Link></li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gold-700">Corporate HQ</h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-600 shrink-0" />
                <a href={`tel:${settings.phone?.replace(/\s+/g, '')}`} className="hover:text-gold-700 transition-colors">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-600 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-gold-700 transition-colors">{settings.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gold-600 shrink-0" />
                <a href="https://www.denesens.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-700 transition-colors">www.denesens.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-4">
          <p>© {new Date().getFullYear()} Denesens Solutions. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/secret-admin" className="hover:text-gold-700 transition-colors font-bold">Secret Admin CMS</Link>
            <span className="hover:text-gold-700 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold-700 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
