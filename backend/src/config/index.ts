// src/config/index.ts

export const config = {
  // Server
  port: parseInt(process.env.PORT || '8080'),
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  databaseUrl: process.env.DATABASE_URL || '',

  // JWT
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'your-access-secret-change-in-production',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-change-in-production',
    accessExpiresIn: '15m',
    refreshExpiresIn: '7d',
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || 'https://digitalhedge.ai',
    credentials: true,
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute
  },

  // Password Policy
  password: {
    minLength: 8,
    saltRounds: 12,
    maxFailedAttempts: 5,
    lockDuration: 15 * 60 * 1000, // 15 minutes
  },

  // Email (Resend)
  email: {
    apiKey: process.env.RESEND_API_KEY || '',
    from: process.env.EMAIL_FROM || 'noreply@digitalhedge.ai',
  },

  // Contact Form
  contactEmail: process.env.CONTACT_EMAIL || 'alexma@goldenraintree.tw',

  // OpenAI (for AI content generation)
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },

  // Frontend URL (for email links)
  frontendUrl: process.env.FRONTEND_URL || 'https://digitalhedge.ai',

  // Retell AI (Voice Agent)
  retell: {
    apiKey: process.env.RETELL_API_KEY || '',
    agentId: process.env.RETELL_AGENT_ID || '',
  },
};
