import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend
} from 'recharts';

const ROLE_ACCESS = {
    STORE_ASSOCIATE:    ['sales', 'products', 'catalog', 'notifications'],
    INVENTORY_MANAGER:  ['inventory', 'purchaseorder', 'products', 'catalog', 'notifications'],
    STORE_MANAGER:      ['dashboard', 'kpi', 'compliance', 'sales', 'inventory', 'notifications'],
    FINANCE_OFFICER:    ['invoice', 'payment', 'sales', 'notifications'],
    COMPLIANCE_OFFICER: ['compliance', 'auditlog', 'notifications'],
    ADMIN:              ['dashboard', 'kpi', 'compliance', 'sales', 'inventory',
                         'purchaseorder', 'products', 'catalog', 'invoice',
                         'payment', 'users', 'auditlog', 'notifications'],
};

const ALL_MODULES = [
    { key: 'dashboard',     label: 'Dashboard',       desc: 'Unified KPI + compliance view',         route: '/dashboard',     icon: '◈', section: 'Overview',   btnColor: 'primary'   },
    { key: 'kpi',           label: 'KPI Reports',     desc: 'Analytics and reporting',               route: '/kpireport',     icon: '◉', section: 'Analytics',  btnColor: 'primary'   },
    { key: 'compliance',    label: 'Compliance',      desc: 'Regulatory reports and verdicts',       route: '/compliance',    icon: '◎', section: 'Analytics',  btnColor: 'success'   },
    { key: 'sales',         label: 'Sales & Billing', desc: 'Transactions and invoices',             route: '/Sale',          icon: '◫', section: 'Operations', btnColor: 'success'   },
    { key: 'inventory',     label: 'Inventory',       desc: 'Stock tracking and replenishment',      route: '/Inventory',     icon: '▦', section: 'Operations', btnColor: 'warning'   },
    { key: 'purchaseorder', label: 'Purchase Orders', desc: 'Supplier orders and delivery',          route: '/PurchaseOrder', icon: '◳', section: 'Operations', btnColor: 'warning'   },
    { key: 'products',      label: 'Products',        desc: 'Product catalog and pricing',           route: '/Product',       icon: '◧', section: 'Operations', btnColor: 'primary'   },
    { key: 'catalog',       label: 'Catalog',         desc: 'Catalog lifecycle management',          route: '/Catalog',       icon: '◱', section: 'Operations', btnColor: 'primary'   },
    { key: 'invoice',       label: 'Invoices',        desc: 'Invoice generation and tracking',       route: '/Invoice',       icon: '◪', section: 'Finance',    btnColor: 'warning'   },
    { key: 'payment',       label: 'Payments',        desc: 'Payment processing and reconciliation', route: '/Payment',       icon: '◨', section: 'Finance',    btnColor: 'warning'   },
    { key: 'users',         label: 'Users',           desc: 'User management and roles',             route: '/user',          icon: '◎', section: 'Admin',      btnColor: 'secondary' },
    { key: 'auditlog',      label: 'Audit Logs',      desc: 'System and user action history',        route: '/auditLog',      icon: '◷', section: 'Admin',      btnColor: 'success'   },
    { key: 'notifications', label: 'Notifications',   desc: 'Alerts and system notifications',       route: '/notification',  icon: '◬', section: 'System',     btnColor: 'primary'   },
];

const SECTIONS = ['Overview', 'Analytics', 'Operations', 'Finance', 'Admin', 'System'];

