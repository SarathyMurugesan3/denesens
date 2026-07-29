import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';
import DenesensLogo from './DenesensLogo';
import GoldOrnament from './GoldOrnament';

export const Footer = () => {
  return (
    <footer className="relative bg-dark-950 text-gray-400 border-t border-gold-500/20 overflow-hidden">
      
      {/* Decorative Gold Top Separator Line */}
      <GoldOrnament direction="horizontal" className="my-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <DenesensLogo size="large" />
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Denesens Solutions is a luxury technology firm engineering bespoke software, high-throughput web/mobile platforms, intelligent AI engines, and enterprise SaaS products.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:text-white hover:bg-gold-500/20 hover:border-gold-500 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:text-white hover:bg-gold-500/20 hover:border-gold-500 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 hover:text-white hover:bg-gold-500/20 hover:border-gold-500 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-gold-300 transition-colors flex items-center gap-1 group">
                  <span>Home</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-300 transition-colors flex items-center gap-1 group">
                  <span>About Us</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-300 transition-colors flex items-center gap-1 group">
                  <span>Services</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold-300 transition-colors flex items-center gap-1 group">
                  <span>Products</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-gold-300 transition-colors flex items-center gap-1 group">
                  <span>Portfolio</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-300 transition-colors flex items-center gap-1 group">
                  <span>Contact</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Services Offered */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400">Offerings</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/services" className="hover:text-gold-300 transition-colors">Custom Software Dev</Link></li>
              <li><Link to="/services" className="hover:text-gold-300 transition-colors">Web & Mobile Apps</Link></li>
              <li><Link to="/services" className="hover:text-gold-300 transition-colors">AI/ML & Knowledge Platforms</Link></li>
              <li><Link to="/services" className="hover:text-gold-300 transition-colors">Cloud & Kubernetes DevOps</Link></li>
              <li><Link to="/services" className="hover:text-gold-300 transition-colors">UI/UX Design Tokens</Link></li>
              <li><Link to="/products" className="hover:text-gold-300 transition-colors">In-House SaaS Products</Link></li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400">Corporate HQ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <span>Salem, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="tel:+919629568373" className="hover:text-gold-300 transition-colors">+91 96295 68373</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="mailto:info@denesens.com" className="hover:text-gold-300 transition-colors">info@Denesens.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="https://www.Denesens.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-300 transition-colors">www.Denesens.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Copyright */}
        <div className="mt-16 pt-8 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Denesens Solutions. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-gold-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-gold-400 transition-colors cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
