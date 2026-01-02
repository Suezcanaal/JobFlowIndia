import axiosClient from './axiosClient';

export const jobApi = {
  getJobs: async (params = {}) => {
    const response = await axiosClient.get('/jobs', { params });
    return response.data;
  },

  getJob: async (id) => {
    const response = await axiosClient.get(`/jobs/${id}`);
    return response.data;
  },

  createJob: async (jobData) => {
    const response = await axiosClient.post('/jobs', jobData);
    return response.data;
  },

  updateJob: async (id, jobData) => {
    const response = await axiosClient.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  deleteJob: async (id) => {
    const response = await axiosClient.delete(`/jobs/${id}`);
    return response.data;
  },

  getJobStats: async () => {
    const response = await axiosClient.get('/jobs/stats');
    return response.data;
  }
};