export default function Dashboard() {
    const navigate = useNavigate();
    const token    = localStorage.getItem('token');
    const role     = localStorage.getItem('role') || 'STORE_MANAGER';
    const userName = localStorage.getItem('userName') || 'User';
    const allowed  = ROLE_ACCESS[role] || [];

    const [kpiReports,  setKpiReports]  = useState([]);
    const [compReports, setCompReports] = useState([]);

    useEffect(() => {
        if (!token || !role) { navigate('/login'); return; }

        if (allowed.includes('kpi')) {
            axios.get('http://localhost:1405/api/kpi-reports', {
                headers: { Authorization: 'Bearer ' + token }
            }).then(res => setKpiReports(res.data || [])).catch(() => {});
        }

        if (allowed.includes('compliance')) {
            axios.get('http://localhost:1405/api/compliance-reports', {
                headers: { Authorization: 'Bearer ' + token }
            }).then(res => setCompReports(res.data || [])).catch(() => {});
        }
    }, []);

    // KPI derived data
    const activeKPI   = kpiReports.filter(r => r.status === 'ACTIVE');
    const latest      = activeKPI[activeKPI.length - 1] || {};

    // Compliance derived data — exclude ARCHIVED
    const activeComp  = compReports.filter(r => r.status !== 'ARCHIVED');
    const failCount   = activeComp.filter(r => r.status === 'FAIL').length;
    const warnCount   = activeComp.filter(r => r.status === 'WARNING').length;
    const passCount   = activeComp.filter(r => r.status === 'PASS').length;
    const alerts      = activeComp.filter(r => r.status === 'FAIL' || r.status === 'WARNING');
    const health      = failCount > 0 ? 'CRITICAL' : warnCount > 0 ? 'AT RISK' : 'HEALTHY';
    const healthBadge = failCount > 0 ? 'danger'   : warnCount > 0 ? 'warning' : 'success';

    // Chart data
    const salesTrend = activeKPI.map(r => ({
        name:          r.scope + ' ' + (r.currentEnd || ''),
        salesGrowth:   parseFloat(r.salesGrowth)   || 0,
        stockTurnover: parseFloat(r.stockTurnover)  || 0,
        shrinkageRate: parseFloat(r.shrinkageRate)  || 0,
    }));

    const thresholdData = [
        { name: 'Stock Turnover', actual: parseFloat(latest.stockTurnover) || 0, threshold: 2.0 },
        { name: 'Sales Growth %', actual: parseFloat(latest.salesGrowth)   || 0, threshold: 0   },
        { name: 'Shrinkage %',    actual: parseFloat(latest.shrinkageRate)  || 0, threshold: 5.0 },
    ];

    const verdictBadge = (s) => {
        if (s === 'PASS')    return 'success';
        if (s === 'WARNING') return 'warning';
        if (s === 'FAIL')    return 'danger';
        return 'secondary';
    };

    return (
        <div className="container-fluid py-4" style={{ background: '#f8f9fa', minHeight: '100vh' }}>

            {/* ── Header ── */}
            <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                    <h3 className="fw-semibold mb-1">Welcome, {userName}</h3>
                    <p className="text-muted small mb-0">
                        {role.replace(/_/g, ' ')} — {allowed.length} of {ALL_MODULES.length} modules accessible
                    </p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    {allowed.includes('compliance') && (
                        <span className={`badge bg-${healthBadge} fs-6`}>{health}</span>
                    )}
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => { localStorage.clear(); navigate('/login'); }}>
                        Logout
                    </button>
                </div>
            </div>

            <hr />

            {/* ── Compliance alerts ── */}
            {allowed.includes('compliance') && alerts.map(r => (
                <div key={r.reportId}
                    className={`alert alert-${r.status === 'FAIL' ? 'danger' : 'warning'} d-flex align-items-start gap-2 mb-2`}>
                    <span className="fw-bold">⚠</span>
                    <div>
                        <strong>{r.status} — Compliance Report #{r.reportId} ({r.scope})</strong>
                        <div className="small mt-1">{r.remarks}</div>
                    </div>
                </div>
            ))}

            {/* ── Store Manager / Admin summary cards ── */}
            {(role === 'STORE_MANAGER' || role === 'ADMIN') && (
                <div className="row g-3 mb-4">
                    <div className="col-md-3">
                        <div className="card shadow-sm text-center h-100">
                            <div className="card-body">
                                <div className="text-muted small text-uppercase mb-1">Stock Turnover</div>
                                <div className={`fs-3 fw-semibold ${latest.stockTurnover >= 2 ? 'text-success' : latest.stockTurnover ? 'text-danger' : 'text-muted'}`}>
                                    {latest.stockTurnover || '—'}
                                </div>
                                <small className="text-muted">Min: 2.0</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow-sm text-center h-100">
                            <div className="card-body">
                                <div className="text-muted small text-uppercase mb-1">Sales Growth</div>
                                <div className={`fs-3 fw-semibold ${latest.salesGrowth >= 0 ? 'text-success' : latest.salesGrowth != null ? 'text-danger' : 'text-muted'}`}>
                                    {latest.salesGrowth != null
                                        ? `${latest.salesGrowth >= 0 ? '+' : ''}${latest.salesGrowth}%`
                                        : '—'}
                                </div>
                                <small className="text-muted">Min: 0%</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow-sm text-center h-100">
                            <div className="card-body">
                                <div className="text-muted small text-uppercase mb-1">Shrinkage Rate</div>
                                <div className={`fs-3 fw-semibold ${latest.shrinkageRate <= 5 ? 'text-success' : 'text-danger'}`}>
                                    {latest.shrinkageRate != null ? `${latest.shrinkageRate}%` : '—'}
                                </div>
                                <small className="text-muted">Max: 5%</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card shadow-sm text-center h-100">
                            <div className="card-body">
                                <div className="text-muted small text-uppercase mb-1">Compliance Health</div>
                                <div className={`fs-3 fw-semibold text-${healthBadge}`}>{health}</div>
                                <div className="d-flex justify-content-center gap-2 mt-1">
                                    <small className="text-success">{passCount}P</small>
                                    <small className="text-warning">{warnCount}W</small>
                                    <small className="text-danger">{failCount}F</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Compliance Officer summary cards ── */}
            {role === 'COMPLIANCE_OFFICER' && (
                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm text-center h-100">
                            <div className="card-body">
                                <div className="text-muted small text-uppercase mb-1">PASS</div>
                                <div className="fs-3 fw-semibold text-success">{passCount}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm text-center h-100">
                            <div className="card-body">
                                <div className="text-muted small text-uppercase mb-1">WARNING</div>
                                <div className="fs-3 fw-semibold text-warning">{warnCount}</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm text-center h-100">
                            <div className="card-body">
                                <div className="text-muted small text-uppercase mb-1">FAIL</div>
                                <div className="fs-3 fw-semibold text-danger">{failCount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Charts — Store Manager and Admin only ── */}
            {(role === 'STORE_MANAGER' || role === 'ADMIN') && activeKPI.length > 0 && (
                <div className="row g-3 mb-4">

                    {/* Sales growth line chart */}
                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-header bg-primary text-white">
                                <strong>Sales Growth Trend</strong>
                            </div>
                            <div className="card-body">
                                <ResponsiveContainer width="100%" height={160}>
                                    <LineChart data={salesTrend}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                        <YAxis tick={{ fontSize: 10 }} />
                                        <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                                        <Line
                                            type="monotone"
                                            dataKey="salesGrowth"
                                            stroke="#0d6efd"
                                            strokeWidth={2}
                                            dot={{ fill: '#0d6efd', r: 4 }}
                                            name="Growth %" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Compliance status panel */}
                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-header bg-success text-white">
                                <strong>Compliance Status</strong>
                            </div>
                            <div className="card-body">
                                {activeComp.slice(-4).map(r => (
                                    <div key={r.reportId}
                                        className="d-flex justify-content-between align-items-center py-1 border-bottom">
                                        <small>Report #{r.reportId} — {r.scope}</small>
                                        <span className={`badge bg-${verdictBadge(r.status)}`}>{r.status}</span>
                                    </div>
                                ))}
                                <div className="d-flex gap-3 mt-2">
                                    <small className="text-success fw-semibold">{passCount} PASS</small>
                                    <small className="text-warning fw-semibold">{warnCount} WARNING</small>
                                    <small className="text-danger fw-semibold">{failCount} FAIL</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* KPI vs threshold bar chart */}
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-header bg-dark text-white">
                                <strong>KPI vs Threshold Comparison</strong>
                            </div>
                            <div className="card-body">
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={thresholdData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} />
                                        <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                                        <Bar dataKey="actual" fill="#0d6efd" radius={[4,4,0,0]} name="Actual value" />
                                        <Bar dataKey="threshold" fill="#dc3545" radius={[4,4,0,0]} name="Threshold" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* ── Module sections ── */}
            {SECTIONS.map(section => {
                const items = ALL_MODULES.filter(m => m.section === section);
                if (!items.length) return null;
                const hasAccess = items.some(m => allowed.includes(m.key));
                if (!hasAccess) return null;

                return (
                    <div key={section} className="mb-4">
                        <p className="text-uppercase text-muted small fw-semibold mb-2"
                            style={{ letterSpacing: '0.07em' }}>
                            {section} — {items.filter(m => allowed.includes(m.key)).length} of {items.length} accessible
                        </p>
                        <div className="row g-3">
                            {items.map(m => {
                                const isAllowed = allowed.includes(m.key);
                                return (
                                    <div key={m.key} className="col-md-4">
                                        <div
                                            className={`card shadow-sm h-100 ${isAllowed ? '' : 'opacity-50'}`}
                                            style={{ cursor: isAllowed ? 'pointer' : 'not-allowed',
                                                     transition: 'box-shadow 0.15s' }}
                                            onClick={() => isAllowed && navigate(m.route)}
                                            onMouseEnter={e => { if (isAllowed) e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; }}>
                                            <div className="card-body">
                                                <div className={`badge bg-${m.btnColor} mb-2 fs-5 px-3 py-2`}>
                                                    {m.icon}
                                                </div>
                                                <h6 className="card-title fw-semibold mb-1">{m.label}</h6>
                                                <p className="card-text text-muted small mb-0">
                                                    {isAllowed ? m.desc : 'No access — contact admin'}
                                                </p>
                                                {!isAllowed && (
                                                    <small className="text-muted mt-1 d-block">🔒 Restricted</small>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

        </div>
    );
}