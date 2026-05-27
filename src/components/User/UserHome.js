import { Link, Outlet } from "react-router-dom";

export default function UserHome() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/user">
                        User
                    </Link>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link className="nav-link" to="addUser">
                                    Add
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="deleteUser">
                                    Delete
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="updateUser">
                                    Update
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getUserById">
                                    Get User
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getUserPaginated">
                                    Paginated
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getAllUsers">
                                    All Users
                                </Link>
                            </li>

                        </ul>
                    </div>

                </div>
            </nav>

            <Outlet />
        </div>
    );
}