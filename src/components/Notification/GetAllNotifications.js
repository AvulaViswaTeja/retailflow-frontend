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
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="card-title mb-0">All Notifications</h5>
                        <span className="badge bg-secondary">
                            Total: {notifications.length}
                        </span>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-sm align-middle">
                            <thead className="table-dark">
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
                                        <td colSpan="7" className="text-center text-muted">
                                            No notifications found
                                        </td>
                                    </tr>
                                ) : (
                                    notifications.map((n) => (
                                        <tr key={n.notificationId}>
                                            <td>{n.notificationId}</td>
                                            <td>{n.userId}</td>
                                            <td>{n.userName}</td>
                                            <td>{n.message}</td>
                                            <td>
                                                <span className="badge bg-info text-dark">
                                                    {n.category}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${n.status === "UNREAD" ? "bg-warning text-dark" : "bg-success"}`}>
                                                    {n.status}
                                                </span>
                                            </td>
                                            <td>{n.createdDate}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}