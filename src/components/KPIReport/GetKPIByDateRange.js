import axios from "axios";
import { useState } from "react";

export default function GetKPIByDateRange() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reports, setReports] = useState([]);
    const [error, setError] = useState("");
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        setSearched(true); setReports([]); setError("");
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://localhost:1405/api/kpi-reports/date-range",
                { params: { start: startDate, end: endDate },
                  headers: { Authorization: "Bearer " + token } });
            setReports(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    const kpiColor = (value, min, max) => {
        if (max !== undefined && max !== null) return value <= max ? "success" : "danger";
        return value >= min ? "success" : "danger";
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Get KPI Reports By Date Range</h4>
                </div>
                <div className="card-body">
                    <div className="row g-3 mb-3">
                        <div className="col-md-5">
                            <label className="form-label">Start Date</label>
                            <input type="date" className="form-control" value={startDate}
                                onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className="col-md-5">
                            <label className="form-label">End Date</label>
                            <input type="date" className="form-control" value={endDate}
                                onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <div className="col-md-2 d-flex align-items-end">
                            <button className="btn btn-primary w-100" onClick={handleSearch}>Search</button>
                        </div>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {searched && reports.length === 0 && !error && (
                        <div className="alert alert-warning">No KPI reports found between {startDate} and {endDate}</div>
                    )}

                    {reports.length > 0 && (
                        <>
                            <p className="text-muted mb-2">Found <strong>{reports.length}</strong> report(s)</p>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th><th>Scope</th><th>Stock Turnover</th>
                                            <th>Sales Growth</th><th>Shrinkage</th>
                                            <th>Metrics</th><th>Date</th><th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.map((r) => (
                                            <tr key={r.reportId}>
                                                <td>{r.reportId}</td>
                                                <td><span className="badge bg-info text-dark">{r.scope}</span></td>
                                                <td><span className={`badge bg-${kpiColor(r.stockTurnover, 2)}`}>{r.stockTurnover}</span></td>
                                                <td><span className={`badge bg-${kpiColor(r.salesGrowth, 0)}`}>{r.salesGrowth}%</span></td>
                                                <td><span className={`badge bg-${kpiColor(r.shrinkageRate, null, 5)}`}>{r.shrinkageRate}%</span></td>
                                                <td><small className="text-muted">{r.metrics}</small></td>
                                                <td>{r.generatedDate}</td>
                                                <td><span className={`badge ${r.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>{r.status}</span></td>
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