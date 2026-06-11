import axios from "axios";
import { useState, useEffect } from "react";

export default function GetAllAuditLogs() {

    const [auditLogs, setAuditLogs] = useState([]);

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
            alert("Error fetching audit logs: " + err.message);
        });
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="card-title mb-0">All Audit Logs</h5>
                        <span className="badge bg-secondary">
                            Total: {auditLogs.length}
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

                </div>
            </div>
        </div>
    );
}