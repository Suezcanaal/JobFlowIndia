import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';

const JobsList = () => {
  const { 
    jobs, 
    loading, 
    filters, 
    pagination,
    fetchJobs, 
    deleteJob, 
    setFilters 
  } = useJobs();
  
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, job: null });
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    const emptyFilters = {
      status: '',
      jobType: '',
      source: '',
      priority: '',
      search: ''
    };
    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
  };

  const handleDelete = async () => {
    if (deleteModal.job) {
      await deleteJob(deleteModal.job._id);
      setDeleteModal({ show: false, job: null });
      fetchJobs();
    }
  };

  const statusOptions = [
    { value: 'applied', label: 'Applied' },
    { value: 'interview', label: 'Interview' },
    { value: 'offer', label: 'Offer' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'withdrawn', label: 'Withdrawn' }
  ];

  const jobTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' }
  ];

  const sourceOptions = [
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'indeed', label: 'Indeed' },
    { value: 'company-website', label: 'Company Website' },
    { value: 'referral', label: 'Referral' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Job Applications</h1>
          <p className="text-gray-600">Manage all your job applications</p>
        </div>
        <Link to="/jobs/new">
          <Button className="hover-glow">
            <Plus size={16} />
            Add New Job
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left Sidebar - Search and Filters */}
        <div className="xl:col-span-1">
          <Card className="sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Search & Filter</h3>
            
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="form-input pl-10"
                  value={localFilters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && setFilters(localFilters)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <Select
                label="Status"
                options={statusOptions}
                value={localFilters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              />
              <Select
                label="Job Type"
                options={jobTypeOptions}
                value={localFilters.jobType}
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
              />
              <Select
                label="Source"
                options={sourceOptions}
                value={localFilters.source}
                onChange={(e) => handleFilterChange('source', e.target.value)}
              />
              <Select
                label="Priority"
                options={priorityOptions}
                value={localFilters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <Button onClick={() => setFilters(localFilters)} className="w-full">
                Apply Filters
              </Button>
              <Button variant="secondary" onClick={clearFilters} className="w-full">
                Clear All
              </Button>
            </div>
          </Card>
        </div>

        {/* Main Content - Jobs List */}
        <div className="xl:col-span-3">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="spinner" />
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job, index) => (
                <Card key={job._id} className={`priority-${job.priority} hover-lift animate-slideIn stagger-${(index % 4) + 1}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{job.position}</h3>
                        <Badge variant={job.status}>{job.status}</Badge>
                        <span className={`px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700`}>
                          {job.priority} priority
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-900 mb-1">{job.company}</p>
                          {job.location && (
                            <p className="text-gray-600 mb-1">📍 {job.location}</p>
                          )}
                          <p className="text-gray-600">
                            Applied: {new Date(job.applicationDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Type: {job.jobType}</p>
                          <p className="text-gray-600 mb-1">Source: {job.source}</p>
                          {job.salary && (
                            <p className="text-gray-600">Salary: ${job.salary.toLocaleString()}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 lg:flex-col">
                      <Link to={`/jobs/${job._id}/edit`}>
                        <Button variant="secondary" size="sm" className="hover-glow">
                          <Edit size={14} />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setDeleteModal({ show: true, job })}
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === pagination.currentPage ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => fetchJobs({ page })}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Card>
              <div className="text-center py-16">
                <div className="text-gray-400 mb-6">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">No jobs found</h3>
                <p className="text-gray-600 mb-6">
                  {Object.values(filters).some(f => f) 
                    ? 'Try adjusting your filters or search terms'
                    : 'Start by adding your first job application'
                  }
                </p>
                <Link to="/jobs/new">
                  <Button>Add New Job</Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, job: null })}
        title="Delete Job Application"
      >
        <div className="space-y-4">
          <p>
            Are you sure you want to delete the application for{' '}
            <strong>{deleteModal.job?.position}</strong> at{' '}
            <strong>{deleteModal.job?.company}</strong>?
          </p>
          <p className="text-sm text-gray-600">
            This action cannot be undone.
          </p>
          <div className="flex gap-2 justify-end">
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ show: false, job: null })}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobsList;