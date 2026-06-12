import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddInventory() {
    let [productId, setProductId] = useState("");
    let [products, setProducts] = useState([]);
    let [locationId, setLocationId] = useState("");
    let [quantityOnHand, setQuantityOnHand] = useState("");
    let [safetyStock, setSafetyStock] = useState("");
    let [status, setStatus] = useState("IN_STOCK");
    let [errorMsg, setErrorMsg] = useState("");
    let [successMsg, setSuccessMsg] = useState("");

    let token = localStorage.getItem("token");
    const navigate = useNavigate();

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

    let submitHandler = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        let url = "http://localhost:8070/api/inventory";
        let inventory = {
            "productId": productId,
            "locationId": locationId,
            "quantityOnHand": parseInt(quantityOnHand),
            "safetyStock": parseInt(safetyStock),
            "status": status
        };

        axios.post(url, inventory, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            setSuccessMsg("Inventory Added Successfully!");
            setProductId("");
            setLocationId("");
            setQuantityOnHand("");
            setSafetyStock("");
            setStatus("IN_STOCK");
            setTimeout(() => setSuccessMsg(""), 3000);
        })
        .catch((error) => {
            setErrorMsg(error.response?.data?.message || "Error adding inventory. Please try again.");
        });
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '650px' }}>

            {errorMsg && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {errorMsg}
                    <button type="button" className="btn-close" onClick={() => setErrorMsg("")}></button>
                </div>
            )}

            {successMsg && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMsg}
                    <button type="button" className="btn-close" onClick={() => setSuccessMsg("")}></button>
                </div>
            )}

            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white p-3">
                    <h3 className="mb-0 h5">Add New Inventory Record</h3>
                </div>

                <div className="card-body p-4">
                    <form onSubmit={submitHandler}>
                        <div className="row g-3">

                            {/* Product Name Dropdown */}
                            <div className="col-md-6">
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

                            {/* Location ID */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Location ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Location ID"
                                    value={locationId}
                                    onChange={(e) => setLocationId(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Quantity On Hand */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Quantity On Hand</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="0"
                                    min="0"
                                    value={quantityOnHand}
                                    onChange={(e) => setQuantityOnHand(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Safety Stock */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Safety Stock</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="0"
                                    min="0"
                                    value={safetyStock}
                                    onChange={(e) => setSafetyStock(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Status */}
                            <div className="col-12">
                                <label className="form-label fw-semibold">Status</label>
                                <select
                                    className="form-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value="IN_STOCK">In Stock</option>
                                    <option value="LOW_STOCK">Low Stock</option>
                                    <option value="OUT_OF_STOCK">Out of Stock</option>
                                    <option value="DISCONTINUED">Discontinued</option>
                                </select>
                            </div>

                            {/* Actions */}
                            <div className="col-12 mt-4 d-flex gap-2 justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary px-4"
                                >
                                    Add Inventory
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
