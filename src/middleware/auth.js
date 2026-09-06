import { decodeToken } from '../utils/jwt.js';
export function authenticate(req, res, next) {
  const value = req.headers.authorization;
  if (!value?.startsWith('Bearer ')) return res.status(401).json({ error: 'Bearer token required' });
  try { req.user = decodeToken(value.substring(7)); next(); }
  catch { res.status(401).json({ error: 'Invalid or expired token' }); }
}