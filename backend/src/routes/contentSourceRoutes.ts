// src/routes/contentSourceRoutes.ts
import { Router } from 'express';
import {
    getContentSources,
    createContentSource,
    updateContentSource,
    deleteContentSource,
    getFetchedContent,
    updateFetchedContentStatus,
    triggerFetch,
    triggerProcess,
    triggerPublish,
    triggerAutoPublish,
    getAppSettings,
    updateAppSettings,
} from '../controllers/contentSourceController';
import { authenticate, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(requireRole('MASTER', 'ADMIN'));

// Content Sources CRUD
router.get('/sources', getContentSources);
router.post('/sources', createContentSource);
router.patch('/sources/:id', updateContentSource);
router.delete('/sources/:id', deleteContentSource);

// Fetched Content
router.get('/fetched', getFetchedContent);
router.patch('/fetched/:id/status', updateFetchedContentStatus);

// Actions
router.post('/actions/fetch', triggerFetch);
router.post('/actions/process', triggerProcess);
router.post('/actions/publish', triggerPublish);
router.post('/actions/auto-publish', triggerAutoPublish);

// App Settings
router.get('/settings', getAppSettings);
router.patch('/settings', updateAppSettings);

export default router;
