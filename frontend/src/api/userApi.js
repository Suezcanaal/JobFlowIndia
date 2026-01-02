import axiosClient from './axiosClient';

export const userApi = {
  updateProfile: async (userData) => {
    const response = await axiosClient.put('/users/profile', userData);
    return response.data;
  },

  deleteAccount: async () => {
    const response = await axiosClient.delete('/users/profile');
    return response.data;
  }
};