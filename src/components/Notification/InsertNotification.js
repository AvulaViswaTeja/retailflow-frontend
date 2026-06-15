import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InsertNotification() {

    let [userId, setUserId] = useState("");
    let [message, setMessage] = useState("");
    let [category, setCategory] = useState("");

    let [showModal, setShowModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const navigate = useNavigate();

    let showError = (msg) => {
        setModalSuccess(false);
        setModalMessage(msg);
        setShowModal(true);
    };

    let saveNotification = (event) => {
        event.preventDefault();

        if (!userId || !message || !category) {
            showError("Please fill all fields");
            return;
        }

        let token = localStorage.getItem("token");

        let data = {
            userId: userId,
            message: message,
            category: category
        };

        axios.post("http://localhost:8070/api/notifications", data, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            setModalSuccess(true);
            setModalMessage("Notification created successfully!");
            setShowModal(true);
            setUserId("");
            setMessage("");
            setCategory("");
        })
        .catch((err) => {
            if (err.response) {
                showError("Failed to create: " + (err.response.data?.message || err.response.status));
            } else {
                showError("Network error: " + err.message);
            }
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
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Insert Notification</h4>
                </div>
                <div className="card-body">

                    <form onSubmit={saveNotification}>

                        <div className="mb-3">
                            <label className="form-label">User ID</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter user id"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Message</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Category</label>
                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="STOCK_ALERT">Stock Alert</option>
                                <option value="PAYMENT">Payment</option>
                                <option value="SALES">Sales</option>
                                <option value="COMPLIANCE">Compliance</option>
                                <option value="GENERAL">General</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Save Notification
                        </button>

                    </form>
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