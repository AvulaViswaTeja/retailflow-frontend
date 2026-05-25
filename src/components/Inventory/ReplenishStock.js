import { useState } from "react";
import axios from "axios";

export default function ReplenishStock() {
  const [inventoryId, setInventoryId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [updatedInventory, setUpdatedInventory] = useState(null);
    let token = localStorage.getItem("token");
  const replenishHandler = () => {
    let url = `http://localhost:8014/api/inventory/${inventoryId}/replenish?quantity=${quantity}`;
    axios.patch(url, null, {
            headers: { "Authorization": "Bearer " + token }
        })
      .then((response) => {
        setUpdatedInventory(response.data); // store updated inventory object
      })
      .catch((error) => {
        console.error("Error replenishing stock:", error);
      });
  };

  return (
    <div>
      <h1>Replenish Inventory</h1>
      <label>Inventory ID:</label>
      <input
        type="text"
        value={inventoryId}
        onChange={(e) => setInventoryId(e.target.value)}
      />
      <br />
      <label>Quantity to Add:</label>
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br />
      <button onClick={replenishHandler}>Replenish</button>

      {updatedInventory && (
        <div>
          <h2>Updated Inventory Data</h2>
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
                <td>{updatedInventory.inventoryId}</td>
                <td>{updatedInventory.productId}</td>
                <td>{updatedInventory.locationId}</td>
                <td>{updatedInventory.quantityOnHand}</td>
                <td>{updatedInventory.safetyStock}</td>
                <td>{updatedInventory.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
