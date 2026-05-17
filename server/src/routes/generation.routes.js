import { Router } from 'express';
import * as generationController from '../controllers/generation.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { generateTestsValidator, regenerateTestsValidator } from '../validators/generation.validator.js';

const router = Router();

router.use(authenticate);
router.post('/tests', generateTestsValidator, generationController.generateTests);
router.post('/regenerate', regenerateTestsValidator, generationController.regenerateTests);
router.patch('/:id/feedback', generationController.updateFeedback);
router.patch('/:id', generationController.updateGeneration);

export default router;
