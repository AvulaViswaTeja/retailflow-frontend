import axios from "axios";
import { useState } from "react";

export default function InsertSale() {
  const [productId, setProductId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("COMPLETED");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const req_data = {
      productId: parseInt(productId),
      customerId: parseInt(customerId),
      quantity: parseInt(quantity),
      status: status,
    };

    try {
      let token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:1405/api/sales", req_data,{
            headers: { "Authorization": "Bearer " + token }
        });
      const sale = res.data;
      setMessage(
        "Sale created! " +
          "Sale ID: " +
          sale.saleId +
          " | " +
          "Product: " +
          sale.productName +
          " | " +
          "Amount: " +
          sale.amount +
          " | " +
          "Invoice ID: " +
          sale.invoiceId,
      );
    } catch (err) {
      console.log("Error:", err.response?.data);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>ProductId:</label>
        <input
          type="number"
          min={1}
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />

        <br></br>

        <label>CustomerId:</label>
        <input
          type="number"
          min={1}
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          required
        />

        <br></br>

        <label>Quantity:</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <br></br>

        <label htmlFor="status">Select status:</label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="COMPLETED">COMPLETED</option>
          <option value="PENDING">PENDING</option>
        </select>

        <br></br>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
