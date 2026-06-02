import axios from 'axios';
import {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Optional: for redirecting after save

export default function CreatePurchaseOrder() {
    let [supplierId, setSupplierId] = useState("");
    let [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
    let [status, setStatus] = useState("Pending"); // Set a sensible default value
    let [productId, setProductId] = useState("");
    let [errorMsg, setErrorMsg] = useState("");
    let [successMsg, setSuccessMsg] = useState("");
    let [products, setProducts] = useState([]); 
    const token = localStorage.getItem("token");
    const navigate = useNavigate(); 
    
    let supplierIdHandler = (e) => setSupplierId(e.target.value);
    let expectedDeliveryDateHandler = (e) => setExpectedDeliveryDate(e.target.value);
    let statusHandler = (e) => setStatus(e.target.value);
    let productIdHandler = (e) => setProductId(e.target.value);
    
    
    useEffect(() => {
            axios.get("http://localhost:1405/api/products", {
                headers: { "Authorization": "Bearer " + token }
            })
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                alert("Error fetching products: " + err.message);
            });
        }, []);
    let submitHandler = (e) => {
        e.preventDefault(); // This safely intercept form submission
        setErrorMsg("");    
        setSuccessMsg("");
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
            setSuccessMsg("Purchase Order Created Successfully!");
            // Optionally clear out form inputs or redirect user:
            setSupplierId("");
            setExpectedDeliveryDate("");
            setStatus("Pending");
            setProductId("");
            setTimeout(() => setSuccessMsg(""), 3000);
        })
        .catch((error) => {
            console.error("Error creating purchase order:", error);
            setErrorMsg("Failed to create order: " + (error.response?.data?.message || error.message));
        });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '650px' }}>
             {/* Error Message */}
          {errorMsg && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {errorMsg}
              <button type="button" className="btn-close" onClick={() => setErrorMsg("")}></button>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="alert alert-success fade show" role="alert">
              {successMsg}
            </div>
          )}
            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white p-3">
                    <h3 className="mb-0 h5">Create New Purchase Order</h3>
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

                            <div className="col-md-6">
                                <label className="form-label fw-semibold">Status</label>
                                <input
                                    type="text"
                                    className="form-control bg-light text-muted"
                                    value="PENDING"
                                    readOnly
                                />
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

