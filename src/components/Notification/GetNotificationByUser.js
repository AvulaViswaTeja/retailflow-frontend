import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GetNotificationByUser() {

    let [users, setUsers] = useState([]);
    let [selectedUserId, setSelectedUserId] = useState("");
    let [notifications, setNotifications] = useState([]);
    let [searched, setSearched] = useState(false);

    let [showModal, setShowModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const navigate = useNavigate();

    let showError = (msg) => {
        setModalSuccess(false);
        setModalMessage(msg);
        setShowModal(true);
    };

    // Load all users on mount
    useEffect(() => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:8070/api/users", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setUsers(res.data);
        })
        .catch(() => {
            showError("Failed to load users");
        });
    }, []);

    let fetchByUser = (event) => {
        event.preventDefault();
        setNotifications([]);
        setSearched(false);

        if (!selectedUserId) {
            showError("Please select a user");
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
                showError("Error: " + (err.response?.data?.message || err.message));
            }
        });
    };

    let selectedUser = users.find((u) => u.userId === parseInt(selectedUserId));

    return (

        <div className="container mt-4">

            <button
                onClick={() => navigate('/notification')}
                style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 8, fontSize: 12,
                    color: '#fff', cursor: 'pointer',
                    background: 'linear-gradient(135deg,#db2777,#ec4899)',
                    border: 'none', marginBottom: 16,
                }}>
                ← Back
            </button>

            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Get Notifications By User</h4>
                </div>
                <div className="card-body">

                    {/* Search form */}
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

                    {/* Results table */}
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

            {/* Modal */}
            {showModal && (
                <>
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => setShowModal(false)}
                    ></div>

                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className={`modal-header ${modalSuccess ? "bg-success" : "bg-danger"} text-white`}>
                                    <h5 className="modal-title">
                                        {modalSuccess ? "✅ Success" : "❌ Error"}
                                    </h5>
                                    <button
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <p className="mb-0">{modalMessage}</p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className={`btn ${modalSuccess ? "btn-success" : "btn-danger"} w-100`}
                                        onClick={() => setShowModal(false)}
                                    >
                                        OK
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}