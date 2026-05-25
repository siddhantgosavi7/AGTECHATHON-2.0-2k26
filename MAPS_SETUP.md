# Real-time Google Maps & Database Setup Guide

## 🚀 Step 1: Get API Keys

### Google Maps API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - Maps JavaScript API
   - Places API
   - Geolocation API
4. Create an API key (Credentials → Create Credentials → API Key)
5. Restrict it to browser applications and add your domains

### Gemini AI API
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key

## 🗄️ Step 2: Database Setup (Supabase)

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up and create new project
3. Note your Project URL and Anon Key

### Run SQL to Create Tables
In Supabase SQL Editor, run:

```sql
-- Diagnoses table
CREATE TABLE diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop TEXT NOT NULL,
  disease TEXT NOT NULL,
  severity TEXT NOT NULL,
  confidence FLOAT NOT NULL,
  date TIMESTAMP DEFAULT NOW(),
  location TEXT,
  image_url TEXT,
  user_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diagnosis_id UUID REFERENCES diagnoses(id) ON DELETE CASCADE,
  content TEXT,
  status TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chat history table
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  message TEXT NOT NULL,
  response TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_diagnoses_user ON diagnoses(user_id);
CREATE INDEX idx_diagnoses_date ON diagnoses(date);
CREATE INDEX idx_reports_diagnosis ON reports(diagnosis_id);
CREATE INDEX idx_chat_user ON chat_history(user_id);
```

## 🔐 Step 3: Environment Setup

### Backend (.env)
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=4000
CLIENT_URL=http://localhost:5173

# APIs
GEMINI_API_KEY=your-gemini-key-here
GEMINI_MODEL=gemini-2.5-flash
GOOGLE_MAPS_API_KEY=your-google-maps-key-here

# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here

# Auth
JWT_SECRET=generate-a-random-32-char-secret-key
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:4000/api
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key-here
```

## 💻 Step 4: Local Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
# Full stack (frontend + backend)
npm run dev:full

# Or separately:
npm run server      # Backend only
npm run dev         # Frontend only
```

## 🌐 Step 5: Deployment

### Option A: Vercel + Railway (Recommended)

#### Deploy Backend to Railway
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repo
3. Add environment variables
4. Deploy

#### Deploy Frontend to Vercel
```bash
npm install -g vercel
vercel
```

Update `.env.local`:
```env
VITE_API_URL=https://your-railway-backend.railway.app/api
VITE_GOOGLE_MAPS_API_KEY=your-key
```

### Option B: Heroku + Netlify

#### Backend on Heroku
```bash
heroku create your-app-name
git push heroku main
heroku config:set GOOGLE_MAPS_API_KEY=your-key
```

#### Frontend on Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

## 🗺️ Real-time Map Features

### How it Works
1. **Geolocation**: Gets user's current location (with permission)
2. **Nearby Search**: Finds fertilizer shops, experts, soil labs within 5km
3. **Real-time Markers**: Interactive map markers with instant updates
4. **Details Panel**: Shows distance, rating, opening hours, contact info

### Map Types
- **Fertilizer Stores**: Agricultural supply shops
- **Experts**: Farm consultants and agronomists
- **Soil Labs**: Soil testing centers

### Usage in Components
```jsx
import { MapComponent } from '@/components/MapComponent';

<MapComponent 
  latitude={18.5204} 
  longitude={73.8567} 
  type="fertilizer_store" 
/>
```

## 🔒 Security Best Practices

1. **API Keys**
   - Never commit `.env` to Git
   - Use `.env.example` as template
   - Rotate keys regularly
   - Restrict API usage per key

2. **Authentication**
   - Implement JWT tokens for users
   - Hash passwords with bcrypt
   - Add CORS protection
   - Validate all inputs

3. **Database**
   - Enable Supabase RLS (Row Level Security)
   - Use authenticated endpoints
   - Sanitize queries

## 📱 Features Added

✅ Real-time Google Maps integration  
✅ Geolocation support  
✅ Nearby location search  
✅ Interactive markers with distance calculation  
✅ Location details (rating, hours, phone)  
✅ Database integration with Supabase  
✅ Environment-based configuration  
✅ Responsive design  

## 🐛 Troubleshooting

### Map not loading?
- Check Google Maps API key is valid
- Verify API is enabled in Google Cloud Console
- Check CORS settings

### Geolocation permission denied?
- Ensure HTTPS on production
- Request permission before using maps
- Show permission request message

### Nearby locations not showing?
- Verify Google Places API is enabled
- Check API quota limits
- Test with different location types

### Database not connecting?
- Verify Supabase URL and keys
- Check network connectivity
- Ensure RLS policies allow access

## 📚 Additional Resources

- [Google Maps API Docs](https://developers.google.com/maps)
- [Supabase Docs](https://supabase.com/docs)
- [Railway Deployment](https://railway.app/docs)
- [Vercel Deployment](https://vercel.com/docs)
