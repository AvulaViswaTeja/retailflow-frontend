import axios from "axios";
import { useState } from "react";

export default function GetNotificationByUser() {

    const [userId, setUserId] = useState("");
    const [notifications, setNotifications] = useState([]);

    let fetchByUser = (event) => {
        event.preventDefault();

        if (!userId) {
            alert("Please enter a User ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/notifications/user/" + userId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            if (res.data.length === 0) {
                alert("No notifications found for User ID: " + userId);
            }
            setNotifications(res.data);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                alert("No notifications found for User ID: " + userId);
            } else {
                alert("Error: " + err.message);
            }
            setNotifications([]);
        });
    }

    

    return (
        <div>
            <h1>Get All Notifications By User</h1>

            <form>
                <label>User ID</label>
                <input
                    type="number"
                    placeholder="enter user id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={fetchByUser}>Search</button>
                
            </form>

            <br />

            {notifications.length > 0 && (
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
                        {notifications.map((n) => (
                            <tr key={n.notificationId}>
                                <td>{n.notificationId}</td>
                                <td>{n.userId}</td>
                                <td>{n.userName}</td>
                                <td>{n.message}</td>
                                <td>{n.category}</td>
                                <td>{n.status}</td>
                                <td>{n.createdDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}