import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Hash password
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Verify password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>}
 */
export const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Create access token
 * @param {string} userId - User ID
 * @returns {string}
 */
export const createAccessToken = (userId) => {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: '24h' });
};

/**
 * Create refresh token
 * @param {string} userId - User ID
 * @returns {string}
 */
export const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: '7d' });
};
