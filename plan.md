# Digital Hedge 後端系統建置計劃
# Backend System Implementation Plan

---

## 📋 專案概述 (Project Overview)

為 Digital Hedge 網站建立完整的後端系統，包含：
- 使用者認證與授權系統
- 部落格管理系統
- 分類與標籤管理
- SEO 優化架構
- 安全防護機制

---

## 🛠 技術選型 (Tech Stack)

### 後端架構
| 項目 | 技術選擇 | 原因 |
|------|----------|------|
| Runtime | Node.js 20 LTS | 與前端 TypeScript 整合良好 |
| Framework | Express.js + TypeScript | 成熟穩定、社群支援強 |
| Database | PostgreSQL | Zeabur 原生支援、關聯式資料適合部落格 |
| ORM | Prisma | 型別安全、自動生成 TypeScript 型別 |
| Authentication | JWT + bcrypt | 業界標準、安全可靠 |
| Validation | Zod | 與 TypeScript 完美整合 |

### 部署架構
```
┌─────────────────────────────────────────────────────────┐
│                      Zeabur                             │
├─────────────────────┬───────────────────────────────────┤
│   Frontend (Vite)   │   Backend (Express)               │
│   digitalhedge.ai   │   api.digitalhedge.ai             │
├─────────────────────┴───────────────────────────────────┤
│                   PostgreSQL                            │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 專案結構 (Project Structure)

```
digital-hedge/
├── frontend/                    # 現有前端 (移動至此)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/           # 新增：Auth Context
│   │   │   └── AuthContext.tsx
│   │   ├── hooks/              # 新增：自定義 hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useBlog.ts
│   │   ├── services/           # 新增：API 服務
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── blogService.ts
│   │   └── types/              # 新增：型別定義
│   │       └── index.ts
│   └── ...
│
├── backend/                     # 新增：後端專案
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── jwt.ts
│   │   │   └── security.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── userController.ts
│   │   │   ├── blogController.ts
│   │   │   ├── categoryController.ts
│   │   │   └── tagController.ts
│   │   ├── middlewares/
│   │   │   ├── auth.ts          # JWT 驗證
│   │   │   ├── roleGuard.ts     # 角色權限
│   │   │   ├── rateLimiter.ts   # 速率限制
│   │   │   ├── validator.ts     # 輸入驗證
│   │   │   └── security.ts      # 安全標頭
│   │   ├── models/              # Prisma 生成
│   │   ├── routes/
│   │   │   ├── index.ts
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── blog.routes.ts
│   │   │   ├── category.routes.ts
│   │   │   └── tag.routes.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── userService.ts
│   │   │   ├── blogService.ts
│   │   │   └── seoService.ts
│   │   ├── utils/
│   │   │   ├── password.ts
│   │   │   ├── slug.ts
│   │   │   └── sanitize.ts
│   │   ├── validators/
│   │   │   ├── auth.schema.ts
│   │   │   ├── blog.schema.ts
│   │   │   └── user.schema.ts
│   │   └── app.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts              # 初始資料
│   │   └── migrations/
│   ├── package.json
│   └── tsconfig.json
│
└── docker-compose.yml           # 本地開發用
```

---

## 🗄 資料庫設計 (Database Schema)

### Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ==========================================
// 使用者系統
// ==========================================

enum UserRole {
  MASTER      // 最高管理員
  ADMIN       // 管理員
  EDITOR      // 編輯者
  USER        // 一般使用者
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  PENDING_PASSWORD_CHANGE  // 需要更改密碼
}

model User {
  id                String      @id @default(cuid())
  email             String      @unique
  passwordHash      String
  name              String?
  avatar            String?
  role              UserRole    @default(USER)
  status            UserStatus  @default(ACTIVE)
  
  // 安全相關
  failedLoginAttempts Int       @default(0)
  lockedUntil       DateTime?
  lastLoginAt       DateTime?
  lastLoginIp       String?
  mustChangePassword Boolean    @default(false)
  
  // 時間戳記
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt
  
  // 關聯
  posts             Post[]
  sessions          Session[]
  activityLogs      ActivityLog[]
  
  @@index([email])
  @@index([role])
}

model Session {
  id            String   @id @default(cuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  refreshToken  String   @unique
  userAgent     String?
  ipAddress     String?
  expiresAt     DateTime
  
  createdAt     DateTime @default(now())
  
  @@index([userId])
  @@index([refreshToken])
}

model ActivityLog {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  action      String   // LOGIN, LOGOUT, CREATE_POST, etc.
  details     Json?
  ipAddress   String?
  userAgent   String?
  
  createdAt   DateTime @default(now())
  
  @@index([userId])
  @@index([action])
  @@index([createdAt])
}

// ==========================================
// 部落格系統
// ==========================================

enum PostStatus {
  DRAFT         // 草稿
  PUBLISHED     // 已發布
  SCHEDULED     // 排程發布
  ARCHIVED      // 已封存
}

model Category {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String?
  order       Int      @default(0)
  
  // SEO
  metaTitle       String?
  metaDescription String?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  posts       Post[]
  
  @@index([slug])
}

model Tag {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  color       String?  // HEX color for UI
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  posts       PostTag[]
  
  @@index([slug])
}

model Post {
  id          String     @id @default(cuid())
  
  // 基本內容
  title       String
  slug        String     @unique
  excerpt     String?    // 摘要
  content     String     // Markdown 或 HTML
  coverImage  String?
  
  // 狀態
  status      PostStatus @default(DRAFT)
  publishedAt DateTime?
  scheduledAt DateTime?
  
  // SEO 優化
  metaTitle       String?
  metaDescription String?
  metaKeywords    String?
  canonicalUrl    String?
  
  // AI SEO (結構化資料)
  structuredData  Json?    // JSON-LD schema
  
  // 統計
  viewCount   Int        @default(0)
  
  // 關聯
  authorId    String
  author      User       @relation(fields: [authorId], references: [id])
  categoryId  String
  category    Category   @relation(fields: [categoryId], references: [id])
  tags        PostTag[]
  
  // 時間戳記
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  
  @@index([slug])
  @@index([status])
  @@index([publishedAt])
  @@index([categoryId])
  @@index([authorId])
}

model PostTag {
  postId    String
  post      Post    @relation(fields: [postId], references: [id], onDelete: Cascade)
  tagId     String
  tag       Tag     @relation(fields: [tagId], references: [id], onDelete: Cascade)
  
  @@id([postId, tagId])
}
```

