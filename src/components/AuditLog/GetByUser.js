import axios from "axios";
import { useState } from "react";

export default function GetByUser() {

    const [userId, setUserId] = useState("");
    const [auditLogs, setAuditLogs] = useState([]);

    let fetchByUser = (event) => {
        event.preventDefault();

        if (!userId) {
            alert("Please enter a User ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/audit-logs/user/" + userId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            if (res.data.length === 0) {
                alert("No audit logs found for User ID: " + userId);
            }
            setAuditLogs(res.data);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                alert("No audit logs found for User ID: " + userId);
            } else {
                alert("Error: " + err.message);
            }
            setAuditLogs([]);
        });
    }

    let reset = () => {
        setUserId("");
        setAuditLogs([]);
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">

                    <h5 className="card-title mb-4">Get Audit Logs By User</h5>

                    {/* Search Form */}
                    <form onSubmit={fetchByUser}>
                        <div className="row g-2 align-items-end mb-3">
                            <div className="col-md-6">
                                <label className="form-label">User ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="enter user id"
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

                    {/* Results Table */}
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
        </div>
    );
}