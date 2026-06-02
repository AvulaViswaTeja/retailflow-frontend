import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateComplianceReport() {
    const { rid } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ scope: '', metrics: '' });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!rid) { setFetching(false); return; }
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:1405/api/compliance-reports/${rid}`,
            { headers: { Authorization: "Bearer " + token } })
            .then(res => { 
                setForm({ scope: res.data.scope, metrics: res.data.metrics || '' }); 
                setFetching(false); 
            })
            .catch(() => { 
                setError("Failed to load report"); 
                setFetching(false); 
            });
    }, [rid]);

    const handleUpdate = async () => {
        setMessage(""); setError(""); setLoading(true);
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://localhost:1405/api/compliance-reports/${rid}`, form,
                { headers: { Authorization: "Bearer " + token } });
            setMessage("Compliance Report #" + rid + " updated successfully!");
            setTimeout(() => navigate("/compliance/getAll"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update report");
        } finally {
            setLoading(false);
        }
    };

    if (!rid) return (
        <div className="container mt-4">
            <div className="toast-container position-fixed top-0 end-0 p-3">
                <div className="toast show bg-warning text-dark">
                    <div className="toast-header bg-warning text-dark">
                        <strong className="me-auto">Info</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast"></button>
                    </div>
                    <div className="toast-body">
                        Please go to <strong>Get All Compliance Reports</strong> and click Edit.
                    </div>
                </div>
            </div>
            <button className="btn btn-success mt-3" onClick={() => navigate('/compliance/getAll')}>Go to All Reports</button>
        </div>
    );

    if (fetching) return (
        <div className="container mt-4 text-center">
            <div className="spinner-border text-success" role="status"></div>
            <p className="mt-2">Loading report #{rid}...</p>
        </div>
    );

    return (
        <div className="container mt-4">
            {/* ✅ Toast container for success/error */}
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
                <div className="card-header bg-warning text-dark">
                    <h4 className="mb-0">Update Compliance Report #{rid}</h4>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Scope</label>
                        <select className="form-select" value={form.scope}
                            onChange={e => setForm({ ...form, scope: e.target.value })}>
                            <option>DAILY</option><option>WEEKLY</option>
                            <option>MONTHLY</option><option>CUSTOM</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Metrics</label>
                        <input className="form-control font-monospace" value={form.metrics}
                            onChange={e => setForm({ ...form, metrics: e.target.value })}
                            placeholder="Stock Turnover: 4.75 | Sales Growth: 12.0% | Shrinkage: 1.8%" />
                    </div>

                    <div className="d-flex gap-2">
                        <button className="btn btn-warning w-100" onClick={handleUpdate} disabled={loading}>
                            {loading ? (<><span className="spinner-border spinner-border-sm me-2" role="status"></span>Updating...</>) : "UPDATE"}
                        </button>
                        <button className="btn btn-outline-secondary w-100"
                            onClick={() => navigate('/compliance/getAll')}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
