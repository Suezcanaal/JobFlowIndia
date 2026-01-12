import React from 'react';

const StatCard = ({ icon: Icon, label, value, trend, trendColor = '#10b981' }) => {
  return (
    <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: 12, padding: 18, boxShadow: 'var(--shadow)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
            {Icon ? <Icon size={20} /> : null}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.6 }}>{label}</div>
            <div style={{ marginTop: 6, fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{value}</div>
          </div>
        </div>

        <div style={{ fontSize: 13, color: trendColor }}>{trend}</div>
      </div>
    </div>
  );
};

export default StatCard;
