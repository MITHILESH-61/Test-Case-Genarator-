import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { env } from '../config/env.js';
import { Project } from '../models/Project.js';
import { ApiError } from '../utils/ApiError.js';
import { extractZip } from '../parsing/zipExtractor.js';
import { scanRepository } from '../parsing/fileScanner.js';
import { detectTechnologies } from '../parsing/techDetector.js';
import { detectRoutes } from '../parsing/routeDetector.js';
import { detectModels, detectServices } from '../parsing/modelDetector.js';
import {
  buildArchitectureSummary,
  buildRepositorySummary,
  summarizeFolderStructure
} from '../parsing/structureSummarizer.js';

const uploadRoot = path.resolve(env.SERVER_ROOT, env.UPLOAD_DIR);

const safeSegment = (value) => String(value || 'repo').replace(/[^a-z0-9._-]/gi, '-').toLowerCase();

const getSingleDirectoryRoot = async (directory) => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory());
  const files = entries.filter((entry) => entry.isFile());

  if (directories.length === 1 && files.length === 0) {
    return path.join(directory, directories[0].name);
  }

  return directory;
};

export const analyzeRepository = async (rootPath) => {
  const scan = await scanRepository(rootPath);
  const technologies = detectTechnologies(scan);
  const routes = detectRoutes(scan);
  const models = detectModels(scan);
  const services = detectServices(scan);
  const folderStructure = summarizeFolderStructure(scan);
  const repositorySummary = buildRepositorySummary({ scan, technologies, routes, models, services });
  const architectureSummary = buildArchitectureSummary({ technologies, routes, models, services });

  return {
    repositorySummary,
    detectedTechnologies: technologies,
    detectedRoutes: routes,
    detectedModels: models,
    detectedServices: services,
    folderStructure,
    architectureSummary
  };
};

const applyAnalysisToProject = async ({ project, rootPath, sourceType, repositoryUrl = project.repositoryUrl }) => {
  const analysisRoot = await getSingleDirectoryRoot(rootPath);
  const analysis = await analyzeRepository(analysisRoot);

  project.set({
    ...analysis,
    sourceType,
    repositoryUrl,
    repositoryPath: analysisRoot
  });

  await project.save();
  return project;
};

export const uploadRepository = async ({ userId, projectId, file }) => {
  if (!file) {
    throw new ApiError(400, 'Repository ZIP file is required');
  }

  const project = await Project.findOne({ _id: projectId, userId });

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const destination = path.join(uploadRoot, safeSegment(userId), safeSegment(projectId), String(Date.now()));
  await extractZip(file.path, destination);
  await fs.rm(file.path, { force: true });

  return applyAnalysisToProject({ project, rootPath: destination, sourceType: 'upload' });
};

const parseGitHubUrl = (repositoryUrl) => {
  const url = new URL(repositoryUrl);
  const [owner, repo] = url.pathname.split('/').filter(Boolean);

  if (!owner || !repo || url.hostname !== 'github.com') {
    throw new ApiError(400, 'Invalid GitHub repository URL');
  }

  return {
    owner,
    repo: repo.replace(/\.git$/i, '')
  };
};

const githubHeaders = () => {
  const headers = {
    Accept: 'application/vnd.github+json'
  };

  if (env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  }

  return headers;
};

export const importGitHubRepository = async ({ userId, projectId, repositoryUrl }) => {
  const project = await Project.findOne({ _id: projectId, userId });

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  const { owner, repo } = parseGitHubUrl(repositoryUrl);
  const repoInfo = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: githubHeaders()
  });
  const branch = repoInfo.data.default_branch || 'main';
  const zipUrl = `https://codeload.github.com/${owner}/${repo}/zip/refs/heads/${branch}`;
  const response = await axios.get(zipUrl, {
    responseType: 'arraybuffer',
    headers: githubHeaders()
  });

  const destination = path.join(uploadRoot, safeSegment(userId), safeSegment(projectId), `github-${Date.now()}`);
  const zipPath = path.join(uploadRoot, 'tmp', `${safeSegment(owner)}-${safeSegment(repo)}-${Date.now()}.zip`);

  await fs.mkdir(path.dirname(zipPath), { recursive: true });
  await fs.writeFile(zipPath, response.data);
  await extractZip(zipPath, destination);
  await fs.rm(zipPath, { force: true });

  return applyAnalysisToProject({
    project,
    rootPath: destination,
    sourceType: 'github',
    repositoryUrl
  });
};
