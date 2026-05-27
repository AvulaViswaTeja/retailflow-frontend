import axios from "axios";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function GetKPITrend() {
    const [scope, setScope] = useState("MONTHLY");
    const [days, setDays] = useState(30);
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        setSearched(true); setReports([]); setError("");
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(
                `http://localhost:1405/api/kpi-reports/scope/${scope}/trend`,
                { params: { lastXDays: days },
                  headers: { Authorization: "Bearer " + token } });
            setReports(res.data);
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
                                <option>DAILY</option>
                                <option>WEEKLY</option>
                                <option>MONTHLY</option>
                                <option>CUSTOM</option>
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

                    {error && <div className="alert alert-danger">{error}</div>}
                    {searched && reports.length === 0 && !error && (
                        <div className="alert alert-warning">No trend data found for {scope} in last {days} days</div>
                    )}

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