import axios from "axios";
import { useState, useEffect } from "react";

export default function GetNotificationByUser() {

    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState("");
    const [searched, setSearched] = useState(false);

    // Load all users on component mount
    useEffect(() => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:8070/api/users", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setUsers(res.data);
        })
        .catch(() => {
            setError("Failed to load users");
        });
    }, []);

    let fetchByUser = (event) => {
        event.preventDefault();
        setError("");
        setNotifications([]);
        setSearched(false);

        if (!selectedUserId) {
            setError("Please select a user");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/notifications/user/" + selectedUserId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setNotifications(res.data);
            setSearched(true);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                setSearched(true);
                setNotifications([]);
            } else {
                setError("Error: " + err.message);
            }
        });
    }

    let reset = () => {
        setSelectedUserId("");
        setNotifications([]);
        setError("");
        setSearched(false);
    }

    // Get selected user name for display
    let selectedUser = users.find((u) => u.userId === parseInt(selectedUserId));

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">

                    <h5 className="card-title mb-4">Get Notifications By User</h5>

                    {/* Error */}
                    {error && (
                        <div className="alert alert-danger alert-dismissible py-2 small" role="alert">
                            {error}
                            <button type="button" className="btn-close" onClick={() => setError("")}></button>
                        </div>
                    )}

                    {/* Search Form */}
                    <form onSubmit={fetchByUser}>
                        <div className="row g-2 align-items-end mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Select User</label>
                                <select
                                    className="form-select"
                                    value={selectedUserId}
                                    onChange={(e) => {
                                        setSelectedUserId(e.target.value);
                                        setNotifications([]);
                                        setSearched(false);
                                        setError("");
                                    }}
                                >
                                    <option value="">-- Select a user --</option>
                                    {users.map((user) => (
                                        <option key={user.userId} value={user.userId}>
                                            {user.userName} ({user.role})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-auto d-flex gap-2">
                                <button type="submit" className="btn btn-primary">
                                    Search
                                </button>
                               
                            </div>
                        </div>
                    </form>

                    {/* No results message */}
                    {searched && notifications.length === 0 && (
                        <div className="alert alert-warning py-2 small mt-2">
                            No notifications found for{" "}
                            <strong>{selectedUser ? selectedUser.userName : "this user"}</strong>
                        </div>
                    )}

                    {/* Results Table */}
                    {notifications.length > 0 && (
                        <div className="table-responsive mt-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="text-muted mb-0">
                                    Notifications for <strong>{selectedUser?.userName}</strong>
                                </h6>
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