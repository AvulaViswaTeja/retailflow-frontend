import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CatalogHome() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);  

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/Catalog">
                        Catalog
                    </Link>


                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                        <ul className="navbar-nav me-auto">

                            <li className="nav-item">
                                <Link className="nav-link" to="insert" onClick={() => setIsOpen(false)}>
                                    Insert Catalog
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="delete" onClick={() => setIsOpen(false)}>
                                    Delete Catalog
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="update" onClick={() => setIsOpen(false)}>
                                    Update Catalog
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getById" onClick={() => setIsOpen(false)}>
                                    Get Catalog By Id
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getByProduct" onClick={() => setIsOpen(false)}>
                                    Get Catalogs By Product
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getAll" onClick={() => setIsOpen(false)}>
                                    Get All Catalogs
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getAllCatalogsPaginated" onClick={() => setIsOpen(false)}>
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