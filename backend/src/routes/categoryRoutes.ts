// src/routes/categoryRoutes.ts
import { Router } from 'express';
import * as categoryController from '../controllers/categoryController';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';
import { validateBody } from '../middlewares/validateMiddleware';
import { writeLimiter } from '../middlewares/rateLimitMiddleware';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../validators/category.schema';

const router = Router();

// 公開路由
router.get('/', categoryController.getAllCategories);
router.get('/:slug', categoryController.getCategoryBySlug);

// 需要管理員權限的路由
router.post('/', authenticate, requireAdmin, writeLimiter, validateBody(createCategorySchema), categoryController.createCategory);
router.patch('/:id', authenticate, requireAdmin, writeLimiter, validateBody(updateCategorySchema), categoryController.updateCategory);
router.delete('/:id', authenticate, requireAdmin, writeLimiter, categoryController.deleteCategory);

export default router;
