import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess } from '../utils/response.js';
import * as projectService from '../services/project.service.js';

export const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.createProject(req.user._id, req.body);
  sendSuccess(res, { project }, 'Project created', 201);
});

export const listProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.listProjects(req.user._id);
  sendSuccess(res, { projects }, 'Projects loaded');
});

export const getProject = asyncHandler(async (req, res) => {
  const result = await projectService.getProjectDetails(req.user._id, req.params.id);
  sendSuccess(res, result, 'Project loaded');
});

