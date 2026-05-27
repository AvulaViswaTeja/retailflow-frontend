import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Role to allowed modules mapping
const ROLE_ACCESS = {
    STORE_ASSOCIATE:    ['sales', 'products', 'notifications'],
    INVENTORY_MANAGER:  ['inventory', 'purchaseorder', 'products', 'notifications'],
    STORE_MANAGER:      ['dashboard', 'kpi', 'compliance', 'sales', 'inventory', 'notifications'],
    FINANCE_OFFICER:    ['invoice', 'payment', 'sales', 'notifications'],
    COMPLIANCE_OFFICER: ['compliance', 'auditlog', 'notifications'],
    ADMIN:              ['dashboard', 'kpi', 'compliance', 'sales', 'inventory', 'purchaseorder', 'products', 'catalog', 'invoice', 'payment', 'users', 'auditlog', 'notifications'],
};

// All modules with routes and metadata
const ALL_MODULES = [
    // Analytics
    { key: 'kpi',           label: 'KPI Reports',     desc: 'Generate and view KPI analytics',       route: '/kpireport',      icon: '◈', bg: '#EEEDFE', color: '#534AB7', section: 'Analytics' },
    { key: 'compliance',    label: 'Compliance',      desc: 'Run compliance checks and reports',     route: '/compliance',     icon: '◉', bg: '#EAF3DE', color: '#3B6D11', section: 'Analytics' },
    // Operations
    { key: 'sales',         label: 'Sales & Billing', desc: 'Transactions, invoices, payments',      route: '/Sale',           icon: '◫', bg: '#E1F5EE', color: '#0F6E56', section: 'Operations' },
    { key: 'inventory',     label: 'Inventory',       desc: 'Stock tracking and replenishment',      route: '/Inventory',      icon: '▦', bg: '#FAEEDA', color: '#854F0B', section: 'Operations' },
    { key: 'purchaseorder', label: 'Purchase Orders', desc: 'Supplier orders and delivery tracking', route: '/PurchaseOrder',  icon: '◳', bg: '#FAEEDA', color: '#854F0B', section: 'Operations' },
    { key: 'products',      label: 'Products',        desc: 'Product catalog and pricing',           route: '/Product',        icon: '◧', bg: '#E6F1FB', color: '#185FA5', section: 'Operations' },
    { key: 'catalog',       label: 'Catalog',         desc: 'Catalog lifecycle management',          route: '/Catalog',        icon: '◱', bg: '#E6F1FB', color: '#185FA5', section: 'Operations' },
    // Finance
    { key: 'invoice',       label: 'Invoices',        desc: 'Invoice generation and tracking',       route: '/Invoice',        icon: '◪', bg: '#FAEEDA', color: '#854F0B', section: 'Finance' },
    { key: 'payment',       label: 'Payments',        desc: 'Payment processing and reconciliation', route: '/Payment',        icon: '◨', bg: '#FAEEDA', color: '#854F0B', section: 'Finance' },
    // Admin
    { key: 'users',         label: 'Users',           desc: 'User management and roles',             route: '/user',           icon: '◎', bg: '#F1EFE8', color: '#5F5E5A', section: 'Admin' },
    { key: 'auditlog',      label: 'Audit Logs',      desc: 'System and user action history',        route: '/auditLog',       icon: '◷', bg: '#EAF3DE', color: '#3B6D11', section: 'Admin' },
    // System
    { key: 'notifications', label: 'Notifications',   desc: 'Alerts and system notifications',       route: '/notification',   icon: '◬', bg: '#E6F1FB', color: '#185FA5', section: 'System' },
];

const SECTIONS = ['Analytics', 'Operations', 'Finance', 'Admin', 'System'];

