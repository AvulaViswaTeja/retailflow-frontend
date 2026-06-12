import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetKPIById() {
    const [reportId, setReportId] = useState("");
    const [report,   setReport]   = useState(null);
    const [error,    setError]    = useState("");
    const [loading,  setLoading]  = useState(false);
    const [copied,   setCopied]   = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        setReport(null); setError(""); setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`http://localhost:8070/api/kpi-reports/${reportId}`,
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

    const runComplianceCheck = () => {
        const params = new URLSearchParams({ metrics: report.metrics, scope: report.scope });
        navigate(`/compliance/insert?${params.toString()}`);
    };

    const kpiColor = (value, min, max) => {
        if (max !== undefined && max !== null) return value <= max ? "success" : "danger";
        return value >= min ? "success" : "danger";
    };

    return (
        <div className="container mt-4">

            <button onClick={() => navigate('/kpireport')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16, padding: '7px 16px', borderRadius: 8, fontSize: 13, color: '#fff', cursor: 'pointer', background: 'linear-gradient(135deg,#7c3aed,#a855f7)', border: 'none' }}>
                <i className="ti ti-arrow-left" style={{ fontSize: 15 }}></i> Back
            </button>

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
                {copied && (
                    <div className="toast show bg-success text-white">
                        <div className="toast-header bg-success text-white">
                            <strong className="me-auto">Copied</strong>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                        </div>
                        <div className="toast-body">Metrics string copied to clipboard!</div>
                    </div>
                )}
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Get KPI Report By ID</h4>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" value={reportId} min={1}
                            onChange={(e) => setReportId(e.target.value)} placeholder="Enter Report ID" />
                        <button className="btn btn-primary" onClick={handleSearch} disabled={loading}>
                            {loading ? (<><span className="spinner-border spinner-border-sm me-2" role="status"></span>Searching...</>) : "Search"}
                        </button>
                    </div>

                    {report && (
                        <div>
                            <div className="table-responsive mb-3">
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
                            <div className="alert alert-light border mb-3">
                                <small className="text-muted">
                                    <strong>Current Period:</strong> {report.currentStart} → {report.currentEnd}
                                    &nbsp;|&nbsp;
                                    <strong>Previous Period:</strong> {report.previousStart} → {report.previousEnd}
                                </small>
                            </div>
                            {report.metrics && (
                                <div>
                                    <label className="form-label fw-semibold">Metrics string</label>
                                    <div className="input-group mb-2">
                                        <input className="form-control font-monospace" value={report.metrics} readOnly />
                                        <button className={`btn ${copied ? 'btn-success' : 'btn-outline-secondary'}`} onClick={copyMetrics}>
                                            {copied ? "✓ Copied!" : "Copy"}
                                        </button>
                                    </div>
                                    <button className="btn btn-success w-100" onClick={runComplianceCheck}>
                                        🛡️ Run Compliance Check for this Report
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}