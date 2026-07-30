const express = require('express');
const Testimonial = require('../models/Testimonial');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

let fallbackTestimonials = [
  {
    _id: 'test-1',
    name: 'Alexander Sterling',
    role: 'VP of Technology',
    company: 'Apex Global Capital',
    content: 'Denesens Solutions re-architected our core AI compliance infrastructure with precision. Their attention to security, zero-downtime deployment, and obsidian visual polish is truly unmatched.',
    rating: 5,
    order: 1
  },
  {
    _id: 'test-2',
    name: 'Elena Rostova',
    role: 'Head of Product Engineering',
    company: 'Vanguard SaaS Labs',
    content: 'Working with Denesens on our Cloud Pulse observability suite saved us months of engineering time. They deliver true enterprise-grade software architecture on tight deadlines.',
    rating: 5,
    order: 2
  },
  {
    _id: 'test-3',
    name: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'Aura Logistics',
    content: 'The custom software solution built by Denesens transformed our multi-tenant operations. Their team combines high-end design aesthetics with robust microservice scalability.',
    rating: 5,
    order: 3
  }
];

// GET /api/testimonials
router.get('/', async (req, res) => {
  try {
    const items = await Testimonial.find().sort({ order: 1 });
    if (items && items.length > 0) {
      return res.json({ success: true, data: items });
    }
    return res.json({ success: true, data: fallbackTestimonials });
  } catch (err) {
    return res.json({ success: true, data: fallbackTestimonials });
  }
});

// POST /api/testimonials (Admin Only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const newItem = await Testimonial.create(req.body);
    return res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    const newItem = { _id: 'test-' + Date.now(), ...req.body };
    fallbackTestimonials.push(newItem);
    return res.status(201).json({ success: true, data: newItem, fallback: true });
  }
});

// PUT /api/testimonials/:id (Admin Only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updated) return res.json({ success: true, data: updated });

    const idx = fallbackTestimonials.findIndex(t => t._id === req.params.id);
    if (idx !== -1) {
      fallbackTestimonials[idx] = { ...fallbackTestimonials[idx], ...req.body };
      return res.json({ success: true, data: fallbackTestimonials[idx] });
    }
    return res.status(404).json({ success: false, error: 'Testimonial not found' });
  } catch (err) {
    const idx = fallbackTestimonials.findIndex(t => t._id === req.params.id);
    if (idx !== -1) {
      fallbackTestimonials[idx] = { ...fallbackTestimonials[idx], ...req.body };
      return res.json({ success: true, data: fallbackTestimonials[idx] });
    }
    return res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/testimonials/:id (Admin Only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    fallbackTestimonials = fallbackTestimonials.filter(t => t._id !== req.params.id);
    return res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (err) {
    fallbackTestimonials = fallbackTestimonials.filter(t => t._id !== req.params.id);
    return res.json({ success: true, message: 'Testimonial deleted (fallback)' });
  }
});

module.exports = router;
