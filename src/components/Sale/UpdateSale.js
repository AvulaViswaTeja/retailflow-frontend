import { useState } from "react";
import api from "../../api";

export default function UpdateSale() {
  const [saleId, setSaleId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("COMPLETED");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [currentSale, setCurrentSale] = useState(null);

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setCurrentSale(null);

    try {
      const res = await api.get("/api/sales/" + saleId);
      setCurrentSale(res.data);
      setQuantity(res.data.quantity);
      setStatus(res.data.status);
    } catch (err) {
      setError(err.response?.data?.message || "Sale not found");
    }
  };

  const handleUpdate = async () => {
    setMessage("");
    setError("");

    try {
      const res = await api.put("/api/sales/" + saleId, {
        productId: currentSale.productId,
        customerId: currentSale.customerId,
        quantity: parseInt(quantity),
        status: status,
      });

      setCurrentSale(res.data);
      setQuantity(res.data.quantity);
      setStatus(res.data.status);

      setMessage(
        "Sale updated! " +
          "Sale ID: " + res.data.saleId +
          " | Product: " + res.data.productName +
          " | Quantity: " + res.data.quantity +
          " | Amount: " + res.data.amount +
          " | Status: " + res.data.status
      );
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Update Sale</h1>

      {/* Search */}
      <label>Sale ID: </label>
      <input
        type="number"
        value={saleId}
        onChange={(e) => setSaleId(e.target.value)}
        placeholder="Enter Sale ID"
        min={1}
      />
      <button onClick={handleSearch}>Search</button>

      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* Current Sale Details */}
      {currentSale && (
        <div>
          <table border={1}>
            <thead>
              <tr>
                <th>Sale ID</th>
                <th>Product</th>
                <th>Customer ID</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentSale.saleId}</td>
                <td>{currentSale.productName}</td>
                <td>{currentSale.customerId}</td>
                <td>{currentSale.quantity}</td>
                <td>{currentSale.amount}</td>
                <td>{currentSale.status}</td>
                <td>{currentSale.invoiceId}</td>
              </tr>
            </tbody>
          </table>

          <br />

          {/* Update Form */}
          <label>New Quantity: </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={1}
          />

          <br /><br />

          <label>New Status: </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="COMPLETED">COMPLETED</option>
            <option value="PENDING">PENDING</option>
          </select>

          <br /><br />

          <button onClick={handleUpdate}>Update Sale</button>
        </div>
      )}
    </div>
  );
}