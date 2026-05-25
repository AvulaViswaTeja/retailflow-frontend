import { Link,Outlet } from "react-router";

export default function UserHome(){
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="addUser">Add User</Link>
                    </li>
                    <li>
                        <Link to="deleteUser">Delete User</Link>
                        
                    </li>
                    <li>
                        <Link to="updateUser">Update User</Link>
                    </li>
                    <li>
                        <Link to="getUserById">Get User By Id</Link>
                    </li>
                    <li>
                        <Link to="getUserPaginated">Get User Paginated</Link>
                    </li>
                    <li>
                        <Link to="getAllUsers">Get All Users</Link>
                    </li>
                    
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}