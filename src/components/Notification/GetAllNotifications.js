import axios from "axios";
import { useState, useEffect } from "react";

export default function GetAllNotifications() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchAllNotifications();
    }, []);

    let fetchAllNotifications = () => {
        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/notifications", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setNotifications(res.data);
        })
        .catch((err) => {
            alert("Error fetching notifications: " + err.message);
        });
    }

    return (
        <div>
            <h1>Get All Notifications</h1>

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Notification ID</th>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Message</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Created Date</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.length === 0 ? (
                        <tr>
                            <td colSpan="7">No notifications found</td>
                        </tr>
                    ) : (
                        notifications.map((n) => (
                            <tr key={n.notificationId}>
                                <td>{n.notificationId}</td>
                                <td>{n.userId}</td>
                                <td>{n.userName}</td>
                                <td>{n.message}</td>
                                <td>{n.category}</td>
                                <td>{n.status}</td>
                                <td>{n.createdDate}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}