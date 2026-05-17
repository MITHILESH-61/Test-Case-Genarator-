import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as repositoryService from '../services/repository.service.js';

export const uploadRepository = asyncHandler(async (req, res) => {
  const project = await repositoryService.uploadRepository({
    userId: req.user._id,
    projectId: req.body.projectId,
    file: req.file
  });

  sendSuccess(res, { project }, 'Repository uploaded and analyzed');
});

export const importGitHubRepository = asyncHandler(async (req, res) => {
  const project = await repositoryService.importGitHubRepository({
    userId: req.user._id,
    projectId: req.body.projectId,
    repositoryUrl: req.body.repositoryUrl
  });

  sendSuccess(res, { project }, 'GitHub repository imported and analyzed');
});

