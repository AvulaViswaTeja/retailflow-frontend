import { useState } from "react";
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
        // assuming backend returns an array of inventory records
        setInventoryArr(response.data);
      })
      .catch((error) => {
        console.error("Error fetching low stock inventory:", error);
      });
  };

  return (
    <div>
      <h1>Low Stock Inventory</h1>
      <button className="btn btn-primary" onClick={fetchLowStock}>
        Fetch Low Stock Items
      </button>

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
    </div>
  );
}
