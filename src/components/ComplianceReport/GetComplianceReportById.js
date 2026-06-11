import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetComplianceReportById() {
    const [id, setId] = useState("");
    const [report, setReport] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        setReport(null); setError(""); setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`http://localhost:8070/api/compliance-reports/${id}`,
                { headers: { Authorization: "Bearer " + token } });
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

            <button onClick={() => navigate('/compliance')}
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
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">Get Compliance Report By ID</h4>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" value={id} min={1}
                            onChange={(e) => setId(e.target.value)} placeholder="Enter Report ID" />
                        <button className="btn btn-success" onClick={handleSearch} disabled={loading}>
                            {loading ? (<><span className="spinner-border spinner-border-sm me-2" role="status"></span>Searching...</>) : "Search"}
                        </button>
                    </div>

                    {report && (
                        <div>
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th><th>Scope</th><th>Verdict</th>
                                            <th>Stock Turnover</th><th>Sales Growth</th>
                                            <th>Shrinkage</th><th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{report.reportId}</td>
                                            <td><span className="badge bg-info text-dark">{report.scope}</span></td>
                                            <td><span className={`badge ${verdictBadge(report.status)}`}>{report.status}</span></td>
                                            <td><span className={`badge ${report.stockTurnover >= 2 ? 'bg-success' : 'bg-danger'}`}>{report.stockTurnover}</span></td>
                                            <td><span className={`badge ${report.salesGrowth >= 0 ? 'bg-success' : 'bg-danger'}`}>{report.salesGrowth}%</span></td>
                                            <td><span className={`badge ${report.shrinkageRate <= 5 ? 'bg-success' : 'bg-danger'}`}>{report.shrinkageRate}%</span></td>
                                            <td>{report.generatedDate}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {report.metrics && (
                                <div className="alert alert-light border mt-2">
                                    <small className="text-muted font-monospace">{report.metrics}</small>
                                </div>
                            )}
                            {report.remarks && (
                                <div className="alert alert-secondary mt-2">
                                    <small>{report.remarks}</small>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}