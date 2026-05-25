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

        axios.get("http://localhost:1405/api/audit-logs/user/" + userId, {
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

    

    return (
        <div>
            <h1>Get Audit Logs By User</h1>

            <form>
                <label>User ID</label>
                <input
                    type="number"
                    placeholder="enter user id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={fetchByUser}>Search</button>
                
            </form>

            <br />

            {auditLogs.length > 0 && (
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
            )}
        </div>
    );
}