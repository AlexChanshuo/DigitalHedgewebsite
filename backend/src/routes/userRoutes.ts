// src/routes/userRoutes.ts
import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticate, requireAdmin, requireMaster } from '../middlewares/authMiddleware';
import { validateBody } from '../middlewares/validateMiddleware';
import { writeLimiter } from '../middlewares/rateLimitMiddleware';
import {
  createUserSchema,
  updateUserSchema,
  updateUserRoleSchema,
  updateUserStatusSchema,
} from '../validators/user.schema';

const router = Router();

// 所有路由都需要認證
router.use(authenticate);

// 取得所有使用者 (管理員)
router.get('/', requireAdmin, userController.getAllUsers);

// 取得單一使用者
router.get('/:id', userController.getUserById);

// 建立使用者 (管理員)
router.post('/', requireAdmin, writeLimiter, validateBody(createUserSchema), userController.createUser);

// 更新使用者資料
router.patch('/:id', writeLimiter, validateBody(updateUserSchema), userController.updateUser);

// 更新使用者角色 (僅 MASTER)
router.patch('/:id/role', requireMaster, writeLimiter, validateBody(updateUserRoleSchema), userController.updateUserRole);

// 更新使用者狀態 (管理員)
router.patch('/:id/status', requireAdmin, writeLimiter, validateBody(updateUserStatusSchema), userController.updateUserStatus);

// 刪除使用者 (僅 MASTER)
router.delete('/:id', requireMaster, writeLimiter, userController.deleteUser);

export default router;
