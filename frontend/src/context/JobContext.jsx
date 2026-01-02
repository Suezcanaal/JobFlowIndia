import React, { createContext, useContext, useReducer } from 'react';
import { jobApi } from '../api/jobApi';
import toast from 'react-hot-toast';

const JobContext = createContext();

const initialState = {
  jobs: [],
  currentJob: null,
  stats: null,
  loading: false,
  error: null,
  filters: {
    status: '',
    jobType: '',
    source: '',
    priority: '',
    search: ''
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    total: 0
  }
};

const jobReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_JOBS':
      return { 
        ...state, 
        jobs: action.payload.jobs,
        pagination: {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          total: action.payload.total
        },
        loading: false 
      };
    case 'SET_CURRENT_JOB':
      return { ...state, currentJob: action.payload, loading: false };
    case 'ADD_JOB':
      return { ...state, jobs: [action.payload, ...state.jobs], loading: false };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(job => job._id === action.payload._id ? action.payload : job),
        currentJob: action.payload,
        loading: false
      };
    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter(job => job._id !== action.payload),
        loading: false
      };
    case 'SET_STATS':
      return { ...state, stats: action.payload, loading: false };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const JobProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);

  const fetchJobs = async (params = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await jobApi.getJobs({ ...state.filters, ...params });
      dispatch({ type: 'SET_JOBS', payload: data });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch jobs';
      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
    }
  };

  const fetchJob = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const job = await jobApi.getJob(id);
      dispatch({ type: 'SET_CURRENT_JOB', payload: job });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch job';
      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
    }
  };

  const createJob = async (jobData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const job = await jobApi.createJob(jobData);
      dispatch({ type: 'ADD_JOB', payload: job });
      toast.success('Job created successfully!');
      return job;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create job';
      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
      throw error;
    }
  };

  const updateJob = async (id, jobData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const job = await jobApi.updateJob(id, jobData);
      dispatch({ type: 'UPDATE_JOB', payload: job });
      toast.success('Job updated successfully!');
      return job;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update job';
      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
      throw error;
    }
  };

  const deleteJob = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await jobApi.deleteJob(id);
      dispatch({ type: 'DELETE_JOB', payload: id });
      toast.success('Job deleted successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete job';
      dispatch({ type: 'SET_ERROR', payload: message });
      toast.error(message);
    }
  };

  const fetchStats = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const stats = await jobApi.getJobStats();
      dispatch({ type: 'SET_STATS', payload: stats });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch statistics';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    fetchJobs,
    fetchJob,
    createJob,
    updateJob,
    deleteJob,
    fetchStats,
    setFilters,
    clearError
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};