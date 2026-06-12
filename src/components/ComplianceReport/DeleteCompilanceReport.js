import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteComplianceReport() {
    const [reportId, setReportId] = useState("");
    const [currentReport, setCurrentReport] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        setMessage(""); setError(""); setCurrentReport(null);
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`http://localhost:8070/api/compliance-reports/${reportId}`,
                { headers: { Authorization: "Bearer " + token } });
            setCurrentReport(res.data);
        } catch (err) {
            setError("Compliance Report not found with ID: " + reportId);
        }
    };

    const handleDelete = async () => {
        setMessage(""); setError("");
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:8070/api/compliance-reports/${reportId}`,
                { headers: { Authorization: "Bearer " + token } });
            setMessage("Compliance Report #" + reportId + " archived successfully!");
            setCurrentReport(null); setReportId("");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
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
                {message && (
                    <div className="toast show bg-success text-white">
                        <div className="toast-header bg-success text-white">
                            <strong className="me-auto">Success</strong>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                        </div>
                        <div className="toast-body">{message}</div>
                    </div>
                )}
            </div>

            <div className="card shadow-sm">
                <div className="card-header bg-danger text-white">
                    <h4 className="mb-0">Archive Compliance Report</h4>
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" value={reportId}
                            onChange={(e) => setReportId(e.target.value)}
                            placeholder="Enter Report ID" min={1} />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>

                    {currentReport && (
                        <div>
                            <div className="table-responsive mb-3">
                                <table className="table table-bordered table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th><th>Scope</th><th>Verdict</th>
                                            <th>Stock Turnover</th><th>Sales Growth</th>
                                            <th>Shrinkage</th><th>Remarks</th><th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{currentReport.reportId}</td>
                                            <td>{currentReport.scope}</td>
                                            <td><span className={`badge ${verdictBadge(currentReport.status)}`}>{currentReport.status}</span></td>
                                            <td>{currentReport.stockTurnover}</td>
                                            <td>{currentReport.salesGrowth}%</td>
                                            <td>{currentReport.shrinkageRate}%</td>
                                            <td><small>{currentReport.remarks}</small></td>
                                            <td>{currentReport.generatedDate}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {currentReport.status === "ARCHIVED" ? (
                                <div className="alert alert-warning">⚠️ This report is already archived!</div>
                            ) : (
                                <button className="btn btn-danger w-100" onClick={handleDelete}>Archive Report</button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}