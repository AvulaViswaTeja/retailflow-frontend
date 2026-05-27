import axios from "axios";
import { useState } from "react";


export default function GetInvoiceByStatus() {
  const [status, setStatus] = useState("PENDING");
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setSearched(true);
    setInvoices([]);
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:1405/api/invoices/status/" + status,{
            headers: { "Authorization": "Bearer " + token }
        });
      setInvoices(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Get Invoices By Status</h1>

      <label>Select Status: </label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="PENDING">PENDING</option>
        <option value="PAID">PAID</option>
        <option value="PARTIALLY_PAID">PARTIALLY_PAID</option>
        <option value="CANCELLED">CANCELLED</option>
      </select>

      <button onClick={handleSearch}>Search</button>

      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {searched && invoices.length === 0 && !error && (
        <p>No invoices found with status: {status}</p>
      )}

      {invoices.length > 0 && (
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
            {invoices.map((invoice) => {
              return (
                <tr key={invoice.invoiceId}>
                  <td>{invoice.invoiceId}</td>
                  <td>{invoice.saleId}</td>
                  <td>{invoice.customerId}</td>
                  <td>{invoice.amount}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}