---

## 🏷 預設分類與標籤 (Default Categories & Tags)

### 分類 (Categories)
| 名稱 | Slug | 說明 |
|------|------|------|
| AI 文章 | ai-articles | AI 技術深度文章 |
| 最新消息 | news | 公司與產業最新動態 |
| 產品教學 | tutorials | 產品使用指南 |
| 案例分享 | case-studies | 客戶成功案例 |

### 標籤 (Tags)
| 標籤名稱 | Slug | 顏色 |
|----------|------|------|
| 人工智慧 | artificial-intelligence | #D4A373 |
| 語音AI | voice-ai | #B08968 |
| 機器學習 | machine-learning | #8B7355 |
| 自然語言處理 | nlp | #6B5344 |
| 數據分析 | data-analytics | #4A3728 |
| 民調系統 | survey-system | #2C2420 |
| 客戶服務 | customer-service | #E8DDD4 |
| 行銷科技 | martech | #C4B5A6 |
| 數位轉型 | digital-transformation | #A09080 |
| 企業應用 | enterprise | #7C6F60 |
| 產業趨勢 | industry-trends | #5A5048 |
| 技術解析 | tech-analysis | #383230 |

---

## 🔐 安全機制 (Security)

### 1. 密碼安全
```typescript
// 密碼規則
const passwordPolicy = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: false,  // 可選
  maxAge: 90,                 // 天數，過期需更換
};

// bcrypt 設定
const SALT_ROUNDS = 12;
```

### 2. JWT 配置
```typescript
const jwtConfig = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: '15m',        // 15 分鐘
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '7d',         // 7 天
  },
};
```

### 3. 防護機制
| 攻擊類型 | 防護措施 |
|----------|----------|
| Brute Force | 登入失敗 5 次後鎖定帳號 15 分鐘 |
| XSS | Helmet.js + Content Security Policy |
| CSRF | SameSite Cookie + CSRF Token |
| SQL Injection | Prisma ORM 參數化查詢 |
| Rate Limiting | 每 IP 每分鐘 100 請求 |
| Session Hijacking | Secure + HttpOnly Cookies |

### 4. API 安全標頭
```typescript
// Helmet.js 配置
helmet({
  contentSecurityPolicy: true,
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: true,
  dnsPrefetchControl: true,
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: true,
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true,
});
```

---

## 🔑 API 端點設計 (API Endpoints)

