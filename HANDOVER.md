# Digital Hedge Project Handover Document
**Last Updated:** 2026-01-16
**Project Owner:** Alex Ma (alexma@goldenraintree.tw)

---

## 📋 Project Overview

**Digital Hedge** is an AI voice technology company website with:
- Public marketing website (frontend)
- Blog system with CMS (backend + admin panel)
- Deployed on Zeabur cloud platform

**Live URLs:**
- Frontend: https://digitalhedge.ai
- API: https://api.digitalhedge.ai
- Admin Login: https://digitalhedge.ai/login

---

## 🗂 Project Structure

```
C:\Users\alex\Documents\digital-hedge\digital-hedge\
├── App.tsx                    # Main app with routing
├── index.tsx                  # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
│
├── components/
│   ├── Navbar.tsx             # Main navigation (includes Blog link)
│   ├── Footer.tsx             # Footer (includes Admin link)
│   ├── Contact.tsx
│   ├── BackgroundEffects.tsx
│   ├── ConstructionOverlay.tsx
│   ├── AdminNavbar.tsx        # Admin panel navigation
│   └── BlogCard.tsx           # Blog post card component
│
├── pages/
│   ├── Home.tsx               # Landing page
│   ├── VoiceOfChoice.tsx      # Product page
│   ├── VoiceSurvey.tsx        # Product page
│   ├── SalesAI.tsx            # Product page
│   ├── Blog.tsx               # Public blog list
│   ├── BlogPost.tsx           # Single blog article
│   ├── Login.tsx              # Admin login
│   ├── Admin.tsx              # Admin dashboard
│   ├── AdminPosts.tsx         # Post management list
│   └── AdminPostEditor.tsx    # Create/edit posts
│
├── contexts/
│   └── AuthContext.tsx        # Authentication state management
│
├── services/
│   └── api.ts                 # API client for backend
│
└── backend/                   # Express.js API
    ├── package.json
    ├── tsconfig.json
    ├── prisma/
    │   ├── schema.prisma      # Database schema
    │   └── seed.ts            # Initial data seeder
    └── src/
        ├── app.ts             # Express app entry
        ├── config/
        │   ├── index.ts       # Environment config
        │   └── database.ts    # Prisma client
        ├── controllers/
        │   ├── authController.ts
        │   ├── userController.ts
        │   ├── postController.ts
        │   ├── categoryController.ts
        │   └── tagController.ts
        ├── middlewares/
        │   ├── authMiddleware.ts
        │   ├── errorMiddleware.ts
        │   ├── rateLimitMiddleware.ts
        │   └── validateMiddleware.ts
        ├── routes/
        │   ├── index.ts
        │   ├── authRoutes.ts
        │   ├── userRoutes.ts
        │   ├── postRoutes.ts
        │   ├── categoryRoutes.ts
        │   └── tagRoutes.ts
        ├── services/
        │   └── emailService.ts
        ├── utils/
        │   ├── jwt.ts
        │   ├── password.ts
        │   └── slug.ts
        └── validators/
            ├── auth.schema.ts
            ├── user.schema.ts
            ├── post.schema.ts
            ├── category.schema.ts
            └── tag.schema.ts
```

---

## 🔐 Credentials & Access

### Admin Account
```
Email: alexma@goldenraintree.tw
Password: (User changed from default "123" - ask user for current password)
Role: MASTER (highest admin level)
```

### Database (Zeabur PostgreSQL)
```
Host: hkg1.clusters.zeabur.com
Port: 30611
User: root
Password: [CHECK ZEABUR DASHBOARD - Password may change]
Database: zeabur

Connection String Format:
postgresql://root:PASSWORD@hkg1.clusters.zeabur.com:30611/zeabur
```

**⚠️ Important:** Database password can change. Always verify in Zeabur Dashboard → PostgreSQL service → Variable tab → PASSWORD

### GitHub Repository
```
URL: https://github.com/AlexChanshuo/DigitalHedgewebsite
Branch: main
```

### Zeabur Deployment
- Project has 3 services: Frontend, Backend, PostgreSQL
- Frontend: Auto-deploys from root `/` of repo
- Backend: Uses custom Dockerfile (configured in Zeabur Settings UI)
- Domain: digitalhedge.ai (frontend), api.digitalhedge.ai (backend)

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Framework |
| TypeScript | 5.0.0 | Type Safety |
| Vite | 5.0.0 | Build Tool |
| Tailwind CSS | (via classes) | Styling |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20 LTS | Runtime |
| Express.js | 4.18.2 | API Framework |
| TypeScript | 5.3.3 | Type Safety |
| Prisma | 5.8.0 | ORM |
| PostgreSQL | - | Database |
| JWT | jsonwebtoken 9.0.2 | Authentication |
| bcryptjs | 2.4.3 | Password Hashing |
| Zod | 3.22.4 | Validation |

---

## 🎨 Design System

```css
/* Colors */
--background: #FAF9F6 (cream)
--text-primary: #2C2420 (dark brown)
--accent: #D4A373 (warm gold)
--border: #E0E0E0 (light gray)

/* Typography */
--font-heading: serif (Georgia, etc.)
--font-body: system-ui

/* Components */
- Rounded corners: rounded-xl, rounded-2xl
- Shadows: shadow-lg, shadow-xl
- Transitions: transition-all duration-300
```

---

## 📡 API Endpoints

