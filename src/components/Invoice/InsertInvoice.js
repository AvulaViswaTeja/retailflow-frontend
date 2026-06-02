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
      const res = await axios.post(
        "http://localhost:1405/api/invoices",
        {
          saleId: parseInt(saleId),
          amount: parseFloat(amount),
        },
        { headers: { "Authorization": "Bearer " + token } }
      );

      const invoice = res.data;
      setMessage(
        "Invoice created! " +
          "Invoice ID: " + invoice.invoiceId +
          " | Sale ID: " + invoice.saleId +
          " | Amount: ₹" + invoice.amount +
          " | Status: " + invoice.status
      );
      setSaleId("");
      setAmount("");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Create Invoice</h4>
        </div>
        <div className="card-body">

          {message && (
            <div className="alert alert-success">{message}</div>
          )}
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">Sale ID</label>
              <input
                type="number"
                className="form-control"
                value={saleId}
                onChange={(e) => setSaleId(e.target.value)}
                placeholder="Enter Sale ID"
                min={1}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Amount</label>
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <input
                  type="number"
                  className="form-control"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                  min={0}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Create Invoice
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}