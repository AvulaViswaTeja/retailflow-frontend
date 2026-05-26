import { useState } from "react";
import api from "../../api";

export default function InsertPayment() {
  const [invoiceId, setInvoiceId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("CASH");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
        const req_data = {
        invoiceId: parseInt(invoiceId),
        amount: parseFloat(amount),
        method: method,
      }
      const res = await api.post("/api/payments", req_data);
      const payment = res.data;
      setMessage(
        "Payment processed! " +
          "Payment ID: " + payment.paymentId +
          " | Invoice ID: " + payment.invoiceId +
          " | Amount: " + payment.amount +
          " | Method: " + payment.method +
          " | Status: " + payment.status +
          " | Invoice Status: " + payment.invoiceStatus
      );

      setInvoiceId("");
      setAmount("");
      setMethod("CASH");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Insert Payment</h1>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>

        <label>Invoice ID: </label>
        <input
          type="number"
          value={invoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
          placeholder="Enter Invoice ID"
          min={1}
          required
        />

        <br /><br />

        <label>Amount: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          min={0}
          required
        />

        <br /><br />

        <label>Payment Method: </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="CASH">CASH</option>
          <option value="CARD">CARD</option>
          <option value="UPI">UPI</option>
          <option value="NET_BANKING">NET_BANKING</option>
        </select>

        <br /><br />

        <button type="submit">Process Payment</button>

      </form>
    </div>
  );
}