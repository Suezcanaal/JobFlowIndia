import React, { useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import { Briefcase, Calendar, Clock, Award, MoreVertical, FolderOpen } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useNavigate } from 'react-router-dom';

const StatusBadge = ({ status }) => {
  const map = {
    applied: { bg: '#eef2ff', color: '#4f46e5', text: 'Applied' },
    interview: { bg: '#fff7ed', color: '#d97706', text: 'Interview' },
    offer: { bg: '#ecfdf5', color: '#059669', text: 'Offer' },
    rejected: { bg: '#fff1f2', color: '#dc2626', text: 'Rejected' }
  };
  const s = map[status] || { bg: '#f8fafc', color: '#64748b', text: status };
  return <span style={{ background: s.bg, color: s.color, padding: '6px 10px', borderRadius: 999, fontWeight: 700, fontSize: 12 }}>{s.text}</span>;
};

const Dashboard = () => {
  const { jobs, fetchJobs, stats, fetchStats, loading } = useJobs();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    fetchStats();
    // eslint-disable-next-line
  }, []);

  return (
    <DashboardLayout>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)' }}>Welcome back, Harsh! 👋</h1>
            <div style={{ color: 'var(--text-secondary)', marginTop: 6 }}>Here’s what’s happening with your job search.</div>
          </div>

          <div>
            <button onClick={() => navigate('/jobs/new')} className="btn btn-primary">+ Track New Job</button>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          <StatCard icon={Briefcase} label="Total Applications" value={stats?.total || jobs.length || 0} trend={stats?.deltaTotal ? `↗ ${stats.deltaTotal} this week` : '↗ 0 this week'} trendColor="#10b981" />
          <StatCard icon={Calendar} label="Interviews Scheduled" value={stats?.interviews || 0} trend={stats?.deltaInterviews ? `↗ ${stats.deltaInterviews}` : '—'} trendColor="#f59e0b" />
          <StatCard icon={Clock} label="Pending Responses" value={stats?.pending || 0} trend={stats?.deltaPending ? `↗ ${stats.deltaPending}` : '—'} trendColor="#f97316" />
          <StatCard icon={Award} label="Offers Received" value={stats?.offers || 0} trend={stats?.deltaOffers ? `↗ ${stats.deltaOffers}` : '—'} trendColor="#059669" />
        </div>

        {/* Recent Applications */}
        <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Recent Applications</h2>
            <a href="/jobs" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>View All</a>
          </div>

          {(!jobs || jobs.length === 0) ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ width: 96, height: 96, borderRadius: 999, background: '#f1f5f9', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                <FolderOpen size={36} />
              </div>
              <div style={{ marginTop: 16, fontSize: 18, fontWeight: 700 }}>No applications yet</div>
              <div style={{ marginTop: 8, color: 'var(--text-secondary)' }}>Add your first job and start tracking your progress.</div>
              <div style={{ marginTop: 16 }}>
                <button onClick={() => navigate('/jobs/new')} className="btn btn-primary">Add your first job</button>
              </div>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: 13 }}>
                    <th style={{ padding: '12px 8px' }}>Company</th>
                    <th style={{ padding: '12px 8px' }}>Role</th>
                    <th style={{ padding: '12px 8px' }}>Date Applied</th>
                    <th style={{ padding: '12px 8px' }}>Status</th>
                    <th style={{ padding: '12px 8px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job._id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 8px', verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{job.company?.charAt(0)}</div>
                          <div>
                            <div style={{ fontWeight: 700 }}>{job.company}</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{job.location || ''}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 8px' }}>{job.position}</td>
                      <td style={{ padding: '14px 8px' }}>{new Date(job.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '14px 8px' }}><StatusBadge status={job.status} /></td>
                      <td style={{ padding: '14px 8px', textAlign: 'right' }}>
                        <button className="btn btn-ghost"><MoreVertical size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
