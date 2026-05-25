# System Architecture & Data Flow

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER'S BROWSER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ React App (Vite)                                         │   │
│  │ - Disease Detection Page                                 │   │
│  │ - Chatbot Interface                                      │   │
│  │ - Maps & Location Service                                │   │
│  │ - Dashboard & Analytics                                  │   │
│  └──────────────────┬───────────────────────────────────────┘   │
│                     │ HTTP/HTTPS (CORS)                          │
│                     │                                             │
└─────────────────────┼─────────────────────────────────────────────┘
                      │
           ┌──────────▼──────────┐
           │  VERCEL CDN/HOSTING │
           │  Static Assets      │
           │  Auto-Deploys       │
           └──────────┬──────────┘
                      │ HTTP/HTTPS
                      │
┌─────────────────────▼─────────────────────────────────────────────┐
│                  BACKEND API SERVER                               │
│  (Node.js + Express) Running on Railway                           │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ API Routes                                                  │ │
│  │ ├── /api/health              (Status Check)                 │ │
│  │ ├── /api/detect-disease      (AI Detection)                 │ │
│  │ ├── /api/chatbot             (AI Chat)                      │ │
│  │ ├── /api/weather-risk        (Weather Alerts)               │ │
│  │ ├── /api/nearby              (Map Locations)                │ │
│  │ ├── /api/government-schemes  (Schemes DB)                   │ │
│  │ └── /api/history             (User History)                 │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Controllers (Business Logic)                                │ │
│  │ ├── chatController (AI responses)                           │ │
│  │ ├── detectionController (Image analysis)                    │ │
│  │ ├── mapController (Location search)                         │ │
│  │ ├── historyController (Data retrieval)                      │ │
│  │ └── ... more controllers                                    │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ Services (External Integrations)                            │ │
│  │ ├── gemini.js (Google AI API)                               │ │
│  │ ├── maps.js (Google Maps API)                               │ │
│  │ ├── weather.js (Weather API)                                │ │
│  │ └── database.js (Supabase)                                  │ │
│  └──────┬──────────────┬──────────────┬───────────────────────┘ │
│         │              │              │                         │
└─────────┼──────────────┼──────────────┼─────────────────────────┘
          │              │              │
          ▼              ▼              ▼
    ┌──────────┐  ┌────────────┐  ┌──────────────┐
    │ Google   │  │  Google    │  │  Supabase    │
    │ Gemini   │  │ Maps &     │  │  PostgreSQL  │
    │ AI API   │  │ Places API │  │  Database    │
    └──────────┘  └────────────┘  └──────────────┘
```

## 🔄 Data Flow: Disease Detection

```
USER UPLOADS IMAGE
        │
        ▼
   Frontend (React)
   - Preview image
   - FormData with image
        │
        ├─────────────────────────────────────────►
        │                                          │
        ▼                                          ▼
  Backend (Node.js)                          Google Cloud Storage
  - Receive FormData                         - Store image
  - Multer middleware                        - Get URL
  - Save locally/upload
        │
        ├─► Image Processing
        │   - Resize
        │   - Validate
        │
        ▼
  Gemini AI API
  - Send image + prompt
  - Get analysis
        │
        ▼
  Response Processing
  - Extract disease name
  - Calculate confidence
  - Get treatment info
        │
        ▼
  Save to Database (Supabase)
  - Store diagnosis
  - Link to user
  - Timestamp
        │
        ▼
  Send Response to Frontend
  - Disease name
  - Severity level
  - Confidence %
  - Recommended actions
        │
        ▼
  USER SEES RESULTS
  - View diagnosis
  - See recommendations
  - Option to save report
```

## 💬 Data Flow: Chatbot

```
USER TYPES MESSAGE
    │
    ▼
Frontend
- Detect language
- Format message
- Show in UI
    │
    ├──► API Call
    │    /api/chatbot
    │    POST { message, language }
    │
    ▼
Backend
- Receive message
- Apply auth (optional)
- Check rate limit
    │
    ├──► Message Processing
    │    - Sanitize input
    │    - Detect language
    │    - Add context
    │
    ▼
Gemini API
- Send prompt + message
- System: Agriculture expert
- Language: as requested
    │
    ▼
Response Processing
- Parse response
- Format for display
- Save to history (optional)
    │
    ▼
Send to Frontend
    │
    ▼
USER SEES RESPONSE
- Display in chat
- Show typing indicator while loading
- Store in conversation history
```

## 📍 Data Flow: Maps & Locations

```
PAGE LOADS (Schemes Page)
    │
    ▼
Frontend Init
- Request geolocation
  (User grants permission)
    │
    ▼
Get User Location
latitude: 18.52
longitude: 73.85
    │
    ├──► Load Google Maps
    │    - Initialize map
    │    - Center on user
    │    - Add user marker (blue)
    │
    ├──► API Call
    │    /api/nearby?lat=18.52&lng=73.85&type=fertilizer_store
    │
    ▼
Backend Maps Service
- Parse parameters
- Build Google Places query
    │
    ▼
Google Places API
- Search nearby locations
- Filter by type
- Get details (rating, hours)
    │
    ▼
Calculate Distances
- Haversine formula
- Sort by distance
- Add to response
    │
    ▼
Send to Frontend
- Location data array
- Sorted by distance
    │
    ▼
Display on Map
- Add markers (green)
- Show location list
- Show details on click
- Display distances
- Show ratings & hours
    │
    ▼
USER INTERACTION
- Click marker → Center map
- Click location → Show details
- Change type → Refresh search
```

## 🔐 Data Flow: Authentication

```
LOGIN PAGE
    │
    ▼
