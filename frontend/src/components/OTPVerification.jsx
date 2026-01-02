import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OTPVerification = ({ userId, email }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { verifyOTP, resendOTP } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await verifyOTP(userId, otp);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendOTP(userId);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
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
      // fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease',
      backgroundColor: '#f9fafb',
      textAlign: 'center',
      fontSize: '18px',
      letterSpacing: '2px'
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
    btnSecondary: {
      background: 'transparent',
      color: '#7b3aed',
      border: '1px solid #7b3aed',
      marginTop: '12px'
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
          <h1 style={styles.cardTitle}>Verify Your Email</h1>
          <p style={styles.cardSubtitle}>
            We've sent a 6-digit code to {email}
          </p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="otp" style={styles.label}>
                Enter Verification Code
              </label>
              <input
                type="text"
                id="otp"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
                required
                style={styles.input}
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              style={styles.btnPrimary}
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>

            <button
              type="button"
              onClick={handleResend}
              style={{...styles.btnPrimary, ...styles.btnSecondary}}
            >
              Resend Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;