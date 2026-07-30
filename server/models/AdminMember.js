const mongoose = require('mongoose');

const adminMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['owner', 'editor'],
    default: 'editor'
  },
  createdBy: {
    type: String,
    default: 'Owner'
  }
}, { timestamps: true });

module.exports = mongoose.model('AdminMember', adminMemberSchema);
