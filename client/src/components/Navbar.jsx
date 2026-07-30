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
        ? 'bg-dark-950/95 backdrop-blur-md border-b border-gold-400/30 shadow-xl py-3' 
        : 'bg-transparent py-5'
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
                className={`relative text-xs uppercase tracking-[0.18em] font-semibold transition-colors duration-300 py-1 ${
                  isActive ? 'text-gold-300 font-extrabold' : 'text-gray-200 hover:text-gold-300'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded-full"
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
            className="flex items-center gap-2 text-xs font-bold tracking-wider text-gold-400 hover:text-white transition-colors py-2 px-3 border border-gold-400/30 rounded-xl hover:border-gold-300 bg-dark-900/60 shadow-gold-glow"
          >
            <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
            <span>{phone}</span>
          </a>
          <Link
            to="/contact"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold tracking-wider text-dark-950 uppercase rounded-xl group bg-gold-gradient hover:bg-gold-gradient-hover shadow-gold-glow transition-all duration-300 active:scale-95"
          >
            <span className="relative px-4 py-2 transition-all ease-in duration-75 rounded-xl font-bold tracking-widest">
              GET IN TOUCH
            </span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-xl text-gold-400 hover:text-white hover:bg-dark-850 border border-gold-500/20 transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-950/98 border-b border-gold-400/30 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between text-xs uppercase tracking-widest py-2.5 px-4 rounded-xl border transition-all ${
                  location.pathname === link.path
                    ? 'bg-gold-500/15 border-gold-400/60 text-gold-300 font-bold'
                    : 'border-transparent text-gray-200 hover:bg-dark-850 hover:text-gold-300'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-gold-400" />
              </Link>
            ))}

            <div className="pt-4 border-t border-dark-800 space-y-3">
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 text-xs font-bold text-gold-400 py-2.5 border border-gold-400/40 rounded-xl bg-dark-900"
              >
                <PhoneCall className="w-4 h-4 text-gold-400" />
                <span>{phone}</span>
              </a>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center text-xs font-bold uppercase tracking-widest text-dark-950 bg-gold-gradient py-3 rounded-xl shadow-gold-glow"
              >
                INQUIRE NOW
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
