import axios from "axios";
import { useState, useEffect } from "react";

export default function GetAllAuditLogs() {

    const [auditLogs, setAuditLogs] = useState([]);

    useEffect(() => {
        fetchAllAuditLogs();
    }, []);

    let fetchAllAuditLogs = () => {
        let token = localStorage.getItem("token");
          

        axios.get("http://localhost:1405/api/audit-logs", {
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
        <div>
            <h1>Get All Audit Logs</h1>

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
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
                            <td colSpan="5">No audit logs found</td>
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
    );
}