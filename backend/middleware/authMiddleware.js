const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token nije osiguran!' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'tajni_kljuc', (err, user) => {
    if (err) return res.status(403).json({ message: 'Neispravan token!' });

    req.user = user;
    next();
  });
};

const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Nemate dopuštenje za pristup.' });
    }
    next();
  };
};

module.exports = { verifyToken, allowRoles };
