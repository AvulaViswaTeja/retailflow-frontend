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

    let reset = () => {
        setUserId("");
        setNotifications([]);
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">

                    <h5 className="card-title mb-4">Get Notifications By User</h5>

                    {/* Search Form */}
                    <form onSubmit={fetchByUser}>
                        <div className="row g-2 align-items-end mb-3">
                            <div className="col-md-6">
                                <label className="form-label">User ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="enter user id"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </div>
                            <div className="col-auto d-flex gap-2">
                                <button type="submit" className="btn btn-primary">
                                    Search
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={reset}>
                                    Reset
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Results Table */}
                    {notifications.length > 0 && (
                        <div className="table-responsive mt-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="text-muted mb-0">Results</h6>
                                <span className="badge bg-secondary">
                                    {notifications.length} records found
                                </span>
                            </div>
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
                                    {notifications.map((n) => (
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
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}