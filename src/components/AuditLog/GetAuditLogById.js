import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetAuditLogById() {

    let [auditId, setAuditId] = useState("");
    let [auditLog, setAuditLog] = useState(null);

    let [showModal, setShowModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const navigate = useNavigate();

    let showError = (message) => {
        setModalSuccess(false);
        setModalMessage(message);
        setShowModal(true);
    };

    let getAuditLog = (event) => {
        event.preventDefault();

        if (!auditId) {
            showError("Please enter an Audit Log ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/audit-logs/" + auditId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setAuditLog(res.data);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                showError("Audit Log not found with ID: " + auditId);
            } else {
                showError("Error: " + err.message);
            }
            setAuditLog(null);
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
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Get Audit Log By ID</h4>
                </div>
                <div className="card-body">

                    {/* Search form */}
                    <form onSubmit={getAuditLog}>
                        <div className="mb-3">
                            <label className="form-label">Audit Log ID</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter audit log id"
                                value={auditId}
                                onChange={(e) => setAuditId(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Search
                        </button>
                    </form>

                    {/* Audit log details */}
                    {auditLog && (
                        <div className="mt-4">
                            <h6 className="text-muted mb-3">Audit Log Found</h6>
                            <table className="table table-bordered table-sm align-middle">
                                <tbody>
                                    <tr><th>Audit ID</th><td>{auditLog.auditId}</td></tr>
                                    <tr><th>User ID</th><td>{auditLog.userId}</td></tr>
                                    <tr><th>User Name</th><td>{auditLog.userName}</td></tr>
                                    <tr><th>Action</th><td>{auditLog.action}</td></tr>
                                    <tr><th>Timestamp</th><td>{auditLog.timeStamp}</td></tr>
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