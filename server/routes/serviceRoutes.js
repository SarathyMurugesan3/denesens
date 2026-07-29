const express = require('express');
const Service = require('../models/Service');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

// Fallback seed services data
let fallbackServices = [
  {
    _id: 'srv-1',
    title: 'Custom Software Development',
    slug: 'custom-software-development',
    category: 'Development',
    shortDesc: 'Tailor-made web, backend, and enterprise software solutions engineered for high performance and scalability.',
    fullDesc: 'We architect and build end-to-end bespoke software applications customized to your enterprise workflows. From modular microservices to resilient client applications, we ensure reliability and seamless scale.',
    features: ['Microservices Architecture', 'High-throughput APIs', 'Legacy System Modernization', 'Custom Enterprise Portals'],
    icon: 'Code',
    tags: ['React', 'Node.js', 'Go', 'Microservices'],
    order: 1
  },
  {
    _id: 'srv-2',
    title: 'Web & Mobile App Development',
    slug: 'web-mobile-development',
    category: 'Development',
    shortDesc: 'Responsive, fluid web apps and native mobile applications crafted with modern frameworks.',
    fullDesc: 'Deliver exceptional cross-platform experiences on iOS, Android, and web with sub-second response times, glassmorphic dark-mode UIs, and robust offline sync.',
    features: ['Progressive Web Apps (PWA)', 'iOS & Android Native Performance', 'Cross-Platform React Native/Flutter', 'Real-time WebSockets'],
    icon: 'Smartphone',
    tags: ['React Native', 'Vite', 'TypeScript', 'TailwindCSS'],
    order: 2
  },
  {
    _id: 'srv-3',
    title: 'AI/ML & Data Solutions',
    slug: 'ai-ml-data-solutions',
    category: 'Intelligence',
    shortDesc: 'Intelligent automation, LLM integration, predictive analytics, and enterprise AI engines.',
    fullDesc: 'Embed custom artificial intelligence models into your business process. We specialize in Retrieval-Augmented Generation (RAG), neural networks, automated document vision, and real-time data pipelines.',
    features: ['Custom LLM Fine-Tuning', 'Predictive Analytics Models', 'Natural Language Processing', 'Computer Vision & OCR'],
    icon: 'Brain',
    tags: ['Python', 'PyTorch', 'LangChain', 'OpenAI API'],
    order: 3
  },
  {
    _id: 'srv-4',
    title: 'Cloud & DevOps Infrastructure',
    slug: 'cloud-devops-infrastructure',
    category: 'Infrastructure',
    shortDesc: 'Resilient cloud infrastructure, automated CI/CD pipelines, and zero-downtime Kubernetes deployments.',
    fullDesc: 'Optimize your cloud operations on AWS, GCP, or Azure. We design immutable infrastructure with automated secrets management, container orchestration, and continuous security compliance.',
    features: ['Infrastructure as Code (Terraform)', 'Kubernetes & Docker Pipelines', 'Cost Optimization & Monitoring', 'Zero-Trust Security Architecture'],
    icon: 'Cloud',
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    order: 4
  },
  {
    _id: 'srv-5',
    title: 'UI/UX & Product Design',
    slug: 'ui-ux-product-design',
    category: 'Design & Strategy',
    shortDesc: 'High-end aesthetic visual design, intuitive user flows, dark-mode design systems, and design tokens.',
    fullDesc: 'Elevate your enterprise SaaS and consumer products with luxury design aesthetics. We create interactive visual prototypes, scalable design systems, and friction-free user journeys.',
    features: ['Figma Design Tokens', 'Luxury Visual Aesthetics', 'Interactive Micro-animations', 'Accessibility Compliance (WCAG)'],
    icon: 'Palette',
    tags: ['Figma', 'UX Research', 'Design Systems', 'Framer'],
    order: 5
  },
  {
    _id: 'srv-6',
    title: 'IT & Technology Consulting',
    slug: 'it-technology-consulting',
    category: 'Design & Strategy',
    shortDesc: 'Strategic technology advisory, architecture audits, security reviews, and fractional CTO services.',
    fullDesc: 'Navigate complex technical transformations with guidance from battle-tested engineering leadership. We evaluate system bottlenecks, security postures, and technology stack selection.',
    features: ['Architecture Audits', 'Fractional CTO Support', 'Cybersecurity Healthchecks', 'Tech Stack Optimization'],
    icon: 'Compass',
    tags: ['Strategy', 'Audit', 'Security', 'Compliance'],
    order: 6
  }
];

