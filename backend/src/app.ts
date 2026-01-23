// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import { prisma } from './config/database';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/errorMiddleware';
import { generalLimiter } from './middlewares/rateLimitMiddleware';
import { initCronJobs } from './services/cronService';

const app = express();

// ==========================================
// Security Middlewares
// ==========================================

// Helmet - 安全標頭
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// CORS
const allowedOrigins = [
  'https://digitalhedge.ai',
  'https://www.digitalhedge.ai',
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate Limiting
app.use(generalLimiter);

// ==========================================
// Body Parsing
// ==========================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ==========================================
// Trust Proxy (for rate limiting behind reverse proxy)
// ==========================================
app.set('trust proxy', 1);

// ==========================================
// API Routes
// ==========================================
app.use('/api', routes);

// ==========================================
// Error Handling
// ==========================================
app.use(notFoundHandler);
app.use(errorHandler);

// ==========================================
// Server Start
// ==========================================
async function main() {
  try {
    // 測試資料庫連線
    await prisma.$connect();
    console.log('✅ Database connected');

    // Initialize Cron Jobs
    initCronJobs();

    app.listen(config.port, () => {
      console.log(`
╔════════════════════════════════════════════════╗
║                                                ║
║   🚀 Digital Hedge API Server                  ║
║                                                ║
║   Port: ${config.port}                               ║
║   Env:  ${config.nodeEnv.padEnd(15)}               ║
║                                                ║
║   API:  http://localhost:${config.port}/api            ║
║   Health: http://localhost:${config.port}/api/health   ║
║                                                ║
╚════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

main();

export default app;
