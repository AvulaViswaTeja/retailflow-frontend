import axios from "axios";
import { useState } from "react";

export default function DeleteKPIReport() {
    const [reportId, setReportId] = useState("");
    const [currentReport, setCurrentReport] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setMessage(""); setError(""); setCurrentReport(null);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`http://localhost:1405/api/kpi-reports/${reportId}`,
                { headers: { Authorization: "Bearer " + token } });
            setCurrentReport(res.data);
        } catch (err) {
            setError("KPI Report not found with ID: " + reportId);
        }
    };

    const handleDelete = async () => {
        setMessage(""); setError("");
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:1405/api/kpi-reports/${reportId}`,
                { headers: { Authorization: "Bearer " + token } });
            setMessage("KPI Report #" + reportId + " archived successfully!");
            setCurrentReport(null); setReportId("");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    const kpiColor = (value, min, max) => {
        if (max !== undefined && max !== null) return value <= max ? "success" : "danger";
        return value >= min ? "success" : "danger";
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-danger text-white">
                    <h4 className="mb-0">Archive KPI Report</h4>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" value={reportId}
                            onChange={(e) => setReportId(e.target.value)} placeholder="Enter Report ID" min={1} />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>

                    {error   && <div className="alert alert-danger">{error}</div>}
                    {message && <div className="alert alert-success">{message}</div>}

                    {currentReport && (
                        <div>
                            <div className="table-responsive mb-3">
                                <table className="table table-bordered table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th><th>Scope</th><th>Stock Turnover</th>
                                            <th>Sales Growth</th><th>Shrinkage</th>
                                            <th>Date</th><th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{currentReport.reportId}</td>
                                            <td><span className="badge bg-info text-dark">{currentReport.scope}</span></td>
                                            <td><span className={`badge bg-${kpiColor(currentReport.stockTurnover, 2)}`}>{currentReport.stockTurnover}</span></td>
                                            <td><span className={`badge bg-${kpiColor(currentReport.salesGrowth, 0)}`}>{currentReport.salesGrowth}%</span></td>
                                            <td><span className={`badge bg-${kpiColor(currentReport.shrinkageRate, null, 5)}`}>{currentReport.shrinkageRate}%</span></td>
                                            <td>{currentReport.generatedDate}</td>
                                            <td><span className={`badge ${currentReport.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>{currentReport.status}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {currentReport.status === "ARCHIVED" ? (
                                <div className="alert alert-warning">⚠️ This report is already archived!</div>
                            ) : (
                                <button className="btn btn-danger w-100" onClick={handleDelete}>Archive Report</button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}