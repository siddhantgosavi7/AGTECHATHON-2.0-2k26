# Authentication & API Keys Setup

## 🔐 Authentication Types Implemented

### 1. JWT Token Authentication
Used for user sessions and API access.

```javascript
// Token structure
{
  userId: "user-id",
  email: "user@example.com",
  iat: 1234567890,
  exp: 1234607890  // 24 hours
}
```

### 2. API Key Authentication (Optional)
For server-to-server communication.

## 🔑 API Keys Management

### Backend API Keys (Must be in `.env`)
```env
# Google Maps
GOOGLE_MAPS_API_KEY=AIzaSyD...

# Gemini AI
GEMINI_API_KEY=gsk_...

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars

# Database
SUPABASE_KEY=eyJhbGciOi...
```

### Frontend API Keys (Must be in `.env.local`)
```env
# Only public keys go here
VITE_GOOGLE_MAPS_API_KEY=AIzaSyD...
```

### Never Expose
❌ Gemini API Key (backend only)  
❌ Supabase secret keys  
❌ JWT Secret  
❌ Database credentials  

## 🛠️ Implementation Guide

### 1. Setup Authentication Routes

Add to `server/routes/index.js`:

```javascript
import { login, register, refreshToken, logout, getCurrentUser } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

router.post('/auth/login', login);
router.post('/auth/register', register);
router.post('/auth/refresh', refreshToken);
router.post('/auth/logout', logout);
router.get('/auth/me', authenticate, getCurrentUser);
```

### 2. Setup Database Users Table

In Supabase SQL Editor:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  avatar_url TEXT,
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

### 3. Use Authentication in API Calls

Frontend example:

```javascript
// Login
async function login(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const { accessToken, refreshToken, user } = await response.json();
  
  // Store tokens
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
  
  return user;
}

// Make authenticated requests
async function getProtectedData() {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('/api/protected-route', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.json();
}
```

### 4. Protect Routes with Middleware

```javascript
import { authenticate } from '../middleware/auth.js';

// Public route
router.get('/public', (req, res) => {
  res.json({ message: 'Public' });
});

// Protected route
router.get('/protected', authenticate, (req, res) => {
  res.json({ userId: req.userId, message: 'Protected' });
});

// Optional auth
router.get('/optional', optionalAuth, (req, res) => {
  if (req.userId) {
    res.json({ userId: req.userId });
  } else {
    res.json({ message: 'Unauthenticated user' });
  }
});
```

## 🔐 Security Best Practices

### 1. Password Security
```javascript
// DO: Hash passwords
const hashedPassword = await hashPassword(password);

// DON'T: Store plain passwords
db.save({ password: password }); // ❌ WRONG
```

### 2. Token Storage
```javascript
// DO: Store in httpOnly cookies (secure)
res.cookie('token', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000
});

// OK: Store in localStorage (simple)
localStorage.setItem('token', token);

// DON'T: Store in global variables (app restart loses it)
```

### 3. API Key Rotation
- Change keys quarterly
- Revoke old keys immediately
- Monitor API usage for suspicious activity
- Use separate keys for different environments

### 4. CORS Configuration
```javascript
// Only allow your frontend domain
app.use(cors({
  origin: ['https://yourdomain.com', 'http://localhost:3000'],
  credentials: true
}));
```

## 🔄 Token Refresh Flow

```
1. User logs in → Get access token (24h) + refresh token (7d)
2. Access token expires → Use refresh token to get new access token
3. Refresh token expires → User must login again
```

Implementation:

```javascript
// Add to API client
async function makeRequest(url, options) {
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }
  });

  // If 401, try refreshing token
  if (response.status === 401) {
    const refreshResponse = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken: localStorage.getItem('refreshToken')
      })
    });

    if (refreshResponse.ok) {
      const { accessToken } = await refreshResponse.json();
      localStorage.setItem('accessToken', accessToken);

      // Retry original request
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${accessToken}`
        }
      });
    } else {
      // Refresh failed, redirect to login
      window.location.href = '/login';
    }
  }

  return response;
}
```

## 📊 Environments

### Development
```env
# .env.local
JWT_SECRET=dev-secret-12345678901234567890123456
SUPABASE_KEY=dev-key
```

### Production
```env
# .env (production)
JWT_SECRET=$(openssl rand -base64 32)  # Generate random key
SUPABASE_KEY=prod-key-from-supabase
```

## 🧪 Test Credentials

For development testing:

```json
{
  "email": "test@example.com",
  "password": "TestPassword123!"
}
```

## ⚠️ Common Issues

### Issue: Token Always Expired
- Solution: Increase token expiration time
- Check server clock is synchronized

### Issue: Refresh Token Not Working
- Solution: Verify refresh token is stored correctly
- Check CORS is allowing credentials

### Issue: API Key Exposed
- Solution: Regenerate key immediately
- Remove from git history
- Use git-secrets to prevent future exposure

## 📚 Further Reading
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Google Cloud API Security](https://cloud.google.com/docs/authentication/getting-started)
