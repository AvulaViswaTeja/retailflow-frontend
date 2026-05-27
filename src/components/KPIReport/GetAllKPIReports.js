import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GetAllKPIReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState("");
    const navigate = useNavigate();

    useEffect(() => { loadReports(); }, []);

    const loadReports = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(
                "http://localhost:1405/api/kpi-reports",
                { headers: { Authorization: "Bearer " + token } }
            );
            setReports(res.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch KPI reports");
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Archive KPI Report #" + id + "?")) return;
        const token = localStorage.getItem("token");
        try {
            await axios.delete(
                `http://localhost:1405/api/kpi-reports/${id}`,
                { headers: { Authorization: "Bearer " + token } }
            );
            setReports(reports.filter(r => r.reportId !== id));
        } catch (err) {
            alert("Failed to archive report");
        }
    };

    const runComplianceCheck = (r) => {
        const params = new URLSearchParams({
            metrics: r.metrics,
            scope:   r.scope
        });
        navigate(`/compliance/insert?${params.toString()}`);
    };

    const kpiColor = (value, min, max) => {
        if (max !== undefined && max !== null) return value <= max ? "success" : "danger";
        return value >= min ? "success" : "danger";
    };

    if (loading) return (
        <div className="container mt-4 text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Loading KPI reports...</p>
        </div>
    );

    if (error) return (
        <div className="container mt-4">
            <div className="alert alert-danger">{error}</div>
        </div>
    );

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">All KPI Reports</h4>
                    <span className="badge bg-light text-primary">Total: {reports.length}</span>
                </div>
                <div className="card-body p-0">
                    {reports.length === 0 ? (
                        <div className="alert alert-warning m-3">No KPI reports found!</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Scope</th>
                                        <th>Stock Turnover</th>
                                        <th>Sales Growth</th>
                                        <th>Shrinkage</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.map((r) => (
                                        <tr key={r.reportId}>
                                            <td>{r.reportId}</td>
                                            <td>
                                                <span className="badge bg-info text-dark">
                                                    {r.scope}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge bg-${kpiColor(r.stockTurnover, 2)}`}>
                                                    {r.stockTurnover}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge bg-${kpiColor(r.salesGrowth, 0)}`}>
                                                    {r.salesGrowth}%
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge bg-${kpiColor(r.shrinkageRate, null, 5)}`}>
                                                    {r.shrinkageRate}%
                                                </span>
                                            </td>
                                            <td>{r.generatedDate}</td>
                                            <td>
                                                <span className={`badge ${r.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>
                                                    {r.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-success btn-sm me-1"
                                                    onClick={() => runComplianceCheck(r)}
                                                    title="Run compliance check for this report">
                                                    🛡️
                                                </button>
                                                <button
                                                    className="btn btn-warning btn-sm me-1"
                                                    onClick={() => navigate(`/kpireport/update/${r.reportId}`)}>
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(r.reportId)}>
                                                    Archive
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}