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
 
const GRAD = {
    blue:   'linear-gradient(135deg,#2563eb,#3b82f6)',
    green:  'linear-gradient(135deg,#16a34a,#22c55e)',
    amber:  'linear-gradient(135deg,#d97706,#f59e0b)',
    purple: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    teal:   'linear-gradient(135deg,#0d9488,#14b8a6)',
    pink:   'linear-gradient(135deg,#db2777,#ec4899)',
    gray:   'linear-gradient(135deg,#475569,#64748b)',
};
 
const ALL_MODULES = [
   
    { key: 'kpi',           label: 'KPI Reports',     desc: 'Analytics and reporting',               route: '/kpireport',     icon: 'ti-chart-bar',        grad: GRAD.blue,   section: 'Analytics'  },
    { key: 'compliance',    label: 'Compliance',      desc: 'Regulatory reports and verdicts',       route: '/compliance',    icon: 'ti-shield-check',     grad: GRAD.green,  section: 'Analytics'  },
    { key: 'sales',         label: 'Sales & Billing', desc: 'Transactions and invoices',             route: '/Sale',          icon: 'ti-receipt-2',        grad: GRAD.green,  section: 'Operations' },
    { key: 'inventory',     label: 'Inventory',       desc: 'Stock tracking and replenishment',      route: '/Inventory',     icon: 'ti-package',          grad: GRAD.amber,  section: 'Operations' },
    { key: 'purchaseorder', label: 'Purchase Orders', desc: 'Supplier orders and delivery',          route: '/PurchaseOrder', icon: 'ti-truck',            grad: GRAD.amber,  section: 'Operations' },
    { key: 'products',      label: 'Products',        desc: 'Product catalog and pricing',           route: '/Product',       icon: 'ti-tag',              grad: GRAD.blue,   section: 'Operations' },
    { key: 'catalog',       label: 'Catalog',         desc: 'Catalog lifecycle management',          route: '/Catalog',       icon: 'ti-book',             grad: GRAD.blue,   section: 'Operations' },
    { key: 'invoice',       label: 'Invoices',        desc: 'Invoice generation and tracking',       route: '/Invoice',       icon: 'ti-file-invoice',     grad: GRAD.amber,  section: 'Finance'    },
    { key: 'payment',       label: 'Payments',        desc: 'Payment processing and reconciliation', route: '/Payment',       icon: 'ti-credit-card',      grad: GRAD.amber,  section: 'Finance'    },
    { key: 'users',         label: 'Users',           desc: 'User management and roles',             route: '/user',          icon: 'ti-users',            grad: GRAD.purple, section: 'Admin'      },
    { key: 'auditlog',      label: 'Audit Logs',      desc: 'System and user action history',        route: '/auditLog',      icon: 'ti-clipboard-list',   grad: GRAD.teal,   section: 'Admin'      },
    { key: 'notifications', label: 'Notifications',   desc: 'Alerts and system notifications',       route: '/notification',  icon: 'ti-bell',             grad: GRAD.pink,   section: 'System'     },
];
 
const SECTIONS = ['Overview', 'Analytics', 'Operations', 'Finance', 'Admin', 'System'];
const SECTION_ICONS = {
    Overview: 'ti-layout-dashboard', Analytics: 'ti-chart-dots',
    Operations: 'ti-layout-grid',    Finance: 'ti-report-money',
    Admin: 'ti-settings',            System: 'ti-bell',
};
 
