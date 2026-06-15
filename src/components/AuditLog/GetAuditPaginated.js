import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GetPaginated() {

    let [auditLogs, setAuditLogs] = useState([]);
    let [page, setPage] = useState(0);
    let [size] = useState(5);
    let [totalPages, setTotalPages] = useState(0);
    let [totalElements, setTotalElements] = useState(0);

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
        fetchPaginated(page);
    }, [page]);

    let fetchPaginated = (currentPage) => {
        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/audit-logs/paginated", {
            headers: { "Authorization": "Bearer " + token },
            params: { page: currentPage, size: size }
        })
        .then((res) => {
            setAuditLogs(res.data.content);
            setTotalPages(res.data.totalPages);
            setTotalElements(res.data.totalElements);
        })
        .catch((err) => {
            showError("Error fetching audit logs: " + (err.response?.data?.message || err.message));
        });
    };

    let goToFirst = () => setPage(0);
    let goToPrev  = () => setPage((prev) => Math.max(prev - 1, 0));
    let goToNext  = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
    let goToLast  = () => setPage(totalPages - 1);

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
                    <h4 className="mb-0">Audit Logs — Paginated</h4>
                    <span className="badge bg-light text-dark">Total Records: {totalElements}</span>
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

                    {/* Pagination controls */}
                    <div className="d-flex flex-column align-items-center mt-3">
                        <span className="text-muted small mb-2">
                            Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
                        </span>
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={goToFirst}>« First</button>
                                </li>
                                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={goToPrev}>‹ Prev</button>
                                </li>
                                <li className={`page-item ${page >= totalPages - 1 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={goToNext}>Next ›</button>
                                </li>
                                <li className={`page-item ${page >= totalPages - 1 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={goToLast}>Last »</button>
                                </li>
                            </ul>
                        </nav>
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