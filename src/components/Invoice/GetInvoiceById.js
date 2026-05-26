import axios from "axios";
import { useState } from "react";


export default function GetInvoiceById() {
  const [invoiceId, setInvoiceId] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setInvoice(null);
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8014/api/invoices/" + invoiceId,{
            headers: { "Authorization": "Bearer " + token }
        });
      setInvoice(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Invoice not found");
    }
  };

  return (
    <div>
      <h1>Get Invoice By ID</h1>

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

      {invoice && (
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
              <td>{invoice.invoiceId}</td>
              <td>{invoice.saleId}</td>
              <td>{invoice.customerId}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.date}</td>
              <td>{invoice.status}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}