### 認證 (Auth)
```
POST   /api/auth/login              # 登入
POST   /api/auth/logout             # 登出
POST   /api/auth/refresh            # 刷新 Token
POST   /api/auth/change-password    # 更改密碼
POST   /api/auth/forgot-password    # 忘記密碼
POST   /api/auth/reset-password     # 重設密碼
GET    /api/auth/me                 # 取得當前使用者
```

### 使用者管理 (Users) - Master Only
```
GET    /api/users                   # 列出所有使用者
GET    /api/users/:id               # 取得單一使用者
POST   /api/users                   # 建立使用者
PUT    /api/users/:id               # 更新使用者
DELETE /api/users/:id               # 刪除使用者
PATCH  /api/users/:id/role          # 更改角色
PATCH  /api/users/:id/status        # 更改狀態
```

### 部落格文章 (Posts)
```
GET    /api/posts                   # 列出文章 (公開)
GET    /api/posts/:slug             # 取得單篇文章 (公開)
GET    /api/posts/admin             # 管理列表 (需登入)
POST   /api/posts                   # 建立文章 (需登入)
PUT    /api/posts/:id               # 更新文章 (作者/管理員)
DELETE /api/posts/:id               # 刪除文章 (作者/管理員)
PATCH  /api/posts/:id/publish       # 發布文章
PATCH  /api/posts/:id/archive       # 封存文章
```

### 分類 (Categories) - Master/Admin Only
```
GET    /api/categories              # 列出分類 (公開)
POST   /api/categories              # 建立分類
PUT    /api/categories/:id          # 更新分類
DELETE /api/categories/:id          # 刪除分類
```

### 標籤 (Tags)
```
GET    /api/tags                    # 列出標籤 (公開)
POST   /api/tags                    # 建立標籤 (管理員)
PUT    /api/tags/:id                # 更新標籤 (管理員)
DELETE /api/tags/:id                # 刪除標籤 (管理員)
```

---

## 🔍 SEO 優化設計 (SEO Architecture)

### 1. URL 結構
```
/blog                           # 部落格首頁
/blog/category/:slug            # 分類頁
/blog/tag/:slug                 # 標籤頁
/blog/:slug                     # 文章頁 (SEO-friendly slug)
```

### 2. JSON-LD 結構化資料
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "文章標題",
  "description": "文章摘要",
  "image": "封面圖片URL",
  "author": {
    "@type": "Person",
    "name": "作者名稱"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Digital Hedge",
    "logo": {
      "@type": "ImageObject",
      "url": "https://digitalhedge.ai/icon.png"
    }
  },
  "datePublished": "2026-01-16",
  "dateModified": "2026-01-16",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://digitalhedge.ai/blog/article-slug"
  },
  "keywords": ["人工智慧", "語音AI"],
  "articleSection": "AI 文章"
}
```

### 3. Meta Tags 生成
```typescript
// 自動生成 SEO meta tags
const generateMetaTags = (post: Post) => ({
  title: post.metaTitle || `${post.title} | Digital Hedge`,
  description: post.metaDescription || post.excerpt,
  canonical: `https://digitalhedge.ai/blog/${post.slug}`,
  openGraph: {
    type: 'article',
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    author: post.author.name,
    section: post.category.name,
    tags: post.tags.map(t => t.tag.name),
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
  },
});
```

---

## 👤 初始帳號設定 (Initial Account)

### 管理員帳號
```typescript
// prisma/seed.ts
const masterUser = {
  email: 'alexma@goldenraintree.tw',
  name: 'Alex Ma',
  role: 'MASTER',
  status: 'PENDING_PASSWORD_CHANGE',
  passwordHash: await bcrypt.hash('123', 12),
  mustChangePassword: true,
};
```

### 首次登入流程
```
1. 使用 alexma@goldenraintree.tw / 123 登入
2. 系統偵測 mustChangePassword = true
3. 強制跳轉至密碼更改頁面
4. 輸入新密碼 (需符合密碼政策)
5. 更新密碼後，設定 mustChangePassword = false
6. 重新登入，正常使用系統
```

---

## 📱 前端新增頁面 (Frontend New Pages)

```
/login                          # 登入頁
/admin                          # 管理後台首頁
/admin/posts                    # 文章管理
/admin/posts/new                # 新增文章
/admin/posts/:id/edit           # 編輯文章
/admin/categories               # 分類管理 (Master)
/admin/tags                     # 標籤管理
/admin/users                    # 使用者管理 (Master)
/admin/settings                 # 系統設定

