import React from 'react';

const Select = ({ 
  label, 
  error, 
  options = [], 
  value,
  onChange,
  placeholder = 'Select an option',
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
      <select
        className={`form-input ${error ? 'border-error' : ''} ${className}`}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-error text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Select;