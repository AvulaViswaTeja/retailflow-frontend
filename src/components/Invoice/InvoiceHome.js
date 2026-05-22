import {Link,Outlet} from 'react-router-dom'
export default function InvoiceHome(){
    return(<div>
        <nav>
            <ul>
                <li>
                    <Link to="insert">Insert Invoice</Link>
                </li>
                <li>
                    <Link to="update">Update Invoice</Link>
                </li>
                <li>
                    <Link to="delete">Deletd Invoice</Link>
                </li>
                <li>
                    <Link to="getAll">Get All Invoices</Link>
                </li>
                <li>
                    <Link to="getByDateRange">Get By Date Range</Link>
                </li>
                <li>
                    <Link to="getByStatus">Get By Status</Link>
                </li>
                <li>
                    <Link to="getPaginated">Get All Paginated</Link>
                </li>
            </ul>
        </nav>
        <Outlet></Outlet>
    </div>)
}