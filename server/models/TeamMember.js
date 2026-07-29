const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    default: ''
  },
  initials: {
    type: String,
    required: true,
    uppercase: true,
    maxLength: 3
  },
  socialLinks: {
    linkedin: { type: String, default: '#' },
    twitter: { type: String, default: '#' },
    github: { type: String, default: '#' }
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
