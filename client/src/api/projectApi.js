import { axiosClient } from './axiosClient.js';

export const projectApi = {
  create(payload) {
    return axiosClient.post('/projects', payload).then((response) => response.data.data.project);
  },
  list() {
    return axiosClient.get('/projects').then((response) => response.data.data.projects);
  },
  get(id) {
    return axiosClient.get(`/projects/${id}`).then((response) => response.data.data);
  }
};

