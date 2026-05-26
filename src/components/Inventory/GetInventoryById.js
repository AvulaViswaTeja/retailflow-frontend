import { useState } from "react";
import axios from "axios";

export default function GetInventoryById() {
  const [inventoryId, setInventoryId] = useState("");
  const [inventory, setInventory] = useState(null);

  const fetchInventory = () => {
    if (!inventoryId) return;
    let url = "http://localhost:8014/api/inventory/" + inventoryId;
    axios.get(url)
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
        value={inventoryId}
        onChange={(e) => setInventoryId(e.target.value)}
      />
      <button onClick={fetchInventory}>Show Inventory</button>

      {inventory && (
        <table border="1">
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
