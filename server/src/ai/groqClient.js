import OpenAI from 'openai';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

let client;

const getClient = () => {
  if (!env.GROQ_API_KEY) {
    return null;
  }

  if (!client) {
    client = new OpenAI({
      apiKey: env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1'
    });
  }

  return client;
};

export const createGroqChatCompletion = async (messages) => {
  const groq = getClient();

  if (!groq) {
    return null;
  }

  try {
    const completion = await groq.chat.completions.create({
      model: env.GROQ_MODEL,
      messages,
      temperature: 0.2,
      max_tokens: 3000
    });

    return completion.choices?.[0]?.message?.content || null;
  } catch (error) {
    logger.warn('Groq request failed; using local fallback', error.message);
    return null;
  }
};

