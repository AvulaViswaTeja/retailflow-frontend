import axios from "axios";
import { useState } from "react";

export default function GetAuditLogById() {

    const [auditId, setAuditId] = useState("");
    const [auditLog, setAuditLog] = useState(null);

    let getAuditLog = (event) => {
        event.preventDefault();

        if (!auditId) {
            alert("Please enter an Audit Log ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/audit-logs/" + auditId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setAuditLog(res.data);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                alert("Audit Log not found with ID: " + auditId);
            } else {
                alert("Error: " + err.message);
            }
            setAuditLog(null);
        });
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm" style={{ maxWidth: 500 }}>
                <div className="card-body">

                    <h5 className="card-title mb-4">Get Audit Log By ID</h5>

                    {/* Search Form */}
                    <form onSubmit={getAuditLog}>
                        <div className="mb-3">
                            <label className="form-label">Audit Log ID</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="enter audit log id"
                                value={auditId}
                                onChange={(e) => setAuditId(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Search
                        </button>
                    </form>

                    {/* Audit Log Details */}
                    {auditLog && (
                        <div className="mt-4">
                            <h6 className="text-muted mb-3">Audit Log Found</h6>
                            <table className="table table-bordered table-sm align-middle">
                                <tbody>
                                    <tr>
                                        <th>Audit ID</th>
                                        <td>{auditLog.auditId}</td>
                                    </tr>
                                    <tr>
                                        <th>User ID</th>
                                        <td>{auditLog.userId}</td>
                                    </tr>
                                    <tr>
                                        <th>User Name</th>
                                        <td>{auditLog.userName}</td>
                                    </tr>
                                    <tr>
                                        <th>Action</th>
                                        <td>{auditLog.action}</td>
                                    </tr>
                                    <tr>
                                        <th>Timestamp</th>
                                        <td>{auditLog.timeStamp}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}