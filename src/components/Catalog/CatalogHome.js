import {Link, Outlet} from 'react-router-dom';

export default function CatalogHome(){
    return(
        <div>
            <nav>
                <ul>
                    <li><Link to="insert">Insert Catalog</Link></li>
                    <li><Link to="delete">Delete Catalog</Link></li>
                    <li><Link to="update">Update Catalog</Link></li>
                    <li><Link to="getById">Get Catalogs By Id</Link></li>
                    <li><Link to="getByProduct">Get Catalogs By Product</Link></li>
                    <li><Link to="getAll">Get Catalogs All Catalogs</Link></li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    );
}