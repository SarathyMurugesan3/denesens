const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  tagline: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  fullDetails: {
    type: String,
    default: ''
  },
  features: [{
    type: String
  }],
  techStack: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['Live', 'Beta', 'Coming Soon'],
    default: 'Live'
  },
  demoUrl: {
    type: String,
    default: '#'
  },
  badge: {
    type: String,
    default: 'In-House SaaS'
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