### Authentication
```
POST /api/auth/login           - Login
POST /api/auth/logout          - Logout (requires auth)
POST /api/auth/refresh         - Refresh tokens
POST /api/auth/change-password - Change password (requires auth)
GET  /api/auth/me              - Get current user (requires auth)
```

### Posts
```
GET    /api/posts              - List posts (public, supports ?status=PUBLISHED)
GET    /api/posts/:slug        - Get single post (public)
POST   /api/posts              - Create post (requires auth)
PATCH  /api/posts/:id          - Update post (requires auth)
DELETE /api/posts/:id          - Delete post (requires auth)
```

### Categories & Tags
```
GET  /api/categories           - List categories (public)
POST /api/categories           - Create category (requires auth)
GET  /api/tags                 - List tags (public)
POST /api/tags                 - Create tag (requires auth)
```

### Health Check
```
GET /api/health                - API status check
```

---

## ✅ Completed Features

### Phase 1-3: Backend (DONE)
- [x] Express.js API with TypeScript
- [x] PostgreSQL database with Prisma ORM
- [x] JWT authentication (access + refresh tokens)
- [x] User roles (MASTER, ADMIN, EDITOR, USER)
- [x] Blog posts CRUD with categories/tags
- [x] Password hashing with bcrypt
- [x] Rate limiting & security headers
- [x] Input validation with Zod

### Phase 4: Admin Panel (DONE)
- [x] Login page with password change flow
- [x] Admin dashboard with stats
- [x] Post creation/editing
- [x] Post list with search/filter
- [x] Responsive admin navigation

### Phase 5: Public Blog (IN PROGRESS)
- [x] Blog list page (`/blog`)
- [x] Blog post page (`/blog/:slug`)
- [x] BlogCard component
- [x] Navbar with Blog link
- [ ] SEO meta tags (partial)
- [ ] Build verification needed

---

## ❌ Not Yet Implemented

### Admin Panel
- [ ] Categories management UI (shows "此功能開發中...")
- [ ] Tags management UI (shows "此功能開發中...")
- [ ] Users management UI (shows "此功能開發中...")

### Public Features
- [ ] Blog category filter pages (`/blog/category/:slug`)
- [ ] Blog tag filter pages (`/blog/tag/:slug`)
- [ ] Search functionality
- [ ] RSS feed
- [ ] Sitemap.xml

### SEO
- [ ] Full JSON-LD structured data
- [ ] Open Graph meta tags
- [ ] Twitter Card meta tags

---

## 🚀 Deployment Commands

### Local Development
```powershell
# Frontend
cd C:\Users\alex\Documents\digital-hedge\digital-hedge
npm install
npm run dev

# Backend (separate terminal)
cd C:\Users\alex\Documents\digital-hedge\digital-hedge\backend
npm install
npm run dev
```

### Database Operations
```powershell
cd C:\Users\alex\Documents\digital-hedge\digital-hedge\backend

# Set database URL (get password from Zeabur)
$env:DATABASE_URL="postgresql://root:PASSWORD@hkg1.clusters.zeabur.com:30611/zeabur"

# Push schema changes
npx prisma db push

# Seed initial data
npx prisma db seed

# Open Prisma Studio (visual DB editor)
npx prisma studio
```

### Deploy to Production
```powershell
cd C:\Users\alex\Documents\digital-hedge\digital-hedge
npm run build          # Verify no errors
git add .
git commit -m "your message"
git push               # Auto-deploys to Zeabur
```

---

## 🐛 Known Issues & Solutions

### Issue 1: Prisma Binary Compatibility
**Problem:** Container crashes with `libssl.so.1.1` error
**Solution:** Backend uses custom Dockerfile in Zeabur Settings with `node:20-slim` (Debian-based)

### Issue 2: Database Tables Missing
**Problem:** `The table 'public.User' does not exist`
**Solution:** Run `npx prisma db push` and `npx prisma db seed` with correct DATABASE_URL

### Issue 3: CORS Errors
**Solution:** Backend `src/app.ts` has CORS configured for:
- https://digitalhedge.ai
- https://www.digitalhedge.ai
- http://localhost:5173
- http://localhost:3000

### Issue 4: Password Change Validation
**Problem:** `confirmPassword` field was missing from request
**Solution:** Fixed in `pages/Login.tsx` to include all 3 fields

---

## 📝 User Preferences

From conversation context:
- User prefers **terminal commands** (copy-paste) over manual editing
- User identifies as **no-coder** - provide complete file replacements, not snippets
- User works on **Windows with PowerShell**
- Project uses **Chinese (Traditional)** for UI text

---

## 🔄 Next Steps (Recommended)

1. **Verify Phase 5 Build**
   ```powershell
   cd C:\Users\alex\Documents\digital-hedge\digital-hedge
   npm run build
   git add . && git commit -m "feat: Add public blog pages" && git push
   ```

2. **Test Blog Functionality**
   - Visit https://digitalhedge.ai/blog
   - Create a test post in admin
   - Verify it appears on public blog

3. **Optional Enhancements**
   - Add Categories/Tags management in admin
   - Implement full SEO meta tags
   - Add image upload feature (currently URL only)

---

## 📞 Support Contacts

- **Project Owner:** Alex Ma
- **Email:** alexma@goldenraintree.tw
- **GitHub:** AlexChanshuo

---

## 📎 Related Files

- **Original Plan:** `C:\Users\alex\Documents\digital-hedge\digital-hedge\plan.md`
- **Backend Dockerfile:** Configured in Zeabur UI (not in repo)
- **Environment Variables:** Set in Zeabur Dashboard for each service

---

*End of Handover Document*
