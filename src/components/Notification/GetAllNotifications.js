import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GetAllNotifications() {

    let [notifications, setNotifications] = useState([]);

    let [showModal, setShowModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const navigate = useNavigate();

    let showError = (msg) => {
        setModalSuccess(false);
        setModalMessage(msg);
        setShowModal(true);
    };

    useEffect(() => {
        fetchAllNotifications();
    }, []);

    let fetchAllNotifications = () => {
        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/notifications", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setNotifications(res.data);
        })
        .catch((err) => {
            showError("Error fetching notifications: " + (err.response?.data?.message || err.message));
        });
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
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">All Notifications</h4>
                    <span className="badge bg-light text-dark">Total: {notifications.length}</span>
                </div>
                <div className="card-body">

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