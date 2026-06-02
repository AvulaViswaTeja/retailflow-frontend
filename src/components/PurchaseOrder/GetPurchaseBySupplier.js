import { useState } from "react";
import axios from "axios";

export default function GetPurchaseOrdersBySupplier() {
  const [supplierId, setSupplierId] = useState("");
  const [poArr, setPoArr] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Manages dynamic placeholder messaging
  const token = localStorage.getItem("token");
 let [errorMsg, setErrorMsg] = useState("");
  const fetchPurchaseOrders = (e) => {
    // If handled inside an HTML form or wrapper, optionally prevent refresh
    if (e && e.preventDefault) e.preventDefault();
    if (!supplierId) return;

    let url = "http://localhost:1405/api/purchase-orders/supplier/" + supplierId;
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
        setErrorMsg("Error pulling supplier records: " + (error.response?.data?.message || error.message));
      });
  };

  return (
    <div className="container mt-5">
      {/* Search Filter input card container */}
      {errorMsg && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMsg}
          <button type="button" className="btn-close" onClick={() => setErrorMsg("")}></button>
        </div>
      )}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white p-3">
          <h3 className="mb-0 h5">Filter Purchase Orders by Supplier</h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={fetchPurchaseOrders}>
            <div className="row g-3 align-items-end">
              <div className="col-md-8">
                <label className="form-label fw-semibold">Supplier ID</label>
                <input
                  type="number" // Swapped to type number for cleaner inputs
                  className="form-control"
                  placeholder="Enter Target Supplier ID (e.g. 101)"
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={!supplierId}
                >
                  🔍 Search Orders
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Conditionally managed table results render output window */}
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
                            po.status === 'Pending' ? 'bg-warning text-dark' : 'bg-secondary'
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
                        No purchase orders tracked for Supplier ID: <strong>#{supplierId}</strong>.
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