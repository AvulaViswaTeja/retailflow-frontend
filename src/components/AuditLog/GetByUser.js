import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetByUser() {

    let [userId, setUserId] = useState("");
    let [auditLogs, setAuditLogs] = useState([]);

    let [showModal, setShowModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const navigate = useNavigate();

    let showError = (message) => {
        setModalSuccess(false);
        setModalMessage(message);
        setShowModal(true);
    };

    let fetchByUser = (event) => {
        event.preventDefault();

        if (!userId) {
            showError("Please enter a User ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/audit-logs/user/" + userId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            if (res.data.length === 0) {
                showError("No audit logs found for User ID: " + userId);
            }
            setAuditLogs(res.data);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                showError("No audit logs found for User ID: " + userId);
            } else {
                showError("Error: " + (err.response?.data?.message || err.message));
            }
            setAuditLogs([]);
        });
    };

    let reset = () => {
        setUserId("");
        setAuditLogs([]);
    };

    return (

        <div className="container mt-4">

            <button
                onClick={() => navigate('/auditLog')}
                style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 8, fontSize: 12,
                    color: '#fff', cursor: 'pointer',
                    background: 'linear-gradient(135deg,#0d9488,#14b8a6)',
                    border: 'none', marginBottom: 16,
                }}>
                ← Back
            </button>

            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Get Audit Logs By User</h4>
                </div>
                <div className="card-body">

                    {/* Search form */}
                    <form onSubmit={fetchByUser}>
                        <div className="row g-2 align-items-end mb-3">
                            <div className="col-md-6">
                                <label className="form-label">User ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter user id"
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

                    {/* Results table */}
                    {auditLogs.length > 0 && (
                        <div className="table-responsive mt-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="text-muted mb-0">Results</h6>
                                <span className="badge bg-secondary">
                                    {auditLogs.length} records found
                                </span>
                            </div>
                            <table className="table table-bordered table-hover table-sm align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Audit ID</th>
                                        <th>User ID</th>
                                        <th>User Name</th>
                                        <th>Action</th>
                                        <th>Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {auditLogs.map((log) => (
                                        <tr key={log.auditId}>
                                            <td>{log.auditId}</td>
                                            <td>{log.userId}</td>
                                            <td>{log.userName}</td>
                                            <td>{log.action}</td>
                                            <td>{log.timeStamp}</td>
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