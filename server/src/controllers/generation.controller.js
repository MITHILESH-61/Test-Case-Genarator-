import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as generationService from '../services/generation.service.js';

export const generateTests = asyncHandler(async (req, res) => {
  const generation = await generationService.generateTests({
    userId: req.user._id,
    ...req.body
  });

  sendSuccess(res, { generation }, 'Tests generated', 201);
});

export const regenerateTests = asyncHandler(async (req, res) => {
  const generation = await generationService.regenerateTests({
    userId: req.user._id,
    generationId: req.body.generationId,
    instructions: req.body.instructions
  });

  sendSuccess(res, { generation }, 'Tests regenerated', 201);
});

export const updateFeedback = asyncHandler(async (req, res) => {
  const generation = await generationService.updateGenerationFeedback({
    userId: req.user._id,
    generationId: req.params.id,
    feedback: req.body
  });

  sendSuccess(res, { generation }, 'Feedback saved');
});

export const updateGeneration = asyncHandler(async (req, res) => {
  const generation = await generationService.updateGenerationContent({
    userId: req.user._id,
    generationId: req.params.id,
    generatedContent: req.body.generatedContent
  });

  sendSuccess(res, { generation }, 'Generation updated');
});
