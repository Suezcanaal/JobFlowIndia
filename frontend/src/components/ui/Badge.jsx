import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    applied: 'status-applied',
    interview: 'status-interview',
    offer: 'status-offer',
    rejected: 'status-rejected',
    withdrawn: 'status-withdrawn'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;