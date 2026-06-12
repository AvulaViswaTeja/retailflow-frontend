import { useState } from "react";
import axios from "axios";

export default function ReplenishStock() {
    const [inventoryId, setInventoryId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [updatedInventory, setUpdatedInventory] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    let token = localStorage.getItem("token");

    const replenishHandler = (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");
        setUpdatedInventory(null);

        let url = `http://localhost:8070/api/inventory/${inventoryId}/replenish?quantity=${quantity}`;

        axios.patch(url, null, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            setSuccessMsg("Stock replenished successfully!");
            setUpdatedInventory(response.data);
            setTimeout(() => setSuccessMsg(""), 3000);
        })
        .catch((error) => {
            setErrorMsg(error.response?.data?.message || "Failed to replenish stock. Please try again.");
        });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '750px' }}>

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

            <div className="card shadow-sm mb-4">
                <div className="card-header bg-dark text-white p-3">
                    <h3 className="mb-0 h5">Replenish Inventory Stock</h3>
                </div>

                <div className="card-body p-4">
                    <form onSubmit={replenishHandler}>
                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Inventory ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Target Inventory ID"
                                    value={inventoryId}
                                    onChange={(e) => setInventoryId(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Quantity to Add</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter amount to add"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="col-12 mt-4 d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary px-4">
                                    Confirm Replenish
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

            {updatedInventory && (
                <div className="card shadow-sm border-success">
                    <div className="card-header bg-success text-white p-3">
                        <h4 className="mb-0 h6 fw-bold">✓ Inventory Updated Successfully</h4>
                    </div>
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle mb-0 text-center">
                                <thead className="table-light">
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
                                    <tr>
                                        <td className="fw-semibold">#{updatedInventory.inventoryId}</td>
                                        <td>{updatedInventory.productName || "N/A"}</td>
                                        <td>{updatedInventory.locationId}</td>
                                        <td className="fw-bold text-success">{updatedInventory.quantityOnHand}</td>
                                        <td>{updatedInventory.safetyStock}</td>
                                        <td>
                                            <span className={`badge ${
                                                updatedInventory.status === "IN_STOCK"     ? "bg-success"           :
                                                updatedInventory.status === "LOW_STOCK"    ? "bg-warning text-dark" :
                                                updatedInventory.status === "OUT_OF_STOCK" ? "bg-danger"            :
                                                updatedInventory.status === "DISCONTINUED" ? "bg-dark"              :
                                                "bg-secondary"
                                            }`}>
                                                {updatedInventory.status}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
