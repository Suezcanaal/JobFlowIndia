import React from 'react';

const Card = ({ children, className = '', animated = true, ...props }) => {
  const animationClass = animated ? 'animate-fadeIn hover-lift' : '';
  
  return (
    <div className={`card ${animationClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;