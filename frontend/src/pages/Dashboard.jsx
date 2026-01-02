import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Briefcase, Clock, CheckCircle, XCircle, TrendingUp, Award, Target } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatusPieChart from '../components/charts/StatusPieChart';
import SourceBarChart from '../components/charts/SourceBarChart';
import TimelineAreaChart from '../components/charts/TimelineAreaChart';

const Dashboard = () => {
  const { user } = useAuth();
  const { jobs, stats, fetchJobs, fetchStats, loading } = useJobs();

  useEffect(() => {
    fetchJobs({ limit: 5 });
    fetchStats();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied': return <Clock className="text-blue-500" size={16} />;
      case 'interview': return <Briefcase className="text-yellow-500" size={16} />;
      case 'offer': return <CheckCircle className="text-green-500" size={16} />;
      case 'rejected': return <XCircle className="text-red-500" size={16} />;
      default: return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getStatusCount = (status) => {
    return stats?.statusStats?.find(s => s._id === status)?.count || 0;
  };

  const totalJobs = stats?.statusStats?.reduce((sum, stat) => sum + stat.count, 0) || 0;

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="animate-slideIn">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 text-lg">Here's your job search overview</p>
          </div>
          <div className="flex gap-3">
            <Link to="/jobs">
              <Button variant="secondary" className="hover-glow">
                <Briefcase size={16} />
                View All Jobs
              </Button>
            </Link>
            <Link to="/jobs/new">
              <Button className="hover-glow">
                <Plus size={16} />
                Add New Job
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column - Stats and Recent Jobs */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="stagger-1 hover-glow text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl flex items-center justify-center mx-auto mb-3">
                <Briefcase size={20} />
              </div>
              <p className="text-2xl font-bold gradient-text">{totalJobs}</p>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                <TrendingUp size={10} />
                +12%
              </p>
            </Card>

            <Card className="stagger-2 hover-glow text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock size={20} />
              </div>
              <p className="text-2xl font-bold text-yellow-600">{getStatusCount('applied')}</p>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xs text-gray-500 mt-1">Awaiting</p>
            </Card>

            <Card className="stagger-3 hover-glow text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target size={20} />
              </div>
              <p className="text-2xl font-bold text-orange-600">{getStatusCount('interview')}</p>
              <p className="text-sm text-gray-600">Interviews</p>
              <p className="text-xs text-gray-500 mt-1">In progress</p>
            </Card>

            <Card className="stagger-4 hover-glow text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={20} />
              </div>
              <p className="text-2xl font-bold text-green-600">{getStatusCount('offer')}</p>
              <p className="text-sm text-gray-600">Offers</p>
              <p className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                <Award size={10} />
                Success!
              </p>
            </Card>
          </div>

          {/* Recent Jobs */}
          <Card className="animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold gradient-text">Recent Applications</h3>
              <Link to="/jobs" className="text-primary hover:underline font-medium">
                View all →
              </Link>
            </div>
            
            {jobs.length > 0 ? (
              <div className="space-y-3">
                {jobs.slice(0, 4).map((job, index) => (
                  <div key={job._id} className={`flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift animate-slideIn stagger-${index + 1}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center">
                        {getStatusIcon(job.status)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{job.position}</p>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">
                        {new Date(job.applicationDate).toLocaleDateString()}
                      </p>
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full status-${job.status}`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="text-gray-500" size={32} />
                </div>
                <p className="text-gray-600 mb-4 text-lg">No job applications yet</p>
                <Link to="/jobs/new">
                  <Button>Add Your First Job</Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Timeline Chart */}
          <Card className="animate-fadeIn hover-glow">
            <h3 className="text-xl font-bold mb-6 gradient-text">Application Timeline</h3>
            <TimelineAreaChart data={stats?.monthlyStats} />
          </Card>
        </div>

        {/* Right Column - Charts */}
        <div className="space-y-8">
          <Card className="animate-scaleIn hover-glow">
            <h3 className="text-xl font-bold mb-6 gradient-text text-center">Status Overview</h3>
            <StatusPieChart data={stats?.statusStats} />
          </Card>

          <Card className="animate-scaleIn hover-glow" style={{animationDelay: '0.1s'}}>
            <h3 className="text-xl font-bold mb-6 gradient-text text-center">Application Sources</h3>
            <SourceBarChart data={stats?.sourceStats} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;