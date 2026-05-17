import { Project } from '../models/Project.js';
import { Generation } from '../models/Generation.js';
import { ApiError } from '../utils/ApiError.js';

export const createProject = async (userId, payload) => {
  return Project.create({
    userId,
    projectName: payload.projectName,
    repositoryUrl: payload.repositoryUrl || '',
    sourceType: payload.repositoryUrl ? 'github' : 'manual'
  });
};

export const listProjects = async (userId) => {
  const projects = await Project.find({ userId }).sort({ updatedAt: -1 });
  const generationCounts = await Generation.aggregate([
    { $match: { userId } },
    { $group: { _id: '$projectId', count: { $sum: 1 } } }
  ]);
  const countsByProject = new Map(generationCounts.map((item) => [item._id.toString(), item.count]));

  return projects.map((project) => ({
    ...project.toObject(),
    generationCount: countsByProject.get(project._id.toString()) || 0
  }));
};

export const getOwnedProject = async (userId, projectId) => {
  const project = await Project.findOne({ _id: projectId, userId });

  if (!project) {
    throw new ApiError(404, 'Project not found');
  }

  return project;
};

export const getProjectDetails = async (userId, projectId) => {
  const project = await getOwnedProject(userId, projectId);
  const generations = await Generation.find({ userId, projectId }).sort({ createdAt: -1 }).limit(25);

  return {
    project,
    generations
  };
};

