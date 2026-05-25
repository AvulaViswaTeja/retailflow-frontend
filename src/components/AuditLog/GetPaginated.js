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
            params: {
                page: currentPage,
                size: size
            }
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
        <div>
            <h1>Audit Logs — Paginated</h1>
            <p>Total Records: {totalElements}</p>

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

            <br />

            
            <button onClick={goToFirst} disabled={page === 0}>« First</button>
            <button onClick={goToPrev}  disabled={page === 0}>‹ Prev</button>
            <span> Page {page + 1} of {totalPages} </span>
            <button onClick={goToNext}  disabled={page === totalPages - 1}>Next ›</button>
            <button onClick={goToLast}  disabled={page === totalPages - 1}>Last »</button>
        </div>
    );
}