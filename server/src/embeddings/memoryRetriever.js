import { Embedding } from '../models/Embedding.js';
import { createEmbeddingVector } from './embedding.service.js';
import { cosineSimilarity } from './similarity.service.js';

export const retrieveSimilarMemory = async ({ userId, projectId, query, limit = 4 }) => {
  const queryEmbedding = createEmbeddingVector(query);
  const memories = await Embedding.find({ userId, projectId }).sort({ createdAt: -1 }).limit(100);

  return memories
    .map((memory) => ({
      memory,
      score: cosineSimilarity(queryEmbedding, memory.embedding)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => ({
      score: Number(item.score.toFixed(3)),
      content: item.memory.content,
      metadata: item.memory.metadata
    }));
};

