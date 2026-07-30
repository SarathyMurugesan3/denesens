const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }, // e.g. "150+", "99.9%"
  suffix: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: { type: String, default: 'Award' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Stat', statSchema);
