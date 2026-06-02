import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function InvoiceHome() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/Invoice">
            Invoice
          </Link>

          {/* Toggle button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#invoiceNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="invoiceNavbar">
            <ul className="navbar-nav me-auto">

              <li className="nav-item">
                <Link className="nav-link" to="insert">
                  Insert Invoice
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="update">
                  Update Invoice
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="delete">
                  Delete Invoice
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getAll">
                  Get All Invoices
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getById">
                  Get By ID
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getByDateRange">
                  By Date Range
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getByStatus">
                  By Status
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getPaginated">
                  Get All Paginated
                </Link>
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