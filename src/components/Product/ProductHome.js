import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function ProductHome() {
    const navigate = useNavigate();

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
                        data-bs-toggle="collapse"
                        data-bs-target="#productNavbar"
                        aria-controls="productNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="productNavbar">
                        <ul className="navbar-nav me-auto">

                            <li className="nav-item">
                                <Link className="nav-link" to="add">Add Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="delete">Delete Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="update">Update Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getById">Get Product By Id</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getProductsByCategory">Get Products By Category</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getAll">Get All Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getAllProductsPaginated">Get All Products Paginated</Link>
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