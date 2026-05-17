import { create } from 'zustand';
import { projectApi } from '../api/projectApi.js';
import { repositoryApi } from '../api/repositoryApi.js';
import { getApiError } from '../api/axiosClient.js';

export const useProjectStore = create((set) => ({
  projects: [],
  currentProject: null,
  generations: [],
  loading: false,
  error: null,
  fetchProjects: async () => {
    set({ loading: true, error: null });

    try {
      const projects = await projectApi.list();
      set({ projects, loading: false });
      return projects;
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  },
  createProject: async (payload) => {
    set({ loading: true, error: null });

    try {
      const project = await projectApi.create(payload);
      set((state) => ({ projects: [project, ...state.projects], loading: false }));
      return project;
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  },
  fetchProject: async (id) => {
    set({ loading: true, error: null });

    try {
      const { project, generations } = await projectApi.get(id);
      set({ currentProject: project, generations, loading: false });
      return { project, generations };
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  },
  uploadRepository: async ({ projectId, file }) => {
    set({ loading: true, error: null });

    try {
      const project = await repositoryApi.upload({ projectId, file });
      set({ currentProject: project, loading: false });
      return project;
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  },
  importGitHub: async (payload) => {
    set({ loading: true, error: null });

    try {
      const project = await repositoryApi.importGitHub(payload);
      set({ currentProject: project, loading: false });
      return project;
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  },
  prependGeneration: (generation) =>
    set((state) => ({
      generations: [generation, ...state.generations.filter((item) => item._id !== generation._id)]
    })),
  updateGeneration: (generation) =>
    set((state) => ({
      generations: state.generations.map((item) => (item._id === generation._id ? generation : item))
    }))
}));

