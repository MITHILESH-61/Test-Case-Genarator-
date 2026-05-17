import { axiosClient } from './axiosClient.js';

export const authApi = {
  signup(payload) {
    return axiosClient.post('/auth/signup', payload).then((response) => response.data.data);
  },
  login(payload) {
    return axiosClient.post('/auth/login', payload).then((response) => response.data.data);
  },
  logout() {
    return axiosClient.post('/auth/logout').then((response) => response.data);
  },
  me() {
    return axiosClient.get('/auth/me').then((response) => response.data.data);
  }
};

