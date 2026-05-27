import { useState } from "react";
import axios from "axios";

export default function GetInventoryByProduct() {
  const [productId, setProductId] = useState("");
  const [inventoryArr, setInventoryArr] = useState([]);
let token = localStorage.getItem("token");
  const fetchInventory = () => {
    if (!productId) return;
    let url = "http://localhost:1405/api/inventory/product/" + productId;
    axios.get(url, {
            headers: { "Authorization": "Bearer " + token }
        })
      .then((response) => {
        // assuming backend returns an array of inventory records
        setInventoryArr(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory:", error);
      });
  };

  return (
    <div>
      <h1>Get Inventory By Product ID</h1>
      <label>Product ID:</label>
      <input
        type="text"
        className="form-control"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button className="btn btn-primary" onClick={fetchInventory}>
        Show Inventory
      </button>

      {inventoryArr.length > 0 && (
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
            {inventoryArr.map((inv) => (
              <tr key={inv.inventoryId}>
                <td>{inv.inventoryId}</td>
                <td>{inv.productId}</td>
                <td>{inv.locationId}</td>
                <td>{inv.quantityOnHand}</td>
                <td>{inv.safetyStock}</td>
                <td>{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
