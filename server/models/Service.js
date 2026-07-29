const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: {
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
  category: {
    type: String,
    required: true,
    enum: ['Development', 'Intelligence', 'Infrastructure', 'Design & Strategy']
  },
  shortDesc: {
    type: String,
    required: true
  },
  fullDesc: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  icon: {
    type: String,
    default: 'Code'
  },
  tags: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
