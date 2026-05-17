import { createGroqChatCompletion } from './groqClient.js';
import { buildChatMessages } from './promptBuilder.js';

const fallbackChat = ({ project, userMessage, memories, recentGenerations }) => {
  return [
    `I reviewed the available context for ${project?.projectName || 'this project'}.`,
    `Your question: ${userMessage}`,
    memories.length
      ? `I found ${memories.length} related historical generation(s), so future output should reuse those patterns.`
      : 'No closely related historical generation was found yet.',
    recentGenerations.length
      ? 'The most useful next step is to compare the latest generated assertions against the detected routes, models, and validation paths.'
      : 'Generate an initial test suite first, then I can explain gaps and refine assertions with more precision.'
  ].join('\n\n');
};

export const answerProjectChat = async (payload) => {
  const messages = buildChatMessages(payload);
  const aiContent = await createGroqChatCompletion(messages);

  return aiContent || fallbackChat(payload);
};

