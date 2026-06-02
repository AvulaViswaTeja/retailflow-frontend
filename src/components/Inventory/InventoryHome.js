import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";

export default function InventoryHome() {
    const navigate = useNavigate();
    const isExactHome = useMatch("/Inventory");

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                <div className="container-fluid">
                    <button
                        className="btn btn-outline-light"
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Dashboard
                    </button>

                    <Link className="navbar-brand fw-bold" to="/Inventory">
                        Inventory
                    </Link>

                    {/* ✅ Hamburger toggle button — shown only when collapsed */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#inventoryNavMenu"
                        aria-controls="inventoryNavMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* ✅ Added id to match data-bs-target above */}
                    <div className="collapse navbar-collapse" id="inventoryNavMenu">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="insert">Insert Inventory</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getById">Get Inventory</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getAll">Get All Inventory</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="replenish">Replenish</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getByProduct">Get By Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getLowStock">Get Low Stock</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getallpaginated">Get All Inventory Paginated</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}