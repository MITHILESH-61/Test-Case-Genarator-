import { axiosClient } from './axiosClient.js';

export const repositoryApi = {
  upload({ projectId, file }) {
    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('repository', file);

    return axiosClient
      .post('/repositories/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((response) => response.data.data.project);
  },
  importGitHub(payload) {
    return axiosClient.post('/repositories/github', payload).then((response) => response.data.data.project);
  }
};

