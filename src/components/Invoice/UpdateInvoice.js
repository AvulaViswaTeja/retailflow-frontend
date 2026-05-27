import { useState } from "react";
import axios from "axios";

export default function UpdateInvoice() {
  const [invoiceId, setInvoiceId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setCurrentInvoice(null);

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:1405/api/invoices/" + invoiceId,{
            headers: { "Authorization": "Bearer " + token }
        });
      setCurrentInvoice(res.data);
      setAmount(res.data.amount);
      setStatus(res.data.status);
    } catch (err) {
      setError(err.response?.data?.message || "Invoice not found");
    }
  };

  const handleUpdate = async () => {
    setMessage("");
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:1405/api/invoices/" + invoiceId, {
        saleId: currentInvoice.saleId,
        amount: parseFloat(amount),
        status: status,
      },{
            headers: { "Authorization": "Bearer " + token }
        });

      setCurrentInvoice(res.data);
      setAmount(res.data.amount);
      setStatus(res.data.status);

      setMessage(
        "Invoice updated! " +
          "Invoice ID: " + res.data.invoiceId +
          " | Amount: " + res.data.amount +
          " | Status: " + res.data.status
      );
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Update Invoice</h1>

      <label>Invoice ID: </label>
      <input
        type="number"
        value={invoiceId}
        onChange={(e) => setInvoiceId(e.target.value)}
        placeholder="Enter Invoice ID"
        min={1}
      />
      <button onClick={handleSearch}>Search</button>

      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

    
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
            <p style={{ color: "orange" }}>
              Cannot update a PAID invoice!
            </p>
          ) : (
            <div>
              <label>New Amount: </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={0}
              />

              <br /><br />

              <label>New Status: </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="PENDING">PENDING</option>
                <option value="PARTIALLY_PAID">PARTIALLY_PAID</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>

              <br /><br />

              <button onClick={handleUpdate}>Update Invoice</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}