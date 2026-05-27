import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function InsertCompilanceReport() {
    const [searchParams] = useSearchParams();
    const comingFromKPI  = !!(searchParams.get('metrics'));

    const [scope,      setScope]      = useState(searchParams.get('scope')   || "");
    const [metrics,    setMetrics]    = useState(searchParams.get('metrics') || "");
    const [result,     setResult]     = useState(null);
    const [error,      setError]      = useState("");
    const [loading,    setLoading]    = useState(false);

    // KPI ID lookup
    const [kpiId,      setKpiId]      = useState("");
    const [kpiLoading, setKpiLoading] = useState(false);
    const [kpiError,   setKpiError]   = useState("");
    const [kpiFetched, setKpiFetched] = useState(comingFromKPI);

    const fetchKpiReport = async () => {
        if (!kpiId) { setKpiError("Please enter a KPI Report ID"); return; }
        setKpiLoading(true); setKpiError(""); setKpiFetched(false);
        setResult(null); setError("");
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(
                `http://localhost:1405/api/kpi-reports/${kpiId}`,
                { headers: { Authorization: "Bearer " + token } }
            );
            setScope(res.data.scope);
            setMetrics(res.data.metrics);
            setKpiFetched(true);
        } catch (err) {
            setKpiError("KPI Report not found with ID: " + kpiId);
        } finally {
            setKpiLoading(false);
        }
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
        } catch (err) {
            setError(err.response?.data?.message || "Failed to run compliance check");
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

    const verdictAlert = (status) => {
        if (status === "PASS")    return "alert-success";
        if (status === "WARNING") return "alert-warning";
        if (status === "FAIL")    return "alert-danger";
        return "alert-secondary";
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                    <h4 className="mb-0">Run Compliance Check</h4>
                </div>
                <div className="card-body">

                    {/* Step 1 — KPI Report ID lookup (hidden when coming from KPI button) */}
                    {!comingFromKPI && (
                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                Enter KPI Report ID
                            </label>
                            <div className="input-group">
                                <input
                                    type="number"
                                    className="form-control"
                                    value={kpiId}
                                    onChange={e => setKpiId(e.target.value)}
                                    placeholder="e.g. 5"
                                    min={1}
                                    onKeyDown={e => e.key === 'Enter' && fetchKpiReport()}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={fetchKpiReport}
                                    disabled={kpiLoading}>
                                    {kpiLoading ? (
                                        <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Fetching...</>
                                    ) : "Fetch Report"}
                                </button>
                            </div>
                            {kpiError   && <div className="text-danger small mt-1">{kpiError}</div>}
                            {kpiFetched && (
                                <div className="alert alert-success py-2 mt-2 small mb-0">
                                    ✓ KPI Report fetched — scope and metrics filled below
                                </div>
                            )}
                        </div>
                    )}

                    {/* Auto-fill notice when coming from KPI button */}
                    {comingFromKPI && (
                        <div className="alert alert-success py-2 mb-3 small">
                            ✓ Metrics auto-filled from KPI Report — review and click Run
                        </div>
                    )}

                    {error && <div className="alert alert-danger">{error}</div>}

                    {/* Scope and metrics — show always */}
                    <div className="mb-3">
                        <label className="form-label">Scope</label>
                        <select className="form-select" value={scope}
                            onChange={e => setScope(e.target.value)}>
                            <option value="">-- Select Scope --</option>
                            <option>DAILY</option>
                            <option>WEEKLY</option>
                            <option>MONTHLY</option>
                            <option>CUSTOM</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Metrics</label>
                        <input
                            className="form-control font-monospace"
                            value={metrics}
                            onChange={e => setMetrics(e.target.value)}
                            placeholder="Stock Turnover: 4.75 | Sales Growth: 12.0% | Shrinkage: 1.8%"
                        />
                    </div>

                    <button
                        className="btn btn-success w-100"
                        onClick={handleSubmit}
                        disabled={loading}>
                        {loading ? (
                            <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Running check...</>
                        ) : "🛡️ Run Compliance Check"}
                    </button>

                    {/* Verdict result */}
                    {result && (
                        <div className="mt-4">
                            <div className={`alert ${verdictAlert(result.status)}`}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <strong>Verdict — Report #{result.reportId}</strong>
                                    <span className={`badge ${verdictBadge(result.status)} fs-6`}>
                                        {result.status}
                                    </span>
                                </div>
                                <p className="mt-2 mb-0">{result.remarks}</p>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Report ID</th>
                                            <th>Scope</th>
                                            <th>Stock Turnover</th>
                                            <th>Sales Growth</th>
                                            <th>Shrinkage</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{result.reportId}</td>
                                            <td>
                                                <span className="badge bg-info text-dark">
                                                    {result.scope}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${result.stockTurnover >= 2 ? 'bg-success' : 'bg-danger'}`}>
                                                    {result.stockTurnover}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${result.salesGrowth >= 0 ? 'bg-success' : 'bg-danger'}`}>
                                                    {result.salesGrowth}%
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${result.shrinkageRate <= 5 ? 'bg-success' : 'bg-danger'}`}>
                                                    {result.shrinkageRate}%
                                                </span>
                                            </td>
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