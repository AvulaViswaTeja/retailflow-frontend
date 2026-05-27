import axios from "axios";
import { useState } from "react";


export default function InsertInvoice() {
  const [saleId, setSaleId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:1405/api/invoices", {
        saleId: parseInt(saleId),
        amount: parseFloat(amount),
      },{
            headers: { "Authorization": "Bearer " + token }
        });

      const invoice = res.data;
      setMessage(
        "Invoice created! " +
          "Invoice ID: " + invoice.invoiceId +
          " | Sale ID: " + invoice.saleId +
          " | Amount: " + invoice.amount +
          " | Status: " + invoice.status
      );

      // Reset form
      setSaleId("");
      setAmount("");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Insert Invoice</h1>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>

        <label>Sale ID: </label>
        <input
          type="number"
          value={saleId}
          onChange={(e) => setSaleId(e.target.value)}
          placeholder="Enter Sale ID"
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

        <button type="submit">Create Invoice</button>

      </form>
    </div>
  );
}