const adminAuth = (req, res, next) => {
  const adminSecret = process.env.ADMIN_SECRET || 'denesens-secret-admin';
  const requestSecret = req.headers['x-admin-secret'];
  if (requestSecret === adminSecret) {
    next();
  } else {
    res.status(401).json({ success: false, error: 'Unauthorized admin access' });
  }
};

module.exports = adminAuth;
