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

// Helmet - security headers with CSP for WebRTC (SEC-05)
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",  // Required for Tailwind CDN and inline scripts
        "https://cdn.tailwindcss.com",
        "https://cdn.retellai.com",
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",  // Required for Tailwind and inline styles
        "https://fonts.googleapis.com",
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "blob:",
      ],
      connectSrc: [
        "'self'",
        "wss://*.livekit.cloud",      // LiveKit WebSocket (Retell uses LiveKit)
        "https://api.retellai.com",   // Retell API
        "https://*.retellai.com",     // Retell services
      ],
      mediaSrc: [
        "'self'",
        "blob:",
      ],
      workerSrc: [
        "'self'",
        "blob:",
      ],
    },
  },
}));

// CORS
const allowedOrigins = [
  'https://digitalhedge.ai',
  'https://www.digitalhedge.ai',
  'https://painpoint-ai.com',
  'https://www.painpoint-ai.com',
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
// Environment Validation (SEC-02)
// ==========================================
function validateEnvSecrets() {
  const errors: string[] = [];

  // JWT secrets
  if (!process.env.JWT_ACCESS_SECRET ||
      process.env.JWT_ACCESS_SECRET === 'your-access-secret-change-in-production') {
    errors.push('JWT_ACCESS_SECRET');
  }
  if (!process.env.JWT_REFRESH_SECRET ||
      process.env.JWT_REFRESH_SECRET === 'your-refresh-secret-change-in-production') {
    errors.push('JWT_REFRESH_SECRET');
  }

  // Retell API key (required for voice features)
  if (!process.env.RETELL_API_KEY) {
    errors.push('RETELL_API_KEY');
  }

  if (errors.length > 0) {
    console.error('FATAL: Missing or invalid environment secrets:', errors.join(', '));
    console.error('Server cannot start without properly configured secrets.');
    process.exit(1);
  }
}

// ==========================================
// Server Start
// ==========================================
async function main() {
  try {
    // Validate required secrets before anything else (SEC-02)
    validateEnvSecrets();

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
