import { Link, Outlet, useMatch } from "react-router-dom";

export default function PurchaseOrderHome() {
    // Detects if the user is sitting directly on the parent route view
    const isExactHome = useMatch("/PurchaseOrder");

    return (
        <div>
            {/* Dark Styled Responsive Bootstrap Horizontal Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                <div className="container-fluid">
                    
                    {/* Brand Heading Title linking back to parent root */}
                    <Link className="navbar-brand fw-bold" to="/PurchaseOrder">
                        Purchase Order
                    </Link>

                    {/* Collapsible Navbar links array container wrapper */}
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            
                            <li className="nav-item"> 
                                <Link className="nav-link" to="insert">
                                    Insert PurchaseOrder
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="getById">
                                    Get PurchaseOrder
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="getAll">
                                    Get All PurchaseOrder
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="getBySupplier">
                                    Get By Supplier
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="getByStatus">
                                    Get By Status
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getallpaginated">
                                    Get All Paginated
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
            </div>
    );
}