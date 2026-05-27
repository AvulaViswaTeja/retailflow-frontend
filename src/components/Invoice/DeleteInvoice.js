import axios from "axios";
import { useState } from "react";

export default function DeleteInvoice() {
  const [invoiceId, setInvoiceId] = useState("");
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setCurrentInvoice(null);

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:1405/api/invoices/" + invoiceId,
        {
          headers: { Authorization: "Bearer " + token },
        },
      );
      setCurrentInvoice(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Invoice not found");
    }
  };

  const handleDelete = async () => {
    setMessage("");
    setError("");

    try {
      let token = localStorage.getItem("token");
      await axios.delete("http://localhost:1405/api/invoices/" + invoiceId, {
        headers: { Authorization: "Bearer " + token },
      });
      setMessage("Invoice ID: " + invoiceId + " cancelled successfully!");
      setCurrentInvoice(null);
      setInvoiceId("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Delete Invoice</h1>

      {/* Search */}
      <label>Invoice ID: </label>
      <input
        type="number"
        value={invoiceId}
        onChange={(e) => setInvoiceId(e.target.value)}
        placeholder="Enter Invoice ID"
        min={1}
      />
      <button onClick={handleSearch}>Search</button>

      <br />
      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* Current Invoice Details */}
      {currentInvoice && (
        <div>
          <table border={1}>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Sale ID</th>
                <th>Customer ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentInvoice.invoiceId}</td>
                <td>{currentInvoice.saleId}</td>
                <td>{currentInvoice.customerId}</td>
                <td>{currentInvoice.amount}</td>
                <td>{currentInvoice.date}</td>
                <td>{currentInvoice.status}</td>
              </tr>
            </tbody>
          </table>

          <br />

          {currentInvoice.status === "PAID" ? (
            <p style={{ color: "orange" }}>Cannot cancel a PAID invoice!</p>
          ) : currentInvoice.status === "CANCELLED" ? (
            <p style={{ color: "orange" }}>
              This invoice is already cancelled!
            </p>
          ) : (
            <button
              onClick={handleDelete}
              style={{ color: "white", backgroundColor: "red" }}
            >
              Cancel Invoice
            </button>
          )}
        </div>
      )}
    </div>
  );
}
