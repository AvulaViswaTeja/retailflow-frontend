import axios from "axios";
import { useState } from "react";

export default function GetComplianceReportById() {
    const [id, setId] = useState("");
    const [report, setReport] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setReport(null);
        setError("");
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:1405/api/compliance-reports/${id}`);
            setReport(res.data);
        } catch (err) {
            setError("Compliance Report not found with ID: " + id);
        } finally {
            setLoading(false);
        }
    };

    const verdictBadge = (status) => {
        if (status === "PASS")    return "bg-success";
        if (status === "WARNING") return "bg-warning text-dark";
        if (status === "FAIL")    return "bg-danger";
        return "bg-secondary";
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
                {report && (
                    <div className={`toast show ${report.status === "PASS" ? "bg-success text-white" :
                        report.status === "WARNING" ? "bg-warning text-dark" :
                        report.status === "FAIL" ? "bg-danger text-white" : "bg-secondary text-white"}`}>
                        <div className="toast-header">
                            <strong className="me-auto">Report #{report.reportId}</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
                        </div>
                        <div className="toast-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <span>{report.scope}</span>
                                <span className={`badge ${verdictBadge(report.status)}`}>{report.status}</span>
                            </div>
                            <p className="mt-2 mb-0">{report.remarks}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">Get Compliance Report By ID</h4>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input
                            type="number"
                            className="form-control"
                            value={id}
                            min={1}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="Enter Report ID"
                        />
                        <button
                            className="btn btn-success"
                            onClick={handleSearch}
                            disabled={loading}>
                            {loading ? (
                                <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Searching...</>
                            ) : "Search"}
                        </button>
                    </div>

                    {report && (
                        <div>
                            {/* KPI values table */}
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Scope</th>
                                            <th>Stock Turnover</th>
                                            <th>Sales Growth</th>
                                            <th>Shrinkage</th>
                                            <th>Generated Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{report.reportId}</td>
                                            <td><span className="badge bg-info text-dark">{report.scope}</span></td>
                                            <td><span className={`badge ${report.stockTurnover >= 2 ? 'bg-success' : 'bg-danger'}`}>{report.stockTurnover}</span></td>
                                            <td><span className={`badge ${report.salesGrowth >= 0 ? 'bg-success' : 'bg-danger'}`}>{report.salesGrowth}%</span></td>
                                            <td><span className={`badge ${report.shrinkageRate <= 5 ? 'bg-success' : 'bg-danger'}`}>{report.shrinkageRate}%</span></td>
                                            <td>{report.generatedDate}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Metrics string */}
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
