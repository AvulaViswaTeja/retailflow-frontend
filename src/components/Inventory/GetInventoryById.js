import { useState } from "react";
import axios from "axios";

export default function GetInventoryById() {
  const [inventoryId, setInventoryId] = useState("");
  const [inventory, setInventory] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // Controls empty state visibility
  let token = localStorage.getItem("token");

  const fetchInventory = (e) => {
    if (e && e.preventDefault) e.preventDefault(); // Safely intercepts traditional page refresh
    if (!inventoryId) return;

    let url = "http://localhost:1405/api/inventory/" + inventoryId;
    axios.get(url, {
        headers: { "Authorization": "Bearer " + token }
    })
      .then((response) => {
        setInventory(response.data); // Store single inventory record
        setHasSearched(true);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
        setInventory(null); // Clear out outdated record state on failure
        setHasSearched(true);
        alert("Inventory ID: #" + inventoryId + " not found (or network error).");
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '850px' }}>
      {/* Search Input Filter Panel */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-dark text-white p-3">
          <h3 className="mb-0 h5">Find Inventory Record by ID</h3>
        </div>
        <div className="card-body p-4">
          <form onSubmit={fetchInventory}>
            <div className="row g-3 align-items-end">
              <div className="col-md-8">
                <label className="form-label fw-semibold">Inventory ID</label>
                <input
                  type="number" // Restricts input to valid digits matching backend data structure
                  className="form-control"
                  placeholder="Enter exact Inventory ID (e.g., 2001)"
                  value={inventoryId}
                  onChange={(e) => setInventoryId(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={!inventoryId}
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
                  {inventory ? (
                    <tr>
                      <td className="fw-semibold">#{inventory.inventoryId}</td>
                      <td>{inventory.productId}</td>
                      <td>{inventory.locationId}</td>
                      <td className="fw-bold">{inventory.quantityOnHand}</td>
                      <td>{inventory.safetyStock}</td>
                      <td>
                        <span className={`badge ${
                          inventory.status === 'In Stock' ? 'bg-success' : 
                          inventory.status === 'Low Stock' ? 'bg-warning text-dark' : 'bg-danger'
                        }`}>
                          {inventory.status || 'Unknown'}
                        </span>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-muted py-4">
                        No inventory record matching ID: <strong>#{inventoryId}</strong>.
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