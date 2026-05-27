import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdatePurchaseOrder() {
  let { purchaseOrderId } = useParams();
  let navigate = useNavigate();
  const token = localStorage.getItem("token");

  // State variables for all fields
  let [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  let [orderDate, setOrderDate] = useState("");
  let [productId, setProductId] = useState("");
  let [productName, setProductName] = useState("");
  let [status, setStatus] = useState("");
  let [supplierId, setSupplierId] = useState("");

  // Handlers
  let expectedDeliveryHandler = (event) => setExpectedDeliveryDate(event.target.value);
  let orderDateHandler = (event) => setOrderDate(event.target.value);
  let productIdHandler = (event) => setProductId(event.target.value);
  let productNameHandler = (event) => setProductName(event.target.value);
  let statusHandler = (event) => setStatus(event.target.value);
  let supplierHandler = (event) => setSupplierId(event.target.value);

  // Update form submit handler
  let submitHandler = (event) => {
    event.preventDefault(); // Prevents page reload

    let url = `http://localhost:8014/api/purchase-orders/${purchaseOrderId}`;
    let purchaseorder = {
      expectedDeliveryDate: expectedDeliveryDate,
      orderDate: orderDate,
      productId: parseInt(productId),
      productName: productName,
      purchaseOrderId: parseInt(purchaseOrderId),
      status: status,
      supplierId: parseInt(supplierId),
    };

    console.log("Sending update:", purchaseorder);

    axios.put(url, purchaseorder, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        alert("Updated Purchase Order successfully!");
        navigate('/PurchaseOrder/getAll'); // Redirect after successful update
      })
      .catch((error) => {
        console.error("Error Updating:", error);
        alert("Failed to update: " + (error.response?.data?.message || error.message));
      });
  };

  // Load existing purchase order by ID
  useEffect(() => {
    let url = `http://localhost:1405/api/purchase-orders/${purchaseOrderId}`;
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setExpectedDeliveryDate(response.data.expectedDeliveryDate);
        setOrderDate(response.data.orderDate);
        setProductId(response.data.productId);
        setProductName(response.data.productName);
        setStatus(response.data.status);
        setSupplierId(response.data.supplierId);
      })
      .catch((err) => {
        alert("Error fetching purchase order: " + err.message);
      });
  }, [purchaseOrderId]);

  return (
    <div className="container mt-5" style={{ maxWidth: '700px' }}>
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white p-3">
          <h3 className="mb-0 h5">Edit Purchase Order</h3>
          <small className="text-white-50">Editing ID: #{purchaseOrderId}</small>
        </div>
        
        <div className="card-body p-4">
          <form onSubmit={submitHandler}>
            <div className="row g-3">
              
              {/* Product Information Group */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">Product ID</label>
                <input type="number" className="form-control" value={productId} onChange={productIdHandler} required />
              </div>
              
              <div className="col-md-8">
                <label className="form-label fw-semibold">Product Name</label>
                <input type="text" className="form-control" value={productName} onChange={productNameHandler} required />
              </div>

              {/* Dates Group */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Order Date</label>
                <input type="date" className="form-control" value={orderDate} onChange={orderDateHandler} required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Expected Delivery Date</label>
                <input type="date" className="form-control" value={expectedDeliveryDate} onChange={expectedDeliveryHandler} required />
              </div>

              {/* Metadata Group */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Supplier ID</label>
                <input type="number" className="form-control" value={supplierId} onChange={supplierHandler} required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Status</label>
                <select className="form-select" value={status} onChange={statusHandler} required>
                  <option value="" disabled>Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="col-12 mt-4 d-flex gap-2 justify-content-end">
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/PurchaseOrder/getAll')}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4">
                  Update Purchase Order
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}