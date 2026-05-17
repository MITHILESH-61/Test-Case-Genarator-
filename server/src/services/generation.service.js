import { Generation } from '../models/Generation.js';
import { ApiError } from '../utils/ApiError.js';
import { getOwnedProject } from './project.service.js';
import { generateTestContent } from '../ai/testGenerator.js';
import { buildRegenerationGoal } from '../ai/generationRefiner.js';
import { retrieveSimilarMemory } from '../embeddings/memoryRetriever.js';
import { storeEmbedding } from '../embeddings/embedding.service.js';

const estimateQualityScore = (content, memories) => {
  const sections = ['Unit', 'Integration', 'Edge', 'Negative', 'Mock', 'Expected'].filter((term) =>
    content.toLowerCase().includes(term.toLowerCase())
  ).length;
  const lengthScore = Math.min(35, Math.round(content.length / 120));
  const memoryScore = Math.min(10, memories.length * 3);

  return Math.min(100, 45 + sections * 5 + lengthScore + memoryScore);
};

export const generateTests = async ({ userId, projectId, goal, inputSnippet = '', instructions = '', generationType = 'test-suite' }) => {
  const project = await getOwnedProject(userId, projectId);
  const memoryQuery = [goal, inputSnippet, instructions].filter(Boolean).join('\n');
  const memories = await retrieveSimilarMemory({ userId, projectId, query: memoryQuery });
  const generatedContent = await generateTestContent({
    project,
    goal,
    inputSnippet,
    instructions,
    memories
  });
  const generation = await Generation.create({
    userId,
    projectId,
    generationType,
    goal,
    inputSnippet,
    instructions,
    generatedContent,
    qualityScore: estimateQualityScore(generatedContent, memories),
    retrievedContext: memories.map((memory) => memory.content.slice(0, 1000))
  });

  await storeEmbedding({
    userId,
    projectId,
    generationId: generation._id,
    content: `${goal}\n${instructions}\n${generatedContent}`,
    metadata: {
      generationType,
      qualityScore: generation.qualityScore
    }
  });

  return generation;
};

export const regenerateTests = async ({ userId, generationId, instructions = '' }) => {
  const previous = await Generation.findOne({ _id: generationId, userId });

  if (!previous) {
    throw new ApiError(404, 'Generation not found');
  }

  return generateTests({
    userId,
    projectId: previous.projectId,
    generationType: previous.generationType,
    goal: buildRegenerationGoal(previous, instructions),
    inputSnippet: previous.inputSnippet,
    instructions: instructions || previous.instructions
  });
};

export const updateGenerationFeedback = async ({ userId, generationId, feedback }) => {
  const generation = await Generation.findOne({ _id: generationId, userId });

  if (!generation) {
    throw new ApiError(404, 'Generation not found');
  }

  generation.feedback = {
    status: feedback.status || generation.feedback?.status || 'pending',
    rating: feedback.rating || generation.feedback?.rating,
    comment: feedback.comment ?? generation.feedback?.comment
  };

  if (feedback.rating) {
    generation.qualityScore = Math.min(100, Math.max(0, generation.qualityScore + Number(feedback.rating) * 2));
  }

  await generation.save();
  return generation;
};

export const updateGenerationContent = async ({ userId, generationId, generatedContent }) => {
  const generation = await Generation.findOne({ _id: generationId, userId });

  if (!generation) {
    throw new ApiError(404, 'Generation not found');
  }

  if (!generatedContent?.trim()) {
    throw new ApiError(400, 'generatedContent is required');
  }

  generation.generatedContent = generatedContent;
  await generation.save();

  await storeEmbedding({
    userId,
    projectId: generation.projectId,
    generationId: generation._id,
    content: `${generation.goal}\n${generation.instructions || ''}\n${generatedContent}`,
    metadata: {
      generationType: generation.generationType,
      edited: true,
      qualityScore: generation.qualityScore
    }
  });

  return generation;
};
