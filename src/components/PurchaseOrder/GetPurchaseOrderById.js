import { useState } from "react";
import axios from "axios";

export default function GetPurchaseOrderById() {
  const [poId, setPoId] = useState("");
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const token = localStorage.getItem("token");
  const fetchPurchaseOrder = () => {
    if (!poId) return;
    let url = "http://localhost:8014/api/purchase-orders/" + poId;
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        setPurchaseOrder(response.data); // store single purchase order record
      })
      .catch((error) => {
        console.error("Error fetching purchase order:", error);
      });
  };

  return (
    <div>
      <h1>Get Purchase Order By ID</h1>
      <label>Purchase Order ID:</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter Purchase Order ID"
        value={poId}
        onChange={(e) => setPoId(e.target.value)}
      />
      <button className="btn btn-primary" onClick={fetchPurchaseOrder}>
        Show Purchase Order
      </button>

      {purchaseOrder && (
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
            <tr>
              <td>{purchaseOrder.purchaseOrderId}</td>
              <td>{purchaseOrder.supplierId}</td>
              <td>{purchaseOrder.orderDate}</td>
              <td>{purchaseOrder.expectedDeliveryDate}</td>
              <td>{purchaseOrder.status}</td>
              <td>{purchaseOrder.productId}</td>
              <td>{purchaseOrder.productName}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
