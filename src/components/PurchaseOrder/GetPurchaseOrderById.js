import { useState } from "react";
import axios from "axios";

export default function GetPurchaseOrderById() {
  const [poId, setPoId] = useState("");
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // Manages dynamic placeholder visibility
  const token = localStorage.getItem("token");

  const fetchPurchaseOrder = (e) => {
    if (e && e.preventDefault) e.preventDefault(); // Safely intercept form submission
    if (!poId) return;

    let url = "http://localhost:1405/api/purchase-orders/" + poId;
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setPurchaseOrder(response.data); // Store single purchase order record
        setHasSearched(true);
      })
      .catch((error) => {
        console.error("Error fetching purchase order:", error);
        setPurchaseOrder(null); // Clear previous result state on error
        setHasSearched(true);
        alert("Could not locate Order ID: #" + poId + " (or unauthorized Access)");
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '850px' }}>
      {/* Target Lookup Card Container */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white p-3">
          <h3 className="mb-0 h5">Find Purchase Order by ID</h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={fetchPurchaseOrder}>
            <div className="row g-3 align-items-end">
              <div className="col-md-8">
                <label className="form-label fw-semibold">Purchase Order ID</label>
                <input
                  type="number" // Enforces numeric integer entry matching database schemas
                  className="form-control"
                  placeholder="Enter exact Order ID (e.g., 5001)"
                  value={poId}
                  onChange={(e) => setPoId(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={!poId}
                >
                  🔍 Locate Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Conditional Output Record Panel */}
      {hasSearched && (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0 text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Purchase Order ID</th>
                    <th>Supplier ID</th>
                    <th>Order Date</th>
                    <th>Expected Delivery Date</th>
                    <th>Status</th>
                    <th>Product ID</th>
                    <th>Product Name</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrder ? (
                    <tr>
                      <td className="fw-semibold">#{purchaseOrder.purchaseOrderId}</td>
                      <td>{purchaseOrder.supplierId}</td>
                      <td>{purchaseOrder.orderDate}</td>
                      <td>{purchaseOrder.expectedDeliveryDate}</td>
                      <td>
                        <span className={`badge ${
                          purchaseOrder.status === 'Completed' ? 'bg-success' : 
                          purchaseOrder.status === 'Pending' ? 'bg-warning text-dark' : 'bg-secondary'
                        }`}>
                          {purchaseOrder.status}
                        </span>
                      </td>
                      <td>{purchaseOrder.productId}</td>
                      <td>{purchaseOrder.productName}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-muted py-4">
                        No purchase order record matches ID: <strong>#{poId}</strong>.
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