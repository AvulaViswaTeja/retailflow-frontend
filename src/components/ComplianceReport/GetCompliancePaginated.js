import axios from "axios";
import { useState, useEffect } from "react";

export default function GetCompliancePaginated() {
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchReports = async (pageNumber) => {
        setLoading(true); setError("");
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://localhost:1405/api/compliance-reports/paginated",
                { params: { page: pageNumber, size: 5 },
                  headers: { Authorization: "Bearer " + token } });
            setReports(res.data.content);
            setTotalPages(res.data.totalPages);
            setTotalElements(res.data.totalElements);
        } catch (err) {
            setError("Failed to fetch compliance reports");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchReports(page); }, [page]);

    const verdictBadge = (status) => {
        if (status === "PASS")    return "bg-success";
        if (status === "WARNING") return "bg-warning text-dark";
        if (status === "FAIL")    return "bg-danger";
        return "bg-secondary";
    };

    if (loading) return (
        <div className="container mt-4 text-center">
            <div className="spinner-border text-success" role="status"></div>
            <p className="mt-2">Loading...</p>
        </div>
    );

    if (error) return <div className="container mt-4"><div className="alert alert-danger">{error}</div></div>;

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Compliance Reports Paginated</h4>
                    <span className="badge bg-light text-success">Total: {totalElements}</span>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th><th>Scope</th><th>Verdict</th>
                                    <th>Stock Turnover</th><th>Sales Growth</th>
                                    <th>Shrinkage</th><th>Remarks</th><th>Date</th>
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-3">
                        <button className="btn btn-outline-success"
                            onClick={() => setPage(page - 1)} disabled={page === 0}>← Previous</button>
                        <span className="text-muted">Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong></span>
                        <button className="btn btn-outline-success"
                            onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>Next →</button>
                    </div>
                </div>
            </div>
        </div>
    );
}