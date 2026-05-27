import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GetAllKPIReports() {

    let [reports, setReports] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        loadReports();
    }, []);

    let loadReports = () => {
        let url = "http://localhost:8016/api/kpi-reports";
        axios.get(url).then((response) => {
            setReports(response.data);
        }).catch((error) => {
            console.error("Error fetching KPI reports:", error);
        });
    }

    let deleteHandler = (id) => {
        let confirmDelete = window.confirm("Archive KPI Report ID: " + id + "?");
        if (!confirmDelete) return;

        let url = `http://localhost:8016/api/kpi-reports/${id}`;
        axios.delete(url).then(() => {
            alert("KPI Report #" + id + " archived!");
            setReports(reports.filter((r) => r.reportId !== id));
        }).catch((error) => {
            alert("Failed to archive: " + error.message);
        });
    }

    return (
        <div>
            <h2>All KPI Reports</h2>
            <button onClick={loadReports}>Refresh</button>
            <br /><br />

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Scope</th>
                        <th>Stock Turnover</th>
                        <th>Sales Growth</th>
                        <th>Shrinkage</th>
                        <th>Metrics</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length === 0 ? (
                        <tr>
                            <td colSpan="9">No KPI reports found</td>
                        </tr>
                    ) : (
                        reports.map((r) => {
                            return (
                                <tr key={r.reportId}>
                                    <td>{r.reportId}</td>
                                    <td>{r.scope}</td>
                                    <td style={{ color: r.stockTurnover >= 2 ? "green" : "red" }}>
                                        {r.stockTurnover}
                                    </td>
                                    <td style={{ color: r.salesGrowth >= 0 ? "green" : "red" }}>
                                        {r.salesGrowth}%
                                    </td>
                                    <td style={{ color: r.shrinkageRate <= 5 ? "green" : "red" }}>
                                        {r.shrinkageRate}%
                                    </td>
                                    <td>{r.metrics}</td>
                                    <td>{r.status}</td>
                                    <td>{r.generatedDate}</td>
                                    <td>
                                        <button onClick={() => navigate(`/kpireport/update/${r.reportId}`)}>Edit</button>
                                        &nbsp;&nbsp;
                                        <button onClick={() => deleteHandler(r.reportId)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}