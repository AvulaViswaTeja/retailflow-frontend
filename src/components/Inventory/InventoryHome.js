import { Outlet , Link} from "react-router-dom";

export default function InventoryHome(){    
    return(
        <div>
            <nav>
                <ul>
                    <li><Link to="insert">Insert Inventory</Link></li>
                    <li><Link to="delete">Delete Inventory</Link></li>
                    <li><Link to="update">Update Inventory</Link></li>
                    <li><Link to="getById">Get Inventory By Id</Link></li>
                    <li><Link to="getAll">Get All Inventories</Link></li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    );
}