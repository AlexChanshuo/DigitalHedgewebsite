# Pain Point Technologies (痛點科技) Project Handover Document
**Last Updated:** 2026-01-31
**Project Owner:** Alex Ma (alexma@goldenraintree.tw)

> ⚠️ **Brand Update (2026-01-31):** Company renamed from "Digital Hedge" to "Pain Point Technologies (痛點科技)". Logo updated from "DH" to "PP".

---

## 📋 Project Context

**Digital Hedge** is an AI voice technology company website featuring:
1.  **Public Website:** Marketing pages for Voice AI products.
2.  **Blog System:** Full CMS for publishing articles.
3.  **AI Auto-Posting Bot:** Aggregates, rewrites, and publishes AI news automatically.
4.  **Contact Integration:** Email notifications and Retell AI voice agent.

**Live URLs:**
- **Site:** https://digitalhedge.ai
- **API:** https://api.digitalhedge.ai
- **Admin:** https://digitalhedge.ai/login

---

## � Technical Stack

### Frontend (User & Admin)
- **Framework:** React 18 + Vite (TypeScript)
- **Styling:** Tailwind CSS
- **SEO:** react-helmet-async (Meta Tags, JSON-LD)
- **Hosting:** Zeabur (Static Site)

### Backend (API)
- **Runtime:** Node.js 20 (Express.js)
- **Database:** PostgreSQL (via Prisma ORM)
- **Auth:** JWT (Access/Refresh Tokens)
- **Scheduler:** node-cron (for AI Bot)
- **RSS:** rss package (v4 compatible)
- **AI:** OpenAI API (GPT-4)
- **Email:** Resend API

---

## 🗂 Project Structure Map

```
C:\Users\alex\Documents\digital-hedge\digital-hedge\
│
├── components/                 # React Components
│   ├── SEO.tsx                 # SEO Manager
│   ├── Contact.tsx             # Contact Form
│   ├── AdminNavbar.tsx         # Admin Navigation
│   └── ...
│
├── pages/                      # Page Components
│   ├── BlogPost.tsx            # Blog Article Page
│   ├── Admin.tsx               # Admin Dashboard
│   ├── AdminContentSources.tsx # RSS Feed Manager
│   ├── AdminFetchedContent.tsx # AI Content Review
│   └── ...
│
└── backend/                    # Express API
    ├── prisma/
    │   ├── schema.prisma       # DB Schema (Users, Posts, ContentSource)
    │   └── seed.ts             # Initial Data Seeder
    └── src/
        ├── app.ts              # Entry Point (Cron Init)
        ├── config/index.ts     # Env Vars (API Keys)
        ├── controllers/        # Request Handlers
        │   ├── contentSourceController.ts
        │   ├── seoController.ts
        │   └── ...
        ├── services/           # Business Logic
        │   ├── cronService.ts      # Scheduler
        │   ├── rssParserService.ts # RSS Fetcher
        │   ├── aiContentService.ts # OpenAI Processor
        │   ├── autoPostService.ts  # Publisher
        │   └── emailService.ts     # Email Sender
        └── routes/             # API Routes
```

---

## ✅ Completed Features (Progress Log)

### 1. Core System & CMS
- [x] **Auth:** Login, Password Management, Role-based Access.
- [x] **Blog CMS:** CRUD for Posts, basic Admin Dashboard.
- [x] **Public Blog:** Blog Listing, Article Page, Markdown Rendering.

### 2. Digital Hedge Specifics
- [x] **Contact Form:** Email notifications to `alexma@goldenraintree.tw` (Rate Limit: 5/min).
- [x] **Retell AI:** Voice agent widget integrated.
- [x] **SEO:** Sitemap.xml, RSS Feed (`/api/seo/rss`), JSON-LD Structured Data.

### 3. AI Content Aggregator (The Bot)
- [x] **RSS Aggregation:** Fetches from TechCrunch, OpenAI, etc.
- [x] **AI Processing:** Summarizes/Rewrites content using OpenAI.
- [x] **Auto-Posting:** Cron job publishes approved content automatically.
- [x] **Management UI:** Admin panels for adding sources and reviewing content.

### 4. Performance & Ops
- [x] **Image Opt:** WebP conversion for large assets.
- [x] **Deployment:** Automated Zeabur deployment via GitHub.
- [x] **Fixes:** Replaced `feed` with `rss` package for Zeabur compatibility.


### 5. Admin Panel Completeness (DONE) - Phase 4
- [x] **Categories UI:** Full CRUD (`AdminCategories.tsx`).
- [x] **Tags UI:** Full CRUD with Color Picker (`AdminTags.tsx`).
- [x] **Users UI:** Invite/Role/Status management (`AdminUsers.tsx`).

---

## ⚠️ Known Gaps (Original Plan vs Reality)

The following items from the **Original Plan** are still **PENDING**:

1.  **Public Navigation (Phase 5):**
    *   Category/Tag Filter Pages (`/blog/category/:slug`).
    *   Search Functionality.

*Reference `plan.md` for the detailed roadmap to address these.*

---

## � Deployment & Operations

### Deployment Commands
```powershell
# 1. Frontend & Backend Code
cd C:\Users\alex\Documents\digital-hedge\digital-hedge
npm run build          # Optional check
git add .
git commit -m "update message"
git push               # Triggers Zeabur build
```

### Database Operations
```powershell
# 2. Schema Updates
cd C:\Users\alex\Documents\digital-hedge\digital-hedge\backend
$env:DATABASE_URL="postgresql://root:PASSWORD@hkg1.clusters.zeabur.com:30611/zeabur"
npx prisma db push
```
*(Get verified PASSWORD from Zeabur Dashboard)*

### Environment Variables (Zeabur)
Ensure these are set in Zeabur > Service > Variables:
- `DATABASE_URL`
- `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET`
- `OPENAI_API_KEY`
- `CONTACT_EMAIL`
- `RESEND_API_KEY`

---

## 📝 User Guidelines
- **Preference:** Terminal commands (copy-paste).
- **Environment:** Windows PowerShell.
- **Language:** Traditional Chinese UI.
- **Rule:** Always provide complete file replacements.

*End of Handover Document*
