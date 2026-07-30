const express = require('express');
const SiteSettings = require('../models/SiteSettings');
const Stat = require('../models/Stat');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

let fallbackSettings = {
  _id: 'settings-1',
  brandName: 'DENESENS',
  tagline: 'BUILDING INTELLIGENT SOLUTIONS',
  heroBadge: 'DENESENS SOLUTIONS — LUXURY SOFTWARE ARCHITECTURE',
  heroHeadline: 'We Engineer Intelligent Software Solutions',
  heroSubheadline: 'Bridging high-end service engineering and robust in-house SaaS platforms. We build bespoke digital products, enterprise AI engines, and resilient cloud architectures with obsidian precision.',
  phone: '+91 96295 68373',
  email: 'contact@denesens.com',
  address: 'Salem, Tamil Nadu, India',
  logoUrl: '/logo.jpg',
  aboutTitle: 'Engineering High-Performance Digital Intelligence',
  aboutSubtitle: 'Denesens Solutions is a premier corporate software architecture firm based in Salem, Tamil Nadu, India. We fuse luxury design aesthetics with robust software engineering.',
  missionText: 'To empower forward-thinking organizations with intelligent, secure, and infinitely scalable software solutions—eliminating technical friction and accelerating enterprise innovation.',
  visionText: 'To stand as the global gold standard for luxury tech engineering—recognized for combining deep artificial intelligence, resilient cloud infrastructure, and unmatched visual design polish.',
  socialLinks: {
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    whatsapp: 'https://wa.me/919629568373'
  }
};

let fallbackStats = [
  { _id: 'stat-1', label: 'Enterprise Projects', value: '150+', description: 'Global client architectures delivered', icon: 'Award', order: 1 },
  { _id: 'stat-2', label: 'System Uptime Guarantee', value: '99.99%', description: 'Resilient cloud infrastructure SLA', icon: 'ShieldCheck', order: 2 },
  { _id: 'stat-3', label: 'AI Inference Engines', value: '45+', description: 'Deployed models & RAG pipelines', icon: 'Cpu', order: 3 },
  { _id: 'stat-4', label: 'Client Satisfaction', value: '100%', description: 'Obsidian standards & zero-defect policy', icon: 'Users', order: 4 }
];

// GET /api/settings
router.get('/', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    if (settings) {
      return res.json({ success: true, data: settings });
    }
    return res.json({ success: true, data: fallbackSettings });
  } catch (err) {
    return res.json({ success: true, data: fallbackSettings });
  }
});

// PUT /api/settings (Admin Only)
router.put('/', adminAuth, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (settings) {
      Object.assign(settings, req.body);
      await settings.save();
    } else {
      settings = await SiteSettings.create(req.body);
    }
    fallbackSettings = { ...fallbackSettings, ...req.body };
    return res.json({ success: true, data: settings });
  } catch (err) {
    fallbackSettings = { ...fallbackSettings, ...req.body };
    return res.json({ success: true, data: fallbackSettings, fallback: true });
  }
});

// GET /api/settings/stats
router.get('/stats', async (req, res) => {
  try {
    const stats = await Stat.find().sort({ order: 1 });
    if (stats && stats.length > 0) {
      return res.json({ success: true, data: stats });
    }
    return res.json({ success: true, data: fallbackStats });
  } catch (err) {
    return res.json({ success: true, data: fallbackStats });
  }
});

// POST /api/settings/stats (Admin Only)
router.post('/stats', adminAuth, async (req, res) => {
  try {
    const newStat = await Stat.create(req.body);
    return res.status(201).json({ success: true, data: newStat });
  } catch (err) {
    const newStat = { _id: 'stat-' + Date.now(), ...req.body };
    fallbackStats.push(newStat);
    return res.status(201).json({ success: true, data: newStat, fallback: true });
  }
});

// PUT /api/settings/stats/:id (Admin Only)
router.put('/stats/:id', adminAuth, async (req, res) => {
  try {
    const updated = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updated) return res.json({ success: true, data: updated });
    
    // In-memory fallback
    const idx = fallbackStats.findIndex(s => s._id === req.params.id);
    if (idx !== -1) {
      fallbackStats[idx] = { ...fallbackStats[idx], ...req.body };
      return res.json({ success: true, data: fallbackStats[idx] });
    }
    return res.status(404).json({ success: false, error: 'Stat not found' });
  } catch (err) {
    const idx = fallbackStats.findIndex(s => s._id === req.params.id);
    if (idx !== -1) {
      fallbackStats[idx] = { ...fallbackStats[idx], ...req.body };
      return res.json({ success: true, data: fallbackStats[idx] });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/settings/stats/:id (Admin Only)
router.delete('/stats/:id', adminAuth, async (req, res) => {
  try {
    await Stat.findByIdAndDelete(req.params.id);
    fallbackStats = fallbackStats.filter(s => s._id !== req.params.id);
    return res.json({ success: true, message: 'Stat deleted successfully' });
  } catch (err) {
    fallbackStats = fallbackStats.filter(s => s._id !== req.params.id);
    return res.json({ success: true, message: 'Stat deleted successfully (fallback)' });
  }
});

module.exports = router;
