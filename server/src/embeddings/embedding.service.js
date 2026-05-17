import { Embedding } from '../models/Embedding.js';

const DIMENSIONS = 128;

const hashToken = (token) => {
  let hash = 0;

  for (let index = 0; index < token.length; index += 1) {
    hash = (hash * 31 + token.charCodeAt(index)) >>> 0;
  }

  return hash;
};

export const createEmbeddingVector = (content = '') => {
  const vector = new Array(DIMENSIONS).fill(0);
  const tokens = String(content).toLowerCase().match(/[a-z0-9_.$/-]+/g) || [];

  for (const token of tokens) {
    const index = hashToken(token) % DIMENSIONS;
    vector[index] += 1;
  }

  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
  return vector.map((value) => Number((value / magnitude).toFixed(6)));
};

export const storeEmbedding = async ({ userId, projectId, generationId, content, metadata = {} }) => {
  const embedding = createEmbeddingVector(content);

  return Embedding.create({
    userId,
    projectId,
    generationId,
    embedding,
    content,
    metadata
  });
};

