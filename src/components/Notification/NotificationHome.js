import { Link,Outlet } from "react-router";

export default function NotificationHome(){
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="insert">Add Notification</Link>
                    </li>
                    <li>
                        <Link to="delete">Delete Notification</Link>
                    </li>
                    <li>
                        <Link to="getAllNotifications">Get All Notification</Link>
                    </li>
                    <li>
                        <Link to="getNotificationById">Get Notification By Id</Link>
                    </li>
                    <li>
                        <Link to="getNotificationByUser">Get Notification by User</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}