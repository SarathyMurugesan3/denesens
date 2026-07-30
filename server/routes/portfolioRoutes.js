const express = require('express');
const Portfolio = require('../models/Portfolio');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

let fallbackPortfolio = [
  {
    _id: 'port-1',
    title: 'AuraFintech AI Intelligence Vault',
    slug: 'aurafintech-ai-vault',
    category: 'AI & Data Science',
    client: 'Global Asset Management Corp',
    description: 'Enterprise AI knowledge portal utilizing RAG vector search, processing 10M+ financial compliance reports daily with zero latency.',
    impact: 'Reduced research query speeds by 94% across 1,200 financial analysts.',
    tags: ['Python', 'FastAPI', 'Pinecone', 'React', 'TailwindCSS'],
    liveUrl: '#',
    order: 1
  },
  {
    _id: 'port-2',
    title: 'OmniCloud Kubernetes Sentinel',
    slug: 'omnicloud-k8s-sentinel',
    category: 'Cloud Infrastructure',
    client: 'Logistics SaaS Ecosystem',
    description: 'Autonomous Kubernetes cluster autoscaler and threat detection engine across hybrid cloud environments.',
    impact: 'Optimized cloud infrastructure spending by $420,000 annually.',
    tags: ['Go', 'Kubernetes', 'AWS', 'Prometheus', 'Docker'],
    liveUrl: '#',
    order: 2
  },
  {
    _id: 'port-3',
    title: 'Verve Health Telemedicine Suite',
    slug: 'verve-health-suite',
    category: 'Mobile & Web Development',
    client: 'Verve Health System',
    description: 'HIPAA-compliant cross-platform mobile ecosystem featuring real-time WebSockets consultation and automated prescription OCR.',
    impact: 'Served 250,000+ active patients with 99.99% availability.',
    tags: ['React Native', 'Node.js', 'MongoDB', 'WebRTC'],
    liveUrl: '#',
    order: 3
  }
];

// GET /api/portfolio
router.get('/', async (req, res) => {
  try {
    const items = await Portfolio.find().sort({ order: 1 });
    if (items && items.length > 0) {
      return res.json({ success: true, data: items });
    }
    return res.json({ success: true, data: fallbackPortfolio });
  } catch (err) {
    return res.json({ success: true, data: fallbackPortfolio });
  }
});

// POST /api/portfolio (Admin Only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const newItem = await Portfolio.create(req.body);
    return res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    const newItem = { _id: 'port-' + Date.now(), ...req.body };
    fallbackPortfolio.push(newItem);
    return res.status(201).json({ success: true, data: newItem, fallback: true });
  }
});

// PUT /api/portfolio/:id (Admin Only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updated = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updated) return res.json({ success: true, data: updated });

    const idx = fallbackPortfolio.findIndex(p => p._id === req.params.id);
    if (idx !== -1) {
      fallbackPortfolio[idx] = { ...fallbackPortfolio[idx], ...req.body };
      return res.json({ success: true, data: fallbackPortfolio[idx] });
    }
    return res.status(404).json({ success: false, error: 'Portfolio item not found' });
  } catch (err) {
    const idx = fallbackPortfolio.findIndex(p => p._id === req.params.id);
    if (idx !== -1) {
      fallbackPortfolio[idx] = { ...fallbackPortfolio[idx], ...req.body };
      return res.json({ success: true, data: fallbackPortfolio[idx] });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/portfolio/:id (Admin Only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    fallbackPortfolio = fallbackPortfolio.filter(p => p._id !== req.params.id);
    return res.json({ success: true, message: 'Portfolio item deleted successfully' });
  } catch (err) {
    fallbackPortfolio = fallbackPortfolio.filter(p => p._id !== req.params.id);
    return res.json({ success: true, message: 'Portfolio item deleted (fallback)' });
  }
});

module.exports = router;
