import { Router } from 'express';
import { generateSitemap, generateRSS } from '../controllers/seoController';

const router = Router();

router.get('/sitemap.xml', generateSitemap);
router.get('/rss', generateRSS);
router.get('/feed', generateRSS); // Alias

export default router;
