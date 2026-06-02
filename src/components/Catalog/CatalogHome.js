import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function CatalogHome() {
    const navigate = useNavigate();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/Catalog">
                        Catalog
                    </Link>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto">

                            <li className="nav-item">
                                <Link className="nav-link" to="insert">
                                    Insert Catalog
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="delete">
                                    Delete Catalog
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="update">
                                    Update Catalog
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getById">
                                    Get Catalog By Id
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getByProduct">
                                    Get Catalogs By Product
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getAll">
                                    Get All Catalogs
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getAllCatalogsPaginated">
                                    Get All Catalogs Paginated
                                </Link>
                            </li>

                        </ul>

                       
                        <button
                            className="btn btn-outline-light"
                            onClick={() => navigate("/dashboard")}
                        >
                            ← Dashboard
                        </button>

                    </div>
                </div>
            </nav>

            <Outlet />
        </div>
    );
}