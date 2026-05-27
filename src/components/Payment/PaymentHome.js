import { Link, Outlet } from 'react-router-dom';

export default function PaymentHome() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/Payment">
            Payment
          </Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">

              <li className="nav-item">
                <Link className="nav-link" to="insert">
                  Insert Payment
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="update">
                  Update Payment
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="delete">
                  Delete Payment
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getPaymentById">
                  Get Payment By ID
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getByInvoice">
                  Get By Invoice
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="getAll">
                  Get All Payments
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