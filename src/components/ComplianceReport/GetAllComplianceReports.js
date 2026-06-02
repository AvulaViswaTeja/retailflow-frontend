import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GetAllComplianceReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => { loadReports(); }, []);

    const loadReports = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://localhost:1405/api/compliance-reports",
                { headers: { Authorization: "Bearer " + token } });
            setReports(res.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch compliance reports");
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Archive Compliance Report #" + id + "?")) return;
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:1405/api/compliance-reports/${id}`,
                { headers: { Authorization: "Bearer " + token } });
            setReports(reports.filter(r => r.reportId !== id));
        } catch (err) {
            alert("Failed to archive report");
        }
    };

    const verdictBadge = (status) => {
        if (status === "PASS")    return "bg-success";
        if (status === "WARNING") return "bg-warning text-dark";
        if (status === "FAIL")    return "bg-danger";
        return "bg-secondary";
    };

    if (loading) return (
        <div className="container mt-4 text-center">
            <div className="spinner-border text-success" role="status"></div>
            <p className="mt-2">Loading compliance reports...</p>
        </div>
    );

    if (error) return <div className="container mt-4"><div className="alert alert-danger">{error}</div></div>;

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">All Compliance Reports</h4>
                    <span className="badge bg-light text-success">Total: {reports.length}</span>
                </div>
                <div className="card-body p-0">
                    {reports.length === 0 ? (
                        <div className="alert alert-warning m-3">No compliance reports found!</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th><th>Scope</th><th>Verdict</th>
                                        <th>Stock Turnover</th><th>Sales Growth</th>
                                        <th>Shrinkage</th><th>Remarks</th>
                                        <th>Date</th><th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reports.map((r) => (
                                        <tr key={r.reportId}>
                                            <td>{r.reportId}</td>
                                            <td><span className="badge bg-info text-dark">{r.scope}</span></td>
                                            <td><span className={`badge ${verdictBadge(r.status)}`}>{r.status}</span></td>
                                            <td>{r.stockTurnover}</td>
                                            <td>{r.salesGrowth}%</td>
                                            <td>{r.shrinkageRate}%</td>
                                            <td><small className="text-muted">{r.remarks}</small></td>
                                            <td>{r.generatedDate}</td>
                                            <td>
                                                <button className="btn btn-warning btn-sm me-1"
                                                    onClick={() => navigate(`/compliance/update/${r.reportId}`)}>Edit</button>
                                                <button className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(r.reportId)}>Archive</button>
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