import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authApi } from '../api/authApi';
import toast from 'react-hot-toast';

const AuthContext = createContext();
export { AuthContext }; // <-- add this

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null
};


const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, loading: true, error: null };
    case 'AUTH_SUCCESS':
      return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
    case 'AUTH_FAIL':
      return { ...state, loading: false, error: action.payload, user: null, token: null };
    case 'LOGOUT':
      return { ...state, user: null, token: null, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      dispatch({ type: 'AUTH_FAIL', payload: null });
    }
  }, []);

  const loadUser = async () => {
    try {
      const user = await authApi.getProfile();
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token: state.token } });
    } catch (error) {
      dispatch({ type: 'AUTH_FAIL', payload: error.response?.data?.message });
      localStorage.removeItem('token');
    }
  };

  const login = async (email, password) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const data = await authApi.login({ email, password });
      localStorage.setItem('token', data.token);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user: data, token: data.token } });
      toast.success('Login successful!');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'AUTH_FAIL', payload: message });
      toast.error(message);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const data = await authApi.register({ name, email, password });
      // Don't set token yet, wait for OTP verification
      dispatch({ type: 'AUTH_FAIL', payload: null });
      toast.success('Registration successful! Please check your email.');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'AUTH_FAIL', payload: message });
      toast.error(message);
      throw error;
    }
  };

  const verifyOTP = async (userId, otp) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const data = await authApi.verifyOTP({ userId, otp });
      localStorage.setItem('token', data.token);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user: data, token: data.token } });
      toast.success('Email verified successfully!');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Verification failed';
      dispatch({ type: 'AUTH_FAIL', payload: message });
      toast.error(message);
      throw error;
    }
  };

  const resendOTP = async (userId) => {
    try {
      await authApi.resendOTP({ userId });
      toast.success('OTP sent successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to resend OTP';
      toast.error(message);
      throw error;
    }
  };

  const googleLogin = async (googleData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      const data = await authApi.googleAuth(googleData);
      localStorage.setItem('token', data.token);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user: data, token: data.token } });
      toast.success('Google login successful!');
      return data;
    } catch (error) {
      const message = error.response?.data?.message || 'Google login failed';
      dispatch({ type: 'AUTH_FAIL', payload: message });
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    verifyOTP,
    resendOTP,
    googleLogin,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};