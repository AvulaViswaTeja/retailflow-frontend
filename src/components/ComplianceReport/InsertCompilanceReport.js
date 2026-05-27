import axios from "axios";
import { useState } from "react";

export default function InsertCompilanceReport() {
    const [scope, setScope] = useState("");
    const [metrics, setMetrics] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const verdictBadge = (status) => {
        if (status === "PASS")    return "bg-success";
        if (status === "WARNING") return "bg-warning text-dark";
        if (status === "FAIL")    return "bg-danger";
        return "bg-secondary";
    };

    const verdictAlert = (status) => {
        if (status === "PASS")    return "alert-success";
        if (status === "WARNING") return "alert-warning";
        if (status === "FAIL")    return "alert-danger";
        return "alert-secondary";
    };

    const handleSubmit = async () => {
        if (!scope)   { setError("Please select a scope"); return; }
        if (!metrics) { setError("Please enter a metrics string"); return; }
        setError(""); setResult(null); setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(
                "http://localhost:1405/api/compliance-reports",
                { scope, metrics },
                { headers: { Authorization: "Bearer " + token } }
            );
            setResult(res.data);
            setScope(""); setMetrics("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to run compliance check");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">Run Compliance Check</h4>
                </div>
                <div className="card-body">
                    <p className="text-muted mb-3">Paste the metrics string from a KPI Report to evaluate compliance thresholds</p>

                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="mb-3">
                        <label className="form-label">Scope</label>
                        <select className="form-select" value={scope} onChange={e => setScope(e.target.value)}>
                            <option value="">-- Select Scope --</option>
                            <option>DAILY</option><option>WEEKLY</option>
                            <option>MONTHLY</option><option>CUSTOM</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Metrics (paste from KPI Report)</label>
                        <input className="form-control font-monospace" value={metrics}
                            onChange={e => setMetrics(e.target.value)}
                            placeholder="Stock Turnover: 4.75 | Sales Growth: 12.0% | Shrinkage: 1.8%" />
                        <div className="form-text">Go to KPI Reports → Get By ID → copy the metrics string and paste here</div>
                    </div>

                    <button className="btn btn-success w-100" onClick={handleSubmit} disabled={loading}>
                        {loading ? (<><span className="spinner-border spinner-border-sm me-2" role="status"></span>Running check...</>) : "Run Compliance Check"}
                    </button>

                    {result && (
                        <div className="mt-4">
                            <div className={`alert ${verdictAlert(result.status)}`}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <strong>Verdict</strong>
                                    <span className={`badge ${verdictBadge(result.status)}`}>{result.status}</span>
                                </div>
                                <p className="mt-2 mb-0">{result.remarks}</p>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th><th>Scope</th><th>Stock Turnover</th>
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