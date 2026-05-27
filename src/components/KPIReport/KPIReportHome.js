import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

const features = [
    {
        to: 'savereport',
        icon: '✦', bg: 'primary',
        title: 'Generate Report',
        desc: 'Compute KPIs from actual sales and inventory data'
    },
    {
        to: 'getAll',
        icon: '☰', bg: 'success',
        title: 'All Reports',
        desc: 'View full history with color-coded values and actions'
    },
    {
        to: 'getPaginated',
        icon: '❑', bg: 'info',
        title: 'Paginated View',
        desc: 'Browse reports page by page with navigation controls'
    },
    {
        to: 'getById',
        icon: '⊙', bg: 'success',
        title: 'Get by ID',
        desc: 'Find a specific report using its unique ID number'
    },
    {
        to: 'getLatest',
        icon: '◷', bg: 'warning',
        title: 'Latest by Scope',
        desc: 'Most recent report for DAILY, WEEKLY, or MONTHLY'
    },
    {
        to: 'GetByDateRange',
        icon: '▦', bg: 'primary',
        title: 'By Date Range',
        desc: 'Filter reports generated between two dates'
    },
    {
        to: 'getTrend',
        icon: '◬', bg: 'success',
        title: 'Trend Analysis',
        desc: 'See how KPIs changed over time'
    },
    {
        to: 'getAll',
        icon: '✎', bg: 'warning',
        title: 'Update Report',
        desc: 'Go to All Reports and click Edit next to a report'
    },
    {
        to: 'delete',
        icon: '⊗', bg: 'danger',
        title: 'Archive Report',
        desc: 'Mark a report as archived — data is preserved'
    },
];

export default function KPIReportHome() {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname.replace(/\/$/, '') === '/kpireport';

    return (
        <div className="container-fluid py-4" style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            {isHome ? (
                <>
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <button
                                className="btn btn-outline-secondary btn-sm mb-2"
                                onClick={() => navigate('/dashboard')}>
                                ← Dashboard
                            </button>
                            <h3 className="fw-semibold mb-0">KPI Reports</h3>
                            <p className="text-muted small mb-0">
                                Analytics and reporting — compute, track and analyze store performance indicators
                            </p>
                        </div>
                        <span className="badge bg-primary">Module 4.6</span>
                    </div>

                    <hr />

                    {/* Core Operations */}
                    <p className="text-uppercase text-muted small fw-semibold mb-2" style={{ letterSpacing: '0.07em' }}>
                        Core Operations
                    </p>
                    <div className="row g-3 mb-3">
                        {features.slice(0, 3).map(f => (
                            <FeatureCard key={f.title} f={f} navigate={navigate} path="kpireport" />
                        ))}
                    </div>

                    {/* Search & Filter */}
                    <p className="text-uppercase text-muted small fw-semibold mb-2" style={{ letterSpacing: '0.07em' }}>
                        Search & Filter
                    </p>
                    <div className="row g-3 mb-3">
                        {features.slice(3, 6).map(f => (
                            <FeatureCard key={f.title} f={f} navigate={navigate} path="kpireport" />
                        ))}
                    </div>

                    {/* Analysis & Management */}
                    <p className="text-uppercase text-muted small fw-semibold mb-2" style={{ letterSpacing: '0.07em' }}>
                        Analysis & Management
                    </p>
                    <div className="row g-3 mb-3">
                        {features.slice(6).map(f => (
                            <FeatureCard key={f.title} f={f} navigate={navigate} path="kpireport" />
                        ))}
                    </div>

                    {/* Threshold reference */}
                    <p className="text-uppercase text-muted small fw-semibold mb-2" style={{ letterSpacing: '0.07em' }}>
                        KPI Thresholds
                    </p>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="row text-center">
                                <div className="col-md-4 border-end">
                                    <div className="text-muted small text-uppercase mb-1">Stock Turnover</div>
                                    <div className="fs-4 fw-semibold text-success">≥ 2.0</div>
                                    <div className="text-muted small">Times per period</div>
                                </div>
                                <div className="col-md-4 border-end">
                                    <div className="text-muted small text-uppercase mb-1">Sales Growth</div>
                                    <div className="fs-4 fw-semibold text-success">≥ 0%</div>
                                    <div className="text-muted small">No declining revenue</div>
                                </div>
                                <div className="col-md-4">
                                    <div className="text-muted small text-uppercase mb-1">Shrinkage Rate</div>
                                    <div className="fs-4 fw-semibold text-danger">≤ 5%</div>
                                    <div className="text-muted small">Max stock loss allowed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <button
                        className="btn btn-outline-secondary btn-sm mb-3"
                        onClick={() => navigate('/kpireport')}>
                        ← KPI Reports
                    </button>
                    <Outlet />
                </>
            )}
        </div>
    );
}

function FeatureCard({ f, navigate, path }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div className="col-md-4">
            <div
                className={`card shadow-sm h-100 ${hovered ? 'border-primary' : ''}`}
                style={{ cursor: 'pointer', transition: 'border-color 0.15s, box-shadow 0.15s',
                    boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.1)' : '' }}
                onClick={() => navigate(`/${path}/${f.to}`)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <div className="card-body">
                    <div className={`badge bg-${f.bg} mb-3 fs-5 px-3 py-2`}>
                        {f.icon}
                    </div>
                    <h6 className="card-title fw-semibold">{f.title}</h6>
                    <p className="card-text text-muted small mb-0">{f.desc}</p>
                </div>
                {hovered && (
                    <div className="card-footer bg-transparent border-0 text-end">
                        <small className={`text-${f.bg}`}>Open →</small>
                    </div>
                )}
            </div>
        </div>
    );
}