User enters email + password
    │
    ├──► Frontend
    │    - Validate format
    │    - POST /api/auth/login
    │
    ▼
Backend
- Receive credentials
- Query Supabase users table
- Check if user exists
    │
    ├─► User Not Found
    │   └──► Return 401 Unauthorized
    │
    ├─► User Found
    │   - Compare passwords (bcrypt)
    │   ├─► Password Mismatch
    │   │   └──► Return 401 Unauthorized
    │   │
    │   └─► Password Match
    │       - Generate tokens
    │       - accessToken (24h)
    │       - refreshToken (7d)
    │
    ▼
Send to Frontend
{
  accessToken: "eyJhbGc...",
  refreshToken: "eyJhbGc...",
  user: { id, email, name }
}
    │
    ▼
Frontend Stores
- localStorage.accessToken
- localStorage.refreshToken
- localStorage.user
    │
    ▼
Redirect to Dashboard
    │
    ▼
All API Calls Include Token
Header: Authorization: Bearer {accessToken}
    │
    ▼
Backend Validates Token
- middleware/auth.js
- Verify signature
- Check expiration
- Extract userId
    │
    ├─► Valid
    │   └──► Process request
    │
    └─► Invalid/Expired
    │   ├─► If Expired
    │   │   - Use refreshToken
    │   │   - Get new accessToken
    │   │
    │   └─► Return 401 Unauthorized
    │       - Redirect to Login
```

## 🗄️ Database Schema

```
USERS TABLE
├── id (UUID) [PK]
├── email (Text, Unique)
├── password (Text, Hashed)
├── name (Text)
├── phone (Text)
├── location (Text)
├── created_at (Timestamp)
└── updated_at (Timestamp)

DIAGNOSES TABLE
├── id (UUID) [PK]
├── user_id (UUID) [FK → users]
├── crop (Text)
├── disease (Text)
├── severity (Text: Low/Medium/High)
├── confidence (Float)
├── image_url (Text)
├── location (Text)
├── date (Timestamp)
└── created_at (Timestamp)

REPORTS TABLE
├── id (UUID) [PK]
├── diagnosis_id (UUID) [FK → diagnoses]
├── content (Text)
├── status (Text: Draft/Submitted/Approved)
└── created_at (Timestamp)

CHAT_HISTORY TABLE
├── id (UUID) [PK]
├── user_id (UUID) [FK → users]
├── message (Text)
├── response (Text)
├── language (Text)
└── created_at (Timestamp)
```

## 🌐 API Request/Response Example

### Disease Detection
```
REQUEST:
POST /api/detect-disease HTTP/1.1
Content-Type: multipart/form-data
Authorization: Bearer {token}

[Image File]

RESPONSE (200 OK):
{
  "id": "scan-1234",
  "crop": "Tomato",
  "disease": "Early Blight",
  "severity": "Medium",
  "confidence": 92.5,
  "treatment": "Apply fungicide spray...",
  "preventive": "Improve air circulation...",
  "imageUrl": "https://...",
  "timestamp": "2024-05-25T10:30:00Z"
}
```

### Get Nearby Locations
```
REQUEST:
GET /api/nearby?latitude=18.52&longitude=73.85&type=fertilizer_store&radius=5000

RESPONSE (200 OK):
[
  {
    "id": "place_123",
    "name": "Green Leaf Fertilizers",
    "type": "fertilizer_store",
    "distance": "2.4 km",
    "location": {
      "latitude": 18.521,
      "longitude": 73.854
    },
    "rating": 4.8,
    "address": "Pune, Maharashtra",
    "openNow": true,
    "phone": "+91 98765 44120",
    "website": "https://..."
  },
  ...
]
```

## 🔌 Environment Variables Reference

```
BACKEND (.env)
├── PORT = 4000
├── CLIENT_URL = http://localhost:5173
├── GEMINI_API_KEY = (from Google AI Studio)
├── GEMINI_MODEL = gemini-2.5-flash
├── GOOGLE_MAPS_API_KEY = (from Google Cloud)
├── SUPABASE_URL = https://*.supabase.co
├── SUPABASE_KEY = (Anon key)
└── JWT_SECRET = (32+ character random)

FRONTEND (.env.local)
├── VITE_API_URL = http://localhost:4000/api
└── VITE_GOOGLE_MAPS_API_KEY = (same as backend)
```

## 📊 Request Flow Timeline

```
0ms:  User clicks upload button
10ms: Image selected, preview shown
50ms: Upload initiated
100ms: Multer processes file
150ms: File stored
200ms: API call to Gemini
800ms: Gemini processes image
1000ms: Response received from Gemini
1020ms: Data saved to Supabase
1050ms: Response sent to frontend
1080ms: UI updated with results
1100ms: User sees diagnosis ✅

Total: ~1.1 seconds
```

## 🚀 Deployment Architecture

```
LOCAL                STAGING              PRODUCTION
                                          
Port 5173 ─────►    Vercel Preview   ─►   Vercel Production
(Frontend)          (Auto-generated)       (https://app.yourdomain.com)
                    from PR
                    
Port 4000 ─────►    Railway Staging   ─►   Railway Production
(Backend)           (Dev branch)            (https://api.yourdomain.com)
                    
.env.local ─────►   Environment       ─►   Environment
                    Variables on           Variables on
                    Railway/Vercel         Railway/Vercel
                    (Secrets)              (Secrets)
```

---

This architecture ensures:
- ✅ Scalability
- ✅ Security
- ✅ Performance
- ✅ Maintainability
- ✅ Real-time capabilities
