import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  // ══ LOGS DE DEBUG ══
  console.log('=== verifyToken DEBUG ===');
  console.log('Authorization header:', authHeader);
  console.log('Token extrait:', token?.substring(0, 20) + '...');
  console.log('ACCESS_TOKEN_SECRET:', process.env.ACCESS_TOKEN_SECRET);
  console.log('=========================');

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('Token décodé:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verify error:', error.name, error.message);
    return res.status(401).json({ message: 'Token invalide' });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Utilisateur non authentifié' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé. Admin requis.' });
  }
  next();
};