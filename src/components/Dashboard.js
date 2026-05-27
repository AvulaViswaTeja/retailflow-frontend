import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    LineChart, Line, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend
} from 'recharts';

// Role to allowed modules mapping
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

// All 13 modules
const ALL_MODULES = [
    { key: 'dashboard',     label: 'Dashboard',       desc: 'Unified KPI + compliance view',         route: '/dashboard',     icon: '◈', bg: '#E6F1FB', color: '#185FA5', section: 'Overview' },
    { key: 'kpi',           label: 'KPI Reports',     desc: 'Analytics and reporting',               route: '/kpireport',     icon: '◉', bg: '#EEEDFE', color: '#534AB7', section: 'Analytics' },
    { key: 'compliance',    label: 'Compliance',      desc: 'Regulatory reports and verdicts',       route: '/compliance',    icon: '◎', bg: '#EAF3DE', color: '#3B6D11', section: 'Analytics' },
    { key: 'sales',         label: 'Sales & Billing', desc: 'Transactions and invoices',             route: '/Sale',          icon: '◫', bg: '#E1F5EE', color: '#0F6E56', section: 'Operations' },
    { key: 'inventory',     label: 'Inventory',       desc: 'Stock tracking and replenishment',      route: '/Inventory',     icon: '▦', bg: '#FAEEDA', color: '#854F0B', section: 'Operations' },
    { key: 'purchaseorder', label: 'Purchase Orders', desc: 'Supplier orders and delivery',          route: '/PurchaseOrder', icon: '◳', bg: '#FAEEDA', color: '#854F0B', section: 'Operations' },
    { key: 'products',      label: 'Products',        desc: 'Product catalog and pricing',           route: '/Product',       icon: '◧', bg: '#E6F1FB', color: '#185FA5', section: 'Operations' },
    { key: 'catalog',       label: 'Catalog',         desc: 'Catalog lifecycle management',          route: '/Catalog',       icon: '◱', bg: '#E6F1FB', color: '#185FA5', section: 'Operations' },
    { key: 'invoice',       label: 'Invoices',        desc: 'Invoice generation and tracking',       route: '/Invoice',       icon: '◪', bg: '#FAEEDA', color: '#854F0B', section: 'Finance' },
    { key: 'payment',       label: 'Payments',        desc: 'Payment processing and reconciliation', route: '/Payment',       icon: '◨', bg: '#FAEEDA', color: '#854F0B', section: 'Finance' },
    { key: 'users',         label: 'Users',           desc: 'User management and roles',             route: '/user',          icon: '◎', bg: '#F1EFE8', color: '#5F5E5A', section: 'Admin' },
    { key: 'auditlog',      label: 'Audit Logs',      desc: 'System and user action history',        route: '/auditLog',      icon: '◷', bg: '#EAF3DE', color: '#3B6D11', section: 'Admin' },
    { key: 'notifications', label: 'Notifications',   desc: 'Alerts and system notifications',       route: '/notification',  icon: '◬', bg: '#E6F1FB', color: '#185FA5', section: 'System' },
];

const SECTIONS = ['Overview', 'Analytics', 'Operations', 'Finance', 'Admin', 'System'];

