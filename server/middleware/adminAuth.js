const AdminMember = require('../models/AdminMember');

const adminAuth = async (req, res, next) => {
  const adminSecret = process.env.ADMIN_SECRET || 'denesens-secret-admin';
  const requestSecret = req.headers['x-admin-secret'];

  if (!requestSecret) {
    return res.status(401).json({ success: false, error: 'Unauthorized admin access. Missing authorization header.' });
  }

  // 1. Check Master Owner Passcode
  if (requestSecret === adminSecret) {
    req.adminUser = { role: 'owner', name: 'Master Owner' };
    return next();
  }

  // 2. Check Admin Member Password in MongoDB Atlas
  try {
    const member = await AdminMember.findOne({ password: requestSecret });
    if (member) {
      req.adminUser = { role: member.role || 'editor', name: member.name, username: member.username };
      return next();
    }
  } catch (err) {
    console.warn('[adminAuth] DB member check fallback:', err.message);
  }

  // 3. Check Fallback In-Memory Admin Members
  const fallbackMembers = global.fallbackAdminMembers || [];
  const fallbackMatch = fallbackMembers.find(m => m.password === requestSecret);
  if (fallbackMatch) {
    req.adminUser = { role: fallbackMatch.role || 'editor', name: fallbackMatch.name, username: fallbackMatch.username };
    return next();
  }

  return res.status(401).json({ success: false, error: 'Unauthorized admin access. Invalid passcode or member credentials.' });
};

module.exports = adminAuth;
