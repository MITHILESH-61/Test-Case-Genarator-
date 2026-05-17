import { Router } from 'express';
import * as projectController from '../controllers/project.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { createProjectValidator } from '../validators/project.validator.js';

const router = Router();

router.use(authenticate);
router.post('/', createProjectValidator, projectController.createProject);
router.get('/', projectController.listProjects);
router.get('/:id', projectController.getProject);

export default router;

