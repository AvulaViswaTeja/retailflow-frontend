import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateKPIReport() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ scope: '', metrics: '' });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) { setFetching(false); return; }
        const token = localStorage.getItem("token");
        axios.get(`http://localhost:1405/api/kpi-reports/${id}`,
            { headers: { Authorization: "Bearer " + token } })
            .then(res => { setForm({ scope: res.data.scope, metrics: res.data.metrics || '' }); setFetching(false); })
            .catch(() => { setError("Failed to load report"); setFetching(false); });
    }, [id]);

    const handleUpdate = async () => {
        setMessage(""); setError(""); setLoading(true);
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://localhost:1405/api/kpi-reports/${id}`, form,
                { headers: { Authorization: "Bearer " + token } });
            setMessage("KPI Report #" + id + " updated successfully!");
            setTimeout(() => navigate("/kpireport/getAll"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update report");
        } finally {
            setLoading(false);
        }
    };

    if (!id) return (
        <div className="container mt-4">
            <div className="alert alert-warning">Please go to <strong>Get All KPI Reports</strong> and click Edit.</div>
            <button className="btn btn-primary" onClick={() => navigate('/kpireport/getAll')}>Go to All Reports</button>
        </div>
    );

    if (fetching) return (
        <div className="container mt-4 text-center">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2">Loading report #{id}...</p>
        </div>
    );

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-warning text-dark">
                    <h4 className="mb-0">Update KPI Report #{id}</h4>
                </div>
                <div className="card-body">
                    {error   && <div className="alert alert-danger">{error}</div>}
                    {message && <div className="alert alert-success">{message}</div>}

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
                            onClick={() => navigate('/kpireport/getAll')}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}