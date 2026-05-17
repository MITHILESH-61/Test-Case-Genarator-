import { required, validate } from '../middlewares/validate.middleware.js';

const validGitHubUrl = (req) => {
  const url = req.body?.repositoryUrl;

  if (!url || !/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(url.trim())) {
    return 'repositoryUrl must be a valid GitHub repository URL';
  }

  return null;
};

export const githubRepositoryValidator = validate([required('projectId'), validGitHubUrl]);

