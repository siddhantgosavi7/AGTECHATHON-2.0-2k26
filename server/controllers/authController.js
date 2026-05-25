/**
 * Example Authentication Controller
 * Demonstrates how to implement login/register with JWT + Supabase
 * 
 * To use this:
 * 1. Install bcrypt: npm install bcrypt
 * 2. Create users table in Supabase
 * 3. Add these routes to your API
 */

import { hashPassword, verifyPassword, createAccessToken, createRefreshToken } from '../utils/auth.js';

/**
 * Login endpoint
 * POST /api/auth/login
 * Body: { email, password }
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // TODO: Fetch user from Supabase
    // const user = await supabase.from('users').select().eq('email', email).single();
    
    // if (!user.data) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    // const isPasswordValid = await verifyPassword(password, user.data.password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    // const accessToken = createAccessToken(user.data.id);
    // const refreshToken = createRefreshToken(user.data.id);

    // res.json({
    //   accessToken,
    //   refreshToken,
    //   user: { id: user.data.id, email: user.data.email }
    // });

    // DEMO RESPONSE
    res.json({
      accessToken: 'demo-token',
      refreshToken: 'demo-refresh-token',
      user: { id: '123', email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Register endpoint
 * POST /api/auth/register
 * Body: { email, password, name }
 */
export async function register(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // TODO: Check if user exists
    // const existing = await supabase.from('users').select().eq('email', email);
    // if (existing.data.length > 0) {
    //   return res.status(409).json({ error: 'User already exists' });
    // }

    // const hashedPassword = await hashPassword(password);

    // TODO: Create user in Supabase
    // const { data: user } = await supabase
    //   .from('users')
    //   .insert([{ email, password: hashedPassword, name }])
    //   .select()
    //   .single();

    // const accessToken = createAccessToken(user.id);
    // const refreshToken = createRefreshToken(user.id);

    // res.status(201).json({
    //   accessToken,
    //   refreshToken,
    //   user: { id: user.id, email: user.email, name: user.name }
    // });

    // DEMO RESPONSE
    res.status(201).json({
      accessToken: 'demo-token',
      refreshToken: 'demo-refresh-token',
      user: { id: '123', email, name },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Refresh token endpoint
 * POST /api/auth/refresh
 * Body: { refreshToken }
 */
export async function refreshToken(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token required' });
    }

    // TODO: Verify refresh token and create new access token
    // const newAccessToken = createAccessToken(userId);
    // res.json({ accessToken: newAccessToken });

    res.json({ accessToken: 'new-demo-token' });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
}

/**
 * Logout endpoint
 * POST /api/auth/logout
 */
export async function logout(req, res) {
  // In real implementation, you might invalidate tokens
  res.json({ message: 'Logged out successfully' });
}

/**
 * Get current user (protected route)
 * GET /api/auth/me
 * Headers: Authorization: Bearer <token>
 */
export async function getCurrentUser(req, res) {
  try {
    // req.userId is set by authenticate middleware
    // TODO: Fetch full user from Supabase
    res.json({
      id: req.userId,
      email: 'user@example.com', // Get from database
      name: 'User Name',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
