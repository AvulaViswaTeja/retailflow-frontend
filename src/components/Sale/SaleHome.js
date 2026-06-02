import { Link, Outlet } from "react-router-dom";

export default function SaleHome() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/Sale">
            Sale
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">

              <li className="nav-item">
                <Link className="nav-link" to="insert">
                  Insert Sale
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="delete">
                  Delete Sale
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="update">
                  Update Sale
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getById">
                  Get By ID
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getAll">
                  Get All Sales
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getAllPaginated">
                  Get All Paginated
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getSalesByCustomer">
                  Get By Customer
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getSalesByDateRange">
                  Get By Date Range
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