// GET /api/services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    if (services && services.length > 0) {
      return res.json({ success: true, data: services });
    }
    return res.json({ success: true, data: fallbackServices });
  } catch (err) {
    return res.json({ success: true, data: fallbackServices });
  }
});

// GET /api/services/:slug
router.get('/:slug', async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (service) {
      return res.json({ success: true, data: service });
    }
    const fallback = fallbackServices.find(s => s.slug === req.params.slug);
    if (fallback) {
      return res.json({ success: true, data: fallback });
    }
    return res.status(404).json({ success: false, error: 'Service not found' });
  } catch (err) {
    const fallback = fallbackServices.find(s => s.slug === req.params.slug);
    if (fallback) {
      return res.json({ success: true, data: fallback });
    }
    return res.status(404).json({ success: false, error: 'Service not found' });
  }
});

// POST /api/services - Create a new service
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, slug, category, shortDesc, fullDesc, features, icon, tags, order } = req.body;
    let newService;
    try {
      newService = new Service({ title, slug, category, shortDesc, fullDesc, features, icon, tags, order: Number(order) || 0 });
      await newService.save();
    } catch (dbErr) {
      console.warn('[Service API] Database write failed, fallback to in-memory:', dbErr.message);
      newService = { 
        _id: 'srv-' + Date.now(), 
        title, 
        slug, 
        category, 
        shortDesc, 
        fullDesc, 
        features: Array.isArray(features) ? features : [], 
        icon, 
        tags: Array.isArray(tags) ? tags : [], 
        order: Number(order) || 0 
      };
      fallbackServices.push(newService);
    }
    res.status(201).json({ success: true, data: newService });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/services/:id - Update an existing service
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { title, slug, category, shortDesc, fullDesc, features, icon, tags, order } = req.body;
    const { id } = req.params;
    let updatedService;
    
    try {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        updatedService = await Service.findByIdAndUpdate(
          id,
          { title, slug, category, shortDesc, fullDesc, features, icon, tags, order: Number(order) || 0 },
          { new: true, runValidators: true }
        );
      }
    } catch (dbErr) {
      console.warn('[Service API] Database update failed, fallback to in-memory:', dbErr.message);
    }
    
    if (!updatedService) {
      const index = fallbackServices.findIndex(s => s._id === id);
      if (index !== -1) {
        fallbackServices[index] = { 
          ...fallbackServices[index], 
          title, 
          slug, 
          category, 
          shortDesc, 
          fullDesc, 
          features: Array.isArray(features) ? features : [], 
          icon, 
          tags: Array.isArray(tags) ? tags : [], 
          order: Number(order) || 0 
        };
        updatedService = fallbackServices[index];
      }
    }
    
    if (!updatedService) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    res.json({ success: true, data: updatedService });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/services/:id - Delete a service
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;
    
    try {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const result = await Service.findByIdAndDelete(id);
        if (result) deleted = true;
      }
    } catch (dbErr) {
      console.warn('[Service API] Database delete failed, fallback to in-memory:', dbErr.message);
    }
    
    const index = fallbackServices.findIndex(s => s._id === id);
    if (index !== -1) {
      fallbackServices.splice(index, 1);
      deleted = true;
    }
    
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Service not found or already deleted' });
    }
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
