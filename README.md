# Sunshade Solutions — Decoupled Enterprise Full-Stack Application

The architecture for **Sunshade Solutions** is organized into two independent sub-projects:
- 🖥️ **`backend/`**: Express.js REST API + Socket.io WebSocket server + Mongoose (MongoDB Atlas)
- 🌐 **`frontend/`**: Next.js 16 App Router + Tailwind CSS + Lucide Icons + Web Audio API Chime

---

## 🏗️ Architecture Overview

```
Sunshade solutions/
├── backend/                         # Node.js + Express + Socket.io Server
│   ├── src/
│   │   ├── config/db.js             # MongoDB Atlas connector with resilient in-memory fallback
│   │   ├── controllers/             # Lead and Product business logic
│   │   │   ├── leadController.js    # Ingestion, status updates, SSE streaming & broadcasts
│   │   │   └── productController.js # Product catalog queries
│   │   ├── models/                  # Mongoose schemas
│   │   │   ├── Lead.js              # Full lead schema with notes & Hyderabad credentials
│   │   │   └── Product.js           # Engineering specs & pricing brackets
│   │   ├── routes/                  # Express endpoints (/api/leads, /api/products, /api/stats)
│   │   ├── socket/                  # Socket.io event broadcasting
│   │   │   └── socketHandler.js     # new_lead, lead_updated, lead_deleted events
│   │   ├── data/seedData.js         # Authentic Sunshade Solutions product catalog
│   │   └── server.js                # Express & Socket.io server (Port 5000)
│   ├── scripts/seed.js              # Standalone DB seeding script
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── frontend/                        # Next.js 16 + React 19 Client
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx             # Public landing page
│   │   │   ├── admin/dashboard/     # Real-Time Live Lead Control Center
│   │   │   └── globals.css          # Industrial Navy & Amber styling
│   │   ├── components/              # Modular UI components
│   │   │   ├── Navbar.tsx           # Header with Mallapur strip & mobile drawer
│   │   │   ├── Hero.tsx             # S.C. Sharma credentials & high-impact visual
│   │   │   ├── ProductCatalog.tsx   # Filterable 6 product cards with CAD specs modal
│   │   │   ├── CostEstimator.tsx    # Dynamic price calculator & lead capture form
│   │   │   ├── CompanyCredentials.tsx # Hyderabad addresses & Google Maps embed
│   │   │   ├── ContactSection.tsx   # Direct tender contact form
│   │   │   └── Footer.tsx           # Industrial footer with GSTIN & factory info
│   │   ├── hooks/                   # Custom client hooks
│   │   │   └── useRealTimeLeads.ts  # Real-time WebSocket & SSE synchronization
│   │   ├── lib/
│   │   │   ├── api.ts               # Centralized backend API client
│   │   │   └── sound.ts             # Web Audio API executive chime synthesis
│   │   └── public/images/           # High-resolution architectural photography
│   ├── next.config.ts               # Proxy rewrites to backend API
│   ├── .env.example
│   ├── .env.local
│   └── package.json
│
├── package.json                     # Root monorepo workspace runner
└── README.md                        # Documentation
```

---

## ⚡ Quick Start

### 1. Run Both Backend & Frontend Simultaneously (Single Command)
From the root directory:
```bash
npm run dev
```
This runs:
- **Backend API**: `http://localhost:5000` (Socket.io on `ws://localhost:5000/socket.io`)
- **Frontend App**: `http://localhost:3000` (Admin Dashboard on `http://localhost:3000/admin/dashboard`)

### 2. Run Individually

#### **Backend Only**:
```bash
npm run dev:backend
# or
cd backend && npm run dev
```

#### **Frontend Only**:
```bash
npm run dev:frontend
# or
cd frontend && npm run dev
```

---

## 🏢 Enterprise Information & Credentials

- **Company**: Sunshade Solutions
- **Chief Engineer**: S.C. Sharma
- **Registered Office**: 401, Prasadam, Plot No.19, Road No.1, Bhaba Nagar, Mallapur, Hyderabad – 500076, Telangana, India.
- **Factory Unit**: 7-94/75/434, Plot No.434, Road No.1, Gouthami Nagar Industrial Association, beside IDA Mallapur, Hyderabad – 500092.
- **Phone Lines**: `+91 99513 54848` / `+91 99513 90898`
- **Email**: `scsharma@sunshadeindia.com`, `info@sunshadeindia.com`

---

## 🚀 Seeding the Database
To populate MongoDB Atlas with the authentic product catalog:
```bash
npm run seed
# or
cd backend && npm run seed
```
*(If `MONGODB_URI` is not configured, both backend and frontend use the built-in resilient in-memory store automatically).*

---

## 🌐 Production Deployment

### Backend Deployment (Render / Railway / VPS / Docker)
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `node src/server.js`
- **Environment Variables**:
  - `PORT`: `5000` (or assigned by provider)
  - `MONGODB_URI`: `<Your MongoDB Atlas Connection String>`
  - `CLIENT_URL`: `https://your-frontend-domain.vercel.app`

### Frontend Deployment (Vercel)
- **Root Directory**: `frontend`
- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Environment Variables**:
  - `NEXT_PUBLIC_API_URL`: `https://your-backend-api.onrender.com`
