import { create } from 'zustand';
import { authApi } from '../api/authApi.js';
import { clearToken, getToken, setToken } from '../utils/storage.js';
import { getApiError } from '../api/axiosClient.js';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: getToken(),
  loading: false,
  error: null,
  signup: async (payload) => {
    set({ loading: true, error: null });

    try {
      const { user, token } = await authApi.signup(payload);
      setToken(token);
      set({ user, token, loading: false });
      return user;
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  },
  login: async (payload) => {
    set({ loading: true, error: null });

    try {
      const { user, token } = await authApi.login(payload);
      setToken(token);
      set({ user, token, loading: false });
      return user;
    } catch (error) {
      set({ error: getApiError(error), loading: false });
      throw error;
    }
  },
  logout: async () => {
    try {
      if (get().token) {
        await authApi.logout();
      }
    } finally {
      clearToken();
      set({ user: null, token: null });
    }
  },
  loadMe: async () => {
    if (!get().token) return null;
    set({ loading: true, error: null });

    try {
      const { user } = await authApi.me();
      set({ user, loading: false });
      return user;
    } catch (error) {
      clearToken();
      set({ user: null, token: null, loading: false, error: getApiError(error) });
      return null;
    }
  }
}));

