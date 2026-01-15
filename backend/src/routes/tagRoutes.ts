// src/routes/tagRoutes.ts
import { Router } from 'express';
import * as tagController from '../controllers/tagController';
import { authenticate, requireAdmin } from '../middlewares/authMiddleware';
import { validateBody } from '../middlewares/validateMiddleware';
import { writeLimiter } from '../middlewares/rateLimitMiddleware';
import {
  createTagSchema,
  updateTagSchema,
} from '../validators/tag.schema';

const router = Router();

// 公開路由
router.get('/', tagController.getAllTags);
router.get('/:slug', tagController.getTagBySlug);

// 需要管理員權限的路由
router.post('/', authenticate, requireAdmin, writeLimiter, validateBody(createTagSchema), tagController.createTag);
router.patch('/:id', authenticate, requireAdmin, writeLimiter, validateBody(updateTagSchema), tagController.updateTag);
router.delete('/:id', authenticate, requireAdmin, writeLimiter, tagController.deleteTag);

export default router;
