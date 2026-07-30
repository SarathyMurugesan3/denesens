import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, PhoneCall } from 'lucide-react';
import DenesensLogo from './DenesensLogo';
import { fetchSettings, subscribeCMSUpdate } from '../services/api';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phone, setPhone] = useState('+91 96295 68373');
  const location = useLocation();

  const loadSettings = () => {
    fetchSettings().then(res => {
      if (res && res.phone) setPhone(res.phone);
    });
  };

  useEffect(() => {
    loadSettings();
    const unsubscribe = subscribeCMSUpdate(() => {
      loadSettings();
    });

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3' 
        : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center group">
          <DenesensLogo size={isScrolled ? 'small' : 'medium'} />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-xs uppercase tracking-[0.18em] font-bold transition-colors duration-300 py-1 ${
                  isActive ? 'text-gold-700' : 'text-slate-700 hover:text-gold-600'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold-400 via-gold-500 to-gold-700 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-800 hover:text-gold-700 transition-colors py-2 px-3 border border-slate-200 rounded-xl bg-slate-50 shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5 text-gold-600" />
            <span>{phone}</span>
          </a>
          <Link
            to="/contact"
            className="relative inline-flex items-center justify-center text-xs font-bold tracking-wider text-slate-950 uppercase rounded-xl group bg-gold-gradient hover:bg-gold-gradient-hover px-4 py-2.5 shadow-md transition-all duration-300 active:scale-95"
          >
            GET IN TOUCH
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-800 hover:text-gold-700 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 shadow-xl"
          >
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-bold uppercase tracking-widest px-3 py-2 rounded-xl transition-colors ${
                    location.pathname === link.path
                      ? 'bg-gold-100 text-gold-800'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold text-xs"
              >
                <PhoneCall className="w-4 h-4 text-gold-600" />
                <span>{phone}</span>
              </a>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs tracking-widest uppercase shadow-md"
              >
                GET IN TOUCH
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
