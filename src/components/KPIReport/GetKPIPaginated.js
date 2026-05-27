import axios from 'axios';
import { useEffect, useState } from 'react';

export default function GetKPIPaginated() {

    let [reports, setReports] = useState([]);
    let [page, setPage] = useState(0);
    let [totalPages, setTotalPages] = useState(0);
    let size = 5;

    useEffect(() => {
        let url = `http://localhost:1405/api/kpi-reports/paginated?page=${page}&size=${size}`;

        axios.get(url).then((response) => {
            setReports(response.data.content || []);
            setTotalPages(response.data.totalPages || 0);
        }).catch((error) => {
            console.error("Error fetching paginated KPI reports:", error);
            alert("Failed to load reports.");
        });

    }, [page]);

    return (
        <div>
            <h2>KPI Reports - Paginated</h2>
            <p>Page {page + 1} of {totalPages}</p>

            <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
            >Previous</button>

            &nbsp;&nbsp;

            <button
                onClick={() => setPage(p => p + 1)}
                disabled={page >= totalPages - 1}
            >Next</button>

            <br /><br />

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Scope</th>
                        <th>Metrics</th>
                        <th>Status</th>
                        <th>Generated Date</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((r) => {
                        return (
                            <tr key={r.reportId}>
                                <td>{r.reportId}</td>
                                <td>{r.scope}</td>
                                <td>{r.metrics}</td>
                                <td>{r.status}</td>
                                <td>{r.generatedDate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}