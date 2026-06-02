import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function PaymentHome() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/Payment">
            Payment
          </Link>

         
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#paymentNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="paymentNavbar">
            <ul className="navbar-nav me-auto">

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