import axios from "axios";
import { useState } from "react";

export default function MarkAsRead() {

    const [notificationId, setNotificationId] = useState("");
    const [notification, setNotification] = useState(null);
    const [notificationFound, setNotificationFound] = useState(false);

    let fetchNotification = (event) => {
        event.preventDefault();

        if (!notificationId) {
            alert("Please enter a Notification ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/notifications/" + notificationId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setNotification(res.data);
            setNotificationFound(true);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                alert("Notification not found with ID: " + notificationId);
            } else {
                alert("Error: " + err.message);
            }
            setNotification(null);
            setNotificationFound(false);
        });
    }

    let markAsRead = (event) => {
        event.preventDefault();

        let token = localStorage.getItem("token");

        axios.patch("http://localhost:1405/api/notifications/" + notificationId + "/read", {}, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            alert("Notification marked as READ successfully!");
            setNotification(res.data);
        })
        .catch((err) => {
            if (err.response) {
                alert("Error: " + err.response.status
                    + " - " + JSON.stringify(err.response.data));
            } else {
                alert("Network error: " + err.message);
            }
        });
    }

    let reset = () => {
        setNotificationId("");
        setNotification(null);
        setNotificationFound(false);
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm" style={{ maxWidth: 500 }}>
                <div className="card-body">

                    <h5 className="card-title mb-4">Mark Notification As Read</h5>

                    {/* Search Form */}
                    <form onSubmit={fetchNotification}>
                        <div className="mb-3">
                            <label className="form-label">Notification ID</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="enter notification id"
                                value={notificationId}
                                onChange={(e) => setNotificationId(e.target.value)}
                            />
                        </div>
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary">
                                Search
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={reset}>
                                Reset
                            </button>
                        </div>
                    </form>

                    {/* Notification Details */}
                    {notificationFound && notification && (
                        <div className="mt-4">
                            <h6 className="text-muted mb-3">Notification Found</h6>
                            <table className="table table-bordered table-sm align-middle">
                                <tbody>
                                    <tr>
                                        <th>Notification ID</th>
                                        <td>{notification.notificationId}</td>
                                    </tr>
                                    <tr>
                                        <th>User ID</th>
                                        <td>{notification.userId}</td>
                                    </tr>
                                    <tr>
                                        <th>User Name</th>
                                        <td>{notification.userName}</td>
                                    </tr>
                                    <tr>
                                        <th>Message</th>
                                        <td>{notification.message}</td>
                                    </tr>
                                    <tr>
                                        <th>Category</th>
                                        <td>
                                            <span className="badge bg-info text-dark">
                                                {notification.category}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>
                                            <span className={`badge ${notification.status === "UNREAD" ? "bg-warning text-dark" : "bg-success"}`}>
                                                {notification.status}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Created Date</th>
                                        <td>{notification.createdDate}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Mark as Read Button or Already Read */}
                            {notification.status === "UNREAD" ? (
                                <button
                                    className="btn btn-success w-100 mt-2"
                                    onClick={markAsRead}
                                >
                                    ✓ Mark As Read
                                </button>
                            ) : (
                                <div className="alert alert-success mt-2 mb-0 text-center">
                                    ✅ Already marked as READ
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}