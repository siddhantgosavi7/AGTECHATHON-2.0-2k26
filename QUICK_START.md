# 🚀 Quick Start Guide

## 5-Minute Setup

### 1. Get Your API Keys (5 min)
```bash
# Google Maps API Key
# 1. Go to https://console.cloud.google.com
# 2. Create new project
# 3. Enable "Maps JavaScript API" and "Places API"
# 4. Create API Key from Credentials
# 5. Copy the key

# Gemini API Key
# 1. Go to https://aistudio.google.com/app/apikey
# 2. Click "Create API Key"
# 3. Copy the key
```

### 2. Setup Environment Files (2 min)
```bash
# Backend environment
cat > .env << EOF
PORT=4000
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=<your-gemini-key>
GEMINI_MODEL=gemini-2.5-flash
GOOGLE_MAPS_API_KEY=<your-maps-key>
JWT_SECRET=$(openssl rand -base64 32)
EOF

# Frontend environment
cat > .env.local << EOF
VITE_API_URL=http://localhost:4000/api
VITE_GOOGLE_MAPS_API_KEY=<your-maps-key>
EOF
```

### 3. Install & Run (2 min)
```bash
npm install
npm run dev:full
```

**That's it!** Open http://localhost:5173

---

## 📍 Features Quick Access

### 🗺️ Maps Page
- Real-time location detection
- Find nearby fertilizer shops, experts, soil labs
- View ratings, hours, distances
- Click markers for details

**Live at:** http://localhost:5173/schemes

### 🤖 AI Chatbot
- Ask agriculture questions
- Get instant responses in your language
- English, Hindi, Marathi supported

**Live at:** http://localhost:5173/chatbot

### 📸 Disease Detection
- Upload crop image
- Get disease prediction
- View confidence score & treatment

**Live at:** http://localhost:5173/detection

### 📊 Dashboard
- Scan history
- Risk analysis
- Weather alerts

**Live at:** http://localhost:5173/dashboard

---

## 🔧 Common Commands

```bash
# Start full development stack
npm run dev:full

# Start backend only
npm run server

# Start frontend only (port 5173)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

---

## 📁 Project Structure

```
├── server/           # Backend (Node.js/Express)
│   ├── controllers/  # API logic
│   ├── services/     # Business logic
│   ├── routes/       # API endpoints
│   └── middleware/   # Auth, validation
│
├── src/              # Frontend (React)
│   ├── pages/        # App pages
│   ├── components/   # Reusable UI
│   ├── services/     # API calls
│   └── context/      # Global state
```

---

## 🚨 Troubleshooting

### Maps not showing?
```bash
# Check API key is valid
echo $GOOGLE_MAPS_API_KEY

# Verify API is enabled in Google Cloud Console
# Check browser console (F12) for errors
```

### Backend not responding?
```bash
# Check if running
curl http://localhost:4000/api/health

# Check logs
npm run server        # Look for error messages
```

### Frontend not loading?
```bash
# Clear cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

### Database needed later?

Create Supabase account when ready:
1. Sign up at supabase.com
2. Create project
3. Run SQL from MAPS_SETUP.md
4. Add keys to .env

---

## 📚 Full Documentation

- **Maps Integration:** See `MAPS_SETUP.md`
- **Authentication:** See `AUTH_SETUP.md`
- **Production Deployment:** See `DEPLOYMENT_GUIDE.md`
- **Implementation Details:** See `IMPLEMENTATION_SUMMARY.md`

---

## ⚡ API Endpoints

```bash
# Public endpoints
GET  /api/health                                    # Server status
GET  /api/government-schemes                       # Schemes & experts
GET  /api/weather-risk?location=Pune               # Weather alerts

# Maps endpoints
GET  /api/nearby?latitude=18.52&longitude=73.85&type=fertilizer_store
GET  /api/place-details?placeId=ChIJrz...

# Protected endpoints (need JWT token)
POST /api/detect-disease                           # Upload image
GET  /api/history                                  # Scan history
POST /api/chatbot                                  # Chat message

# Demo endpoints (no backend required)
/    Landing page
/detection     Disease detection demo
/chatbot       Chat interface
/dashboard     Analytics dashboard
```

---

## 🎯 What's Included

✅ Real-time Google Maps with nearby locations  
✅ AI disease detection with Gemini  
✅ Multi-language chatbot (EN/HI/MR)  
✅ Weather risk alerts  
✅ Government schemes database  
✅ Authentication ready  
✅ Database integration (Supabase)  
✅ Dark mode support  
✅ Mobile responsive  
✅ Production ready  

---

## 🔐 Security Notes

- API keys stored in `.env` (never committed to git)
- JWT tokens for authentication
- CORS protection enabled
- Rate limiting ready
- Input validation in place

---

## 💡 Next Steps

1. **Test locally** (right now!)
   ```bash
   npm run dev:full
   ```

2. **Explore features** at http://localhost:5173

3. **When ready to deploy:**
   - Follow `DEPLOYMENT_GUIDE.md`
   - Deploy to Vercel (frontend) + Railway (backend)

4. **Need database?**
   - Follow `MAPS_SETUP.md`
   - Setup Supabase project

5. **Add authentication?**
   - Follow `AUTH_SETUP.md`
   - Uncomment auth code in controllers

---

## 📞 Support

**Issue?** Check the troubleshooting section above or review:
- `.env` file is properly filled
- All API keys are valid
- Backend port 4000 is free
- Frontend port 5173 is free

**API Key trouble?**
- Google Maps: console.cloud.google.com/apis
- Gemini: aistudio.google.com/app/apikey

---

## ✨ Pro Tips

- Use `npm run dev:full` to test full integration
- Enable browser geolocation for better map experience
- Check browser console (F12) for API errors
- Use VS Code REST Client to test APIs
- Dark mode toggle in top-right corner

---

**Ready to go?** Start with:
```bash
npm install && npm run dev:full
```

Then open http://localhost:5173 🎉
