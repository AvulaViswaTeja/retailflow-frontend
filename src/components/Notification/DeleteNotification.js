import axios from "axios";
import { useState } from "react";

export default function DeleteNotification() {

    const [notificationId, setNotificationId] = useState("");
    const [notification, setNotification] = useState(null);
    const [notificationFound, setNotificationFound] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    let fetchNotification = (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");
        setShowConfirm(false);

        if (!notificationId) {
            setError("Please enter a Notification ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/notifications/" + notificationId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setNotification(res.data);
            setNotificationFound(true);
            setError("");
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                setError("Notification not found with ID: " + notificationId);
            } else {
                setError("Error: " + err.message);
            }
            setNotification(null);
            setNotificationFound(false);
        });
    }

    let deleteNotification = () => {
        let token = localStorage.getItem("token");

        axios.delete("http://localhost:1405/api/notifications/" + notificationId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            setSuccess("Notification deleted successfully!");
            setNotificationId("");
            setNotification(null);
            setNotificationFound(false);
            setShowConfirm(false);
            setError("");
        })
        .catch((err) => {
            if (err.response) {
                setError("Error: " + err.response.status
                    + " - " + JSON.stringify(err.response.data));
            } else {
                setError("Network error: " + err.message);
            }
            setShowConfirm(false);
        });
    }

    let reset = () => {
        setNotificationId("");
        setNotification(null);
        setNotificationFound(false);
        setError("");
        setSuccess("");
        setShowConfirm(false);
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm" style={{ maxWidth: 500 }}>
                <div className="card-body">

                    <h5 className="card-title mb-4">Delete Notification</h5>

                    {/* Error Message */}
                    {error && (
                        <div className="alert alert-danger alert-dismissible py-2 small" role="alert">
                            {error}
                            <button type="button" className="btn-close" onClick={() => setError("")}></button>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="alert alert-success alert-dismissible py-2 small" role="alert">
                            {success}
                            <button type="button" className="btn-close" onClick={() => setSuccess("")}></button>
                        </div>
                    )}

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

                            {/* Delete Button — shows confirm box on click */}
                            {!showConfirm ? (
                                <button
                                    className="btn btn-danger w-100 mt-2"
                                    onClick={() => setShowConfirm(true)}
                                >
                                    Delete Notification
                                </button>
                            ) : (
                                // Inline Confirmation Box
                                <div className="alert alert-warning mt-3 mb-0">
                                    <p className="mb-2 small fw-semibold">
                                        Are you sure you want to delete this notification?
                                    </p>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={deleteNotification}
                                        >
                                            Yes, Delete
                                        </button>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => setShowConfirm(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}