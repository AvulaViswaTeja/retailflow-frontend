import { Link, Outlet } from "react-router-dom";

export default function NotificationHome() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <Link className="navbar-brand" to="/notification">
                        Notification
                    </Link>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">

                            <li className="nav-item">
                                <Link className="nav-link" to="insert">
                                    Add Notification
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="delete">
                                    Delete Notification
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getAllNotifications">
                                    Get All Notifications
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getNotificationById">
                                    Get By Id
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="getNotificationByUser">
                                    Get By User
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="markAsRead">
                                    Mark As Read
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