import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GetLowStock() {
    const navigate = useNavigate();
    let [inventoryArr, setInventoryArr] = useState([]);
    let [errorMsg, setErrorMsg] = useState("");
    let token = localStorage.getItem("token");

    const fetchLowStock = () => {
        setErrorMsg("");
        let url = "http://localhost:8070/api/inventory/low-stock";
        axios.get(url, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            setInventoryArr(response.data);
        })
        .catch((error) => {
            setErrorMsg(error.response?.data?.message || "Error fetching low stock inventory. Please try again.");
        });
    };

    useEffect(() => {
        fetchLowStock();
    }, []);

    return (
        <div className="container mt-5">

            {errorMsg && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {errorMsg}
                    <button type="button" className="btn-close" onClick={() => setErrorMsg("")}></button>
                </div>
            )}

            {/* Back button */}
            <button
                onClick={() => navigate('/Inventory')}
                style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 8, fontSize: 12,
                    color: '#fff', cursor: 'pointer',
                    background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                    border: 'none', marginBottom: 16,
                }}>
                ← Back
            </button>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 style={{ color: '#f87171' }} className="fw-bold mb-1">⚠️ Low Stock Alerts</h2>
                    <small style={{ color: '#94a3b8' }}>Real-time items currently sitting below safety thresholds</small>
                </div>
                <button className="btn btn-outline-danger px-4 shadow-sm" onClick={fetchLowStock}>
                    🔄 Refresh List
                </button>
            </div>

            <div className="card shadow-sm" style={{ borderColor: 'rgba(255,255,255,.07)', background: '#141a35' }}>
            <div className="card-body p-0" style={{ background: '#141a35' }}>
              <div className="table-responsive" style={{ background: '#141a35' }}>
                 <table className="table table-hover align-middle mb-0 text-center"
                style={{ background: '#141a35', '--bs-table-bg': '#141a35', '--bs-table-striped-bg': '#1e293b', '--bs-table-hover-bg': '#1e2d45' }}>
                            <thead>
                                <tr style={{ background: '#1e293b', color: '#f1f5f9' }}>
                                    <th style={{ color: '#f1f5f9', borderBottom: '1px solid rgba(255,255,255,.1)' }}>Inventory ID</th>
                                    <th style={{ color: '#f1f5f9', borderBottom: '1px solid rgba(255,255,255,.1)' }}>Product Name</th>
                                    <th style={{ color: '#f1f5f9', borderBottom: '1px solid rgba(255,255,255,.1)' }}>Location ID</th>
                                    <th style={{ color: '#f1f5f9', borderBottom: '1px solid rgba(255,255,255,.1)' }}>Quantity On Hand</th>
                                    <th style={{ color: '#f1f5f9', borderBottom: '1px solid rgba(255,255,255,.1)' }}>Safety Stock</th>
                                    <th style={{ color: '#f1f5f9', borderBottom: '1px solid rgba(255,255,255,.1)' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventoryArr.length > 0 ? (
                                    inventoryArr.map((inv) => (
                                        <tr key={inv.inventoryId} style={{ borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                                            <td className="fw-semibold" style={{ color: '#e2e8f0' }}>#{inv.inventoryId}</td>
                                            <td style={{ color: '#e2e8f0' }}>{inv.productName || "N/A"}</td>
                                            <td style={{ color: '#e2e8f0' }}>{inv.locationId}</td>
                                            <td className="fw-bold" style={{ color: '#f87171' }}>{inv.quantityOnHand}</td>
                                            <td style={{ color: '#94a3b8' }}>{inv.safetyStock}</td>
                                            <td>
                                                <span className={`badge ${
                                                    inv.status === "IN_STOCK"     ? "bg-success"           :
                                                    inv.status === "LOW_STOCK"    ? "bg-warning text-dark" :
                                                    inv.status === "OUT_OF_STOCK" ? "bg-danger"            :
                                                    inv.status === "DISCONTINUED" ? "bg-dark"              :
                                                    "bg-secondary"
                                                }`}>
                                                    {inv.status || "Low Stock"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ color: '#94a3b8' }} className="py-4">
                                            🎉 High-five! No low stock exceptions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}