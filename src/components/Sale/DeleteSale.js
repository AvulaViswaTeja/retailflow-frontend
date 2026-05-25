import { useState } from "react";
import api from "../../api";

export default function DeleteSale() {
  const [saleId, setSaleId] = useState("");
  const [currentSale, setCurrentSale] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setCurrentSale(null);

    try {
      const res = await api.get("/api/sales/" + saleId);
      setCurrentSale(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Sale not found");
    }
  };

  const handleDelete = async () => {
    setMessage("");
    setError("");

    try {
      await api.delete("/api/sales/" + saleId);
      setMessage("Sale ID: " + saleId + " cancelled successfully!");
      setCurrentSale(null);
      setSaleId("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Delete Sale</h1>

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

          {currentSale.status === "CANCELLED" ? (
            <p style={{ color: "orange" }}>
              This sale is already cancelled!
            </p>
          ) : (
            <button
              onClick={handleDelete}
              style={{ color: "white", backgroundColor: "red" }}
            >
              Cancel Sale
            </button>
          )}
        </div>
      )}
    </div>
  );
}