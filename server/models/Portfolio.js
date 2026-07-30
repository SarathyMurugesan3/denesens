const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  client: { type: String, default: 'Enterprise Client' },
  description: { type: String, required: true },
  impact: { type: String, default: '' },
  image: { type: String, default: '' },
  tags: [{ type: String }],
  liveUrl: { type: String, default: '#' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
