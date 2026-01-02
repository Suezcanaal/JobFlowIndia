import React from 'react';

const Input = ({ 
  label, 
  error, 
  type = 'text', 
  placeholder,
  value,
  onChange,
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}
      <input
        type={type}
        className={`form-input ${error ? 'border-error' : ''} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
      {error && <span className="text-error text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Input;