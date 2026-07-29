# Denesens Solutions — Corporate Website & API Monorepo

> **"Building Intelligent Solutions"**  
> Luxury tech web application & REST API built for Denesens Solutions, featuring custom software engineering services, in-house SaaS showcases, dark obsidian & metallic gold design system, and full page interactivity.

---

## 💎 Design System & Visual Motifs

- **Primary Background:** `#0A0A0A` / `#000000` (Obsidian Black with subtle radial gold noise overlay)
- **Primary Accent:** `#D4AF37` (Metallic Gold) with champagne highlights (`#F5D67A`) and dark gold borders (`#B8860B`)
- **Typography:** `Outfit` / `Poppins` (Headings) and `Inter` (Body text)
- **Motifs:**
  - Gold Circuit Node Logo Mark & SVG Vector `<DenesensLogo />`
  - Reusable Diamond & Vertical Gold Line Ornament `<GoldOrnament />`
  - Flowing Signal Lines `<NetworkBackground />`
  - Condensed Glassmorphism Header on Scroll

---

## ⚡ Quick Start

### 1. Install Dependencies
Run from the root directory to install packages for root, server, and client:
```bash
npm run install:all
```

### 2. Seed Database (Optional)
Populate initial services, products, and team data into MongoDB:
```bash
npm run seed
```
*(Note: If local MongoDB is not running, the server operates seamlessly with an in-memory fallback store).*

### 3. Run Development Servers
Start both backend API (`localhost:5000`) and frontend Vite client (`localhost:5173`) concurrently:
```bash
npm run dev
```

Alternatively, run them separately:
```bash
# Terminal 1: Backend API
npm run dev:server

# Terminal 2: React Vite Client
npm run dev:client
```

---

## 📁 Repository Structure

```
Denesens/
├── package.json              # Monorepo scripts (concurrently)
├── README.md                 # Project documentation
├── client/                   # Frontend React + Vite
│   ├── public/               # Logo image assets, favicon
│   ├── src/
│   │   ├── components/       # Navbar, Footer, GoldOrnament, ServiceCard, ProductCard, Modal
│   │   ├── pages/            # Home, About, Services, Products, Portfolio, Contact, NotFound
│   │   ├── services/         # Axios API client wrapper
│   │   ├── App.jsx           # React Router v6 setup
│   │   └── main.jsx          # Vite entry point
│   ├── tailwind.config.js    # Luxury theme colors & typography
│   └── vite.config.js        # API proxy to localhost:5000
└── server/                   # Backend Node.js + Express + MongoDB
    ├── models/               # ContactSubmission, Service, Product, TeamMember
    ├── routes/               # contactRoutes, serviceRoutes, productRoutes, teamRoutes
    ├── seed.js               # Database seeding script
    └── server.js             # Express app entry point
```

---

## 📞 Corporate Contact Info Included Site-Wide

- **Phone:** +91 96295 68373
- **Location:** Salem, Tamil Nadu, India
- **Website:** www.Denesens.com
- **Leadership Team:**
  - Sarathy M — CEO
  - Deepan S — CTO
  - Durai Rajan G — Marketing Lead
