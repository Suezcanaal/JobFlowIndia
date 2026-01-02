import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const StatusPieChart = ({ data }) => {
  const COLORS = {
    applied: '#3b82f6',
    interview: '#f59e0b',
    offer: '#10b981',
    rejected: '#ef4444',
    withdrawn: '#6b7280'
  };

  const chartData = data?.map(item => ({
    name: item._id,
    value: item.count,
    color: COLORS[item._id] || '#6b7280'
  })) || [];

  if (!chartData.length) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusPieChart;