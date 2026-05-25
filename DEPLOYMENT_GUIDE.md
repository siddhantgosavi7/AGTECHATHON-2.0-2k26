# Complete Production Deployment Guide

## 📋 Architecture Overview

```
┌─────────────────────┐
│   Frontend (React)  │
│  Vite + Tailwind    │
│   localhost:5173    │
└──────────┬──────────┘
           │ HTTPS/API
           ▼
┌─────────────────────┐
│  Backend (Node.js)  │
│  Express + Multer   │
│  localhost:4000     │
└──────────┬──────────┘
           │ HTTPS
           ▼
┌─────────────────────┐
│  Supabase (DB)      │
│  PostgreSQL + Auth  │
│  Real-time API      │
└─────────────────────┘

┌─────────────────────────────────────────┐
│  External APIs (All from Backend)       │
│  - Google Maps API                      │
│  - Google Gemini API                    │
│  - Weather API                          │
│  - Government Schemes API               │
└─────────────────────────────────────────┘
```

## 🚀 Deployment Strategy

### Production Stack (Recommended)
```
Frontend    → Vercel (Auto-deploys on git push)
Backend     → Railway (Node.js container)
Database    → Supabase (PostgreSQL hosted)
Storage     → Railway (File uploads)
DNS         → Cloudflare (Optional: CDN + security)
```

## 📝 Step-by-Step Deployment

### Phase 1: Pre-Deployment Checklist

```bash
# 1. Environment verification
npm run lint              # Fix any lint errors
npm run build             # Test production build

# 2. Verify all API keys
cat .env | grep -E "GEMINI|MAPS|SUPABASE|JWT_SECRET"

# 3. Test locally
npm run dev:full          # Full stack test

# 4. Database migration
# - Create Supabase project
# - Run SQL schema
# - Set environment variables
```

### Phase 2: Deploy Backend (Railway)

#### 1. Create Railway Project
```bash
# Option A: Web UI
# 1. Go to railway.app
# 2. Click "New Project"
# 3. Select "Deploy from GitHub"
# 4. Connect your repository

# Option B: CLI
npm install -g @railway/cli
railway login
railway init
railway deploy
```

#### 2. Add Environment Variables in Railway
```
PORT=4000
GEMINI_API_KEY=***
GEMINI_MODEL=gemini-2.5-flash
GOOGLE_MAPS_API_KEY=***
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=***
JWT_SECRET=***
CLIENT_URL=https://your-frontend-domain.com
```

#### 3. Verify Deployment
```bash
# Railway provides a URL like: https://project-prod-abc123.railway.app
# Test health endpoint:
curl https://project-prod-abc123.railway.app/api/health

# Should return:
# {
#   "ok": true,
#   "service": "KrishiRakshak AI API",
#   "model": "gemini-2.5-flash"
# }
```

### Phase 3: Deploy Frontend (Vercel)

#### 1. Setup Vercel Project
```bash
npm install -g vercel
vercel login
vercel
```

#### 2. Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```env
VITE_API_URL=https://your-backend-domain.railway.app/api
VITE_GOOGLE_MAPS_API_KEY=***
```

#### 3. Auto-Deploy on GitHub Push
```bash
# Every push to main branch auto-deploys
git push origin main

