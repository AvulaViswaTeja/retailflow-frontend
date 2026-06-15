import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
export default function InsertPayment() {
  const [invoiceId, setInvoiceId] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("CASH");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!invoiceId || parseInt(invoiceId) <= 0) {
      setError("Please enter a valid Invoice ID");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    if (!method) {
      setError("Please select a valid payment method");
      return;
    }

    try {
      const req_data = {
        invoiceId: parseInt(invoiceId),
        amount: parseFloat(amount),
        method: method,
      };
      let token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:8070/api/payments",
        req_data,
        { headers: { Authorization: "Bearer " + token } },
      );
      const payment = res.data;
      setMessage(
        "Payment processed! " +
          "Payment ID: " +
          payment.paymentId +
          " | Invoice ID: " +
          payment.invoiceId +
          " | Amount: ₹" +
          payment.amount +
          " | Method: " +
          payment.method +
          " | Status: " +
          payment.status +
          " | Invoice Status: " +
          payment.invoiceStatus,
      );
      setInvoiceId("");
      setAmount("");
      setMethod("CASH");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <button
        onClick={() => navigate('/Payment')}
        style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 8, fontSize: 12,
            color: '#fff', cursor: 'pointer',
            background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
            border: 'none', marginBottom: 16,
        }}>
        ← Back
      </button>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Process Payment</h4>
        </div>
        <div className="card-body">
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Invoice ID</label>
              <input
                type="number"
                className="form-control"
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                placeholder="Enter Invoice ID"
                min={1}
                
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
                  
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Payment Method</label>
              <select
                className="form-select"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="CASH">CASH</option>
                <option value="CARD">CARD</option>
                <option value="UPI">UPI</option>
                <option value="NET_BANKING">NET_BANKING</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Process Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
