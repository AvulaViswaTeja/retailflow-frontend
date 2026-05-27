import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Optional: to redirect back to inventory list

export default function AddInventory() {
    let [productId, setProductId] = useState("");
    let [locationId, setLocationId] = useState("");
    let [quantityOnHand, setQuantityOnHand] = useState("");
    let [safetyStock, setSafetyStock] = useState("");
    let [status, setStatus] = useState("In Stock"); // Sensible default configuration
    
    let token = localStorage.getItem("token");
    const navigate = useNavigate();

    let submitHandler = (e) => {
        e.preventDefault(); // Intercepts page reload and enforces native form validation
        
        let url = "http://localhost:1405/api/inventory";
        let inventory = {
            "productId": productId,
            "locationId": locationId,
            "quantityOnHand": parseInt(quantityOnHand), // Convert to number for integer fields
            "safetyStock": parseInt(safetyStock),       // Convert to number for integer fields
            "status": status
        };

        axios.post(url, inventory, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            alert("Inventory Added Successfully!");
            // Reset input form states
            setProductId("");
            setLocationId("");
            setQuantityOnHand("");
            setSafetyStock("");
            setStatus("In Stock");
        })
        .catch((error) => {
            console.error("Error adding inventory details:", error);
            alert("Error adding inventory: " + (error.response?.data?.message || error.message));
        }); 
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '650px' }}>
            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white p-3">
                    <h3 className="mb-0 h5">Add New Inventory Record</h3>
                </div>

                <div className="card-body p-4">
                    <form onSubmit={submitHandler}>
                        <div className="row g-3">
                            
                            {/* Product ID */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Product ID</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Enter Product ID" 
                                    value={productId} 
                                    onChange={(e) => setProductId(e.target.value)} 
                                    required 
                                />
                            </div>

                            {/* Location ID */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Location ID</label>
                                <input 
                                    type="text" 
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

                            {/* Status Select Menu */}
                            <div className="col-12">
                                <label className="form-label fw-semibold">Status</label>
                                <select 
                                    className="form-select" 
                                    value={status} 
                                    onChange={(e) => setStatus(e.target.value)} 
                                    required
                                >
                                    <option value="In Stock">In Stock</option>
                                    <option value="Low Stock">Low Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
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