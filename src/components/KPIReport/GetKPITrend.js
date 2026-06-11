import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function GetKPITrend() {
    const [scope, setScope] = useState("MONTHLY");
    const [days, setDays] = useState(30);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        setReports([]); setError(""); setInfo("");
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(
                `http://localhost:8070/api/kpi-reports/scope/${scope}/trend`,
                { params: { lastXDays: days },
                  headers: { Authorization: "Bearer " + token } });
            setReports(res.data);
            if (res.data.length === 0)
                setInfo(`No trend data found for ${scope} in last ${days} days`);
        } catch (err) {
            setError("Failed to fetch trend data");
        }
    };

    const chartData = reports.map(r => ({
        date: r.generatedDate,
        stockTurnover: r.stockTurnover,
        salesGrowth: r.salesGrowth,
        shrinkageRate: r.shrinkageRate,
    }));

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
                {info && (
                    <div className="toast show bg-warning text-dark">
                        <div className="toast-header bg-warning text-dark">
                            <strong className="me-auto">Info</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
                        </div>
                        <div className="toast-body">{info}</div>
                    </div>
                )}
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">KPI Trend Analysis</h4>
                </div>
                <div className="card-body">
                    <div className="row g-3 mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Scope</label>
                            <select className="form-select" value={scope}
                                onChange={(e) => setScope(e.target.value)}>
                                <option>DAILY</option><option>WEEKLY</option>
                                <option>MONTHLY</option><option>CUSTOM</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Last X Days</label>
                            <input type="number" className="form-control" value={days}
                                min={1} onChange={(e) => setDays(e.target.value)} />
                        </div>
                        <div className="col-md-4 d-flex align-items-end">
                            <button className="btn btn-primary w-100" onClick={handleSearch}>Get Trend</button>
                        </div>
                    </div>

                    {reports.length > 0 && (
                        <>
                            <div className="mb-4">
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                                        <YAxis tick={{ fontSize: 11 }} />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="stockTurnover" stroke="#0d6efd" strokeWidth={2} name="Stock Turnover" />
                                        <Line type="monotone" dataKey="salesGrowth" stroke="#198754" strokeWidth={2} name="Sales Growth %" />
                                        <Line type="monotone" dataKey="shrinkageRate" stroke="#dc3545" strokeWidth={2} name="Shrinkage %" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th><th>Scope</th><th>Stock Turnover</th>
                                            <th>Sales Growth</th><th>Shrinkage</th><th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.map((r) => (
                                            <tr key={r.reportId}>
                                                <td>{r.reportId}</td>
                                                <td><span className="badge bg-info text-dark">{r.scope}</span></td>
                                                <td><span className={`badge ${r.stockTurnover >= 2 ? 'bg-success' : 'bg-danger'}`}>{r.stockTurnover}</span></td>
                                                <td><span className={`badge ${r.salesGrowth >= 0 ? 'bg-success' : 'bg-danger'}`}>{r.salesGrowth}%</span></td>
                                                <td><span className={`badge ${r.shrinkageRate <= 5 ? 'bg-success' : 'bg-danger'}`}>{r.shrinkageRate}%</span></td>
                                                <td>{r.generatedDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}