import { Link, Outlet } from 'react-router-dom';

export default function InvoiceHome() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/Invoice">
            Invoice
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">

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
          </div>

        </div>
      </nav>

      <Outlet />
    </div>
  );
}