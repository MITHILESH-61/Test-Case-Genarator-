import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as chatService from '../services/chat.service.js';

export const createChatResponse = asyncHandler(async (req, res) => {
  const chat = await chatService.createChatResponse({
    userId: req.user._id,
    projectId: req.body.projectId,
    userMessage: req.body.userMessage
  });

  sendSuccess(res, { chat }, 'Assistant response created', 201);
});

export const listChats = asyncHandler(async (req, res) => {
  const chats = await chatService.listProjectChats({
    userId: req.user._id,
    projectId: req.params.projectId
  });

  sendSuccess(res, { chats }, 'Chats loaded');
});

