// src/routes/index.ts
import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import postRoutes from './postRoutes';
import categoryRoutes from './categoryRoutes';
import tagRoutes from './tagRoutes';
import contactRoutes from './contactRoutes';
import contentSourceRoutes from './contentSourceRoutes';
import seoRoutes from './seoRoutes';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/categories', categoryRoutes);
router.use('/tags', tagRoutes);
router.use('/contact', contactRoutes);
router.use('/content', contentSourceRoutes);
router.use('/seo', seoRoutes);

export default router;
