// src/routes/postRoutes.ts
import { Router } from 'express';
import * as postController from '../controllers/postController';
import { authenticate, optionalAuth, requireEditor } from '../middlewares/authMiddleware';
import { validateBody, validateQuery } from '../middlewares/validateMiddleware';
import { writeLimiter } from '../middlewares/rateLimitMiddleware';
import {
  createPostSchema,
  updatePostSchema,
  listPostsSchema,
} from '../validators/post.schema';

const router = Router();

// 公開路由 (使用 optionalAuth 以支援管理員看草稿)
router.get('/', optionalAuth, validateQuery(listPostsSchema), postController.getAllPosts);
router.get('/:slug', optionalAuth, postController.getPostBySlug);

// 需要編輯權限的路由
router.post('/', authenticate, requireEditor, writeLimiter, validateBody(createPostSchema), postController.createPost);
router.patch('/:id', authenticate, requireEditor, writeLimiter, validateBody(updatePostSchema), postController.updatePost);
router.delete('/:id', authenticate, requireEditor, writeLimiter, postController.deletePost);

export default router;
