import { axiosClient } from './axiosClient.js';

export const chatApi = {
  send(payload) {
    return axiosClient.post('/chat', payload).then((response) => response.data.data.chat);
  },
  list(projectId) {
    return axiosClient.get(`/chat/${projectId}`).then((response) => response.data.data.chats);
  }
};

