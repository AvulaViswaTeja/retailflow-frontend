import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const GRAD = {
    blue:   'linear-gradient(135deg,#2563eb,#3b82f6)',
    green:  'linear-gradient(135deg,#16a34a,#22c55e)',
    red:    'linear-gradient(135deg,#dc2626,#ef4444)',
    purple: 'linear-gradient(135deg,#7c3aed,#a855f7)',
};

const NAV_ITEMS = [
    { label: 'Generate',    to: 'savereport',     icon: 'ti-chart-bar'   },
    { label: 'All Reports', to: 'getAll',         icon: 'ti-list'        },
    { label: 'Get By ID',   to: 'getById',        icon: 'ti-search'      },
    { label: 'Paginated',   to: 'getPaginated',   icon: 'ti-layout-rows' },
    { label: 'By Scope',    to: 'getLatest',      icon: 'ti-clock'       },
    { label: 'Date Range',  to: 'GetByDateRange', icon: 'ti-calendar'    },
    { label: 'Trend',       to: 'getTrend',       icon: 'ti-trending-up' },
    { label: 'Archive',     to: 'delete',         icon: 'ti-archive'     },
];

const METRIC_CARDS = [
    { label: 'Stock Turnover', value: '≥ 2.0', sub: 'Times per period',    hint: 'How fast inventory moves',        grad: GRAD.blue,  icon: 'ti-rotate-clockwise' },
    { label: 'Sales Growth',   value: '≥ 0%',  sub: 'No declining revenue', hint: 'Period over period growth rate',  grad: GRAD.green, icon: 'ti-trending-up'      },
    { label: 'Shrinkage Rate', value: '≤ 5%',  sub: 'Max stock loss',       hint: 'Lost or damaged inventory ratio', grad: GRAD.red,   icon: 'ti-package'          },
];

export default function KPIReportHome() {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome   = location.pathname.replace(/\/$/, '') === '/kpireport';

    const panel = {
        background: '#141a35',
        border: '1px solid rgba(255,255,255,.07)',
        borderRadius: 15,
        overflow: 'hidden',
    };

    return (
        <div style={{ background: '#0a0e27', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>

            <nav style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 26px',
                background: 'linear-gradient(90deg,#1a1a40,#1e3a6e)',
                position: 'sticky', top: 0, zIndex: 100,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 16, fontWeight: 500, color: '#fff' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: GRAD.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(59,130,246,.4)' }}>
                        <i className="ti ti-chart-bar" style={{ fontSize: 18 }}></i>
                    </div>
                    KPI Reports
                </div>
                <button onClick={() => navigate('/dashboard')}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, fontSize: 13, color: '#fff', cursor: 'pointer', background: GRAD.purple, border: 'none' }}>
                    <i className="ti ti-arrow-left" style={{ fontSize: 15 }}></i>
                    Dashboard
                </button>
            </nav>

            <div style={{ padding: '0 22px 28px' }}>
                {isHome ? (
                    <>
                        <div style={{ margin: '22px 0', padding: '28px 30px', borderRadius: 18, background: 'linear-gradient(120deg,#1e3a5f 0%,#1d4ed8 55%,#2563eb 100%)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: -60, right: -30, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,.08)' }}></div>
                            <div style={{ position: 'absolute', bottom: -80, right: 120, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.05)' }}></div>
                            <h1 style={{ fontSize: 24, fontWeight: 500, color: '#fff', marginBottom: 6, position: 'relative', zIndex: 1 }}>KPI Analytics & Reporting</h1>
                            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', position: 'relative', zIndex: 1 }}>Compute Stock Turnover, Sales Growth and Shrinkage from live sale and inventory data</p>
                            <div style={{ display: 'flex', gap: 10, marginTop: 16, position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
                                {[['3', 'KPI Metrics']].map(([n, l]) => (
                                    <div key={l} style={{ background: 'rgba(255,255,255,.16)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.25)', borderRadius: 11, padding: '9px 15px', color: '#fff' }}>
                                        <span style={{ fontSize: 14, fontWeight: 500, display: 'block' }}>{n}</span>
                                        <span style={{ fontSize: 10, opacity: .8, textTransform: 'uppercase', letterSpacing: '.06em' }}>{l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 11, margin: '18px 0 12px' }}>
                            <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b97b8' }}>
                                <i className="ti ti-ruler-measure" style={{ fontSize: 14 }}></i>
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.12em', color: '#8b97b8' }}>KPI Thresholds</span>
                            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.07)' }}></div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
                            {METRIC_CARDS.map((c, i) => (
                                <div key={i} style={{ borderRadius: 15, padding: 22, color: '#fff', background: c.grad }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                                        <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', opacity: .9 }}>{c.label}</span>
                                        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'rgba(255,255,255,.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className={`ti ${c.icon}`} style={{ fontSize: 17 }}></i>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: 30, fontWeight: 500, marginBottom: 4 }}>{c.value}</div>
                                    <div style={{ fontSize: 11, opacity: .85 }}>{c.sub}</div>
                                    <div style={{ marginTop: 10, fontSize: 11, opacity: .7, borderTop: '1px solid rgba(255,255,255,.2)', paddingTop: 8 }}>{c.hint}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 11, margin: '18px 0 12px' }}>
                            <div style={{ width: 26, height: 26, borderRadius: 8, background: 'rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b97b8' }}>
                                <i className="ti ti-layout-grid" style={{ fontSize: 14 }}></i>
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.12em', color: '#8b97b8' }}>Quick Actions</span>
                            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.07)' }}></div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 13 }}>
                            {NAV_ITEMS.map((item, i) => (
                                <Link key={i} to={item.to} style={{ textDecoration: 'none' }}>
                                    <div style={{ ...panel, padding: 18, cursor: 'pointer', transition: 'all .18s', position: 'relative' }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(59,130,246,.4)'; e.currentTarget.style.boxShadow = '0 14px 38px rgba(0,0,0,.45)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    >
                                        <i className="ti ti-arrow-up-right" style={{ position: 'absolute', top: 14, right: 14, color: '#4a5578', fontSize: 15 }}></i>
                                        <div style={{ width: 40, height: 40, borderRadius: 11, background: GRAD.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 11, color: '#fff', fontSize: 18 }}>
                                            <i className={`ti ${item.icon}`}></i>
                                        </div>
                                        <h4 style={{ fontSize: 13, fontWeight: 500, color: '#f0f3fa', margin: 0 }}>{item.label}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}