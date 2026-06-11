import axios from "axios";
import { useState } from "react";

export default function GetNotificationById() {

    const [notificationId, setNotificationId] = useState("");
    const [notification, setNotification] = useState(null);
    const [error, setError] = useState("");

    let fetchNotification = (event) => {
        event.preventDefault();
        setError("");
        setNotification(null);

        if (!notificationId) {
            setError("Please enter a Notification ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/notifications/" + notificationId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setNotification(res.data);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                setError("Notification not found with ID: " + notificationId);
            } else {
                setError("Error: " + err.message);
            }
            setNotification(null);
        });
    }

    let reset = () => {
        setNotificationId("");
        setNotification(null);
        setError("");
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm" style={{ maxWidth: 500 }}>
                <div className="card-body">

                    <h5 className="card-title mb-4">Get Notification By ID</h5>

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

                    {/* Error Message — shown below form */}
                    {error && (
                        <div className="alert alert-danger alert-dismissible py-2 small mt-3" role="alert">
                            {error}
                            <button type="button" className="btn-close" onClick={() => setError("")}></button>
                        </div>
                    )}

                    {/* Notification Details */}
                    {notification && (
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
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}