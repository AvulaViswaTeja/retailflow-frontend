import { useState, useEffect } from "react";
import axios from "axios";

export default function GetLowStock() {
    let [inventoryArr, setInventoryArr] = useState([]);
    let [errorMsg, setErrorMsg] = useState("");
    let token = localStorage.getItem("token");

    const fetchLowStock = () => {
        setErrorMsg("");
        let url = "http://localhost:1405/api/inventory/low-stock";
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

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="text-danger fw-bold mb-1">⚠️ Low Stock Alerts</h2>
                    <small className="text-muted">Real-time items currently sitting below safety thresholds</small>
                </div>
                <button className="btn btn-outline-danger px-4 shadow-sm" onClick={fetchLowStock}>
                    🔄 Refresh List
                </button>
            </div>

            <div className="card shadow-sm border-danger-subtle">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle mb-0 text-center">
                            <thead className="table-danger text-dark">
                                <tr>
                                    <th>Inventory ID</th>
                                    <th>Product Name</th>
                                    <th>Location ID</th>
                                    <th>Quantity On Hand</th>
                                    <th>Safety Stock</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventoryArr.length > 0 ? (
                                    inventoryArr.map((inv) => (
                                        <tr key={inv.inventoryId}>
                                            <td className="fw-semibold">#{inv.inventoryId}</td>
                                            <td>{inv.productName || "N/A"}</td>
                                            <td>{inv.locationId}</td>
                                            <td className="fw-bold text-danger">{inv.quantityOnHand}</td>
                                            <td className="text-muted">{inv.safetyStock}</td>
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
                                        <td colSpan="6" className="text-muted py-4">
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
