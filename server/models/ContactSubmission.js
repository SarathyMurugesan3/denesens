const mongoose = require('mongoose');

const ContactSubmissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  company: {
    type: String,
    trim: true,
    default: ''
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['NEW', 'IN_PROGRESS', 'RESOLVED'],
    default: 'NEW'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ContactSubmission', ContactSubmissionSchema);
