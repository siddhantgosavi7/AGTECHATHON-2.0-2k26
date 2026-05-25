import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Middleware to verify JWT tokens
 * Usage: router.get('/protected', authenticate, handler)
 */
export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, env.jwtSecret);
    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(401).json({ error: 'Invalid token' });
  }
};

/**
 * Generate JWT token for user
 * @param {string} userId - User ID
 * @param {object} userData - Additional user data
 * @returns {string} JWT token
 */
export const generateToken = (userId, userData = {}) => {
  return jwt.sign(
    {
      userId,
      ...userData,
    },
    env.jwtSecret,
    { expiresIn: '7d' } // Token valid for 7 days
  );
};

/**
 * Verify a token without middleware
 * @param {string} token - JWT token
 * @returns {object|null} Decoded token or null if invalid
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch {
    return null;
  }
};

/**
 * Optional authentication - doesn't fail if no token
 */
export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, env.jwtSecret);
      req.userId = decoded.userId;
      req.user = decoded;
    }
  } catch {
    // Silently continue
  }
  next();
};
