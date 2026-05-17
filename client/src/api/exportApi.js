import { axiosClient } from './axiosClient.js';

export const exportApi = {
  url(type, projectId) {
    const baseURL = axiosClient.defaults.baseURL || '';
    return `${baseURL}/export/${type}/${projectId}`;
  },
  async download(type, projectId) {
    const response = await axiosClient.get(`/export/${type}/${projectId}`, {
      responseType: 'blob'
    });
    const extension = type === 'markdown' ? 'md' : type;
    const blob = new Blob([response.data], {
      type: response.headers['content-type'] || 'application/octet-stream'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `project-${projectId}-tests.${extension}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  },
  json(projectId) {
    return axiosClient.get(`/export/json/${projectId}`).then((response) => response.data.data);
  }
};
