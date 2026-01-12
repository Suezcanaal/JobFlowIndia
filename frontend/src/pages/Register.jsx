import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import OTPVerification from '../components/OTPVerification';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showOTP, setShowOTP] = useState(false);
  const [userId, setUserId] = useState(null);
  
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      const result = await register(formData.name, formData.email, formData.password);
      setUserId(result.userId);
      setShowOTP(true);
    } catch (error) {
      // Error is handled in the context
    }
  };


  if (showOTP) {
    return <OTPVerification userId={userId} email={formData.email} />;
  }

  return (
    <div style={{
      fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: '#f9fafb',
      color: '#111827',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 16px 40px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '32px'
        }}>jobflowindia</div>

        <div style={{
          width: '100%',
          background: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 22px 40px rgba(15, 23, 42, 0.06)',
          padding: '28px 32px 26px'
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '6px'
          }}>Create your account</h1>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '22px'
          }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: '#7b3aed',
              textDecoration: 'none',
              fontWeight: '500'
            }}>Sign in here</Link>
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '6px'
              }}>
                Full Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: errors.name ? '1px solid #ef4444' : '1px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#f9fafb',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7b3aed';
                  e.target.style.boxShadow = '0 0 0 1px rgba(124, 58, 237, 0.25)';
                  e.target.style.backgroundColor = '#eef2ff';
                }}
                onBlur={(e) => {
                  if (!errors.name) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                    e.target.style.backgroundColor = '#f9fafb';
                  }
                }}
              />
              {errors.name && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.name}</span>}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '6px'
              }}>
                Email Address <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: errors.email ? '1px solid #ef4444' : '1px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#f9fafb',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7b3aed';
                  e.target.style.boxShadow = '0 0 0 1px rgba(124, 58, 237, 0.25)';
                  e.target.style.backgroundColor = '#eef2ff';
                }}
                onBlur={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                    e.target.style.backgroundColor = '#f9fafb';
                  }
                }}
              />
              {errors.email && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.email}</span>}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '6px'
              }}>
                Password <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: errors.password ? '1px solid #ef4444' : '1px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#f9fafb',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7b3aed';
                  e.target.style.boxShadow = '0 0 0 1px rgba(124, 58, 237, 0.25)';
                  e.target.style.backgroundColor = '#eef2ff';
                }}
                onBlur={(e) => {
                  if (!errors.password) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                    e.target.style.backgroundColor = '#f9fafb';
                  }
                }}
              />
              {errors.password && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.password}</span>}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '6px'
              }}>
                Confirm Password <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: errors.confirmPassword ? '1px solid #ef4444' : '1px solid #e5e7eb',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#f9fafb',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7b3aed';
                  e.target.style.boxShadow = '0 0 0 1px rgba(124, 58, 237, 0.25)';
                  e.target.style.backgroundColor = '#eef2ff';
                }}
                onBlur={(e) => {
                  if (!errors.confirmPassword) {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                    e.target.style.backgroundColor = '#f9fafb';
                  }
                }}
              />
              {errors.confirmPassword && <span style={{ color: '#ef4444', fontSize: '12px' }}>{errors.confirmPassword}</span>}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '11px 16px',
                marginTop: '8px',
                borderRadius: '999px',
                border: 'none',
                background: loading ? '#9ca3af' : '#7b3aed',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease',
                boxShadow: loading ? 'none' : '0 14px 30px rgba(124, 58, 237, 0.45)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.background = '#5b21b6';
                  e.target.style.boxShadow = '0 10px 22px rgba(124, 58, 237, 0.35)';
                  e.target.style.transform = 'translateY(1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.background = '#7b3aed';
                  e.target.style.boxShadow = '0 14px 30px rgba(124, 58, 237, 0.45)';
                  e.target.style.transform = 'translateY(0px)';
                }
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Google login removed - email/password only */}
          </form>
        </div>

        <p style={{
          marginTop: '18px',
          fontSize: '14px'
        }}>
          ← <Link to="/" style={{
            color: '#7b3aed',
            textDecoration: 'none'
          }}>Back to home</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;