export default function Dashboard() {
    const navigate = useNavigate();
    const token    = localStorage.getItem('token');
    const role     = localStorage.getItem('role') || 'STORE_MANAGER';
    const userName = localStorage.getItem('userName') || 'User';
    const userId   = localStorage.getItem('userId');
    const allowed  = ROLE_ACCESS[role] || [];
 
    const [kpiReports,    setKpiReports]    = useState([]);
    const [compReports,   setCompReports]   = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [showNotif,     setShowNotif]     = useState(false);
    const [showProfile,   setShowProfile]   = useState(false);
    const [markingId,     setMarkingId]     = useState(null);
 
    useEffect(() => {
        if (!token || !role) { navigate('/login'); return; }
        if (allowed.includes('kpi'))
            axios.get('http://localhost:8070/api/kpi-reports', { headers: { Authorization: 'Bearer ' + token } })
                .then(r => setKpiReports(r.data || [])).catch(() => {});
        if (allowed.includes('compliance'))
            axios.get('http://localhost:8070/api/compliance-reports', { headers: { Authorization: 'Bearer ' + token } })
                .then(r => setCompReports(r.data || [])).catch(() => {});
        if (userId) {
            fetchNotifications();
            const iv = setInterval(fetchNotifications, 30000);
            return () => clearInterval(iv);
        }
    }, []);
 
    const fetchNotifications = () => {
        axios.get('http://localhost:8070/api/notifications/user/' + userId, { headers: { Authorization: 'Bearer ' + token } })
            .then(r => setNotifications(r.data || [])).catch(() => {});
    };
 
    const markAsRead = (id) => {
        setMarkingId(id);
        axios.patch(`http://localhost:8070/api/notifications/${id}/read`, {}, { headers: { Authorization: 'Bearer ' + token } })
            .then(() => { setNotifications(p => p.map(n => n.notificationId === id ? { ...n, status: 'READ' } : n)); setMarkingId(null); })
            .catch(() => setMarkingId(null));
    };
 
    const activeKPI  = kpiReports.filter(r => r.status === 'ACTIVE');
    const latest     = activeKPI[activeKPI.length - 1] || {};
    const activeComp = compReports.filter(r => r.status !== 'ARCHIVED');
    const failCount  = activeComp.filter(r => r.status === 'FAIL').length;
    const warnCount  = activeComp.filter(r => r.status === 'WARNING').length;
    const passCount  = activeComp.filter(r => r.status === 'PASS').length;
    const health     = failCount > 0 ? 'Critical' : warnCount > 0 ? 'At risk' : 'Healthy';
    const unread     = notifications.filter(n => n.status === 'UNREAD').length;
 
    const salesTrend = activeKPI.map(r => ({ name: r.scope, sales: parseFloat(r.salesGrowth) || 0 }));
    const thresholdData = [
        { name: 'Stock Turnover', actual: parseFloat(latest.stockTurnover) || 0, threshold: 2.0 },
        { name: 'Sales Growth',   actual: parseFloat(latest.salesGrowth)   || 0, threshold: 0   },
        { name: 'Shrinkage',      actual: parseFloat(latest.shrinkageRate)  || 0, threshold: 5.0 },
    ];
 
    const vd = s => s === 'PASS' ? { bg: 'rgba(34,197,94,.18)', c: '#6ee7a8' }
                  : s === 'WARNING' ? { bg: 'rgba(245,158,11,.18)', c: '#fcd34d' }
                  : s === 'FAIL' ? { bg: 'rgba(255,77,109,.18)', c: '#ff8fa5' }
                  : { bg: 'rgba(255,255,255,.08)', c: '#9aa6c7' };
 
    const cat = c => c === 'STOCK_ALERT' ? { bg: 'rgba(245,158,11,.18)', c: '#fcd34d' }
                   : c === 'PAYMENT' ? { bg: 'rgba(59,130,246,.18)', c: '#7eb6ff' }
                   : { bg: 'rgba(34,197,94,.18)', c: '#6ee7a8' };
 
    const kpiCards = [
        { label: 'Stock Turnover', value: latest.stockTurnover || '—', hint: 'Min: 2.0', grad: GRAD.blue,  icon: 'ti-rotate-clockwise' },
        { label: 'Sales Growth',   value: latest.salesGrowth   != null ? `${latest.salesGrowth >= 0 ? '+' : ''}${latest.salesGrowth}%` : '—', hint: 'Min: 0%', grad: GRAD.green, icon: 'ti-trending-up' },
        { label: 'Shrinkage',      value: latest.shrinkageRate != null ? `${latest.shrinkageRate}%` : '—', hint: 'Max: 5%', grad: GRAD.amber, icon: 'ti-package' },
        { label: 'Compliance',     value: health, hint: `${passCount} Pass · ${warnCount} Warn · ${failCount} Fail`, grad: GRAD.teal, icon: 'ti-shield-check' },
    ];
 
    const panel = { background: '#141a35', border: '1px solid rgba(255,255,255,.07)', borderRadius: 15, overflow: 'hidden' };
 
    return (
        <div style={{ background: '#0a0e27', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', userSelect: 'none' }}>
 
            {/* Top bar */}
            <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 26px', background: 'linear-gradient(90deg,#1a1a40,#1e3a6e)', position: 'sticky', top: 0, zIndex: 100 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 16, fontWeight: 500, color: '#fff', userSelect: 'none' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: GRAD.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(79,140,255,.4)' }}>
                        <i className="ti ti-building-store" aria-hidden="true" style={{ fontSize: 18 }}></i>
                    </div>
                    RetailFlow
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
 
                    {/* Profile dropdown trigger */}
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }} aria-label="Profile menu"
                            style={{ display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 30, padding: '4px 10px 4px 4px', cursor: 'pointer' }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: GRAD.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 500, position: 'relative' }}>
                                {userName.charAt(0).toUpperCase()}
                                {unread > 0 && <span style={{ position: 'absolute', top: -2, right: -2, width: 10, height: 10, borderRadius: '50%', background: '#ff4d6d', border: '2px solid #1a1a40', boxShadow: '0 0 8px #ff4d6d' }}></span>}
                            </div>
                            <span style={{ fontSize: 13, color: '#e2e8f5', fontWeight: 500 }}>{userName}</span>
                            <i className="ti ti-chevron-down" aria-hidden="true" style={{ fontSize: 15, color: '#9aa6c7', transition: 'transform .2s', transform: showProfile ? 'rotate(180deg)' : 'none' }}></i>
                        </button>
 
                        {/* Profile dropdown menu */}
                        {showProfile && (
                            <div style={{ position: 'absolute', right: 0, top: '125%', width: 240, zIndex: 1050, ...panel, boxShadow: '0 20px 50px rgba(0,0,0,.5)' }}>
                                <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: 11 }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: GRAD.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 500 }}>
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                    <div style={{ overflow: 'hidden' }}>
                                        <div style={{ fontSize: 14, fontWeight: 500, color: '#f0f3fa' }}>{userName}</div>
                                        <span style={{ fontSize: 10, padding: '2px 9px', borderRadius: 20, background: 'rgba(123,92,255,.25)', color: '#c9bbff', border: '1px solid rgba(123,92,255,.4)' }}>
                                            {role.replace(/_/g, ' ')}
                                        </span>
                                    </div>
                                </div>
 
                                {/* Notifications item */}
                                <button onClick={() => { setShowNotif(true); setShowProfile(false); }}
                                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '12px 16px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,.05)', cursor: 'pointer', color: '#cdd5ea', fontSize: 13 }}>
                                    <i className="ti ti-bell" aria-hidden="true" style={{ fontSize: 17, color: '#7eb6ff' }}></i>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Notifications</span>
                                    {unread > 0 && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, background: 'rgba(255,77,109,.18)', color: '#ff8fa5' }}>{unread}</span>}
                                </button>
 
                                {/* Logout item */}
                                <button onClick={() => { localStorage.clear(); navigate('/'); }}
                                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '12px 16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#ff8fa5', fontSize: 13 }}>
                                    <i className="ti ti-logout" aria-hidden="true" style={{ fontSize: 17 }}></i>
                                    <span style={{ flex: 1, textAlign: 'left' }}>Logout</span>
                                </button>
                            </div>
                        )}
 
                        {/* Notifications panel (opened from dropdown) */}
                        {showNotif && (
                            <div style={{ position: 'absolute', right: 0, top: '125%', width: 340, zIndex: 1050, maxHeight: 400, overflowY: 'auto', ...panel, boxShadow: '0 20px 50px rgba(0,0,0,.5)' }}>
                                <div style={{ padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, fontWeight: 500, color: '#c4b0ff' }}>
                                    <button onClick={() => { setShowNotif(false); setShowProfile(true); }} aria-label="Back"
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9aa6c7', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                                        <i className="ti ti-arrow-left" aria-hidden="true" style={{ fontSize: 15 }}></i> Notifications
                                    </button>
                                    {unread > 0 && <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 20, background: 'rgba(255,77,109,.18)', color: '#ff8fa5' }}>{unread} unread</span>}
                                </div>
                                {notifications.length === 0 ? (
                                    <div style={{ padding: 22, textAlign: 'center', fontSize: 13, color: '#6b779b' }}>No notifications</div>
                                ) : notifications.map(n => {
                                    const cs = cat(n.category);
                                    return (
                                        <div key={n.notificationId} style={{ padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,.05)', display: 'flex', gap: 11, alignItems: 'flex-start', background: n.status === 'UNREAD' ? 'rgba(245,158,11,.06)' : 'transparent' }}>
                                            <div style={{ width: 9, height: 9, borderRadius: '50%', marginTop: 5, flexShrink: 0, background: n.status === 'UNREAD' ? '#f59e0b' : '#4a5578', boxShadow: n.status === 'UNREAD' ? '0 0 8px rgba(245,158,11,.6)' : 'none' }}></div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 12, color: n.status === 'UNREAD' ? '#e2e8f5' : '#7d88a8', marginBottom: 5 }}>{n.message}</div>
                                                <div style={{ display: 'flex', gap: 7 }}>
                                                    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 5, background: cs.bg, color: cs.c }}>{n.category}</span>
                                                    <span style={{ fontSize: 10, color: '#6b779b' }}>{n.createdDate}</span>
                                                </div>
                                            </div>
                                            {n.status === 'UNREAD' && (
                                                <button onClick={() => markAsRead(n.notificationId)} disabled={markingId === n.notificationId}
                                                    style={{ fontSize: 10, padding: '4px 11px', borderRadius: 7, border: '1px solid rgba(110,231,168,.4)', background: 'rgba(34,197,94,.12)', color: '#6ee7a8', cursor: 'pointer', flexShrink: 0 }}>
                                                    {markingId === n.notificationId ? '...' : 'Mark read'}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
 
            
            <div style={{ margin: 22, padding: '28px 30px', borderRadius: 18, background: 'linear-gradient(120deg,#5b3cc4 0%,#3b6ee0 55%,#2bb6c4 100%)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -60, right: -30, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,.10)' }}></div>
                <div style={{ position: 'absolute', bottom: -80, right: 120, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.07)' }}></div>
                <h1 style={{ fontSize: 24, fontWeight: 500, color: '#fff', marginBottom: 6, position: 'relative', zIndex: 1 }}>Welcome back, {userName}</h1>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', position: 'relative', zIndex: 1 }}>Here's what's happening across your store today</p>
                <div style={{ display: 'flex', gap: 10, marginTop: 16, position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
                    {[[allowed.length, 'Modules'], [6, 'Roles'], ].map(([n, l]) => (
                        <div key={l} style={{ background: 'rgba(255,255,255,.16)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 11, padding: '9px 15px', color: '#fff' }}>
                            <span style={{ fontSize: 18, fontWeight: 500, display: 'block' }}>{n}</span>
                            <span style={{ fontSize: 10, opacity: .8, textTransform: 'uppercase', letterSpacing: '.06em' }}>{l}</span>
                        </div>
                    ))}
                </div>
            </div>
 
            <div style={{ padding: '0 22px 28px' }}>
 
               
                {/* Compliance officer cards */}
                {role === 'COMPLIANCE_OFFICER' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 18 }}>
                        {[
                            { label: 'Pass', val: passCount, grad: GRAD.green },
                            { label: 'Warning', val: warnCount, grad: GRAD.amber },
                            { label: 'Fail', val: failCount, grad: GRAD.pink },
                        ].map((c, i) => (
                            <div key={i} style={{ borderRadius: 15, padding: 22, textAlign: 'center', color: '#fff', background: c.grad }}>
                                <div style={{ fontSize: 11, textTransform: 'uppercase', opacity: .9, marginBottom: 8 }}>{c.label}</div>
                                <div style={{ fontSize: 34, fontWeight: 500 }}>{c.val}</div>
                            </div>
                        ))}
                    </div>
                )}
 
                {/* Charts */}
                {(role === 'STORE_MANAGER' || role === 'ADMIN') && activeKPI.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                        <div style={panel}>
                            <div style={{ padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, fontWeight: 500, color: '#7eb6ff' }}>
                                <i className="ti ti-chart-line" aria-hidden="true" style={{ fontSize: 16 }}></i> Sales growth trend
                            </div>
                            <div style={{ padding: 16 }}>
                                <ResponsiveContainer width="100%" height={160}>
                                    <LineChart data={salesTrend}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" />
                                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8b97b8' }} />
                                        <YAxis tick={{ fontSize: 10, fill: '#8b97b8' }} />
                                        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid rgba(255,255,255,.12)', background: '#1a2142', color: '#e2e8f5' }} />
                                        <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#60a5fa', r: 4 }} name="Growth %" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div style={panel}>
                            <div style={{ padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, fontWeight: 500, color: '#6ee7a8' }}>
                                <i className="ti ti-shield-check" aria-hidden="true" style={{ fontSize: 16 }}></i> Compliance status
                            </div>
                            <div style={{ padding: 16 }}>
                                {activeComp.slice(-4).map(r => {
                                    const v = vd(r.status);
                                    return (
                                        <div key={r.reportId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,.05)', fontSize: 12, color: '#9aa6c7' }}>
                                            <span>Report #{r.reportId} — {r.scope}</span>
                                            <span style={{ fontSize: 10, padding: '3px 9px', borderRadius: 6, fontWeight: 500, background: v.bg, color: v.c }}>{r.status}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div style={{ ...panel, gridColumn: '1 / -1' }}>
                            <div style={{ padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, fontWeight: 500, color: '#c4b0ff' }}>
                                <i className="ti ti-chart-bar" aria-hidden="true" style={{ fontSize: 16 }}></i> KPI vs threshold
                            </div>
                            <div style={{ padding: 16 }}>
                                <ResponsiveContainer width="100%" height={180}>
                                    <BarChart data={thresholdData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.06)" />
                                        <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8b97b8' }} />
                                        <YAxis tick={{ fontSize: 11, fill: '#8b97b8' }} />
                                        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid rgba(255,255,255,.12)', background: '#1a2142', color: '#e2e8f5' }} />
                                        <Legend wrapperStyle={{ fontSize: 12, color: '#9aa6c7' }} />
                                        <Bar dataKey="actual"    fill="#3b82f6" radius={[5,5,0,0]} name="Actual" />
                                        <Bar dataKey="threshold" fill="#a855f7" radius={[5,5,0,0]} name="Threshold" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
 
                {/* Module sections */}
                {SECTIONS.map(section => {
                    const items = ALL_MODULES.filter(m => m.section === section);
                    if (!items.length) return null;
                    const has = items.some(m => allowed.includes(m.key));
                    if (!has) return null;
                    return (
                        <div key={section} style={{ marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 11, margin: '18px 0 12px' }}>
                                <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b97b8' }}>
                                    <i className={`ti ${SECTION_ICONS[section]}`} aria-hidden="true" style={{ fontSize: 14 }}></i>
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.12em', color: '#8b97b8' }}>{section}</span>
                                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.07)' }}></div>
                                <span style={{ fontSize: 11, color: '#6b779b' }}>{items.filter(m => allowed.includes(m.key)).length} of {items.length}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 13 }}>
                                {items.map(m => {
                                    const ok = allowed.includes(m.key);
                                    return (
                                        <div key={m.key}
                                            onClick={() => ok && navigate(m.route)}
                                            onMouseEnter={e => { if (ok) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(123,92,255,.5)'; e.currentTarget.style.boxShadow = '0 14px 38px rgba(0,0,0,.45)'; const a = e.currentTarget.querySelector('.marr'); if (a) { a.style.color = '#a855f7'; a.style.transform = 'translateX(3px)'; } }}}
                                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; e.currentTarget.style.boxShadow = 'none'; const a = e.currentTarget.querySelector('.marr'); if (a) { a.style.color = '#4a5578'; a.style.transform = 'translateX(0)'; } }}
                                            style={{ ...panel, padding: 18, cursor: ok ? 'pointer' : 'not-allowed', opacity: ok ? 1 : 0.4, transition: 'all .18s', position: 'relative', userSelect: 'none' }}
                                        >
                                            {ok && <i className="ti ti-arrow-up-right marr" aria-hidden="true" style={{ position: 'absolute', top: 18, right: 18, color: '#4a5578', fontSize: 16, transition: 'all .18s' }}></i>}
                                            <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 13, fontSize: 20, color: '#fff', background: ok ? m.grad : GRAD.gray }}>
                                                <i className={`ti ${ok ? m.icon : 'ti-lock'}`} aria-hidden="true"></i>
                                            </div>
                                            <h4 style={{ fontSize: 14, fontWeight: 500, color: '#f0f3fa', marginBottom: 4 }}>{ok ? m.label : 'Restricted'}</h4>
                                            <p style={{ fontSize: 11, color: '#7d88a8', lineHeight: 1.5 }}>{ok ? m.desc : 'No access — contact admin'}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}