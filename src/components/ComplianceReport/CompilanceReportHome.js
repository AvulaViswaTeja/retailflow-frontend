import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

const features = [
    {
        to: 'insert', icon: '◉', color: { bg: '#EAF3DE', color: '#3B6D11' },
        title: 'Run compliance check',
        desc: 'Evaluate KPI metrics — get PASS, WARNING, or FAIL verdict'
    },
    {
        to: 'getAll', icon: '☰', color: { bg: '#E1F5EE', color: '#0F6E56' },
        title: 'All reports',
        desc: 'View all compliance reports with color-coded verdict badges'
    },
    {
        to: 'getPaginated', icon: '❑', color: { bg: '#EEEDFE', color: '#534AB7' },
        title: 'Paginated view',
        desc: 'Browse compliance records page by page for audit review'
    },
    {
        to: 'getById', icon: '⊙', color: { bg: '#E6F1FB', color: '#185FA5' },
        title: 'Get by ID',
        desc: 'Find a specific compliance report by its unique ID'
    },
    {
        to: 'getAll', icon: '✎', color: { bg: '#FAEEDA', color: '#854F0B' },
        title: 'Update report',
        desc: 'Go to All Reports and click Edit next to a report'
    },
    {
        to: 'delete', icon: '⊗', color: { bg: '#FCEBEB', color: '#A32D2D' },
        title: 'Archive report',
        desc: 'Archive a report — data is preserved for audit trail'
    },
];

const thresholds = [
    { label: 'Stock turnover', value: '≥ 2.0', sub: 'Times per period',      color: '#3B6D11' },
    { label: 'Sales growth',   value: '≥ 0%',  sub: 'No declining revenue',  color: '#3B6D11' },
    { label: 'Shrinkage rate', value: '≤ 5%',  sub: 'Max stock loss allowed', color: '#A32D2D' },
];

export default function CompilanceReportHome() {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname.replace(/\/$/, '') === '/compliance';

    const styles = {
        wrap:         { fontFamily: 'sans-serif', display: 'flex', minHeight: '100vh' },
        main:         { flex: 1, padding: '24px', background: '#f9fafb' },
        header:       { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '4px' },
        title:        { fontSize: '18px', fontWeight: 600, color: '#111827' },
        sub:          { fontSize: '13px', color: '#6b7280', marginBottom: '20px' },
        badge:        { display: 'inline-block', padding: '2px 8px', borderRadius: '20px', fontSize: '11px', background: '#EAF3DE', color: '#3B6D11' },
        backBtn:      { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6b7280', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '7px', padding: '5px 10px', cursor: 'pointer', marginBottom: '4px' },
        sectionLabel: { fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px', marginTop: '20px' },
        grid:         { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
        card:         { background: 'white', border: '1px solid #f3f4f6', borderRadius: '10px', padding: '16px', cursor: 'pointer', transition: 'border-color 0.15s', position: 'relative', overflow: 'hidden' },
        iconBox:      { width: '34px', height: '34px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', marginBottom: '10px' },
        cardTitle:    { fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '4px' },
        cardDesc:     { fontSize: '12px', color: '#6b7280', lineHeight: 1.5 },
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
                                <div style={styles.title}>Compliance & Audit</div>
                            </div>
                            <span style={styles.badge}>Module 4.5</span>
                        </div>
                        <p style={styles.sub}>
                            Regulatory reporting — evaluate KPI thresholds and track compliance verdicts
                        </p>

                        <div style={styles.sectionLabel}>Core operations</div>
                        <div style={styles.grid}>
                            {features.slice(0, 3).map(f => (
                                <FeatureCard key={f.title} f={f} navigate={navigate} styles={styles} />
                            ))}
                        </div>

                        <div style={styles.sectionLabel}>Search & management</div>
                        <div style={styles.grid}>
                            {features.slice(3).map(f => (
                                <FeatureCard key={f.title} f={f} navigate={navigate} styles={styles} />
                            ))}
                        </div>

                        {/* Thresholds reference */}
                        <div style={styles.sectionLabel}>Compliance thresholds</div>
                        <div style={{ background: 'white', border: '1px solid #f3f4f6', borderRadius: '10px', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
                            {thresholds.map((t, i) => (
                                <div key={t.label} style={{ padding: '14px 16px', borderRight: i < 2 ? '1px solid #f3f4f6' : 'none' }}>
                                    <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{t.label}</div>
                                    <div style={{ fontSize: '20px', fontWeight: 600, color: t.color }}>{t.value}</div>
                                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '3px' }}>{t.sub}</div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <button style={{ ...styles.backBtn, marginBottom: '20px' }} onClick={() => navigate('/compliance')}>
                            ← Compliance
                        </button>
                        <Outlet />
                    </>
                )}
            </main>
        </div>
    );
}

function FeatureCard({ f, navigate, styles }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onClick={() => navigate(`/compliance/${f.to}`)}
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