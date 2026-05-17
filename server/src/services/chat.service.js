import { Chat } from '../models/Chat.js';
import { Generation } from '../models/Generation.js';
import { ApiError } from '../utils/ApiError.js';
import { getOwnedProject } from './project.service.js';
import { retrieveSimilarMemory } from '../embeddings/memoryRetriever.js';
import { answerProjectChat } from '../ai/chatAssistant.js';

export const createChatResponse = async ({ userId, projectId, userMessage }) => {
  if (!userMessage?.trim()) {
    throw new ApiError(400, 'userMessage is required');
  }

  const project = await getOwnedProject(userId, projectId);
  const memories = await retrieveSimilarMemory({ userId, projectId, query: userMessage, limit: 5 });
  const recentGenerations = await Generation.find({ userId, projectId }).sort({ createdAt: -1 }).limit(3);
  const assistantMessage = await answerProjectChat({
    project,
    userMessage,
    memories,
    recentGenerations
  });

  return Chat.create({
    userId,
    projectId,
    userMessage,
    assistantMessage
  });
};

export const listProjectChats = async ({ userId, projectId }) => {
  await getOwnedProject(userId, projectId);

  return Chat.find({ userId, projectId }).sort({ createdAt: 1 }).limit(100);
};

