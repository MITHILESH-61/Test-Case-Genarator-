import { create } from 'zustand';
import { generationApi } from '../api/generationApi.js';
import { getApiError } from '../api/axiosClient.js';

export const useGenerationStore = create((set) => ({
  activeGeneration: null,
  loading: false,
  error: null,
  generate: async (payload) => {
    set({ loading: true, error: null });

    try {
      const generation = await generationApi.generate(payload);
      set({ activeGeneration: generation, loading: false });
      return generation;
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  },
  regenerate: async (payload) => {
    set({ loading: true, error: null });

    try {
      const generation = await generationApi.regenerate(payload);
      set({ activeGeneration: generation, loading: false });
      return generation;
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  },
  saveFeedback: async (id, payload) => {
    set({ loading: true, error: null });

    try {
      const generation = await generationApi.feedback(id, payload);
      set({ activeGeneration: generation, loading: false });
      return generation;
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  },
  updateContent: async (id, payload) => {
    set({ loading: true, error: null });

    try {
      const generation = await generationApi.update(id, payload);
      set({ activeGeneration: generation, loading: false });
      return generation;
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  },
  setActiveGeneration: (generation) => set({ activeGeneration: generation })
}));

