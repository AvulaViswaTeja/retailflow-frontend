import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ProductHome() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); 

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/Product">
                        Product
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
                                <Link className="nav-link" to="add" onClick={() => setIsOpen(false)}>Add Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="delete" onClick={() => setIsOpen(false)}>Delete Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="update" onClick={() => setIsOpen(false)}>Update Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getById" onClick={() => setIsOpen(false)}>Get Product By Id</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getProductsByCategory" onClick={() => setIsOpen(false)}>Get Products By Category</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getAll" onClick={() => setIsOpen(false)}>Get All Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getAllProductsPaginated" onClick={() => setIsOpen(false)}>Get All Products Paginated</Link>
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