export default function Dashboard() {
    const navigate  = useNavigate();
    const role      = localStorage.getItem('role') || 'STORE_MANAGER';
    const userName  = localStorage.getItem('userName') || 'User';
    const allowed   = ROLE_ACCESS[role] || [];

    const [kpiReports,  setKpiReports]  = useState([]);
    const [compReports, setCompReports] = useState([]);

    useEffect(() => {
        // Only load KPI and compliance data if role has access
        if (allowed.includes('kpi')) {
            axios.get('http://localhost:8016/api/kpi-reports')
                .then(res => setKpiReports(res.data || []))
                .catch(() => {});
        }
        if (allowed.includes('compliance')) {
            axios.get('http://localhost:8016/api/compliance-reports')
                .then(res => setCompReports(res.data || []))
                .catch(() => {});
        }
    }, []);

    const activeKPI   = kpiReports.filter(r => r.status === 'ACTIVE');
    const latest      = activeKPI[activeKPI.length - 1] || {};
    const failCount   = compReports.filter(r => r.status === 'FAIL').length;
    const warnCount   = compReports.filter(r => r.status === 'WARNING').length;
    const passCount   = compReports.filter(r => r.status === 'PASS').length;
    const alerts      = compReports.filter(r => r.status === 'FAIL' || r.status === 'WARNING');
    const health      = failCount > 0 ? 'CRITICAL' : warnCount > 0 ? 'AT RISK' : 'HEALTHY';
    const healthColor = { HEALTHY: '#3B6D11', 'AT RISK': '#854F0B', CRITICAL: '#A32D2D' };
    const healthBg    = { HEALTHY: '#EAF3DE', 'AT RISK': '#FAEEDA', CRITICAL: '#FCEBEB' };

    // Role-specific metrics
    const roleMetrics = {
        STORE_ASSOCIATE:    [{ label: 'My module', value: 'Sales & Billing' }, { label: 'Focus', value: 'Transactions' }],
        INVENTORY_MANAGER:  [{ label: 'Stock turnover', value: latest.stockTurnover || '—', color: '#3B6D11' }, { label: 'Low stock items', value: '0', color: '#3B6D11' }],
        STORE_MANAGER:      [{ label: 'Stock turnover', value: latest.stockTurnover || '—', color: '#3B6D11' }, { label: 'Sales growth', value: latest.salesGrowth != null ? `+${latest.salesGrowth}%` : '—', color: '#3B6D11' }, { label: 'Compliance', value: health, color: healthColor[health] }],
        FINANCE_OFFICER:    [{ label: 'Module', value: 'Finance' }, { label: 'Focus', value: 'Invoices & Payments' }],
        COMPLIANCE_OFFICER: [{ label: 'PASS', value: passCount, color: '#3B6D11' }, { label: 'WARNING', value: warnCount, color: '#854F0B' }, { label: 'FAIL', value: failCount, color: '#A32D2D' }],
        ADMIN:              [{ label: 'Total modules', value: ALL_MODULES.length, color: '#185FA5' }, { label: 'Users', value: 2, color: '#185FA5' }, { label: 'System', value: 'OK', color: '#3B6D11' }],
    };
    const metrics = roleMetrics[role] || [];

    const s = {
        page:    { fontFamily: 'sans-serif', background: '#f9fafb', minHeight: '100vh', padding: '24px' },
        card:    { background: 'white', border: '1px solid #f3f4f6', borderRadius: '10px', padding: '16px', marginBottom: '14px' },
        metric:  { background: '#f9fafb', borderRadius: '8px', padding: '12px' },
        section: { fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px', marginTop: '4px' },
        modCard: (isAllowed) => ({
            background: isAllowed ? 'white' : '#f9fafb',
            border: `1px solid ${isAllowed ? '#f3f4f6' : '#f3f4f6'}`,
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
        <div style={s.page}>

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
                        onClick={() => { localStorage.clear(); navigate('/'); }}
                        style={{ padding: '6px 12px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px', color: '#6b7280', cursor: 'pointer' }}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Alerts — only for roles with compliance access */}
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

            {/* Module sections */}
            {SECTIONS.map(section => {
                const items = ALL_MODULES.filter(m => m.section === section);
                if (!items.length) return null;

                // For non-admin roles — only show sections that have at least one allowed module
                const hasAccess = items.some(m => allowed.includes(m.key));
                if (!hasAccess && role !== 'ADMIN') return null;

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