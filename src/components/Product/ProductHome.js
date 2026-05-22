import {Link, Outlet} from 'react-router-dom';

export default function ProductHome(){
    return(
        <div>
            <nav>
                <ul>
                    <li><Link to="add">Add Product</Link></li>
                    <li><Link to="delete">Delete Product</Link></li>
                    <li><Link to="update">Update Product</Link></li>
                    <li><Link to="getById">Get Product By Id</Link></li>
                    <li><Link to="getAll">Get All Products</Link></li>
                    
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    );
}