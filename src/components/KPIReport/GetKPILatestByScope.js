import axios from "axios";
import { useState } from "react";

export default function GetKPILatestByScope() {
    const [scope, setScope] = useState("");
    const [report, setReport] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setReport(null); setError(""); setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`http://localhost:1405/api/kpi-reports/scope/${scope}/latest`,
                { headers: { Authorization: "Bearer " + token } });
            setReport(res.data);
        } catch (err) {
            setError("No KPI report found for scope: " + scope);
        } finally {
            setLoading(false);
        }
    };

    const kpiColor = (value, min, max) => {
        if (max !== undefined && max !== null) return value <= max ? "success" : "danger";
        return value >= min ? "success" : "danger";
    };

    return (
        <div className="container mt-4">
            {/* ✅ Toast container for messages */}
            <div className="toast-container position-fixed top-0 end-0 p-3">
                {error && (
                    <div className="toast show bg-danger text-white">
                        <div className="toast-header bg-danger text-white">
                            <strong className="me-auto">Error</strong>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                        </div>
                        <div className="toast-body">{error}</div>
                    </div>
                )}
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Get Latest KPI Report By Scope</h4>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <select className="form-select" value={scope}
                            onChange={(e) => setScope(e.target.value)}>
                            <option value="">-- Select Scope --</option>
                            <option>DAILY</option>
                            <option>WEEKLY</option>
                            <option>MONTHLY</option>
                            <option>CUSTOM</option>
                        </select>
                        <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
                            {loading ? "Searching..." : "Search"}
                        </button>
                    </div>

                    {report && (
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
                            {report.metrics && (
                                <div className="alert alert-light border mt-2">
                                    <small className="text-muted font-monospace">{report.metrics}</small>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
