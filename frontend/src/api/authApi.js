import axiosClient from './axiosClient';

export const authApi = {
  register: async (userData) => {
    const response = await axiosClient.post('/auth/register', userData);
    return response.data;
  },

  verifyOTP: async (otpData) => {
    const response = await axiosClient.post('/auth/verify-otp', otpData);
    return response.data;
  },

  resendOTP: async (userData) => {
    const response = await axiosClient.post('/auth/resend-otp', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axiosClient.post('/auth/login', credentials);
    return response.data;
  },

  googleAuth: async (googleData) => {
    const response = await axiosClient.post('/auth/google', googleData);
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosClient.get('/auth/profile');
    return response.data;
  }
};