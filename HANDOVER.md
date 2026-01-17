# Digital Hedge Project Handover Document
**Last Updated:** 2026-01-17
**Project Owner:** Alex Ma (alexma@goldenraintree.tw)

---

## 📋 Project Overview

**Digital Hedge** is an AI voice technology company website with:
- Public marketing website (frontend)
- Blog system with CMS (backend + admin panel)
- **AI Content Aggregator & Auto-Posting Bot** (NEW)
- **SEO & Contact Integration** (NEW)
- Deployed on Zeabur cloud platform

**Live URLs:**
- Frontend: https://digitalhedge.ai
- API: https://api.digitalhedge.ai
- Admin Login: https://digitalhedge.ai/login

---

## 🗂 Project Structure

```
C:\Users\alex\Documents\digital-hedge\digital-hedge\
├── App.tsx                    # Main app with HelmetProvider & routing
├── index.html                 # Entry point (includes Retell AI widget)
├── package.json
│
├── components/
│   ├── SEO.tsx                # [NEW] SEO Manager (Helmet)
│   ├── Contact.tsx            # [UPDATED] Contact form with submission
│   ├── AdminNavbar.tsx        # [UPDATED] Added Content/AI links
│   └── ... (Navbar, Footer, Hero, etc.)
│
├── pages/
│   ├── BlogPost.tsx           # [UPDATED] JSON-LD & SEO built-in
│   ├── Admin.tsx              # Admin dashboard wrapper
│   ├── AdminContentSources.tsx # [NEW] Manage RSS feeds
│   ├── AdminFetchedContent.tsx # [NEW] Review/Approve AI content
│   └── ... (Home, Login, Blog, etc.)
│
└── backend/                   # Express.js API
    ├── package.json           # Added: node-cron, feed
    ├── prisma/
    │   └── schema.prisma      # [UPDATED] Added ContentSource, FetchedContent, AppSettings
    │   └── seed.ts            # Data seeder
    └── src/
        ├── app.ts             # [UPDATED] Starts Cron Jobs
        ├── config/
        │   └── index.ts       # Config (OPENAI_API_KEY, CONTACT_EMAIL)
        ├── controllers/
        │   ├── contentSourceController.ts # [NEW] Source/Content management
        │   ├── seoController.ts           # [NEW] Sitemap & RSS endpoints
        │   ├── contactController.ts       # [NEW] Contact form handler
        │   └── ... (auth, post, etc.)
        ├── services/
        │   ├── cronService.ts         # [NEW] Scheduled tasks (Fetch/Process/Publish)
        │   ├── rssParserService.ts    # [NEW] RSS parsing logic
        │   ├── aiContentService.ts    # [NEW] OpenAI summarization
        │   ├── autoPostService.ts     # [NEW] Publishing logic
        │   └── emailService.ts        # [UPDATED] Added contact notifications
        └── routes/
            ├── contentSourceRoutes.ts # [NEW]
            ├── seoRoutes.ts           # [NEW]
            ├── contactRoutes.ts       # [NEW]
            └── index.ts               # Router hub
```

---

## 🔐 Credentials & Access

### Admin Account
```
Email: alexma@goldenraintree.tw
Role: MASTER (highest admin level)
```

### New Credentials Required (Env Vars)
Ensure these are set in Zeabur:
```
OPENAI_API_KEY=sk-proj-...  # For AI Content Aggregator
CONTACT_EMAIL=alexma@goldenraintree.tw  # For Contact Form
```

---

## 🛠 Tech Stack

### Frontend
- **React 18** + **Vite**
- **TypeScript**
- **Tailwind CSS**
- **react-helmet-async** (SEO)

### Backend
- **Node.js** + **Express**
- **Prisma** + **PostgreSQL**
- **node-cron** (Scheduler)
- **feed** (RSS generation)
- **Resend** (Email)
- **OpenAI API** (Content Generation)

---

## ✅ Completed Features

### Phase 1-5: Basic System (DONE)
- Auth, Blog CMS, Public Blog, Admin Panel

### Phase 7: Contact Form (DONE)
- [x] Functional contact form (`/api/contact`)
- [x] Email notifications via Resend
- [x] Rate limiting (5 req/min)

### Phase 8: Retell-AI Integration (DONE)
- [x] Widget script embedded in `index.html`
- [x] Configured with Agent ID & Public Key

### Phase 9: SEO Enhancement (DONE)
- [x] Sitemap (`/api/seo/sitemap.xml`)
- [x] RSS Feed (`/api/seo/rss`)
- [x] `SEO.tsx` component with JSON-LD (Organization, BlogPosting)

### Phase 10: AI Content Aggregator (DONE)
- [x] RSS Parser (feeds from TechCrunch, OpenAI, etc.)
- [x] AI Processor (rewrites/summarizes content)
- [x] Admin UI for Source Management
- [x] Admin UI for Content Review/Approval

### Phase 11: Auto-Posting Bot (DONE)
- [x] `node-cron` scheduler integration
- [x] Hourly fetch & process
- [x] Auto-publish with daily limits
- [x] AppSettings control (toggle auto-publish)

### Phase 12: Performance Optimization (DONE)
- [x] **Image Compression**: Converted 8 very large PNGs (total ~76MB) to WebP (~850KB).
- [x] **Code Update**: Components updated to use `.webp`.
- [x] **Backup**: Original PNGs stored in `public/originals/` (not tracked in git by default, but present locally).

---

## 🔄 Deployment Instructions

### 1. Update Environment Variables
In Zeabur > Settings > Variables:
- Add `OPENAI_API_KEY`
- Add `CONTACT_EMAIL`

### 2. Deploy Code
```powershell
cd C:\Users\alex\Documents\digital-hedge\digital-hedge
npm run build          # Optional verification
git add .
git commit -m "feat: Complete AI Bot, SEO, and Contact Form"
git push
```

### 3. Verify Deployment
- **Contact Form:** Send a test message.
- **Sitemap:** Check `/api/seo/sitemap.xml`.
- **Admin:** Log in and check "內容來源" and "AI 聚合" tabs.

---

## 📝 User Preferences
- **Terminal commands** (copy-paste)
- **Windows / PowerShell**
- **Traditional Chinese** UI

---

## 📎 Related Files
- **Walkthrough:** `walkthrough.md` (Detailed usage guide)
- **Original Plan:** `plan.md`
- **Frontend Source:** `src/`
- **Backend Source:** `backend/src/`

*End of Handover Document*
