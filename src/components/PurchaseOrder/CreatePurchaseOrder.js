import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Optional: for redirecting after save

export default function CreatePurchaseOrder() {
    let [supplierId, setSupplierId] = useState("");
    let [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
    let [status, setStatus] = useState("Pending"); // Set a sensible default value
    let [productId, setProductId] = useState("");
    
    const token = localStorage.getItem("token");
    const navigate = useNavigate(); 

    let supplierIdHandler = (e) => setSupplierId(e.target.value);
    let expectedDeliveryDateHandler = (e) => setExpectedDeliveryDate(e.target.value);
    let statusHandler = (e) => setStatus(e.target.value);
    let productIdHandler = (e) => setProductId(e.target.value);

    let submitHandler = (e) => {
        e.preventDefault(); // This safely intercept form submission
        
        let url = "http://localhost:1405/api/purchase-orders";
        let purchaseorder = {
            "supplierId": parseInt(supplierId), // Parse into an integer if needed by your API
            "expectedDeliveryDate": expectedDeliveryDate,
            "status": status,
            "productId": parseInt(productId)   // Parse into an integer if needed by your API
        };

        axios.post(url, purchaseorder, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            alert("Purchase Order Created Successfully!");
            // Optionally clear out form inputs or redirect user:
            setSupplierId("");
            setExpectedDeliveryDate("");
            setStatus("Pending");
            setProductId("");
        })
        .catch((error) => {
            console.error("Error creating purchase order:", error);
            alert("Failed to create order: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '650px' }}>
            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white p-3">
                    <h3 className="mb-0 h5">Create New Purchase Order</h3>
                </div>
                
                <div className="card-body p-4">
                    <form onSubmit={submitHandler}>
                        <div className="row g-3">
                            
                            {/* Product ID */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Product ID</label>
                                <input 
                                    className="form-control" 
                                    type="number" 
                                    placeholder="Enter Product ID" 
                                    value={productId} 
                                    onChange={productIdHandler} 
                                    required 
                                />
                            </div>

                            {/* Supplier ID */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Supplier ID</label>
                                <input 
                                    className="form-control" 
                                    type="number" 
                                    placeholder="Enter Supplier ID" 
                                    value={supplierId} 
                                    onChange={supplierIdHandler} 
                                    required 
                                />
                            </div>

                            {/* Expected Delivery Date */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Expected Delivery Date</label>
                                <input 
                                    className="form-control" 
                                    type="date" 
                                    value={expectedDeliveryDate} 
                                    onChange={expectedDeliveryDateHandler} 
                                    required 
                                />
                            </div>

                            {/* Status Select Dropdown */}
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Status</label>
                                <select 
                                    className="form-select" 
                                    value={status} 
                                    onChange={statusHandler} 
                                    required
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            {/* Form Actions */}
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
                                    Save Order
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}