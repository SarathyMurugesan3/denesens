const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const AdminMember = require('./models/AdminMember');
const adminAuth = require('./middleware/adminAuth');

const contactRoutes = require('./routes/contactRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const productRoutes = require('./routes/productRoutes');
const teamRoutes = require('./routes/teamRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://denesens.onrender.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || /^https?:\/\/.*\.onrender\.com$/.test(origin)) {
      return callback(null, true);
    }
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    callback(null, false);
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// In-Memory Fallback Admin Members
let fallbackAdminMembers = [
  {
    _id: 'mem-1',
    name: 'Sarathy M (Owner)',
    username: 'owner',
    password: 'ownerpassword123',
    role: 'owner',
    createdBy: 'System'
  }
];

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Denesens Solutions',
    tagline: 'Building Intelligent Solutions',
    timestamp: new Date().toISOString()
  });
});

// Admin Authentication API (Master Passcode or Member Credentials)
app.post('/api/admin/verify', async (req, res) => {
  const adminSecret = process.env.ADMIN_SECRET || 'denesens-secret-admin';
  const { password, username } = req.body;

  // 1. Master Passcode Check (Owner)
  if (password === adminSecret) {
    return res.json({
      success: true,
      user: {
        name: 'Master Owner',
        username: 'superadmin',
        role: 'owner'
      },
      message: 'Authenticated as Owner'
    });
  }

  // 2. Member Username + Password Check
  if (username) {
    try {
      const member = await AdminMember.findOne({ username: username.toLowerCase().trim() });
      if (member && member.password === password) {
        return res.json({
          success: true,
          user: {
            name: member.name,
            username: member.username,
            role: member.role || 'editor'
          },
          message: `Authenticated as ${member.role}`
        });
      }
    } catch (err) {
      console.warn('[Admin Auth] Mongo member search fallback');
    }

    // In-memory fallback check
    const match = fallbackAdminMembers.find(
      m => m.username.toLowerCase() === username.toLowerCase().trim() && m.password === password
    );
    if (match) {
      return res.json({
        success: true,
        user: {
          name: match.name,
          username: match.username,
          role: match.role || 'editor'
        },
        message: `Authenticated as ${match.role} (fallback)`
      });
    }
  }

  return res.status(401).json({ success: false, error: 'Invalid admin credentials or passcode.' });
});

// GET /api/admin/members (Owner Only)
app.get('/api/admin/members', adminAuth, async (req, res) => {
  try {
    const list = await AdminMember.find().select('-password').sort({ createdAt: -1 });
    if (list && list.length > 0) {
      return res.json({ success: true, data: list });
    }
    const safeFallback = fallbackAdminMembers.map(({ password, ...rest }) => rest);
    return res.json({ success: true, data: safeFallback });
  } catch (err) {
    const safeFallback = fallbackAdminMembers.map(({ password, ...rest }) => rest);
    return res.json({ success: true, data: safeFallback });
  }
});

// POST /api/admin/members (Owner Only: Add New Admin Member)
app.post('/api/admin/members', adminAuth, async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ success: false, error: 'Name, Username, and Password are required.' });
  }

  try {
    const existing = await AdminMember.findOne({ username: username.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Username already exists. Please choose a different username.' });
    }

    const newMember = await AdminMember.create({
      name,
      username: username.toLowerCase().trim(),
      password,
      role: 'editor',
      createdBy: 'Owner'
    });

    return res.status(201).json({
      success: true,
      data: {
        _id: newMember._id,
        name: newMember.name,
        username: newMember.username,
        role: newMember.role,
        createdAt: newMember.createdAt
      }
    });
  } catch (err) {
    const newMember = {
      _id: 'mem-' + Date.now(),
      name,
      username: username.toLowerCase().trim(),
      password,
      role: 'editor',
      createdBy: 'Owner',
      createdAt: new Date()
    };
    fallbackAdminMembers.push(newMember);
    const { password: _, ...safeMember } = newMember;
    return res.status(201).json({ success: true, data: safeMember, fallback: true });
  }
});

// DELETE /api/admin/members/:id (Owner Only: Revoke Admin Member)
app.delete('/api/admin/members/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      await AdminMember.findByIdAndDelete(id);
    }
    fallbackAdminMembers = fallbackAdminMembers.filter(m => m._id !== id);
    return res.json({ success: true, message: 'Admin member access revoked successfully.' });
  } catch (err) {
    fallbackAdminMembers = fallbackAdminMembers.filter(m => m._id !== id);
    return res.json({ success: true, message: 'Admin member access revoked (fallback).' });
  }
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Serve static client build in production
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Client-side routing catch-all
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/denesens_db';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
}).then(() => {
  console.log(`[Database] MongoDB connected successfully`);
}).catch((err) => {
  console.warn(`[Database] MongoDB connection failed (${err.message}). Operating with fallback memory store.`);
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Denesens Solutions Server running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`====================================================`);
});
