import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

const features = [
  {
    to: 'savereport', icon: '✦', color: { bg: '#E6F1FB', color: '#185FA5' },
    title: 'Generate report',
    desc: 'Compute KPIs from actual sales and inventory data'
  },
  {
    to: 'getAll', icon: '☰', color: { bg: '#E1F5EE', color: '#0F6E56' },
    title: 'All reports',
    desc: 'View full history with color-coded values and actions'
  },
  {
    to: 'getPaginated', icon: '❑', color: { bg: '#EEEDFE', color: '#534AB7' },
    title: 'Paginated view',
    desc: 'Browse reports page by page with navigation controls'
  },
  {
    to: 'getById', icon: '⊙', color: { bg: '#EAF3DE', color: '#3B6D11' },
    title: 'Get by ID',
    desc: 'Find a specific report using its unique ID number'
  },
  {
    to: 'getLatest', icon: '◷', color: { bg: '#FAEEDA', color: '#854F0B' },
    title: 'Latest by scope',
    desc: 'Most recent report for DAILY, WEEKLY, or MONTHLY'
  },
  {
    to: 'GetByDateRange', icon: '▦', color: { bg: '#E6F1FB', color: '#185FA5' },
    title: 'By date range',
    desc: 'Filter reports generated between two dates'
  },
  {
    to: 'getTrend', icon: '◬', color: { bg: '#E1F5EE', color: '#0F6E56' },
    title: 'Trend analysis',
    desc: 'See how KPIs changed over time'
  },
  {
    to: 'delete', icon: '⊗', color: { bg: '#FCEBEB', color: '#A32D2D' },
    title: 'Archive report',
    desc: 'Mark a report as archived — data is preserved'
  },
];

export default function KPIReportHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/kpireport' || location.pathname === '/kpireport/';

  const styles = {
    wrap:    { fontFamily: 'sans-serif', display: 'flex', minHeight: '100vh' },
    main:    { flex: 1, padding: '24px', background: '#f9fafb' },
    header:  { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' },
    title:   { fontSize: '18px', fontWeight: 600, color: '#111827' },
    sub:     { fontSize: '13px', color: '#6b7280', marginBottom: '20px' },
    badge:   { display: 'inline-block', padding: '2px 8px', borderRadius: '20px', fontSize: '11px', background: '#E6F1FB', color: '#185FA5' },
    backBtn: { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '7px', padding: '5px 10px', cursor: 'pointer', marginBottom: '4px' },
    sectionLabel: { fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px', marginTop: '20px' },
    grid:    { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
    card:    { background: 'white', border: '1px solid #f3f4f6', borderRadius: '10px', padding: '16px', cursor: 'pointer', transition: 'border-color 0.15s', position: 'relative', overflow: 'hidden' },
    iconBox: { width: '34px', height: '34px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', marginBottom: '10px' },
    cardTitle: { fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '4px' },
    cardDesc:  { fontSize: '12px', color: '#6b7280', lineHeight: 1.5 },
  };

  return (
    <div style={styles.wrap}>
      <main style={styles.main}>

        {isHome ? (
          <>
            <div style={styles.header}>
              <div>
                <button style={styles.backBtn} onClick={() => navigate('/dashboard')}>
                  ← Dashboard
                </button>
                <div style={styles.title}>KPI Reports</div>
              </div>
              <span style={styles.badge}>Module 4.6</span>
            </div>
            <p style={styles.sub}>
              Analytics and reporting — compute, track and analyze store performance indicators
            </p>

            <div style={styles.sectionLabel}>Core operations</div>
            <div style={styles.grid}>
              {features.slice(0, 3).map(f => (
                <FeatureCard key={f.to} f={f} navigate={navigate} styles={styles} />
              ))}
            </div>

            <div style={styles.sectionLabel}>Search & filter</div>
            <div style={styles.grid}>
              {features.slice(3, 6).map(f => (
                <FeatureCard key={f.to} f={f} navigate={navigate} styles={styles} />
              ))}
            </div>

            <div style={styles.sectionLabel}>Analysis & management</div>
            <div style={styles.grid}>
              {features.slice(6).map(f => (
                <FeatureCard key={f.to} f={f} navigate={navigate} styles={styles} />
              ))}
            </div>
          </>
        ) : (
          <>
            <button style={{ ...styles.backBtn, marginBottom: '20px' }} onClick={() => navigate('/kpireport')}>
              ← KPI Reports
            </button>
            <Outlet />
          </>
        )}

      </main>
    </div>
  );
}

function FeatureCard({ f, navigate, styles }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onClick={() => navigate(`/kpireport/${f.to}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        borderColor: hovered ? '#d1d5db' : '#f3f4f6',
        background: hovered ? '#fafafa' : 'white',
      }}
    >
      <div style={{ ...styles.iconBox, ...f.color }}>{f.icon}</div>
      <div style={styles.cardTitle}>{f.title}</div>
      <div style={styles.cardDesc}>{f.desc}</div>
      {hovered && (
        <span style={{ position: 'absolute', top: '14px', right: '14px', fontSize: '14px', color: '#9ca3af' }}>→</span>
      )}
    </div>
  );
}