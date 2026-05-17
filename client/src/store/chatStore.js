import { create } from 'zustand';
import { chatApi } from '../api/chatApi.js';
import { getApiError } from '../api/axiosClient.js';

export const useChatStore = create((set) => ({
  chats: [],
  loading: false,
  error: null,
  fetchChats: async (projectId) => {
    set({ loading: true, error: null });

    try {
      const chats = await chatApi.list(projectId);
      set({ chats, loading: false });
      return chats;
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  },
  sendMessage: async (payload) => {
    set({ loading: true, error: null });

    try {
      const chat = await chatApi.send(payload);
      set((state) => ({ chats: [...state.chats, chat], loading: false }));
      return chat;
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  }
}));

