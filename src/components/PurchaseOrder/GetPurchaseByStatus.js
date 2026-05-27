import { useState } from "react";
import axios from "axios";

export default function GetPurchaseOrdersByStatus() {
  const [status, setStatus] = useState("");
  const [poArr, setPoArr] = useState([]);
  const token = localStorage.getItem("token");
  const fetchPurchaseOrders = () => {
    if (!status) return;
    let url = "http://localhost:1405/api/purchase-orders/status/" + status;
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        // assuming backend returns an array of purchase orders
        setPoArr(response.data);
      })
      .catch((error) => {
        console.error("Error fetching purchase orders:", error);
      });
  };

  return (
    <div>
      <h1>Get Purchase Orders By Status</h1>
      <label>Status:</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />
      <button className="btn btn-primary" onClick={fetchPurchaseOrders}>
        Show Purchase Orders
      </button>

      {poArr.length > 0 && (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Purchase Order ID</th>
              <th>Supplier ID</th>
              <th>Order Date</th>
              <th>Expected Delivery Date</th>
              <th>Status</th>
              <th>Product ID</th>
              <th>Product Name</th>
            </tr>
          </thead>
          <tbody>
            {poArr.map((po) => (
              <tr key={po.purchaseOrderId}>
                <td>{po.purchaseOrderId}</td>
                <td>{po.supplierId}</td>
                <td>{po.orderDate}</td>
                <td>{po.expectedDeliveryDate}</td>
                <td>{po.status}</td>
                <td>{po.productId}</td>
                <td>{po.productName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
