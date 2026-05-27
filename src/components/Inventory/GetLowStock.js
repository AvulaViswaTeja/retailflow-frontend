import { useState, useEffect } from "react"; // Added useEffect
import axios from "axios";

export default function GetLowStock() {
  let [inventoryArr, setInventoryArr] = useState([]);
  let token = localStorage.getItem("token");

  const fetchLowStock = () => {
    let url = "http://localhost:1405/api/inventory/low-stock";
    axios.get(url, {
        headers: { "Authorization": "Bearer " + token }
    })
      .then((response) => {
        setInventoryArr(response.data);
      })
      .catch((error) => {
        console.error("Error fetching low stock inventory:", error);
        alert("Failed to pull low-stock alerts: " + (error.response?.data?.message || error.message));
      });
  };

  // Automatically fetch critical low stock items when the page loads
  useEffect(() => {
    fetchLowStock();
  }, []);

  return (
    <div className="container mt-5">
      {/* Top Header & Interactive Dashboard Control */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-danger fw-bold mb-1">⚠️ Low Stock Alerts</h2>
          <small className="text-muted">Real-time items currently sitting below safety thresholds</small>
        </div>
        <button className="btn btn-outline-danger px-4 shadow-sm" onClick={fetchLowStock}>
          🔄 Refresh List
        </button>
      </div>

      {/* Main Alerts Table Frame */}
      <div className="card shadow-sm border-danger-subtle">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0 text-center">
              <thead className="table-danger text-dark">
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
                      <td className="fw-bold text-danger">{inv.quantityOnHand}</td>
                      <td className="text-muted">{inv.safetyStock}</td>
                      <td>
                        <span className="badge bg-danger px-2 py-1">
                          {inv.status || 'Low Stock'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-muted py-4">
                      🎉 High-five! No low stock exceptions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}