import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
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

  // Update button handler
  let buttonHandler = () => {
    let url = "http://localhost:1405/api/inventory/" + inventoryId;
    let inventory = {
      productId: productId,
      locationId: locationId,
      quantityOnHand: quantityOnHand,
      safetyStock: safetyStock,
      status: status,
    };

    axios.put(url, inventory, {
            headers: { "Authorization": "Bearer " + token }
        })
      .then((response) => {
        alert("Updated Inventory: " + JSON.stringify(response.data));
        navigate('/Inventory/getAll'); // Redirect after successful update
      })
      .catch((error) => {
        console.error("Error Updating:", error);
        alert("Failed to update.");
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
        alert(err.message);
      });
  }, [inventoryId]);

  return (
    <div>
      <h1>Update Inventory</h1>
      <h2>Updating Inventory ID: {inventoryId}</h2>

      <label>Product ID</label>
      <input className="form-control" value={productId} onChange={productHandler} />
      <br />

      <label>Location ID</label>
      <input className="form-control" value={locationId} onChange={locationHandler} />
      <br />

      <label>Quantity On Hand</label>
      <input className="form-control" value={quantityOnHand} onChange={quantityHandler} />
      <br />

      <label>Safety Stock</label>
      <input className="form-control" value={safetyStock} onChange={safetyHandler} />
      <br />

      <label>Status</label>
      <input className="form-control" value={status} onChange={statusHandler} />
      <br />

      <button className="btn btn-primary" onClick={buttonHandler}>
        Update Inventory
      </button>
    </div>
  );
}
