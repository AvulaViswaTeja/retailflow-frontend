import { useState } from "react";
import axios from "axios";

export default function GetPurchaseOrdersByStatus() {
  const [status, setStatus] = useState("");
  const [poArr, setPoArr] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Helps manage the empty state visibility
  const token = localStorage.getItem("token");
   let [errorMsg, setErrorMsg] = useState("");
  const fetchPurchaseOrders = () => {
    if (!status) return;
    
    let url = "http://localhost:8070/api/purchase-orders/status/" + status;
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        setPoArr(response.data);
        setHasSearched(true);
      })
      .catch((error) => {
        console.error("Error fetching purchase orders:", error);
        setErrorMsg("Error fetching records: " + (error.response?.data?.message || error.message));
      });
  };

  return (
    <div className="container mt-5">
        {/* Error Message */}
      {errorMsg && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMsg}
          <button type="button" className="btn-close" onClick={() => setErrorMsg("")}></button>
        </div>
      )}
      {/* Search Filter Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white p-3">
          <h3 className="mb-0 h5">Filter Purchase Orders by Status</h3>
        </div>
        <div className="card-body p-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-8">
              <label className="form-label fw-semibold">Select Status Threshold</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>-- Choose a Status --</option>
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div className="col-md-4">
              <button 
                className="btn btn-primary w-100" 
                onClick={fetchPurchaseOrders}
                disabled={!status}
              >
                🔍 Show Purchase Orders
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table Card */}
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
                  {poArr.length > 0 ? (
                    poArr.map((po) => (
                      <tr key={po.purchaseOrderId}>
                        <td className="fw-semibold">#{po.purchaseOrderId}</td>
                        <td>{po.supplierId}</td>
                        <td>{po.orderDate}</td>
                        <td>{po.expectedDeliveryDate}</td>
                        <td>
                          <span className={`badge ${
                            po.status === 'Completed' ? 'bg-success' : 
                            po.status === 'Active' ? 'bg-warning text-dark' : 
                            po.status === 'CANCELLED' ? 'bg-danger' : 'bg-secondary'
                          }`}>
                            {po.status}
                          </span>
                        </td>
                        <td>{po.productId}</td>
                        <td>{po.productName}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-muted py-4">
                        No purchase orders found matching the status "{status}".
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