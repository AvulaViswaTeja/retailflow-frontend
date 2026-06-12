import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const GRAD = {
    blue:   'linear-gradient(135deg,#2563eb,#3b82f6)',
    purple: 'linear-gradient(135deg,#7c3aed,#a855f7)',
};

const NAV_ITEMS = [
    { label: 'Insert Catalog',          to: 'insert',               icon: 'ti-plus'        },
    { label: 'Delete Catalog',          to: 'delete',               icon: 'ti-trash'       },
    { label: 'Update Catalog',          to: 'update',               icon: 'ti-edit'        },
    { label: 'Get By ID',              to: 'getById',              icon: 'ti-search'      },
    { label: 'Get By Product',         to: 'getByProduct',         icon: 'ti-box'         },
    { label: 'All Catalogs',           to: 'getAll',               icon: 'ti-list'        },
    { label: 'All Catalogs Paginated', to: 'getAllCatalogsPaginated', icon: 'ti-layout-rows' },
];

export default function CatalogHome() {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname.replace(/\/$/, '') === '/Catalog';

    const panel = {
        background: '#141a35',
        border: '1px solid rgba(255,255,255,.07)',
        borderRadius: 15,
        overflow: 'hidden',
    };

    return (
        <div style={{ background: '#0a0e27', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>

            {/* Top nav */}
            <nav style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 26px',
                background: 'linear-gradient(90deg,#1a1a40,#1e3a6e)',
                position: 'sticky', top: 0, zIndex: 100,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 16, fontWeight: 500, color: '#fff' }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 10, background: GRAD.blue,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(59,130,246,.4)',
                    }}>
                        <i className="ti ti-notebook" style={{ fontSize: 18 }}></i>
                    </div>
                    Catalogs
                </div>

                {/* ✅ Dashboard button only */}
                <button onClick={() => navigate('/dashboard')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 8, fontSize: 12,
                        color: '#fff', cursor: 'pointer',
                        background: GRAD.purple,
                        border: 'none',
                    }}>
                    <i className="ti ti-arrow-left" style={{ fontSize: 14 }}></i>
                    Dashboard
                </button>
            </nav>

            {/* Page content */}
            <div style={{ padding: '0 22px 28px' }}>
                {isHome ? (
                    <>
                        {/* Hero */}
                        <div style={{
                            margin: '22px 0',
                            padding: '28px 30px',
                            borderRadius: 18,
                            background: 'linear-gradient(120deg,#1e3a5f 0%,#1d4ed8 55%,#2563eb 100%)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            <div style={{ position: 'absolute', top: -60, right: -30, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,.08)' }}></div>
                            <div style={{ position: 'absolute', bottom: -80, right: 120, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,.05)' }}></div>
                            <h1 style={{ fontSize: 24, fontWeight: 500, color: '#fff', marginBottom: 6, position: 'relative', zIndex: 1 }}>
                                Catalog Management
                            </h1>
                            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', position: 'relative', zIndex: 1 }}>
                                Manage your catalogs — insert, update, delete and search with ease
                            </p>
                        </div>

                        {/* Quick actions */}
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