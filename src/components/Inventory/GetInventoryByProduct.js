import { useState } from "react";
import axios from "axios";

export default function GetInventoryByProduct() {
  const [productId, setProductId] = useState("");
  const [inventoryArr, setInventoryArr] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // Controls empty state visibility
  let token = localStorage.getItem("token");

  const fetchInventory = (e) => {
    if (e && e.preventDefault) e.preventDefault(); // Intercepts page refresh from form submission
    if (!productId) return;

    let url = "http://localhost:1405/api/inventory/product/" + productId;
    axios.get(url, {
        headers: { "Authorization": "Bearer " + token }
    })
      .then((response) => {
        setInventoryArr(response.data); // Store array of inventory records
        setHasSearched(true);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
        setInventoryArr([]); // Clear layout out on failure
        setHasSearched(true);
        alert("Error pulling product records: " + (error.response?.data?.message || error.message));
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '850px' }}>
      {/* Search Input Filter Panel */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white p-3">
          <h3 className="mb-0 h5">Find Inventory by Product ID</h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={fetchInventory}>
            <div className="row g-3 align-items-end">
              <div className="col-md-8">
                <label className="form-label fw-semibold">Product ID</label>
                <input
                  type="number" // Restricts input to valid digits matching database schemas
                  className="form-control"
                  placeholder="Enter exact Product ID (e.g., 3001)"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={!productId}
                >
                  🔍 Locate Inventory
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Conditional Output Container Grid */}
      {hasSearched && (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0 text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Inventory ID</th>
                    <th>Product ID</th>
                    <th>Location ID</th>
                    <th>Quantity On Hand</th>
                    <th>Safety Stock</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryArr.length > 0 ? (
                    inventoryArr.map((inv) => (
                      <tr key={inv.inventoryId}>
                        <td className="fw-semibold">#{inv.inventoryId}</td>
                        <td>{inv.productId}</td>
                        <td>{inv.locationId}</td>
                        <td className="fw-bold">{inv.quantityOnHand}</td>
                        <td>{inv.safetyStock}</td>
                        <td>
                          <span className={`badge ${
                            inv.status === 'In Stock' ? 'bg-success' : 
                            inv.status === 'Low Stock' ? 'bg-warning text-dark' : 'bg-danger'
                          }`}>
                            {inv.status || 'Unknown'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-muted py-4">
                        No active stock allocations recorded for Product ID: <strong>#{productId}</strong>.
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