export default function Dashboard() {
    const navigate  = useNavigate();
    const token     = localStorage.getItem('token');
    const role      = localStorage.getItem('role') || 'STORE_MANAGER';
    const userName  = localStorage.getItem('userName') || 'User';
    const allowed   = ROLE_ACCESS[role] || [];

    const [kpiReports,  setKpiReports]  = useState([]);
    const [compReports, setCompReports] = useState([]);

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!token || !role) {
            navigate('/login');
            return;
        }

        if (allowed.includes('kpi')) {
            axios.get('http://localhost:1405/api/kpi-reports', {
                headers: { Authorization: 'Bearer ' + token }
            })
            .then(res => setKpiReports(res.data || []))
            .catch(() => {});
        }

        if (allowed.includes('compliance')) {
            axios.get('http://localhost:1405/api/compliance-reports', {
                headers: { Authorization: 'Bearer ' + token }
            })
            .then(res => setCompReports(res.data || []))
            .catch(() => {});
        }
    }, []);

    // Derived data
    const activeKPI   = kpiReports.filter(r => r.status === 'ACTIVE');
    const latest      = activeKPI[activeKPI.length - 1] || {};
    const failCount   = compReports.filter(r => r.status === 'FAIL').length;
    const warnCount   = compReports.filter(r => r.status === 'WARNING').length;
    const passCount   = compReports.filter(r => r.status === 'PASS').length;
    const alerts      = compReports.filter(r => r.status === 'FAIL' || r.status === 'WARNING');
    const health      = failCount > 0 ? 'CRITICAL' : warnCount > 0 ? 'AT RISK' : 'HEALTHY';
    const healthColor = { HEALTHY: '#3B6D11', 'AT RISK': '#854F0B', CRITICAL: '#A32D2D' };
    const healthBg    = { HEALTHY: '#EAF3DE', 'AT RISK': '#FAEEDA', CRITICAL: '#FCEBEB' };

    const salesTrend = activeKPI.map(r => ({
        name: r.scope + ' ' + (r.currentEnd || ''),
        salesGrowth:   parseFloat(r.salesGrowth)   || 0,
        stockTurnover: parseFloat(r.stockTurnover)  || 0,
        shrinkageRate: parseFloat(r.shrinkageRate)  || 0,
    }));

    const thresholdData = [
        { name: 'Stock Turnover', actual: parseFloat(latest.stockTurnover) || 0, threshold: 2.0 },
        { name: 'Sales Growth %', actual: parseFloat(latest.salesGrowth)   || 0, threshold: 0 },
        { name: 'Shrinkage %',    actual: parseFloat(latest.shrinkageRate)  || 0, threshold: 5.0 },
    ];

    // Role specific metrics
    const roleMetrics = {
        STORE_ASSOCIATE:    [{ label: 'Module', value: 'Sales & Billing' }, { label: 'Focus', value: 'Transactions' }],
        INVENTORY_MANAGER:  [{ label: 'Stock turnover', value: latest.stockTurnover || '—', color: '#3B6D11' }, { label: 'Focus', value: 'Stock Management' }],
        STORE_MANAGER:      [
            { label: 'Stock turnover', value: latest.stockTurnover || '—', color: '#3B6D11' },
            { label: 'Sales growth',   value: latest.salesGrowth != null ? `+${latest.salesGrowth}%` : '—', color: '#3B6D11' },
            { label: 'Compliance',     value: health, color: healthColor[health] }
        ],
        FINANCE_OFFICER:    [{ label: 'Module', value: 'Finance' }, { label: 'Focus', value: 'Invoices & Payments' }],
        COMPLIANCE_OFFICER: [
            { label: 'PASS',    value: passCount,  color: '#3B6D11' },
            { label: 'WARNING', value: warnCount,  color: '#854F0B' },
            { label: 'FAIL',    value: failCount,  color: '#A32D2D' }
        ],
        ADMIN: [
            { label: 'Total modules', value: ALL_MODULES.length, color: '#185FA5' },
            { label: 'Users',         value: 2,                   color: '#185FA5' },
            { label: 'System',        value: 'OK',                color: '#3B6D11' }
        ],
    };
    const metrics = roleMetrics[role] || [];

    const verdictBadgeClass = (s) => {
        if (s === 'PASS')    return 'bg-success';
        if (s === 'WARNING') return 'bg-warning text-dark';
        if (s === 'FAIL')    return 'bg-danger';
        return 'bg-secondary';
    };

    const s = {
        card:    { background: 'white', border: '1px solid #f3f4f6', borderRadius: '10px', padding: '16px', marginBottom: '14px' },
        metric:  { background: '#f9fafb', borderRadius: '8px', padding: '12px' },
        modCard: (isAllowed) => ({
            background: isAllowed ? 'white' : '#f9fafb',
            border: '1px solid #f3f4f6',
            borderRadius: '10px', padding: '14px',
            cursor: isAllowed ? 'pointer' : 'not-allowed',
            opacity: isAllowed ? 1 : 0.4,
            transition: 'border-color 0.15s',
        }),
        iconBox: (bg, color, isAllowed) => ({
            width: '32px', height: '32px', borderRadius: '8px',
            background: isAllowed ? bg : '#f3f4f6',
            color: isAllowed ? color : '#9ca3af',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '15px',
            marginBottom: '8px',
        }),
    };

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '24px', background: '#f9fafb', minHeight: '100vh' }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '4px' }}>
                        Welcome, {userName}
                    </h2>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>
                        {role.replace(/_/g, ' ')} — {allowed.length} of {ALL_MODULES.length} modules accessible
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {allowed.includes('compliance') && (
                        <span style={{ background: healthBg[health], color: healthColor[health], padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 500 }}>
                            {health}
                        </span>
                    )}
                    <button
                        onClick={() => { localStorage.clear(); navigate('/login'); }}
                        style={{ padding: '6px 14px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px', color: '#6b7280', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Compliance alerts */}
            {allowed.includes('compliance') && alerts.length > 0 && alerts.map(r => (
                <div key={r.reportId} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 14px', background: r.status === 'FAIL' ? '#FCEBEB' : '#FAEEDA', borderRadius: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '16px', color: r.status === 'FAIL' ? '#A32D2D' : '#854F0B', flexShrink: 0 }}>⚠</span>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: r.status === 'FAIL' ? '#A32D2D' : '#854F0B' }}>
                            {r.status} — Compliance Report #{r.reportId} {r.scope}
                        </div>
                        <div style={{ fontSize: '12px', color: r.status === 'FAIL' ? '#A32D2D' : '#854F0B', marginTop: '2px', opacity: 0.85 }}>
                            {r.remarks}
                        </div>
                    </div>
                </div>
            ))}

            {/* Metrics row */}
            {metrics.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${metrics.length}, 1fr)`, gap: '10px', marginBottom: '16px' }}>
                    {metrics.map((m, i) => (
                        <div key={i} style={s.metric}>
                            <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{m.label}</div>
                            <div style={{ fontSize: '20px', fontWeight: 600, color: m.color || '#111827' }}>{m.value}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* KPI + Compliance charts — only for Store Manager and Admin */}
            {(role === 'STORE_MANAGER' || role === 'ADMIN') && activeKPI.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>

                    {/* Sales growth chart */}
                    <div style={s.card}>
                        <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Sales Growth Trend</div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>Growth % across active KPI reports</div>
                        <ResponsiveContainer width="100%" height={140}>
                            <LineChart data={salesTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                                <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
                                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                                <Line type="monotone" dataKey="salesGrowth" stroke="#185FA5" strokeWidth={2} dot={{ fill: '#185FA5', r: 4 }} name="Growth %" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Compliance status */}
                    <div style={s.card}>
                        <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Compliance Status</div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>Recent compliance reports</div>
                        {compReports.slice(-4).map(r => (
                            <div key={r.reportId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>
                                <div style={{ fontSize: '12px', color: '#374151' }}>Report #{r.reportId} — {r.scope}</div>
                                <span className={`badge ${verdictBadgeClass(r.status)}`}>{r.status}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '10px', fontSize: '12px' }}>
                            <span style={{ color: '#3B6D11', fontWeight: 500 }}>{passCount} PASS</span>
                            <span style={{ color: '#854F0B', fontWeight: 500 }}>{warnCount} WARNING</span>
                            <span style={{ color: '#A32D2D', fontWeight: 500 }}>{failCount} FAIL</span>
                        </div>
                    </div>

                    {/* Threshold comparison chart */}
                    <div style={{ ...s.card, gridColumn: '1 / -1' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>KPI vs Threshold Comparison</div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '12px' }}>Latest report values against compliance thresholds</div>
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={thresholdData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px' }} />
                                <Legend wrapperStyle={{ fontSize: '12px' }} />
                                <Bar dataKey="actual" fill="#185FA5" radius={[4,4,0,0]} name="Actual value" />
                                <Bar dataKey="threshold" fill="#E24B4A" radius={[4,4,0,0]} name="Threshold" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            )}

            {/* Module sections */}
            {SECTIONS.map(section => {
                const items = ALL_MODULES.filter(m => m.section === section);
                if (!items.length) return null;
                const hasAccess = items.some(m => allowed.includes(m.key));
                if (!hasAccess) return null;

                return (
                    <div key={section} style={s.card}>
                        <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{section}</div>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '14px' }}>
                            {items.filter(m => allowed.includes(m.key)).length} of {items.length} modules accessible
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                            {items.map(m => {
                                const isAllowed = allowed.includes(m.key);
                                return (
                                    <div
                                        key={m.key}
                                        style={s.modCard(isAllowed)}
                                        onClick={() => isAllowed && navigate(m.route)}
                                        onMouseEnter={e => { if (isAllowed) e.currentTarget.style.borderColor = '#d1d5db'; }}
                                        onMouseLeave={e => { if (isAllowed) e.currentTarget.style.borderColor = '#f3f4f6'; }}
                                    >
                                        <div style={s.iconBox(m.bg, m.color, isAllowed)}>{m.icon}</div>
                                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#111827', marginBottom: '3px' }}>{m.label}</div>
                                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                            {isAllowed ? m.desc : 'No access — contact admin'}
                                        </div>
                                        {!isAllowed && (
                                            <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>🔒 Restricted</div>
                                        )}
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