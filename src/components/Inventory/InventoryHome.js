import {Link,Outlet} from 'react-router-dom'
export default function InventoryHome(){
    return(
        <div>
            <nav>
                <ul>
               <li> <Link to='insert'>Insert Inventory</Link></li>
                <li><Link to='delete'>Delete Inventory</Link></li>
               <li> <Link to='update'>Update Inventory</Link></li>
                <li><Link to='getById'>Get Inventory</Link></li>
                <li><Link to='getAll'>Get All Inventory</Link></li>
                <li><Link to='replenish'>Replenish</Link></li>
                <li><Link to='getByProduct'>Get By Product</Link></li>
                <li><Link to='getLowStock'>Get Low Stock</Link></li>
                </ul>
            </nav>
            <Outlet/>
        </div>
    )
}