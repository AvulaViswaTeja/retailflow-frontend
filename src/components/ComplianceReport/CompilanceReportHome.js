import { Outlet, useNavigate, useLocation } from 'react-router-dom';

export default function CompilanceReportHome() {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname.replace(/\/$/, '') === '/compliance';

    const navItems = [
        { to: 'insert',       label: 'Run Compliance Check' },
        { to: 'getAll',       label: 'All Reports'          },
        { to: 'getById',      label: 'Get By ID'            },
        { to: 'getPaginated', label: 'Paginated'            },
        { to: 'getAll',       label: 'Update'               },
        { to: 'delete',       label: 'Archive'              },
    ];

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">

                {/* Dashboard button — left */}
                <button
                    className="btn btn-outline-light btn-sm me-3"
                    onClick={() => navigate('/dashboard')}>
                    ← Dashboard
                </button>

                {/* Brand */}
                <span
                    className="navbar-brand fw-semibold"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/compliance')}>
                    Compliance & Audit
                </span>

                <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse" data-bs-target="#compNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="compNav">
                    <ul className="navbar-nav me-auto">
                        {navItems.map((item, i) => (
                            <li className="nav-item" key={i}>
                                <span
                                    className="nav-link text-white-50"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/compliance/${item.to}`)}>
                                    {item.label}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Page content */}
            <div className="container-fluid py-4"
                style={{ background: '#f8f9fa', minHeight: 'calc(100vh - 56px)' }}>

                {isHome ? (
                    <div className="row g-3 justify-content-center mt-4">
                        <div className="col-md-3">
                            <div className="card shadow-sm text-center border-success">
                                <div className="card-body">
                                    <div className="text-muted small text-uppercase mb-1">
                                        Stock Turnover
                                    </div>
                                    <div className="fs-3 fw-semibold text-success">≥ 2.0</div>
                                    <div className="text-muted small">Times per period</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card shadow-sm text-center border-success">
                                <div className="card-body">
                                    <div className="text-muted small text-uppercase mb-1">
                                        Sales Growth
                                    </div>
                                    <div className="fs-3 fw-semibold text-success">≥ 0%</div>
                                    <div className="text-muted small">No declining revenue</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card shadow-sm text-center border-danger">
                                <div className="card-body">
                                    <div className="text-muted small text-uppercase mb-1">
                                        Shrinkage Rate
                                    </div>
                                    <div className="fs-3 fw-semibold text-danger">≤ 5%</div>
                                    <div className="text-muted small">Max stock loss allowed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}