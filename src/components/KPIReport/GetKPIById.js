import axios from "axios";
import { useState } from "react";

export default function GetKPIById() {
    const [reportId, setReportId] = useState("");
    const [report, setReport] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSearch = async () => {
        setReport(null); setError(""); setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`http://localhost:1405/api/kpi-reports/${reportId}`,
                { headers: { Authorization: "Bearer " + token } });
            setReport(res.data);
        } catch (err) {
            setError("KPI Report not found with ID: " + reportId);
        } finally {
            setLoading(false);
        }
    };

    const copyMetrics = () => {
        navigator.clipboard.writeText(report.metrics);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const kpiColor = (value, min, max) => {
        if (max !== undefined && max !== null) return value <= max ? "success" : "danger";
        return value >= min ? "success" : "danger";
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Get KPI Report By ID</h4>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" value={reportId}
                            min={1} onChange={(e) => setReportId(e.target.value)}
                            placeholder="Enter Report ID" />
                        <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
                            {loading ? (<><span className="spinner-border spinner-border-sm me-2" role="status"></span>Searching...</>) : "Search"}
                        </button>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    {report && (
                        <div>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th><th>Scope</th><th>Stock Turnover</th>
                                            <th>Sales Growth</th><th>Shrinkage</th>
                                            <th>Generated Date</th><th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{report.reportId}</td>
                                            <td><span className="badge bg-info text-dark">{report.scope}</span></td>
                                            <td><span className={`badge bg-${kpiColor(report.stockTurnover, 2)}`}>{report.stockTurnover}</span></td>
                                            <td><span className={`badge bg-${kpiColor(report.salesGrowth, 0)}`}>{report.salesGrowth}%</span></td>
                                            <td><span className={`badge bg-${kpiColor(report.shrinkageRate, null, 5)}`}>{report.shrinkageRate}%</span></td>
                                            <td>{report.generatedDate}</td>
                                            <td><span className={`badge ${report.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>{report.status}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="alert alert-light border mt-2">
                                <small className="text-muted">
                                    <strong>Period:</strong> {report.currentStart} → {report.currentEnd}
                                    &nbsp;|&nbsp;
                                    <strong>Previous:</strong> {report.previousStart} → {report.previousEnd}
                                </small>
                            </div>
                            {report.metrics && (
                                <div className="mt-3">
                                    <label className="form-label fw-semibold">Metrics string — copy to use in compliance check</label>
                                    <div className="input-group">
                                        <input className="form-control font-monospace" value={report.metrics} readOnly />
                                        <button className={`btn ${copied ? 'btn-success' : 'btn-outline-secondary'}`} onClick={copyMetrics}>
                                            {copied ? "✓ Copied!" : "Copy"}
                                        </button>
                                    </div>
                                    <small className="text-muted">Go to Compliance → Run Compliance Check → paste this string</small>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}