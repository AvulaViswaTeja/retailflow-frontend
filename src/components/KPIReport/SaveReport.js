import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SaveReport() {
    const today = new Date().toISOString().split('T')[0];
    const monthStart = today.slice(0, 7) + '-01';
    const lastMonthEnd = new Date(new Date().setDate(0)).toISOString().split('T')[0];
    const lastMonthStart = lastMonthEnd.slice(0, 7) + '-01';

    const [form, setForm] = useState({
        scope: 'MONTHLY',
        currentStart: monthStart,
        currentEnd: today,
        previousStart: lastMonthStart,
        previousEnd: lastMonthEnd
    });
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError(""); setResult(null); setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post("http://localhost:8070/api/kpi-reports", form,
                { headers: { Authorization: "Bearer " + token } });
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to generate report");
        } finally {
            setLoading(false);
        }
    };

    const copyMetrics = () => {
        navigator.clipboard.writeText(result.metrics);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                    <h4 className="mb-0">Generate KPI Report</h4>
                </div>
                <div className="card-body">
                    <p className="text-muted mb-3">System computes KPIs from actual sales and inventory data</p>

                    <div className="mb-3">
                        <label className="form-label">Scope</label>
                        <select className="form-select" value={form.scope}
                            onChange={e => setForm({ ...form, scope: e.target.value })}>
                            <option>DAILY</option><option>WEEKLY</option>
                            <option>MONTHLY</option><option>CUSTOM</option>
                        </select>
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Current Period Start</label>
                            <input type="date" className="form-control" value={form.currentStart}
                                onChange={e => setForm({ ...form, currentStart: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Current Period End</label>
                            <input type="date" className="form-control" value={form.currentEnd}
                                onChange={e => setForm({ ...form, currentEnd: e.target.value })} />
                        </div>
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Previous Period Start</label>
                            <input type="date" className="form-control" value={form.previousStart}
                                onChange={e => setForm({ ...form, previousStart: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Previous Period End</label>
                            <input type="date" className="form-control" value={form.previousEnd}
                                onChange={e => setForm({ ...form, previousEnd: e.target.value })} />
                        </div>
                    </div>

                    <button className="btn btn-primary w-100" onClick={handleSubmit} disabled={loading}>
                        {loading ? (<><span className="spinner-border spinner-border-sm me-2" role="status"></span>Generating...</>) : "Generate Report"}
                    </button>

                    {result && (
                        <div className="mt-4">
                            <h5>Report Generated</h5>
                            <div className="table-responsive mb-3">
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th><th>Scope</th><th>Stock Turnover</th>
                                            <th>Sales Growth</th><th>Shrinkage</th>
                                            <th>Generated Date</th><th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{result.reportId}</td>
                                            <td><span className="badge bg-info text-dark">{result.scope}</span></td>
                                            <td><span className={`badge bg-${kpiColor(result.stockTurnover, 2)}`}>{result.stockTurnover}</span></td>
                                            <td><span className={`badge bg-${kpiColor(result.salesGrowth, 0)}`}>{result.salesGrowth}%</span></td>
                                            <td><span className={`badge bg-${kpiColor(result.shrinkageRate, null, 5)}`}>{result.shrinkageRate}%</span></td>
                                            <td>{result.generatedDate}</td>
                                            <td><span className={`badge ${result.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>{result.status}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <label className="form-label fw-semibold">Copy metrics for compliance check</label>
                            <div className="input-group">
                                <input className="form-control font-monospace" value={result.metrics} readOnly />
                                <button className={`btn ${copied ? 'btn-success' : 'btn-outline-secondary'}`} onClick={copyMetrics}>
                                    {copied ? "✓ Copied!" : "Copy"}
                                </button>
                            </div>
                            <small className="text-muted">Go to Compliance → Run Compliance Check → paste this string</small>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}