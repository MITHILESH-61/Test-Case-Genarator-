import { Router } from 'express';
import authRoutes from './auth.routes.js';
import projectRoutes from './project.routes.js';
import repositoryRoutes from './repository.routes.js';
import generationRoutes from './generation.routes.js';
import chatRoutes from './chat.routes.js';
import exportRoutes from './export.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/repositories', repositoryRoutes);
router.use('/generate', generationRoutes);
router.use('/chat', chatRoutes);
router.use('/export', exportRoutes);

export default router;

