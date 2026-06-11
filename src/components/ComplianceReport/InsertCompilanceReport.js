import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InsertComplianceReport() {
    const [kpiId, setKpiId] = useState("");
    const [kpiLoading, setKpiLoading] = useState(false);
    const [kpiError, setKpiError] = useState("");
    const [kpiFetched, setKpiFetched] = useState(null);
    const [scope, setScope] = useState("");
    const [metrics, setMetrics] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const fetchKpiReport = async () => {
        setKpiLoading(true); setKpiError("");
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:8070/api/kpi-reports/${kpiId}`,
                { headers: { Authorization: "Bearer " + token } });
            console.log("=== KPI RESPONSE:", res.data);
            console.log("=== METRICS:", res.data.metrics);
            setKpiFetched(res.data);
            setScope(res.data.scope);
            setMetrics(res.data.metrics || "");
        } catch (err) {
            setKpiError("Failed to fetch KPI report");
        } finally {
            setKpiLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true); setError("");
        console.log("=== SUBMITTING METRICS:", metrics);
        console.log("=== SUBMITTING SCOPE:", scope);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post("http://localhost:8070/api/compliance-reports",
                { scope, metrics },
                { headers: { Authorization: "Bearer " + token } });
            setResult(res.data);
        } catch (err) {
            setError("Failed to run compliance check");
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

            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">Run Compliance Check</h4>
                </div>
                <div className="card-body">

                    <div className="mb-4">
                        <label className="form-label fw-semibold">Enter KPI Report ID</label>
                        <div className="input-group">
                            <input type="number" className="form-control" value={kpiId}
                                onChange={e => setKpiId(e.target.value)} placeholder="e.g. 5" min={1}
                                onKeyDown={e => e.key === 'Enter' && fetchKpiReport()} />
                            <button className="btn btn-primary" onClick={fetchKpiReport} disabled={kpiLoading}>
                                {kpiLoading ? (<><span className="spinner-border spinner-border-sm me-2"></span>Fetching...</>) : "Fetch Report"}
                            </button>
                        </div>
                        {kpiError && <small className="text-danger d-block mt-1">{kpiError}</small>}
                        {kpiFetched && (
                            <small className="text-success d-block mt-2">
                                ✓ KPI Report fetched — scope & metrics populated
                            </small>
                        )}
                    </div>

                    {error && <div className="text-danger fw-semibold mb-3">{error}</div>}

                    <div className="mb-3">
                        <label className="form-label">Scope</label>
                        <select className="form-select" value={scope} onChange={e => setScope(e.target.value)}>
                            <option value="">-- Select Scope --</option>
                            <option>DAILY</option><option>WEEKLY</option>
                            <option>MONTHLY</option><option>CUSTOM</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Metrics</label>
                        <input className="form-control font-monospace" value={metrics}
                            onChange={e => setMetrics(e.target.value)}
                            placeholder="Stock Turnover: 4.75 | Sales Growth: 12.0% | Shrinkage: 1.8%" />
                        {metrics && (
                            <small className="text-muted d-block mt-1">
                                Populated from KPI report — you can edit if needed
                            </small>
                        )}
                    </div>

                    <button className="btn btn-success w-100" onClick={handleSubmit} disabled={loading || !metrics || !scope}>
                        {loading ? (<><span className="spinner-border spinner-border-sm me-2"></span>Running check...</>) : "Run Compliance Check"}
                    </button>

                    {result && (
                        <div className="mt-4">
                            <div className="card border">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-1">Report #{result.reportId}</h5>
                                        <span className={`badge ${verdictBadge(result.status)}`}>{result.status}</span>
                                    </div>
                                    <p className="text-muted mb-2">{result.remarks}</p>
                                </div>
                            </div>
                            <div className="table-responsive mt-3">
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Report ID</th><th>Scope</th><th>Stock Turnover</th>
                                            <th>Sales Growth</th><th>Shrinkage</th><th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{result.reportId}</td>
                                            <td><span className="badge bg-info text-dark">{result.scope}</span></td>
                                            <td><span className={`badge ${result.stockTurnover >= 2 ? 'bg-success' : 'bg-danger'}`}>{result.stockTurnover}</span></td>
                                            <td><span className={`badge ${result.salesGrowth >= 0 ? 'bg-success' : 'bg-danger'}`}>{result.salesGrowth}%</span></td>
                                            <td><span className={`badge ${result.shrinkageRate <= 5 ? 'bg-success' : 'bg-danger'}`}>{result.shrinkageRate}%</span></td>
                                            <td>{result.generatedDate}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}