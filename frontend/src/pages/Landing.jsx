import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div style={{
      fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: 'linear-gradient(135deg, #f4f4fb, #e9e7ff)',
      color: '#111827',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        background: theme === 'dark' ? '#1f2937' : '#f9fafb',
        borderRadius: '32px',
        boxShadow: '0 35px 80px rgba(0, 0, 0, 0.08)',
        border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
        padding: '20px 32px 32px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Navigation */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontWeight: '600',
            fontSize: '20px',
            color: theme === 'dark' ? '#ffffff' : '#111827'
          }}>
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '10px',
              background: 'radial-gradient(circle at 0 0, #8b5cf6, #4c1d95)',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gap: '3px',
              padding: '4px'
            }}>
              <span style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '40%' }}></span>
              <span style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '40%' }}></span>
              <span style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '40%' }}></span>
              <span style={{ background: 'rgba(255, 255, 255, 0.95)', borderRadius: '40%' }}></span>
            </div>
            <span>jobflowindia</span>
          </div>
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            fontSize: '14px'
          }}>
            <button
              onClick={toggleTheme}
              style={{
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: theme === 'dark' ? '#9ca3af' : '#4b5563'
              }}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <Link to="/login" style={{
              cursor: 'pointer',
              color: theme === 'dark' ? '#9ca3af' : '#4b5563',
              textDecoration: 'none'
            }}>Sign In</Link>
            <Link to="/register" style={{
              padding: '8px 16px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              background: '#7c3aed',
              color: '#ffffff',
              boxShadow: '0 12px 25px rgba(124, 58, 237, 0.4)',
              textDecoration: 'none',
              display: 'inline-block'
            }}>Get Started</Link>
          </div>
        </header>

        {/* Hero Section */}
        <main style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at top, #374151, #1f2937)' 
            : 'radial-gradient(circle at top, #f9fafb, #e5e7eb)',
          borderRadius: '28px',
          padding: '48px 40px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Dot pattern background */}
          <div style={{
            position: 'absolute',
            inset: '0',
            backgroundImage: `radial-gradient(${theme === 'dark' ? '#4b5563' : '#e5e7eb'} 1px, transparent 1px)`,
            backgroundSize: '18px 18px',
            opacity: '0.5',
            zIndex: '0'
          }}></div>

          <div style={{ position: 'relative', zIndex: '1' }}>
            <h1 style={{
              fontSize: '40px',
              lineHeight: '1.1',
              fontWeight: '700',
              marginBottom: '14px',
              color: theme === 'dark' ? '#ffffff' : '#111827'
            }}>
              Track Your Job Search<br />Like a Pro
            </h1>

            <div style={{
              width: '72px',
              height: '72px',
              margin: '0 auto 20px',
              borderRadius: '24px',
              background: 'linear-gradient(145deg, #8b5cf6, #4c1d95)',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gap: '6px',
              padding: '12px',
              boxShadow: '0 24px 40px rgba(124, 58, 237, 0.55)'
            }}>
              <span style={{ background: 'rgba(255, 255, 255, 0.96)', borderRadius: '40%' }}></span>
              <span style={{ background: 'rgba(255, 255, 255, 0.96)', borderRadius: '40%' }}></span>
              <span style={{ background: 'rgba(255, 255, 255, 0.96)', borderRadius: '40%' }}></span>
              <span style={{ background: 'rgba(255, 255, 255, 0.96)', borderRadius: '40%' }}></span>
            </div>

            <p style={{
              fontSize: '16px',
              color: theme === 'dark' ? '#9ca3af' : '#6b7280',
              marginBottom: '28px'
            }}>
              Organize your job applications, track your progress, and<br />
              land your dream job…
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '14px',
              marginBottom: '40px',
              flexWrap: 'wrap'
            }}>
              <Link to="/register" style={{
                padding: '12px 26px',
                borderRadius: '999px',
                border: 'none',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                background: '#7c3aed',
                color: '#ffffff',
                boxShadow: '0 18px 35px rgba(124, 58, 237, 0.45)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap'
              }}>Start Tracking Jobs</Link>
              <Link to="/login" style={{
                padding: '12px 26px',
                borderRadius: '999px',
                border: 'none',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                background: theme === 'dark' ? '#374151' : '#e5e7eb',
                color: theme === 'dark' ? '#ffffff' : '#111827',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap'
              }}>Sign In</Link>
            </div>

            {/* Floating Feature Cards */}
            <div style={{
              position: 'absolute',
              width: '210px',
              background: theme === 'dark' ? '#374151' : '#ffffff',
              borderRadius: '18px',
              padding: '18px 18px 20px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.08)',
              border: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`,
              textAlign: 'left',
              top: '80px',
              left: '50px',
              transform: 'rotate(-6deg)'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '6px',
                color: theme === 'dark' ? '#ffffff' : '#111827'
              }}>Track Applications</div>
              <div style={{
                fontSize: '13px',
                color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                lineHeight: '1.45'
              }}>
                Keep track of all of job applications in one organized place.
              </div>
            </div>

            <div style={{
              position: 'absolute',
              width: '210px',
              background: theme === 'dark' ? '#374151' : '#ffffff',
              borderRadius: '18px',
              padding: '18px 18px 20px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.08)',
              border: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`,
              textAlign: 'left',
              top: '80px',
              right: '70px',
              transform: 'rotate(6deg)'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '6px',
                color: theme === 'dark' ? '#ffffff' : '#111827'
              }}>Analytics & Insights</div>
              <div style={{
                fontSize: '13px',
                color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                lineHeight: '1.45'
              }}>
                Get detailed insights into your search progress and performance.
              </div>
            </div>

            <div style={{
              position: 'absolute',
              width: '210px',
              background: theme === 'dark' ? '#374151' : '#ffffff',
              borderRadius: '18px',
              padding: '18px 18px 20px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.08)',
              border: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`,
              textAlign: 'left',
              bottom: '85px',
              left: '120px',
              transform: 'rotate(-4deg)'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '6px',
                color: theme === 'dark' ? '#ffffff' : '#111827'
              }}>Goal Setting</div>
              <div style={{
                fontSize: '13px',
                color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                lineHeight: '1.45'
              }}>
                Set and track your job search goals and important milestones.
              </div>
            </div>

            <div style={{
              position: 'absolute',
              width: '210px',
              background: theme === 'dark' ? '#374151' : '#ffffff',
              borderRadius: '18px',
              padding: '18px 18px 20px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.08)',
              border: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`,
              textAlign: 'left',
              bottom: '65px',
              right: '120px',
              transform: 'rotate(4deg)'
            }}>
              <div style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '6px',
                color: theme === 'dark' ? '#ffffff' : '#111827'
              }}>Contact Management</div>
              <div style={{
                fontSize: '13px',
                color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                lineHeight: '1.45'
              }}>
                Manage contacts and follow with recruiters and hiring managers.
              </div>
            </div>
          </div>
        </main>

        {/* Bottom CTA */}
        <section style={{
          marginTop: '32px',
          padding: '26px 24px',
          borderRadius: '20px',
          background: theme === 'dark' ? '#374151' : '#ffffff',
          border: `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}`,
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '8px',
            color: theme === 'dark' ? '#ffffff' : '#111827'
          }}>Ready to Take Control of Your Job Search?</div>
          <p style={{
            fontSize: '14px',
            color: theme === 'dark' ? '#9ca3af' : '#6b7280',
            marginBottom: '16px'
          }}>
            Join thousands of job seekers who are already using jobflowindia to land their dream jobs.
          </p>
          <Link to="/register" style={{
            fontWeight: '500',
            color: '#7c3aed',
            textDecoration: 'none'
          }}>Get Started for Free</Link>
          <p style={{
            marginTop: '8px',
            fontSize: '12px',
            color: '#9ca3af'
          }}>© 2024 jobflowindia. All rights reserved.</p>
        </section>
      </div>
    </div>
  );
};

export default Landing;