import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdatePurchaseOrder() {
  let { purchaseOrderId } = useParams();
  let navigate = useNavigate();

  // State variables for all fields
  let [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
  let [orderDate, setOrderDate] = useState("");
  let [productId, setProductId] = useState("");
  let [productName, setProductName] = useState("");
  let [status, setStatus] = useState("");
  let [supplierId, setSupplierId] = useState("");

  // Handlers
  let expectedDeliveryHandler = (event) => setExpectedDeliveryDate(event.target.value);
  let orderDateHandler = (event) => setOrderDate(event.target.value);
  let productIdHandler = (event) => setProductId(event.target.value);
  let productNameHandler = (event) => setProductName(event.target.value);
  let statusHandler = (event) => setStatus(event.target.value);
  let supplierHandler = (event) => setSupplierId(event.target.value);

  // Update button handler
  let buttonHandler = () => {
    let url = `http://localhost:8014/api/purchase-orders/${purchaseOrderId}`;
    let purchaseorder = {
      expectedDeliveryDate: expectedDeliveryDate,
      orderDate: orderDate,
      productId: parseInt(productId),
      productName: productName,
      purchaseOrderId: parseInt(purchaseOrderId),
      status: status,
      supplierId: parseInt(supplierId),
    };

    console.log("Sending update:", purchaseorder);

    axios.put(url, purchaseorder, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        alert("Updated Purchase Order: " + JSON.stringify(response.data));
        navigate('/PurchaseOrder/getAll'); // Redirect after successful update
      })
      .catch((error) => {
        console.error("Error Updating:", error);
        alert("Failed to update: " + (error.response?.data?.message || error.message));
      });
  };

  // Load existing purchase order by ID
  useEffect(() => {
    let url = `http://localhost:1405/api/purchase-orders/${purchaseOrderId}`;
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        setExpectedDeliveryDate(response.data.expectedDeliveryDate);
        setOrderDate(response.data.orderDate);
        setProductId(response.data.productId);
        setProductName(response.data.productName);
        setStatus(response.data.status);
        setSupplierId(response.data.supplierId);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [purchaseOrderId]);

  return (
    <div>
      <h1>Edit Purchase Order</h1>
      <h2>Editing Purchase Order ID: {purchaseOrderId}</h2>

      <label>Expected Delivery Date</label>
      <input type="date" value={expectedDeliveryDate} onChange={expectedDeliveryHandler} />
      <br />

      <label>Order Date</label>
      <input type="date" value={orderDate} onChange={orderDateHandler} />
      <br />

      <label>Product ID</label>
      <input value={productId} onChange={productIdHandler} />
      <br />

      <label>Product Name</label>
      <input value={productName} onChange={productNameHandler} />
      <br />

      <label>Status</label>
      <input value={status} onChange={statusHandler} />
      <br />

      <label>Supplier ID</label>
      <input value={supplierId} onChange={supplierHandler} />
      <br />

      <button onClick={buttonHandler}>Update Purchase Order</button>
    </div>
  );
}
