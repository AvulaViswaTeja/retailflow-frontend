import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GetInventoryByProduct() {
    const navigate = useNavigate();
    const [productId, setProductId] = useState("");
    const [products, setProducts] = useState([]);
    const [inventoryArr, setInventoryArr] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    let token = localStorage.getItem("token");

    // Fetch all products for dropdown
    useEffect(() => {
        axios.get("http://localhost:8070/api/products", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setProducts(res.data);
        })
        .catch((err) => {
            setErrorMsg("Error fetching products: " + err.message);
        });
    }, []);

    const fetchInventory = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!productId) return;

        setErrorMsg("");
        setHasSearched(false);

        let url = "http://localhost:8070/api/inventory/product/" + productId;
        axios.get(url, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            setInventoryArr(response.data);
            setHasSearched(true);
        })
        .catch((error) => {
            setInventoryArr([]);
            setHasSearched(true);
            setErrorMsg(error.response?.data?.message || "Error fetching inventory. Please try again.");
        });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '850px' }}>

            {errorMsg && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {errorMsg}
                    <button type="button" className="btn-close" onClick={() => setErrorMsg("")}></button>
                </div>
            )}
            {/*  Back button */}
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
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-dark text-white p-3">
                    <h3 className="mb-0 h5">Find Inventory by Product</h3>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={fetchInventory}>
                        <div className="row g-3 align-items-end">
                            <div className="col-md-8">
                                <label className="form-label fw-semibold">Product Name</label>
                                <select
                                    className="form-select"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                    required
                                >
                                    <option value="">Select Product</option>
                                    {products.map((product) => (
                                        <option key={product.productId} value={product.productId}>
                                            {product.productName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={!productId}
                                >
                                    🔍 Locate Inventory
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {hasSearched && (
                <div className="card shadow-sm">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle mb-0 text-center">
                                <thead className="table-dark">
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
                                                <td className="fw-bold">{inv.quantityOnHand}</td>
                                                <td>{inv.safetyStock}</td>
                                                <td>
                                                    <span className={`badge ${
                                                        inv.status === "IN_STOCK"     ? "bg-success"           :
                                                        inv.status === "LOW_STOCK"    ? "bg-warning text-dark" :
                                                        inv.status === "OUT_OF_STOCK" ? "bg-danger"            :
                                                        inv.status === "DISCONTINUED" ? "bg-dark"              :
                                                        "bg-secondary"
                                                    }`}>
                                                        {inv.status || "Unknown"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-muted py-4">
                                                No inventory records found for selected product.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
