import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetNotificationById() {

    let [notificationId, setNotificationId] = useState("");
    let [notification, setNotification] = useState(null);

    let [showModal, setShowModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const navigate = useNavigate();

    let showError = (msg) => {
        setModalSuccess(false);
        setModalMessage(msg);
        setShowModal(true);
    };

    let fetchNotification = (event) => {
        event.preventDefault();
        setNotification(null);

        if (!notificationId) {
            showError("Please enter a Notification ID");
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
                showError("Notification not found with ID: " + notificationId);
            } else {
                showError("Error: " + (err.response?.data?.message || err.message));
            }
            setNotification(null);
        });
    };

    let reset = () => {
        setNotificationId("");
        setNotification(null);
    };

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
                    <h4 className="mb-0">Get Notification By ID</h4>
                </div>
                <div className="card-body">

                    {/* Search form */}
                    <form onSubmit={fetchNotification}>
                        <div className="mb-3">
                            <label className="form-label">Notification ID</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter notification id"
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

                    {/* Notification details */}
                    {notification && (
                        <div className="mt-4">
                            <h6 className="text-muted mb-3">Notification Found</h6>
                            <table className="table table-bordered table-sm align-middle">
                                <tbody>
                                    <tr><th>Notification ID</th><td>{notification.notificationId}</td></tr>
                                    <tr><th>User ID</th><td>{notification.userId}</td></tr>
                                    <tr><th>User Name</th><td>{notification.userName}</td></tr>
                                    <tr><th>Message</th><td>{notification.message}</td></tr>
                                    <tr>
                                        <th>Category</th>
                                        <td><span className="badge bg-info text-dark">{notification.category}</span></td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>
                                            <span className={`badge ${notification.status === "UNREAD" ? "bg-warning text-dark" : "bg-success"}`}>
                                                {notification.status}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr><th>Created Date</th><td>{notification.createdDate}</td></tr>
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