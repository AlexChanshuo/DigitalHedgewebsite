// prisma/seed.ts
import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 開始種子資料...');

  // ==========================================
  // 1. 建立管理員帳號
  // ==========================================
  // 安全性：從環境變數讀取初始密碼，若無則生成隨機密碼
  const initialPassword = process.env.SEED_ADMIN_PASSWORD || crypto.randomUUID();
  const passwordHash = await bcrypt.hash(initialPassword, 12);
  
  // 警告：顯示初始密碼（僅在 seed 時）
  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.log('⚠️ ========================================');
    console.log('⚠️ 自動生成的初始密碼:', initialPassword);
    console.log('⚠️ 請立即登入並更改密碼！');
    console.log('⚠️ ========================================');
  }
  
  const masterUser = await prisma.user.upsert({
    where: { email: 'alexma@goldenraintree.tw' },
    update: {},
    create: {
      email: 'alexma@goldenraintree.tw',
      name: 'Alex Ma',
      passwordHash,
      role: UserRole.MASTER,
      status: UserStatus.PENDING_PASSWORD_CHANGE,
      mustChangePassword: true,
    },
  });
  console.log('✅ 管理員帳號已建立:', masterUser.email);

  // ==========================================
  // 2. 建立分類
  // ==========================================
  const categories = [
    { 
      name: 'AI 文章', 
      slug: 'ai-articles', 
      description: 'AI 技術深度文章與分析',
      order: 1,
      metaTitle: 'AI 文章 | Digital Hedge',
      metaDescription: '探索人工智慧最新技術、應用與趨勢分析'
    },
    { 
      name: '最新消息', 
      slug: 'news', 
      description: '公司與產業最新動態',
      order: 2,
      metaTitle: '最新消息 | Digital Hedge',
      metaDescription: 'Digital Hedge 公司最新動態與產業新聞'
    },
    { 
      name: '產品教學', 
      slug: 'tutorials', 
      description: '產品使用指南與教學',
      order: 3,
      metaTitle: '產品教學 | Digital Hedge',
      metaDescription: 'Digital Hedge 產品使用教學與最佳實踐'
    },
    { 
      name: '案例分享', 
      slug: 'case-studies', 
      description: '客戶成功案例分享',
      order: 4,
      metaTitle: '案例分享 | Digital Hedge',
      metaDescription: '客戶成功案例與 AI 應用實例分享'
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }
  console.log('✅ 分類已建立:', categories.length, '個');

  // ==========================================
  // 3. 建立標籤
  // ==========================================
  const tags = [
    { name: '人工智慧', slug: 'artificial-intelligence', color: '#D4A373' },
    { name: '語音AI', slug: 'voice-ai', color: '#B08968' },
    { name: '機器學習', slug: 'machine-learning', color: '#8B7355' },
    { name: '自然語言處理', slug: 'nlp', color: '#6B5344' },
    { name: '數據分析', slug: 'data-analytics', color: '#4A3728' },
    { name: '民調系統', slug: 'survey-system', color: '#2C2420' },
    { name: '客戶服務', slug: 'customer-service', color: '#E8DDD4' },
    { name: '行銷科技', slug: 'martech', color: '#C4B5A6' },
    { name: '數位轉型', slug: 'digital-transformation', color: '#A09080' },
    { name: '企業應用', slug: 'enterprise', color: '#7C6F60' },
    { name: '產業趨勢', slug: 'industry-trends', color: '#5A5048' },
    { name: '技術解析', slug: 'tech-analysis', color: '#383230' },
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: tag,
      create: tag,
    });
  }
  console.log('✅ 標籤已建立:', tags.length, '個');

  console.log('🎉 種子資料完成！');
}

main()
  .catch((e) => {
    console.error('❌ 種子資料錯誤:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
