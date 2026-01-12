import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    body: {
      fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: '#f9fafb',
      color: '#111827',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 16px 40px',
      margin: 0
    },
    logo: {
      fontSize: '32px',
      fontWeight: 700,
      marginBottom: '32px'
    },
    authWrapper: {
      width: '100%',
      maxWidth: '520px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    card: {
      width: '100%',
      background: '#ffffff',
      borderRadius: '18px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 22px 40px rgba(15, 23, 42, 0.06)',
      padding: '28px 32px 26px'
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: 600,
      marginBottom: '6px'
    },
    cardSubtitle: {
      fontSize: '14px',
      color: '#6b7280',
      marginBottom: '22px'
    },
    link: {
      color: '#7b3aed',
      textDecoration: 'none',
      fontWeight: 500
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 500,
      marginBottom: '6px'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      borderRadius: '10px',
      border: '1px solid #e5e7eb',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease',
      backgroundColor: '#f9fafb'
    },
    inputFocus: {
      borderColor: '#7b3aed',
      boxShadow: '0 0 0 1px rgba(124, 58, 237, 0.25)',
      backgroundColor: '#eef2ff'
    },
    btnPrimary: {
      width: '100%',
      padding: '11px 16px',
      marginTop: '8px',
      borderRadius: '999px',
      border: 'none',
      background: '#7b3aed',
      color: '#ffffff',
      fontSize: '15px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'background 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease',
      boxShadow: '0 14px 30px rgba(124, 58, 237, 0.45)'
    },
    backLink: {
      marginTop: '18px',
      fontSize: '14px'
    },
    error: {
      color: '#ef4444',
      fontSize: '14px',
      marginBottom: '16px',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.authWrapper}>
        <div style={styles.logo}>jobflowindia</div>

        <div style={styles.card}>
          <h1 style={styles.cardTitle}>Welcome Back!</h1>
          <p style={styles.cardSubtitle}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.link}>
              Sign up here
            </Link>
          </p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={styles.btnPrimary}
              onMouseEnter={(e) => {
                e.target.style.background = '#5b21b6';
                e.target.style.boxShadow = '0 10px 22px rgba(124, 58, 237, 0.35)';
                e.target.style.transform = 'translateY(1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#7b3aed';
                e.target.style.boxShadow = '0 14px 30px rgba(124, 58, 237, 0.45)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={styles.backLink}>
          ← <Link to="/" style={styles.link}>Back to home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;