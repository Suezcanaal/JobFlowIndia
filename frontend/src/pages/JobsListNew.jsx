import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { 
  Search, 
  Filter, 
  Plus, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Building2,
  ExternalLink,
  Loader2
} from 'lucide-react';

const StatusBadge = ({ status }) => {
  const styles = {
    applied: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    interview: 'bg-amber-50 text-amber-700 border-amber-100',
    offer: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    rejected: 'bg-red-50 text-red-700 border-red-100',
    default: 'bg-slate-50 text-slate-700 border-slate-100'
  };
  
  const className = styles[status] || styles.default;
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${className} capitalize`}>
      {status}
    </span>
  );
};

const JobsListNew = () => {
  const { jobs, fetchJobs, loading } = useJobs();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  // Filter Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.company?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.position?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const uniqueStatuses = ['All', ...new Set(jobs.map(j => j.status))];

  if (loading && jobs.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Applications</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Manage and track all your job opportunities in one place.
          </p>
        </div>
        <button 
          onClick={() => navigate('/jobs/new')}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus size={18} />
          Track New Job
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by company or role..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-900 dark:text-white"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {uniqueStatuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${
                filterStatus === status
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="capitalize">{status}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 border-dashed">
          <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No jobs found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
          {jobs.length === 0 && (
             <button onClick={() => navigate('/jobs/new')} className="mt-4 text-primary font-medium hover:underline">
               Add your first job application
             </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <div 
              key={job._id}
              onClick={() => navigate(`/jobs/${job._id}/edit`)}
              className="group bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-300">
                    {job.company?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight group-hover:text-primary transition-colors">
                      {job.company}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                      <Building2 size={12} />
                      {job.location || 'Remote'}
                    </p>
                  </div>
                </div>
                <StatusBadge status={job.status} />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Briefcase size={16} className="text-gray-400" />
                  <span className="font-medium">{job.position}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} className="text-gray-400" />
                  Applied: {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-sm">
                <span className="text-gray-400 text-xs">ID: {job._id.slice(-6)}</span>
                <span className="text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ExternalLink size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsListNew;