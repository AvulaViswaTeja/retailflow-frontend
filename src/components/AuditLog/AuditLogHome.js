import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AuditLogHome() {
    const navigate = useNavigate();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/auditLog">
                        Audit Log
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#auditNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                        <div className="collapse navbar-collapse" id="auditNavbar">
                            <ul className="navbar-nav">

                                <li className="nav-item">
                                    <Link className="nav-link" to="getAuditLogs">
                                        Get Audit Logs
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="getAuditLogById">
                                        Get By Id
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="getByDate">
                                        Get By Date
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="getByUser">
                                        Get By User
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="getPaginated">
                                        Get Paginated
                                    </Link>
                                </li>

                            </ul>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-light btn-sm"
                                        onClick={() => { navigate('/dashboard'); }}
                                    >
                                        Dashboard
                                    </button>
                                </li>
                                {/* <li className="nav-item">
                                    <button
                                        className="btn btn-outline-light btn-sm"
                                        onClick={() => { localStorage.clear(); navigate('/login'); }}
                                    >
                                        Logout
                                    </button>
                                </li> */}
                            </ul>
                        </div>

                </div>
            </nav>

            <Outlet />
        </div>
    );
}