# Quick Start for AI Assistants

## 🚨 READ FIRST

This is a Digital Hedge website project. Before making changes:

1. **Read `HANDOVER.md`** for full project context
2. **Check current status** - user may have made changes since last session
3. **User is a no-coder** - always provide complete file replacements, not snippets

---

## 🔑 Quick Reference

### URLs
- **Site:** https://digitalhedge.ai
- **API:** https://api.digitalhedge.ai
- **Admin:** https://digitalhedge.ai/login
- **GitHub:** https://github.com/AlexChanshuo/DigitalHedgewebsite

### Local Paths
- **Project Root:** `C:\Users\alex\Documents\digital-hedge\digital-hedge\`
- **Backend:** `C:\Users\alex\Documents\digital-hedge\digital-hedge\backend\`

### Key Files
- `App.tsx` - Main routing
- `services/api.ts` - API client
- `contexts/AuthContext.tsx` - Auth state
- `backend/prisma/schema.prisma` - Database schema

---

## 🛠 Common Tasks

### Deploy Changes
```powershell
cd C:\Users\alex\Documents\digital-hedge\digital-hedge
npm run build
git add .
git commit -m "message"
git push
```

### Database Operations
```powershell
cd C:\Users\alex\Documents\digital-hedge\digital-hedge\backend
$env:DATABASE_URL="postgresql://root:PASSWORD@hkg1.clusters.zeabur.com:30611/zeabur"
npx prisma db push    # Sync schema
npx prisma db seed    # Seed data
```

⚠️ **Get PASSWORD from Zeabur Dashboard** (it changes!)

---

## ✅ What's Working
- Login/logout
- Admin dashboard
- Create/edit/delete posts
- Public blog pages (just built)

## ❌ What's Pending
- Categories/Tags admin UI
- Users management UI
- Full SEO implementation
- Image upload (currently URL only)

---

## 💡 User Preferences
- Windows + PowerShell
- Terminal commands preferred
- Chinese (Traditional) UI
- Complete code replacements only
