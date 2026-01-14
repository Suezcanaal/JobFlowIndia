// DEPRECATED: This Navbar is unused. The app uses `components/layout/Navbar.jsx`.
// You can safely delete this file to avoid confusion.
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="floating-navbar">
      <div className="pill">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('/') }>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>J</div>
            <div style={{ fontWeight: 600 }}>jobflowindia</div>
          </div>

          <nav style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/docs">Docs</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/register')} className="btn btn-primary">Get Started</button>
          <Link to="/login" className="inline-flex items-center px-3 py-2 border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">Sign in</Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
    