/blog                           # 部落格首頁 (公開)
/blog/category/:slug            # 分類列表 (公開)
/blog/tag/:slug                 # 標籤列表 (公開)
/blog/:slug                     # 文章內頁 (公開)
```

---

## 📋 執行階段 (Implementation Phases)

### Phase 1: 後端基礎建設 (預估 2-3 小時)
- [ ] 建立 backend 專案結構
- [ ] 設定 Prisma + PostgreSQL
- [ ] 建立資料庫 Schema
- [ ] 實作認證系統 (JWT)
- [ ] 建立初始種子資料

### Phase 2: API 開發 (預估 2-3 小時)
- [ ] 認證相關 API
- [ ] 使用者管理 API
- [ ] 部落格 CRUD API
- [ ] 分類/標籤 API
- [ ] 輸入驗證 + 錯誤處理

### Phase 3: 安全強化 (預估 1 小時)
- [ ] Rate Limiting
- [ ] Helmet 安全標頭
- [ ] CORS 設定
- [ ] 活動日誌記錄

### Phase 4: 前端整合 (預估 3-4 小時)
- [ ] Auth Context + Hook
- [ ] 登入頁面
- [ ] 管理後台 Layout
- [ ] 文章管理介面
- [ ] 分類/標籤管理
- [ ] 使用者管理 (Master)

### Phase 5: 公開部落格 (預估 2 小時)
- [ ] 部落格首頁
- [ ] 文章列表 + 分頁
- [ ] 文章內頁 + SEO
- [ ] 分類/標籤篩選

### Phase 6: 部署 (預估 1 小時)
- [ ] Zeabur PostgreSQL 設定
- [ ] 環境變數配置
- [ ] Backend 服務部署
- [ ] 域名設定 (api.digitalhedge.ai)

---

## ✅ 已確認配置 (Confirmed Configuration)

| 項目 | 確認選擇 |
|------|----------|
| 資料庫 | Zeabur PostgreSQL |
| 圖片儲存 | Public 資料夾 (`/public/blog-images/`) |
| 編輯器 | Markdown + 預覽 |
| Email 服務 | Resend (3,000封/月免費) |
| API 網址 | `api.digitalhedge.ai` |
| 管理員帳號 | `alexma@goldenraintree.tw` |
| 預設密碼 | `123` (首次登入強制更改) |

---

## 🚀 執行狀態 (Execution Status)

- [x] **Phase 1**: 後端基礎建設 - ✅ 完成 (2026-01-16)
- [x] **Phase 2**: API 開發 - ✅ 已含在 Phase 1 中完成
- [x] **Phase 3**: 安全強化 - ✅ 已含在 Phase 1 中完成
- [ ] **Phase 4**: 前端整合 - 待執行
- [ ] **Phase 5**: 公開部落格 - 待執行
- [ ] **Phase 6**: 部署 - 待執行

---

## 📝 Phase 1-3 完成清單

### 已建立檔案
```
backend/
├── package.json                    ✅
├── tsconfig.json                   ✅
├── .env.example                    ✅
├── .gitignore                      ✅
├── prisma/
│   ├── schema.prisma               ✅
│   └── seed.ts                     ✅
└── src/
    ├── app.ts                      ✅
    ├── config/
    │   ├── index.ts                ✅
    │   └── database.ts             ✅
    ├── controllers/
    │   ├── authController.ts       ✅
    │   ├── userController.ts       ✅
    │   ├── postController.ts       ✅
    │   ├── categoryController.ts   ✅
    │   └── tagController.ts        ✅
    ├── middlewares/
    │   ├── authMiddleware.ts       ✅
    │   ├── errorMiddleware.ts      ✅
    │   ├── rateLimitMiddleware.ts  ✅
    │   └── validateMiddleware.ts   ✅
    ├── routes/
    │   ├── index.ts                ✅
    │   ├── authRoutes.ts           ✅
    │   ├── userRoutes.ts           ✅
    │   ├── postRoutes.ts           ✅
    │   ├── categoryRoutes.ts       ✅
    │   └── tagRoutes.ts            ✅
    ├── services/
    │   └── emailService.ts         ✅
    ├── utils/
    │   ├── jwt.ts                  ✅
    │   ├── password.ts             ✅
    │   └── slug.ts                 ✅
    └── validators/
        ├── auth.schema.ts          ✅
        ├── user.schema.ts          ✅
        ├── post.schema.ts          ✅
        ├── category.schema.ts      ✅
        └── tag.schema.ts           ✅
```

### 下一步：部署到 Zeabur
1. 在 Zeabur 建立 PostgreSQL 服務
2. 設定環境變數
3. 部署 Backend 服務
4. 設定 `api.digitalhedge.ai` DNS

