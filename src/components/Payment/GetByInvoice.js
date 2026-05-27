import { useState } from "react";

import axios from "axios";

export default function GetByInvoice() {
  const [invoiceId, setInvoiceId] = useState("");
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);


  const handleSearch = async () => {
    setSearched(true);
    setPayments([]);
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:1405/api/payments/invoice/" + invoiceId,
        {
          headers: { Authorization: "Bearer " + token },
        },
      );
      setPayments(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Get Payments By Invoice</h1>

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

      {searched && payments.length === 0 && !error && (
        <p>No payments found for Invoice ID: {invoiceId}</p>
      )}

      {payments.length > 0 && (
        <table border={1}>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Invoice ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => {
              return (
                <tr key={payment.paymentId}>
                  <td>{payment.paymentId}</td>
                  <td>{payment.invoiceId}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.date}</td>
                  <td>{payment.method}</td>
                  <td>{payment.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
