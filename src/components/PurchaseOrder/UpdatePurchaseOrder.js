import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdatePurchaseOrder() {
  let { purchaseOrderId } = useParams();
  let navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Read-only states
  let [productId, setProductId] = useState("");
  let [productName, setProductName] = useState("");
  let [supplierId, setSupplierId] = useState("");
  let [orderDate, setOrderDate] = useState("");

  // Editable states
  let [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  let [status, setStatus] = useState("");

  // Error/Success states
  let [errorMsg, setErrorMsg] = useState("");
  let [successMsg, setSuccessMsg] = useState("");

  // Handlers (only editable fields)
  let expectedDeliveryHandler = (event) => setExpectedDeliveryDate(event.target.value);
  let statusHandler = (event) => setStatus(event.target.value);

  // Submit handler
  let submitHandler = (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    let url = `http://localhost:8070/api/purchase-orders/${purchaseOrderId}`;
    let purchaseorder = {
      purchaseOrderId: parseInt(purchaseOrderId),
      productId: parseInt(productId),
      supplierId: parseInt(supplierId),
      orderDate: orderDate,
      expectedDeliveryDate: expectedDeliveryDate,
      status: status,
    };

    axios.put(url, purchaseorder, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((response) => {
        setSuccessMsg("Purchase Order updated successfully!");
        setTimeout(() => navigate('/PurchaseOrder/getAll'), 1500);
      })
      .catch((error) => {
        setErrorMsg(error.response?.data?.message || "Failed to update purchase order. Please try again.");
      });
  };

  // Load existing purchase order
  useEffect(() => {
    let url = `http://localhost:8070/api/purchase-orders/${purchaseOrderId}`;
    axios.get(url, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then((response) => {
       
        setProductName(response.data.productName);
        setSupplierId(response.data.supplierId);
        setOrderDate(response.data.orderDate);
        setExpectedDeliveryDate(response.data.expectedDeliveryDate);
        setStatus(response.data.status);
      })
      .catch((err) => {
        setErrorMsg("Error fetching purchase order: " + err.message);
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

          <form onSubmit={submitHandler}>
            <div className="row g-3">

            
              <div className="col-md-8">
                <label className="form-label fw-semibold">Product Name</label>
                <input
                  type="text"
                  className="form-control bg-light text-muted"
                  value={productName}
                  readOnly
                />
              </div>

              {/* Read-Only: Order Date */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Order Date</label>
                <input
                  type="text"
                  className="form-control bg-light text-muted"
                  value={orderDate}
                  readOnly
                />
              </div>

              {/* Read-Only: Supplier ID */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Supplier ID</label>
                <input
                  type="text"
                  className="form-control bg-light text-muted"
                  value={supplierId}
                  readOnly
                />
              </div>

              {/* Editable: Expected Delivery Date */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Expected Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={expectedDeliveryDate}
                  onChange={expectedDeliveryHandler}
                  required
                />
              </div>

              {/* Editable: Status */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Status</label>
                <select className="form-select" value={status} onChange={statusHandler} required>
                  <option value="">Select Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              {/* Actions */}
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