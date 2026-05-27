import axios from "axios";
import { useState, useEffect } from "react";

export default function GetPaginated() {

    const [auditLogs, setAuditLogs] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        fetchPaginated(page);
    }, [page]);

    let fetchPaginated = (currentPage) => {
        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/audit-logs/paginated", {
            headers: { "Authorization": "Bearer " + token },
            params: { page: currentPage, size: size }
        })
        .then((res) => {
            setAuditLogs(res.data.content);
            setTotalPages(res.data.totalPages);
            setTotalElements(res.data.totalElements);
        })
        .catch((err) => {
            alert("Error fetching audit logs: " + err.message);
        });
    }

    let goToFirst = () => setPage(0);
    let goToPrev  = () => setPage((prev) => Math.max(prev - 1, 0));
    let goToNext  = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
    let goToLast  = () => setPage(totalPages - 1);

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="card-title mb-0">Audit Logs — Paginated</h5>
                        <span className="badge bg-secondary">
                            Total Records: {totalElements}
                        </span>
                    </div>

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
                            Page {page + 1} of {totalPages}
                        </span>
                        <nav>
                            <ul className="pagination pagination-sm mb-0">
                                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={goToFirst}>« First</button>
                                </li>
                                <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={goToPrev}>‹ Prev</button>
                                </li>
                                <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={goToNext}>Next ›</button>
                                </li>
                                <li className={`page-item ${page === totalPages - 1 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={goToLast}>Last »</button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
        </div>
    );
}