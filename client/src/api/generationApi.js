import { axiosClient } from './axiosClient.js';

export const generationApi = {
  generate(payload) {
    return axiosClient.post('/generate/tests', payload).then((response) => response.data.data.generation);
  },
  regenerate(payload) {
    return axiosClient.post('/generate/regenerate', payload).then((response) => response.data.data.generation);
  },
  feedback(id, payload) {
    return axiosClient.patch(`/generate/${id}/feedback`, payload).then((response) => response.data.data.generation);
  },
  update(id, payload) {
    return axiosClient.patch(`/generate/${id}`, payload).then((response) => response.data.data.generation);
  }
};

