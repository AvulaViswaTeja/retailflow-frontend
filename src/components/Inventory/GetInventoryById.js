import { useState } from "react";
import axios from "axios";

export default function GetInventoryById() {
  const [inventoryId, setInventoryId] = useState("");
  const [inventory, setInventory] = useState(null);
    let token = localStorage.getItem("token");

  const fetchInventory = () => {
    if (!inventoryId) return;
    let url = "http://localhost:8014/api/inventory/" + inventoryId;
    axios.get(url, {
            headers: { "Authorization": "Bearer " + token }
        })
      .then((response) => {
        setInventory(response.data); // store single inventory record
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  };

  return (
    <div>
      <h1>Get Inventory By ID</h1>
      <label>Inventory ID:</label>
      <input
        type="text"
        className="form-control"
        value={inventoryId}
        onChange={(e) => setInventoryId(e.target.value)}
      />
      <button className="btn btn-primary" onClick={fetchInventory}>
        Show Inventory
      </button>

      {inventory && (
        <table className='table table-striped'>
          <thead>
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
            <tr>
              <td>{inventory.inventoryId}</td>
              <td>{inventory.productId}</td>
              <td>{inventory.locationId}</td>
              <td>{inventory.quantityOnHand}</td>
              <td>{inventory.safetyStock}</td>
              <td>{inventory.status}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
