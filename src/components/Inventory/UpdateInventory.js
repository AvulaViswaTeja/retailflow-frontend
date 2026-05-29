import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateInventory() {
  let { inventoryId } = useParams();

  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  let [productId, setProductId] = useState("");
  let [productName, setProductName] = useState("");
  let [locationId, setLocationId] = useState("");
  let [quantityOnHand, setQuantityOnHand] = useState(0);
  let [safetyStock, setSafetyStock] = useState(0);
  let [status, setStatus] = useState("");

  let [errorMsg, setErrorMsg] = useState("");
  let [successMsg, setSuccessMsg] = useState("");

  let quantityHandler = (event) => setQuantityOnHand(event.target.value);
  let safetyHandler   = (event) => setSafetyStock(event.target.value);
  let statusHandler   = (event) => setStatus(event.target.value);

  let submitHandler = (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

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
        setSuccessMsg("Inventory updated successfully!");
        setTimeout(() => navigate('/Inventory/getAll'), 1500);
      })
      .catch((error) => {
        setErrorMsg(error.response?.data?.message || "Failed to update inventory. Please try again.");
      });
  };

  useEffect(() => {
    let url = "http://localhost:1405/api/inventory/" + inventoryId;
    axios.get(url, {
      headers: { "Authorization": "Bearer " + token }
    })
      .then((response) => {
        setProductId(response.data.productId);
        setProductName(response.data.productName);
        setLocationId(response.data.locationId);
        setQuantityOnHand(response.data.quantityOnHand);
        setSafetyStock(response.data.safetyStock);
        setStatus(response.data.status);
      })
      .catch((err) => {
        setErrorMsg("Error fetching inventory details: " + err.message);
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

              {/* Read-Only Fields */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Product Name</label>
                <input
                  type="text"
                  className="form-control bg-light text-muted"
                  value={productName}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Location ID</label>
                <input
                  type="text"
                  className="form-control bg-light text-muted"
                  value={locationId}
                  readOnly
                />
              </div>

              {/* Editable Fields */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">Quantity On Hand</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantityOnHand}
                  onChange={quantityHandler}
                  min="0"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Safety Stock</label>
                <input
                  type="number"
                  className="form-control"
                  value={safetyStock}
                  onChange={safetyHandler}
                  min="0"
                  required
                />
              </div>

              {/* Status */}
              <div className="col-12">
                <label className="form-label fw-semibold">Status</label>
                <select className="form-select" value={status} onChange={statusHandler} required>
                  <option value="">Select Status</option>
                  <option value="IN_STOCK">In Stock</option>
                  <option value="LOW_STOCK">Low Stock</option>
                  <option value="OUT_OF_STOCK">Out of Stock</option>
                  <option value="DISCONTINUED">Discontinued</option>
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