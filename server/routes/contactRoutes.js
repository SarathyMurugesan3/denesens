const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const ContactSubmission = require('../models/ContactSubmission');

const router = express.Router();

// Rate limiting: max 5 submissions per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many contact requests from this IP, please try again after 15 minutes.' }
});

// Configure Nodemailer Transporter
const createTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
};

const adminAuth = require('../middleware/adminAuth');

let fallbackSubmissions = [
  {
    _id: 'sub-1',
    name: 'Robert Vance',
    email: 'robert@apexcapital.com',
    phone: '+1 (555) 234-5678',
    company: 'Apex Capital',
    subject: 'AI & Data Solutions',
    message: 'We are looking to implement a custom RAG vector search engine for internal compliance audit documents.',
    createdAt: new Date()
  }
];

// GET /api/contact (Admin Only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const list = await ContactSubmission.find().sort({ createdAt: -1 });
    if (list && list.length > 0) {
      return res.json({ success: true, data: list });
    }
    return res.json({ success: true, data: fallbackSubmissions });
  } catch (err) {
    return res.json({ success: true, data: fallbackSubmissions });
  }
});

// POST /api/contact
router.post('/', contactLimiter, [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject or interest area is required'),
  body('message').trim().notEmpty().withMessage('Message content cannot be empty'),
  body('phone').optional().trim(),
  body('company').optional().trim()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, phone, company, subject, message } = req.body;

  try {
    let savedSubmission = null;
    
    // Save to Mongo if available
    try {
      const submission = new ContactSubmission({
        name,
        email,
        phone,
        company,
        subject,
        message
      });
      savedSubmission = await submission.save();
    } catch (dbErr) {
      console.warn('[Contact API] MongoDB not available, logging in memory:', dbErr.message);
      savedSubmission = {
        _id: 'in-memory-' + Date.now(),
        name,
        email,
        phone,
        company,
        subject,
        message,
        createdAt: new Date()
      };
      fallbackSubmissions.unshift(savedSubmission);
    }

    // Nodemailer notification dispatch
    const transporter = createTransporter();
    if (transporter) {
      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFICATION_EMAIL || 'info@denesens.com',
        replyTo: email,
        subject: `[Denesens Website Inquiry] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0a0a0a; color: #ffffff; padding: 20px; border-radius: 8px;">
            <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">New Contact Form Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 0; border-top: 1px solid #333;" />
            <p style="white-space: pre-wrap; font-size: 15px; color: #dddddd;">${message}</p>
          </div>
        `
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('[Nodemailer Error]:', err.message);
        } else {
          console.log('[Nodemailer Sent]:', info.response);
        }
      });
    } else {
      console.log(`[Contact Form Received] From: ${name} (${email}) | Subject: ${subject}`);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out to Denesens Solutions. Our team will contact you shortly.',
      data: savedSubmission
    });
  } catch (error) {
    console.error('Contact Submission Error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error. Please try again later.' });
  }
});

module.exports = router;
