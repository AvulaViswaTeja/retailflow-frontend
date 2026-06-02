import { Link, Outlet, useNavigate } from "react-router-dom";

export default function SaleHome() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/Sale">
            Sale
          </Link>

          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#saleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          
          <div className="collapse navbar-collapse" id="saleNavbar">
            <ul className="navbar-nav me-auto">

              <li className="nav-item">
                <Link className="nav-link" to="insert">Insert Sale</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="delete">Delete Sale</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="update">Update Sale</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="getById">Get By ID</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="getAll">Get All Sales</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="getAllPaginated">Get All Paginated</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="getSalesByCustomer">Get By Customer</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="getSalesByDateRange">Get By Date Range</Link>
              </li>

            </ul>

            {/* Dashboard button on right */}
            <button
              onClick={() => navigate('/dashboard')}
              className="btn btn-outline-light btn-sm"
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