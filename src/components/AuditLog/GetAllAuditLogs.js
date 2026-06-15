import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GetAllAuditLogs() {

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

    useEffect(() => {
        fetchAllAuditLogs();
    }, []);

    let fetchAllAuditLogs = () => {
        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/audit-logs", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setAuditLogs(res.data);
        })
        .catch((err) => {
            showError("Error fetching audit logs: " + (err.response?.data?.message || err.message));
        });
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
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">All Audit Logs</h4>
                    <span className="badge bg-light text-dark">Total: {auditLogs.length}</span>
                </div>
                <div className="card-body">

                    <div className="table-responsive">
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
                                {auditLogs.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted">
                                            No audit logs found
                                        </td>
                                    </tr>
                                ) : (
                                    auditLogs.map((log) => (
                                        <tr key={log.auditId}>
                                            <td>{log.auditId}</td>
                                            <td>{log.userId}</td>
                                            <td>{log.userName}</td>
                                            <td>{log.action}</td>
                                            <td>{log.timeStamp}</td>
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