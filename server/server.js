const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const contactRoutes = require('./routes/contactRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const productRoutes = require('./routes/productRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow same-origin requests (no origin header), allowed origins, or *.onrender.com
    if (!origin || allowedOrigins.includes(origin) || (origin && origin.endsWith('.onrender.com'))) {
      callback(null, true);
    } else if (process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Denesens Solutions',
    tagline: 'Building Intelligent Solutions',
    timestamp: new Date().toISOString()
  });
});

// Admin Verification API
app.post('/api/admin/verify', (req, res) => {
  const adminSecret = process.env.ADMIN_SECRET || 'denesens-secret-admin';
  const { password } = req.body;
  if (password === adminSecret) {
    return res.json({ success: true, message: 'Authenticated successfully' });
  }
  return res.status(401).json({ success: false, error: 'Invalid admin passcode' });
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/products', productRoutes);
app.use('/api/team', teamRoutes);

// Serve static client build in production
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Client-side routing catch-all (must be after API routes and error handler)
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

