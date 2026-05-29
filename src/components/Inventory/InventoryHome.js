import { Link, Outlet, useMatch } from "react-router-dom";

export default function InventoryHome() {
    // Detects if the user is sitting directly on the root inventory route view
    const isExactHome = useMatch("/Inventory"); // Adjust path to match your exact parent route string

    return (
        <div>
            {/* Dark Styled Responsive Bootstrap Horizontal Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
                <div className="container-fluid">
                    
                    {/* Brand Heading Title linking back to parent root */}
                    <Link className="navbar-brand fw-bold" to="/Inventory">
                        Inventory
                    </Link>

                    {/* Collapsible Navbar links array container wrapper */}
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            
                            <li className="nav-item"> 
                                <Link className="nav-link" to="insert">
                                    Insert Inventory
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="getById">
                                    Get Inventory
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="getAll">
                                    Get All Inventory
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="replenish">
                                    Replenish
                                </Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="getByProduct">
                                    Get By Product
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getLowStock">
                                    Get Low Stock
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="getallpaginated">
                                    Get All Inventory Paginated 
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