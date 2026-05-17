import { Router } from 'express';
import * as chatController from '../controllers/chat.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { required, validate } from '../middlewares/validate.middleware.js';

const router = Router();

router.use(authenticate);
router.post('/', validate([required('projectId'), required('userMessage')]), chatController.createChatResponse);
router.get('/:projectId', chatController.listChats);

export default router;

