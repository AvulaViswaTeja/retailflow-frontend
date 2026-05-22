import {Link,Outlet} from 'react-router-dom';
export default function PurchaseOrderHOme(){
    return(
        <div>
            <nav>
                <ul>
                <li> <Link to='insert'>Insert PurchaseOrder</Link></li>
                <li><Link to='delete'>Delete PurchaseOrder</Link></li>
                <li> <Link to='update'>Update PurchaseOrder</Link></li>
                <li><Link to='getById'>Get PurchaseOrder</Link></li>
                <li><Link to='getAll'>Get All PurchaseOrder</Link></li>
                <li><Link to='getBySupplier'>Get By Supplier</Link></li>
                <li><Link to='getByStatus'>Get By Status</Link></li>
                </ul>

            </nav>
        </div>
    )
}