# Vercel automatically:
# - Runs build
# - Creates preview URL
# - Deploys to production
```

### Phase 4: Setup Custom Domain (Optional)

#### 1. Frontend Domain (Vercel)
1. Go to Vercel Dashboard → Domains
2. Add your domain (e.g., app.yourdomain.com)
3. Add CNAME record to your DNS provider

#### 2. Backend Domain (Railway)
1. Go to Railway Dashboard → Project → Settings
2. Add custom domain
3. Add CNAME record to your DNS provider

## 🔒 Security Hardening

### 1. CORS Configuration
```javascript
// server/index.js
app.use(cors({
  origin: [
    'https://app.yourdomain.com',
    'https://www.yourdomain.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 2. Rate Limiting
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 3. HTTPS Enforcement
```javascript
// Use helmet for secure headers
import helmet from 'helmet';
app.use(helmet());
```

### 4. Environment Variable Protection
- ✅ Never commit `.env` to git
- ✅ Use `.env.example` as template
- ✅ Store secrets in hosting platform
- ✅ Rotate API keys monthly

### 5. Database Security
In Supabase:
1. Enable Row Level Security (RLS)
2. Create policies per table
3. Setup authentication with Google/GitHub

## 📊 Monitoring & Logging

### 1. Backend Logs (Railway)
```bash
# View logs
railway logs

# Or in Railway Dashboard → Deployments → Logs
```

### 2. Frontend Performance (Vercel)
- Vercel Dashboard → Analytics
- Core Web Vitals
- Lighthouse scores

### 3. Application Monitoring
```bash
# Add error tracking
npm install @sentry/node

# In server/index.js
import * as Sentry from "@sentry/node";
Sentry.init({
  dsn: "https://your-sentry-dsn@sentry.io/123456",
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

## 🔧 Maintenance & Updates

### Daily Tasks
- Monitor error logs
- Check API usage
- Verify database backups

### Weekly Tasks
- Review security alerts
- Check performance metrics
- Update dependencies (security patches only)

### Monthly Tasks
- Rotate API keys
- Review database storage
- Audit user access

## 📞 Troubleshooting

### 1. API Connection Issues
```bash
# Test backend endpoint
curl -i https://your-backend.railway.app/api/health

# Check CORS headers
curl -H "Origin: https://your-frontend.vercel.app" -i https://your-backend.railway.app/api/nearby
```

### 2. Database Connection Issues
```bash
# Verify Supabase credentials
echo $SUPABASE_URL
echo $SUPABASE_KEY

# Test connection
psql -h db.supabase.co -U postgres -d postgres
```

### 3. Maps Not Loading
1. Verify Google Maps API key is valid
2. Check API is enabled in Google Cloud Console
3. Verify domain is whitelisted
4. Check browser console for errors

### 4. Authentication Failing
1. Verify JWT_SECRET is set correctly
2. Check token hasn't expired
3. Verify Authorization header format: `Bearer <token>`

## 📈 Scaling for Production

### Database Scaling
- Monitor Supabase CPU/connections
- Add read replicas for high traffic
- Optimize queries with indexes

### Backend Scaling
- Railway auto-scales with load
- Set max concurrent connections
- Add caching layer (Redis)

### Frontend Performance
- Vercel Edge Network auto-scales
- Image optimization
- Code splitting
- Lazy loading

## 💰 Cost Estimation (Monthly)

| Service | Tier | Cost |
|---------|------|------|
| Vercel | Pro | $20 |
| Railway | Usage-based | $10-50 |
| Supabase | Free/Pro | $0-100 |
| Google Maps | Usage-based | $0-50 |
| Gemini API | Pay-as-you-go | $0-50 |
| **Total** | | **$30-270** |

## ✅ Post-Deployment Checklist

```
□ Frontend loads without errors
□ Backend API responds to requests
□ Maps display with locations
□ Authentication works (login/signup)
□ File uploads work
□ Disease detection works
□ Chatbot responds
□ Database saves and retrieves data
□ Error handling is in place
□ Logs are being collected
□ Performance is acceptable
□ SSL certificate is valid
□ DNS records are propagated
□ Email notifications work
□ Rate limiting is active
□ CORS is configured correctly
```

## 📚 Useful Links

- [Railway Documentation](https://railway.app/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Supabase Getting Started](https://supabase.com/docs/guides/getting-started)
- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)

## 🎯 Next Steps After Deployment

1. **Setup Monitoring**
   - Add error tracking (Sentry)
   - Setup performance monitoring
   - Configure alerts

2. **User Communication**
   - Create status page
   - Setup support email
   - Document API usage

3. **Marketing**
   - SEO optimization
   - Social media setup
   - Documentation site

4. **Continuous Improvement**
   - Gather user feedback
   - Monitor analytics
   - Plan feature updates
