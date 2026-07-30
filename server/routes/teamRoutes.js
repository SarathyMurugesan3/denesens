const express = require('express');
const TeamMember = require('../models/TeamMember');
const adminAuth = require('../middleware/adminAuth');
const router = express.Router();

// Fallback seed team data with high-quality executive avatar images
let fallbackTeam = [
  {
    _id: 'team-1',
    name: 'Sarathy M',
    role: 'CEO',
    bio: 'Visionary leader driving strategic growth, product expansion, and enterprise partnerships at Denesens Solutions.',
    initials: 'SM',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
    order: 1
  },
  {
    _id: 'team-2',
    name: 'Deepan S',
    role: 'CTO',
    bio: 'Chief Architect specializing in high-concurrency systems, AI integrations, and cloud infrastructure scalability.',
    initials: 'DS',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
    order: 2
  },
  {
    _id: 'team-3',
    name: 'Durai Rajan G',
    role: 'Marketing Lead',
    bio: 'Brand strategist overseeing global client acquisition, digital campaigns, and product marketing initiatives.',
    initials: 'DR',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    },
    order: 3
  }
];

// GET /api/team
router.get('/', async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ order: 1 });
    if (team && team.length > 0) {
      return res.json({ success: true, data: team });
    }
    return res.json({ success: true, data: fallbackTeam });
  } catch (err) {
    return res.json({ success: true, data: fallbackTeam });
  }
});

// POST /api/team - Create a new team member
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, role, bio, initials, avatar, socialLinks, order } = req.body;
    let newMember;
    try {
      newMember = new TeamMember({ name, role, bio, initials, avatar: avatar || '', socialLinks, order: Number(order) || 0 });
      await newMember.save();
    } catch (dbErr) {
      console.warn('[Team API] Database write failed, fallback to in-memory:', dbErr.message);
      newMember = { 
        _id: 'team-' + Date.now(), 
        name, 
        role, 
        bio, 
        initials, 
        avatar: avatar || '',
        socialLinks: socialLinks || { linkedin: '#', twitter: '#', github: '#' }, 
        order: Number(order) || 0 
      };
      fallbackTeam.push(newMember);
    }
    res.status(201).json({ success: true, data: newMember });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT /api/team/:id - Update an existing team member
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, role, bio, initials, avatar, socialLinks, order } = req.body;
    const { id } = req.params;
    let updatedMember;
    
    try {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        updatedMember = await TeamMember.findByIdAndUpdate(
          id,
          { name, role, bio, initials, avatar, socialLinks, order: Number(order) || 0 },
          { new: true, runValidators: true }
        );
      }
    } catch (dbErr) {
      console.warn('[Team API] Database update failed, fallback to in-memory:', dbErr.message);
    }
    
    if (!updatedMember) {
      const index = fallbackTeam.findIndex(t => t._id === id);
      if (index !== -1) {
        fallbackTeam[index] = { 
          ...fallbackTeam[index], 
          name, 
          role, 
          bio, 
          initials, 
          avatar: avatar !== undefined ? avatar : fallbackTeam[index].avatar,
          socialLinks: socialLinks || fallbackTeam[index].socialLinks, 
          order: Number(order) || 0 
        };
        updatedMember = fallbackTeam[index];
      }
    }
    
    if (!updatedMember) {
      return res.status(404).json({ success: false, error: 'Team member not found' });
    }
    res.json({ success: true, data: updatedMember });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE /api/team/:id - Delete a team member
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;
    
    try {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const result = await TeamMember.findByIdAndDelete(id);
        if (result) deleted = true;
      }
    } catch (dbErr) {
      console.warn('[Team API] Database delete failed, fallback to in-memory:', dbErr.message);
    }
    
    const index = fallbackTeam.findIndex(t => t._id === id);
    if (index !== -1) {
      fallbackTeam.splice(index, 1);
      deleted = true;
    }
    
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Team member not found or already deleted' });
    }
    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
