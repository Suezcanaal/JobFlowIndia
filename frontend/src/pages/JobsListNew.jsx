import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';

const JobsList = () => {
  const { jobs, deleteJob, loading } = useJobs();
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    type: '',
    source: '',
    priority: ''
  });
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    let filtered = jobs;

    if (filters.search) {
      filtered = filtered.filter(job => 
        (job.title && job.title.toLowerCase().includes(filters.search.toLowerCase())) ||
        (job.company && job.company.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }

    if (filters.status) {
      filtered = filtered.filter(job => job.status && job.status.toLowerCase() === filters.status.toLowerCase());
    }

    if (filters.type) {
      filtered = filtered.filter(job => job.type && job.type.toLowerCase() === filters.type.toLowerCase());
    }

    if (filters.source) {
      filtered = filtered.filter(job => job.source && job.source.toLowerCase() === filters.source.toLowerCase());
    }

    if (filters.priority) {
      filtered = filtered.filter(job => job.priority && job.priority.toLowerCase() === filters.priority.toLowerCase());
    }

    setFilteredJobs(filtered);
  }, [jobs, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      type: '',
      source: '',
      priority: ''
    });
  };

  const getStatusTag = (status) => {
    const statusStyles = {
      'Applied': 'tag',
      'Interview': 'tag tag-success',
      'Offer': 'tag tag-success',
      'Rejected': 'tag tag-danger'
    };
    return statusStyles[status] || 'tag';
  };

  const getSummaryStats = () => {
    const total = jobs.length;
    const interviews = jobs.filter(job => job.status === 'Interview').length;
    const offers = jobs.filter(job => job.status === 'Offer').length;
    return { total, interviews, offers };
  };

  const stats = getSummaryStats();

  const styles = {
    body: {
      fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: '#f9fafb',
      color: '#111827',
      minHeight: '100vh',
      display: 'flex'
    },
    main: {
      flex: 1,
      padding: '18px 24px 24px',
      display: 'flex',
      flexDirection: 'column'
    },
    headerRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    pageTitle: {
      fontSize: '24px',
      fontWeight: 600
    },
    pageSubtitle: {
      fontSize: '13px',
      color: '#6b7280',
      marginBottom: '18px'
    },
    headerActions: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    btnPrimary: {
      borderRadius: '999px',
      padding: '9px 16px',
      border: '1px solid transparent',
      fontSize: '14px',
      background: '#7b3aed',
      color: '#ffffff',
      boxShadow: '0 14px 30px rgba(124, 58, 237, 0.35)',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '320px minmax(0, 1fr)',
      gap: '20px',
      alignItems: 'flex-start'
    },
    filterCard: {
      background: '#ffffff',
      borderRadius: '18px',
      border: '1px solid #e5e7eb',
      padding: '18px 18px 16px'
    },
    filterTitle: {
      fontSize: '15px',
      fontWeight: 600,
      marginBottom: '12px'
    },
    formGroup: {
      marginBottom: '10px'
    },
    label: {
      display: 'block',
      fontSize: '13px',
      fontWeight: 500,
      marginBottom: '4px'
    },
    input: {
      width: '100%',
      padding: '8px 10px',
      borderRadius: '10px',
      border: '1px solid #e5e7eb',
      fontSize: '13px',
      background: '#f9fafb',
      outline: 'none',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
    },
    inputFocus: {
      borderColor: '#7b3aed',
      boxShadow: '0 0 0 1px rgba(124, 58, 237, 0.15)',
      background: '#eef2ff'
    },
    filterActions: {
      display: 'flex',
      gap: '10px',
      marginTop: '8px'
    },
    btnSecondary: {
      borderRadius: '999px',
      padding: '8px 14px',
      fontSize: '13px',
      border: '1px solid #e5e7eb',
      background: '#f9fafb',
      cursor: 'pointer'
    },
    rightColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    summaryRow: {
      display: 'flex',
      gap: '14px',
      flexWrap: 'wrap'
    },
    summaryCard: {
      flex: 1,
      minWidth: '160px',
      background: '#ffffff',
      borderRadius: '14px',
      border: '1px solid #e5e7eb',
      padding: '10px 12px',
      fontSize: '13px'
    },
    summaryLabel: {
      color: '#6b7280',
      marginBottom: '4px'
    },
    summaryValue: {
      fontSize: '18px',
      fontWeight: 600
    },
    tableCard: {
      background: '#ffffff',
      borderRadius: '18px',
      border: '1px solid #e5e7eb',
      padding: '14px 16px 10px',
      overflowX: 'auto'
    },
    tableTitle: {
      fontSize: '15px',
      fontWeight: 600,
      marginBottom: '10px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '13px'
    },
    thead: {
      background: '#f3f4ff'
    },
    th: {
      padding: '8px 10px',
      textAlign: 'left',
      borderBottom: '1px solid #e5e7eb',
      whiteSpace: 'nowrap',
      fontWeight: 600,
      color: '#4b5563'
    },
    td: {
      padding: '8px 10px',
      textAlign: 'left',
      borderBottom: '1px solid #e5e7eb',
      whiteSpace: 'nowrap'
    },
    tag: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 8px',
      borderRadius: '999px',
      fontSize: '11px',
      background: '#e0f2fe',
      color: '#0369a1'
    },
    tagDanger: {
      background: '#fee2e2',
      color: '#b91c1c'
    },
    tagSuccess: {
      background: '#dcfce7',
      color: '#166534'
    },
    tableActions: {
      display: 'inline-flex',
      gap: '6px'
    },
    btnSmall: {
      borderRadius: '999px',
      padding: '4px 10px',
      fontSize: '11px',
      border: '1px solid #e5e7eb',
      background: '#ffffff',
      cursor: 'pointer'
    },
    btnSmallDanger: {
      borderColor: 'transparent',
      background: '#fee2e2',
      color: '#ef4444'
    }
  };

  if (loading) {
    return <div style={styles.main}>Loading...</div>;
  }

  return (
    <div style={styles.body}>
      <main style={styles.main}>
        <div style={styles.headerRow}>
          <div>
            <h1 style={styles.pageTitle}>Job Applications</h1>
            <p style={styles.pageSubtitle}>Manage all your job applications</p>
          </div>
          <div style={styles.headerActions}>
            <Link to="/jobs/new" style={styles.btnPrimary}>
              + Add New Job
            </Link>
          </div>
        </div>

        <section style={styles.contentGrid}>
          <div style={styles.filterCard}>
            <div style={styles.filterTitle}>Search & Filter</div>

            <div style={styles.formGroup}>
              <label htmlFor="search" style={styles.label}>Search jobs</label>
              <input
                id="search"
                type="text"
                placeholder="Search jobs..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="status" style={styles.label}>Status</label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                style={styles.input}
              >
                <option value="">Select an option</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="type" style={styles.label}>Job Type</label>
              <select
                id="type"
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                style={styles.input}
              >
                <option value="">Select an option</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="source" style={styles.label}>Source</label>
              <select
                id="source"
                value={filters.source}
                onChange={(e) => handleFilterChange('source', e.target.value)}
                style={styles.input}
              >
                <option value="">Select an option</option>
                <option value="Company website">Company website</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="priority" style={styles.label}>Priority</label>
              <select
                id="priority"
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                style={styles.input}
              >
                <option value="">Select an option</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div style={styles.filterActions}>
              <button 
                style={styles.btnPrimary} 
                type="button"
                onClick={() => setFilteredJobs(jobs.filter(job => {
                  let filtered = true;
                  if (filters.search) {
                    filtered = filtered && (
                      (job.title && job.title.toLowerCase().includes(filters.search.toLowerCase())) ||
                      (job.company && job.company.toLowerCase().includes(filters.search.toLowerCase()))
                    );
                  }
                  if (filters.status) {
                    filtered = filtered && job.status && job.status.toLowerCase() === filters.status.toLowerCase();
                  }
                  if (filters.type) {
                    filtered = filtered && job.type && job.type.toLowerCase() === filters.type.toLowerCase();
                  }
                  if (filters.source) {
                    filtered = filtered && job.source && job.source.toLowerCase() === filters.source.toLowerCase();
                  }
                  if (filters.priority) {
                    filtered = filtered && job.priority && job.priority.toLowerCase() === filters.priority.toLowerCase();
                  }
                  return filtered;
                }))}
              >
                Apply Filters
              </button>
              <button style={styles.btnSecondary} type="button" onClick={() => {
                setFilters({
                  search: '',
                  status: '',
                  type: '',
                  source: '',
                  priority: ''
                });
                setFilteredJobs(jobs);
              }}>
                Clear All
              </button>
            </div>
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.summaryRow}>
              <div style={styles.summaryCard}>
                <div style={styles.summaryLabel}>Total Applications</div>
                <div style={styles.summaryValue}>{stats.total}</div>
              </div>
              <div style={styles.summaryCard}>
                <div style={styles.summaryLabel}>Interviews</div>
                <div style={styles.summaryValue}>{stats.interviews}</div>
              </div>
              <div style={styles.summaryCard}>
                <div style={styles.summaryLabel}>Offers</div>
                <div style={styles.summaryValue}>{stats.offers}</div>
              </div>
            </div>

            <div style={styles.tableCard}>
              <div style={styles.tableTitle}>All Applications</div>
              <table style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th style={styles.th}>Role</th>
                    <th style={styles.th}>Company</th>
                    <th style={styles.th}>Location</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Applied On</th>
                    <th style={styles.th}>Priority</th>
                    <th style={styles.th}>Type</th>
                    <th style={styles.th}>Salary</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job._id}>
                      <td style={styles.td}>{job.title || 'N/A'}</td>
                      <td style={styles.td}>{job.company || 'N/A'}</td>
                      <td style={styles.td}>{job.location || 'N/A'}</td>
                      <td style={styles.td}>
                        <span 
                          style={{
                            ...styles.tag,
                            ...(job.status && job.status.toLowerCase() === 'rejected' ? styles.tagDanger : {}),
                            ...(job.status && (job.status.toLowerCase() === 'interview' || job.status.toLowerCase() === 'offer') ? styles.tagSuccess : {})
                          }}
                        >
                          {job.status || 'N/A'}
                        </span>
                      </td>
                      <td style={styles.td}>{job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : 'N/A'}</td>
                      <td style={styles.td}>
                        <span style={styles.tag}>{job.priority || 'N/A'}</span>
                      </td>
                      <td style={styles.td}>{job.type || 'N/A'}</td>
                      <td style={styles.td}>{job.salary ? `$${job.salary.toLocaleString()}` : 'N/A'}</td>
                      <td style={styles.td}>
                        <div style={styles.tableActions}>
                          <Link to={`/jobs/${job._id}/edit`} style={styles.btnSmall}>
                            Edit
                          </Link>
                          <button 
                            style={{...styles.btnSmall, ...styles.btnSmallDanger}}
                            onClick={() => deleteJob(job._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredJobs.length === 0 && (
                    <tr>
                      <td colSpan="9" style={{...styles.td, textAlign: 'center', color: '#6b7280'}}>
                        No jobs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default JobsList;