import { Router } from 'express';
import * as exportController from '../controllers/export.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);
router.get('/markdown/:projectId', exportController.exportMarkdown);
router.get('/pdf/:projectId', exportController.exportPdf);
router.get('/json/:projectId', exportController.exportJson);

export default router;

