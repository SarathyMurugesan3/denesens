const express = require('express');
const Product = require('../models/Product');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

// Fallback seed products data
let fallbackProducts = [
  {
    _id: 'prod-1',
    name: 'Denesens Intelligence Engine (DIE)',
    slug: 'intelligence-engine',
    tagline: 'Autonomous Workflow & Knowledge Orchestration Platform',
    description: 'An enterprise AI platform that ingests multi-format internal documents, connects to corporate APIs, and delivers context-aware generative insights.',
    fullDetails: 'The Denesens Intelligence Engine (DIE) combines high-throughput vector retrieval with custom LLM orchestration. Designed for zero-trust enterprise environments, DIE features end-to-end data encryption, real-time agent observability, role-based document access controls, and custom fine-tuning modules tailored for healthcare, finance, and legal compliance.',
    features: ['RAG Vector Search Engine', 'Multi-tenant Access Control', 'Custom AI Agent Builder', 'Real-Time Telemetry'],
    techStack: ['Python', 'FastAPI', 'Pinecone', 'React', 'TailwindCSS'],
    status: 'Live',
    demoUrl: '#',
    badge: 'Enterprise SaaS',
    order: 1
  },
  {
    _id: 'prod-2',
    name: 'Denesens Cloud Pulse',
    slug: 'cloud-pulse',
    tagline: 'Automated Infrastructure Performance & Cost Sentinel',
    description: 'Real-time observability and predictive cloud spend optimization platform for multi-cloud Kubernetes clusters.',
    fullDetails: 'Denesens Cloud Pulse delivers automated Kubernetes pod autoscaling, anomaly detection, and unified infrastructure metrics. Powered by eBPF kernel tracing and Prometheus metrics, Cloud Pulse monitors CPU/memory drift, prevents node starvation, and automatically suggests resource rightsizing.',
    features: ['Anomalous Spend Alerts', 'Kubernetes Pod Auto-scaler', 'Security Threat Detection', 'One-Click Compliance Reporting'],
    techStack: ['Node.js', 'Go', 'Prometheus', 'Grafana', 'MongoDB'],
    status: 'Live',
    demoUrl: '#',
    badge: 'DevOps Tooling',
    order: 2
  },
  {
    _id: 'prod-3',
    name: 'Denesens Sentinel Shield',
    slug: 'sentinel-shield',
    tagline: 'Zero-Trust API Security & Rate-Limit Middleware Suite',
    description: 'A lightweight microservices security gatekeeper offering instantaneous DDOS protection, JWT validation, and automated bot mitigation.',
    fullDetails: 'Sentinel Shield runs as a high-performance Wasm micro-proxy deployed in front of modern web services. It intercepts API traffic at sub-millisecond speeds, executing dynamic rate limiting, token validation, IP reputation checking, and SQL injection blocking.',
    features: ['Sub-millisecond Middleware Proxy', 'Dynamic IP Reputation Filtering', 'OAuth2 / OIDC Federation', 'Audit Trail Analytics'],
    techStack: ['Rust', 'Express.js', 'Redis', 'WebAssembly'],
    status: 'Beta',
    demoUrl: '#',
    badge: 'Security Suite',
    order: 3
  }
];

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ order: 1 });
    if (products && products.length > 0) {
      return res.json({ success: true, data: products });
    }
    return res.json({ success: true, data: fallbackProducts });
  } catch (err) {
    return res.json({ success: true, data: fallbackProducts });
  }
});

// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      return res.json({ success: true, data: product });
    }
    const fallback = fallbackProducts.find(p => p.slug === req.params.slug);
    if (fallback) {
      return res.json({ success: true, data: fallback });
    }
    return res.status(404).json({ success: false, error: 'Product not found' });
  } catch (err) {
    const fallback = fallbackProducts.find(p => p.slug === req.params.slug);
    if (fallback) {
      return res.json({ success: true, data: fallback });
    }
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
});

// POST /api/products - Create a new product
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, slug, tagline, description, fullDetails, features, techStack, status, demoUrl, badge, order } = req.body;
    let newProduct;
    try {
      newProduct = new Product({ name, slug, tagline, description, fullDetails, features, techStack, status, demoUrl, badge, order: Number(order) || 0 });
      await newProduct.save();
    } catch (dbErr) {
      console.warn('[Product API] Database write failed, fallback to in-memory:', dbErr.message);
      newProduct = { 
        _id: 'prod-' + Date.now(), 
        name, 
        slug, 
        tagline, 
        description, 
        fullDetails,
        features: Array.isArray(features) ? features : [], 
        techStack: Array.isArray(techStack) ? techStack : [], 
        status, 
        demoUrl, 
        badge, 
        order: Number(order) || 0 
      };
      fallbackProducts.push(newProduct);
    }
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/products/:id - Update an existing product
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, slug, tagline, description, fullDetails, features, techStack, status, demoUrl, badge, order } = req.body;
    const { id } = req.params;
    let updatedProduct;
    
    try {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        updatedProduct = await Product.findByIdAndUpdate(
          id,
          { name, slug, tagline, description, fullDetails, features, techStack, status, demoUrl, badge, order: Number(order) || 0 },
          { new: true, runValidators: true }
        );
      }
    } catch (dbErr) {
      console.warn('[Product API] Database update failed, fallback to in-memory:', dbErr.message);
    }
    
    if (!updatedProduct) {
      const index = fallbackProducts.findIndex(p => p._id === id);
      if (index !== -1) {
        fallbackProducts[index] = { 
          ...fallbackProducts[index], 
          name, 
          slug, 
          tagline, 
          description, 
          fullDetails,
          features: Array.isArray(features) ? features : [], 
          techStack: Array.isArray(techStack) ? techStack : [], 
          status, 
          demoUrl, 
          badge, 
          order: Number(order) || 0 
        };
        updatedProduct = fallbackProducts[index];
      }
    }
    
    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;
    
    try {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const result = await Product.findByIdAndDelete(id);
        if (result) deleted = true;
      }
    } catch (dbErr) {
      console.warn('[Product API] Database delete failed, fallback to in-memory:', dbErr.message);
    }
    
    const index = fallbackProducts.findIndex(p => p._id === id);
    if (index !== -1) {
      fallbackProducts.splice(index, 1);
      deleted = true;
    }
    
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Product not found or already deleted' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
