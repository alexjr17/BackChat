const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    // Save the decoded token information to the request object
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

module.exports = authMiddleware;
