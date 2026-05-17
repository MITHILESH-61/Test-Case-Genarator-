import { Router } from 'express';
import * as repositoryController from '../controllers/repository.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { uploadZip } from '../middlewares/upload.middleware.js';
import { githubRepositoryValidator } from '../validators/repository.validator.js';

const router = Router();

router.use(authenticate);
router.post('/upload', uploadZip, repositoryController.uploadRepository);
router.post('/github', githubRepositoryValidator, repositoryController.importGitHubRepository);

export default router;

