import { Link, Outlet } from "react-router-dom";
export default function SaleHome() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="insert">Insert sale</Link>
          </li>
          <li>
            <Link to="delete">Delete sale</Link>
          </li>
          <li>
            <Link to="update">Update sale</Link>
          </li>
          <li>
            <Link to="getById">Get Catalogs By Id</Link>
          </li>
          <li>
            <Link to="getAll">Get All Sales</Link>
          </li>
          <li>
            <Link to="getAllPaginated">Get All Sales paginated</Link>
          </li>
          <li>
            <Link to="getSalesByCustomer"> Get Sales by customer</Link>
          </li>
          <li>
            <Link to="getSalesByDateRange"> Get Sales by Date Range</Link>
          </li>
          
        </ul>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}
