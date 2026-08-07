const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  brandName: { type: String, default: 'DENESENS' },
  tagline: { type: String, default: 'BUILDING INTELLIGENT SOLUTIONS' },
  heroBadge: { type: String, default: 'DENESENS SOLUTIONS — LUXURY SOFTWARE ARCHITECTURE' },
  heroHeadline: { type: String, default: 'We Engineer Intelligent Software Solutions' },
  heroSubheadline: { type: String, default: 'Bridging high-end service engineering and robust in-house SaaS platforms. We build bespoke digital products, enterprise AI engines, and resilient cloud architectures.' },
  phone: { type: String, default: '+91 96295 68373' },
  email: { type: String, default: 'contact@denesens.com' },
  address: { type: String, default: 'Salem, Tamil Nadu, India' },
  logoUrl: { type: String, default: '/logo.jpg' },
  aboutTitle: { type: String, default: 'Engineering High-Performance Digital Intelligence' },
  aboutSubtitle: { type: String, default: 'Denesens Solutions is a premier corporate software architecture firm based in Salem, Tamil Nadu, India. We fuse luxury design aesthetics with robust software engineering.' },
  missionText: { type: String, default: 'To empower forward-thinking organizations with intelligent, secure, and infinitely scalable software solutions—eliminating technical friction and accelerating enterprise innovation.' },
  visionText: { type: String, default: 'To stand as the global gold standard for luxury tech engineering—recognized for combining deep artificial intelligence, resilient cloud infrastructure, and unmatched visual design polish.' },
  
  // Theme & Typography Controls
  themeBg: { type: String, default: 'white' },
  fontFamily: { type: String, default: 'outfit' },
  accentColor: { type: String, default: 'gold' },
  cardRadius: { type: String, default: 'rounded-3xl' },

  // Granular Section Colors & Fonts
  customBgColor: { type: String, default: '#FFFFFF' },
  customCardColor: { type: String, default: '#F8FAFC' },
  customTextColor: { type: String, default: '#0F172A' },
  customSubtextColor: { type: String, default: '#475569' },
  customAccentColor: { type: String, default: '#D4AF37' },
  customBorderColor: { type: String, default: '#E2E8F0' },
  customGradientStart: { type: String, default: '#F8FAFC' },
  customGradientMid: { type: String, default: '#D4AF37' },
  customGradientEnd: { type: String, default: '#B8860B' },
  headingFont: { type: String, default: 'Outfit' },
  bodyFont: { type: String, default: 'Inter' },
  fontSizeScale: { type: String, default: 'normal' },

  socialLinks: {
    linkedin: { type: String, default: 'https://linkedin.com' },
    twitter: { type: String, default: 'https://twitter.com' },
    github: { type: String, default: 'https://github.com' },
    whatsapp: { type: String, default: 'https://wa.me/919629568373' }
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
