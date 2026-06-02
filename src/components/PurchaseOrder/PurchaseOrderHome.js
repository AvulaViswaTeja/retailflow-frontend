import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PurchaseOrderHome() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { to: "insert", label: "Insert PurchaseOrder" },
        { to: "getById", label: "Get PurchaseOrder" },
        { to: "getAll", label: "Get All PurchaseOrder" },
        { to: "getBySupplier", label: "Get By Supplier" },
        { to: "getByStatus", label: "Get By Status" },
        { to: "getallpaginated", label: "Get All Paginated" },
    ];

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                <div className="container-fluid">

                    {/* LEFT: Hamburger — only visible on small screens */}
                    <button
                        className="navbar-toggler border-0"
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Brand */}
                    <Link className="navbar-brand fw-bold" to="/PurchaseOrder">
                        Purchase Order
                    </Link>

                    {/* FULL SCREEN: links always visible */}
                    <div className="d-none d-lg-flex flex-grow-1">
                        <ul className="navbar-nav">
                            {navLinks.map(({ to, label }) => (
                                <li className="nav-item" key={to}>
                                    <Link className="nav-link" to={to}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RIGHT: Dashboard button always visible */}
                    <button
                        className="btn btn-outline-light ms-auto"
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Dashboard
                    </button>
                </div>

                {/* MOBILE: Dropdown — only shown on small screens when menu is open */}
                {menuOpen && (
                    <div className="d-lg-none bg-dark w-100 px-3 pb-2">
                        <ul className="navbar-nav">
                            {navLinks.map(({ to, label }) => (
                                <li className="nav-item" key={to}>
                                    <Link
                                        className="nav-link"
                                        to={to}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>

            <Outlet />
        </div>
    );
}