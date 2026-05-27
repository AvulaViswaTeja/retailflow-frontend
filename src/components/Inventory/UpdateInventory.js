import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateInventory() {
  let { inventoryId } = useParams();
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  // State variables for inventory fields
  let [productId, setProductId] = useState("");
  let [locationId, setLocationId] = useState("");
  let [quantityOnHand, setQuantityOnHand] = useState(0);
  let [safetyStock, setSafetyStock] = useState(0);
  let [status, setStatus] = useState("");

  // Handlers
  let productHandler = (event) => setProductId(event.target.value);
  let locationHandler = (event) => setLocationId(event.target.value);
  let quantityHandler = (event) => setQuantityOnHand(event.target.value);
  let safetyHandler = (event) => setSafetyStock(event.target.value);
  let statusHandler = (event) => setStatus(event.target.value);

  // Form submit handler
  let submitHandler = (event) => {
    event.preventDefault(); // Prevents standard page reload

    let url = "http://localhost:1405/api/inventory/" + inventoryId;
    let inventory = {
      productId: productId,
      locationId: locationId,
      quantityOnHand: parseInt(quantityOnHand),
      safetyStock: parseInt(safetyStock),
      status: status,
    };

    axios.put(url, inventory, {
      headers: { "Authorization": "Bearer " + token }
    })
      .then((response) => {
        alert("Inventory Updated successfully!");
        navigate('/Inventory/getAll'); // Redirect after successful update
      })
      .catch((error) => {
        console.error("Error Updating:", error);
        alert("Failed to update inventory details.");
      });
  };

  // Load existing inventory by ID
  useEffect(() => {
    let url = "http://localhost:1405/api/inventory/" + inventoryId;
    axios.get(url, {
      headers: { "Authorization": "Bearer " + token }
    })
      .then((response) => {
        setProductId(response.data.productId);
        setLocationId(response.data.locationId);
        setQuantityOnHand(response.data.quantityOnHand);
        setSafetyStock(response.data.safetyStock);
        setStatus(response.data.status);
      })
      .catch((err) => {
        alert("Error fetching data: " + err.message);
      });
  }, [inventoryId]);

  return (
    <div className="container mt-5" style={{ maxWidth: '650px' }}>
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white p-3">
          <h3 className="mb-0 h5">Update Inventory</h3>
          <small className="text-white-50">Updating Inventory ID: #{inventoryId}</small>
        </div>

        <div className="card-body p-4">
          <form onSubmit={submitHandler}>
            <div className="row g-3">
              
              {/* Product and Location Identifiers */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Product ID</label>
                <input type="text" className="form-control" value={productId} onChange={productHandler} required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Location ID</label>
                <input type="text" className="form-control" value={locationId} onChange={locationHandler} required />
              </div>

              {/* Quantities */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Quantity On Hand</label>
                <input type="number" className="form-control" value={quantityOnHand} onChange={quantityHandler} min="0" required />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Safety Stock</label>
                <input type="number" className="form-control" value={safetyStock} onChange={safetyHandler} min="0" required />
              </div>

              {/* Inventory Status */}
              <div className="col-12">
                <label className="form-label fw-semibold">Status</label>
                <select className="form-select" value={status} onChange={statusHandler} required>
                  <option value="" >Select Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Discontinued">Discontinued</option>
                </select>
              </div>

              {/* Actions */}
              <div className="col-12 mt-4 d-flex gap-2 justify-content-end">
                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/Inventory/getAll')}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary px-4">
                  Update Inventory
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}