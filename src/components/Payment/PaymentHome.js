import {Link,Outlet} from 'react-router-dom'
export default function SaleHome(){
    return(<div>
        <nav>
            <ul>
                <li>
                    <Link to="insert">Insert Payment</Link>
                </li>
                <li>
                    <Link to="update">Update Payment</Link>
                </li>
                <li>
                    <Link to="delete">Delete Payment</Link>
                </li>
                <li>
                    <Link to="getPaymentById">Get Payment By Id</Link>
                </li>
                <li>
                    <Link to="getByInvoice">Get Payment By invoice</Link>
                </li>
                <li>
                    <Link to="getAll">Get All Payments</Link>
                </li>
                <li>
                    <Link to="getPaginated">Get All paginated</Link>
                </li>
            </ul>
        </nav>
        <Outlet></Outlet>
    </div>)
}  