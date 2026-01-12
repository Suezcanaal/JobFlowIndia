import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { Code, User, Brain } from 'lucide-react';

const HeroPreview = () => {
  return (
    <div className="hero-preview">
      <div className="relative">
        <div className="preview-card" style={{ transform: 'perspective(1000px) rotateX(18deg)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '36%', height: '2rem', borderRadius: 8, background: 'var(--bg-tertiary)' }} />
            <div style={{ width: '24%', height: '2rem', borderRadius: 8, background: 'var(--bg-tertiary)' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ height: '2.5rem', borderRadius: 8, background: 'var(--bg-tertiary)', width: '60%' }} />
              <div style={{ height: '10rem', borderRadius: 8, background: 'var(--bg-primary)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '0.75rem' }}>
                <div style={{ height: '1rem', width: '50%', borderRadius: 6, background: 'var(--bg-tertiary)', marginBottom: '0.5rem' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ height: '0.6rem', background: 'var(--bg-tertiary)', borderRadius: 6 }} />
                  <div style={{ height: '0.6rem', background: 'var(--bg-tertiary)', borderRadius: 6, width: '85%' }} />
                  <div style={{ height: '0.6rem', background: 'var(--bg-tertiary)', borderRadius: 6, width: '65%' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ height: '6rem', borderRadius: 8, background: 'var(--bg-primary)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }} />
              <div style={{ height: '10rem', borderRadius: 8, background: 'var(--bg-primary)', border: '1px solid var(--border)', boxShadow: 'var(--shadow)' }} />
            </div>
          </div>
        </div>

        <div className="preview-mobile">
          <div className="mobile-card">
            <div style={{ height: '2rem', width: '60%', borderRadius: 6, background: 'var(--bg-tertiary)', marginBottom: '0.5rem' }} />
            <div style={{ height: '9rem', borderRadius: 8, background: 'var(--bg-tertiary)' }} />
            <div style={{ height: '0.6rem', width: '50%', borderRadius: 6, background: 'var(--bg-tertiary)', marginTop: '0.75rem' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <div className="landing-hero">
      <Navbar />

      <main>
        <section className="hero-center">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div>
              <h1 className="hero-title large">Organize your job search. Land your dream role.</h1>
              <p className="hero-sub">Stop using messy spreadsheets. Track applications, manage contacts, and analyze your progress in one beautiful workspace.</p>

              <div className="hero-cta flex items-center gap-3">
                <Link to="/register" className="btn btn-primary">Get Started</Link>
                <a href="#ecosystem" className="btn-ghost">Explore more</a>
              </div>
            </div>

            <HeroPreview />
          </motion.div>
        </section>

        {/* Ecosystem Section */}
        <section id="ecosystem" style={{ marginTop: '3rem', maxWidth: '72rem', marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem' }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>More Tools from the Developer</h2>
              <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>Explore other projects that complement your job search and developer growth.</p>
            </div>

            <div className="ecosystem-grid">
              <ProjectCard
                title="DSA Tracker"
                subtitle="Master Data Structures"
                href="https://treack-progress.vercel.app/"
                Icon={Code}
              />

              <ProjectCard
                title="Marlingeshwar"
                subtitle="Portfolio"
                href="https://marlingeshwar.vercel.app/"
                Icon={User}
              />

              <ProjectCard
                title="Ethicra"
                subtitle="AI Ethics Platform"
                href="https://ethicra.onrender.com/"
                Icon={Brain}
              />
            </div>
          </motion.div>
        </section>

        <footer className="footer-small">
          Built with ♥ by jobflowindia — © {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
};

export default Landing;