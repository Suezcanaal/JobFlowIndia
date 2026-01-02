import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

const JobForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { createJob, updateJob, fetchJob, currentJob, loading } = useJobs();
  
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'applied',
    jobType: 'full-time',
    location: '',
    salary: '',
    description: '',
    requirements: '',
    applicationDate: new Date().toISOString().split('T')[0],
    interviewDate: '',
    followUpDate: '',
    source: 'other',
    priority: 'medium',
    notes: '',
    contactPerson: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && id) {
      fetchJob(id);
    }
  }, [id, isEditing]);

  useEffect(() => {
    if (isEditing && currentJob) {
      setFormData({
        company: currentJob.company || '',
        position: currentJob.position || '',
        status: currentJob.status || 'applied',
        jobType: currentJob.jobType || 'full-time',
        location: currentJob.location || '',
        salary: currentJob.salary || '',
        description: currentJob.description || '',
        requirements: currentJob.requirements || '',
        applicationDate: currentJob.applicationDate ? 
          new Date(currentJob.applicationDate).toISOString().split('T')[0] : '',
        interviewDate: currentJob.interviewDate ? 
          new Date(currentJob.interviewDate).toISOString().split('T')[0] : '',
        followUpDate: currentJob.followUpDate ? 
          new Date(currentJob.followUpDate).toISOString().split('T')[0] : '',
        source: currentJob.source || 'other',
        priority: currentJob.priority || 'medium',
        notes: currentJob.notes || '',
        contactPerson: {
          name: currentJob.contactPerson?.name || '',
          email: currentJob.contactPerson?.email || '',
          phone: currentJob.contactPerson?.phone || ''
        }
      });
    }
  }, [currentJob, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('contactPerson.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contactPerson: {
          ...prev.contactPerson,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }

    if (!formData.applicationDate) {
      newErrors.applicationDate = 'Application date is required';
    }

    if (formData.salary && isNaN(Number(formData.salary))) {
      newErrors.salary = 'Salary must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const jobData = {
        ...formData,
        salary: formData.salary ? Number(formData.salary) : undefined
      };

      if (isEditing) {
        await updateJob(id, jobData);
      } else {
        await createJob(jobData);
      }

      navigate('/jobs');
    } catch (error) {
      // Error is handled in the context
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

  if (isEditing && loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Edit Job Application' : 'Add New Job Application'}
        </h1>
        <p className="text-gray-600">
          {isEditing ? 'Update your job application details' : 'Fill in the details for your new job application'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleChange}
              error={errors.company}
              required
              placeholder="Enter company name"
            />
            <Input
              label="Position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              error={errors.position}
              required
              placeholder="Enter position title"
            />
            <Select
              label="Status"
              name="status"
              options={statusOptions}
              value={formData.status}
              onChange={handleChange}
              required
            />
            <Select
              label="Job Type"
              name="jobType"
              options={jobTypeOptions}
              value={formData.jobType}
              onChange={handleChange}
              required
            />
            <Input
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter job location"
            />
            <Input
              label="Salary"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              error={errors.salary}
              placeholder="Enter salary amount"
            />
          </div>
        </Card>

        {/* Application Details */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Application Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              label="Application Date"
              name="applicationDate"
              type="date"
              value={formData.applicationDate}
              onChange={handleChange}
              error={errors.applicationDate}
              required
            />
            <Input
              label="Interview Date"
              name="interviewDate"
              type="date"
              value={formData.interviewDate}
              onChange={handleChange}
            />
            <Input
              label="Follow-up Date"
              name="followUpDate"
              type="date"
              value={formData.followUpDate}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Source"
              name="source"
              options={sourceOptions}
              value={formData.source}
              onChange={handleChange}
              required
            />
            <Select
              label="Priority"
              name="priority"
              options={priorityOptions}
              value={formData.priority}
              onChange={handleChange}
              required
            />
          </div>
        </Card>

        {/* Job Description */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Job Details</h2>
          <div className="space-y-4">
            <div>
              <label className="form-label">Job Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="form-input"
                placeholder="Enter job description..."
              />
            </div>
            <div>
              <label className="form-label">Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                className="form-input"
                placeholder="Enter job requirements..."
              />
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Contact Person</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Name"
              name="contactPerson.name"
              value={formData.contactPerson.name}
              onChange={handleChange}
              placeholder="Contact person name"
            />
            <Input
              label="Email"
              name="contactPerson.email"
              type="email"
              value={formData.contactPerson.email}
              onChange={handleChange}
              placeholder="Contact person email"
            />
            <Input
              label="Phone"
              name="contactPerson.phone"
              value={formData.contactPerson.phone}
              onChange={handleChange}
              placeholder="Contact person phone"
            />
          </div>
        </Card>

        {/* Notes */}
        <Card>
          <h2 className="text-lg font-semibold mb-4">Notes</h2>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="form-input"
            placeholder="Add any additional notes..."
          />
        </Card>

        {/* Form Actions */}
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/jobs')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {isEditing ? 'Update Job' : 'Add Job'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;