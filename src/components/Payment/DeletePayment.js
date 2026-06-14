import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function DeletePayment() {
  const [paymentId, setPaymentId] = useState("");
  const [currentPayment, setCurrentPayment] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setCurrentPayment(null);
    if (!paymentId) {
      setError("Enter a valid Payment Id");
      return;
    }

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8070/api/payments/" + paymentId,
        { headers: { Authorization: "Bearer " + token } },
      );
      setCurrentPayment(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Payment not found");
    }
  };

  const handleRefund = async () => {
    setMessage("");
    setError("");

    try {
      let token = localStorage.getItem("token");
      await axios.patch(
        "http://localhost:8070/api/payments/" + paymentId + "/refund",
        null,
        { headers: { Authorization: "Bearer " + token } },
      );
      setMessage("Payment ID: " + paymentId + " refunded successfully!");
      setCurrentPayment(null);
      setPaymentId("");
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
        <div className="card-header bg-primary text-white ">
          <h4 className="mb-0">Refund Payment</h4>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              placeholder="Enter Payment ID"
              min={1}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          {currentPayment && (
            <div>
              <h6 className="text-muted mb-2">Payment Details:</h6>
              <div className="table-responsive mb-3">
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
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
                    <tr>
                      <td>{currentPayment.paymentId}</td>
                      <td>{currentPayment.invoiceId}</td>
                      <td>₹{currentPayment.amount}</td>
                      <td>{currentPayment.date}</td>
                      <td>
                        <span className="badge bg-secondary">
                          {currentPayment.method}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            currentPayment.status === "SUCCESS"
                              ? "bg-success"
                              : currentPayment.status === "REFUNDED"
                                ? "bg-danger"
                                : "bg-secondary"
                          }`}
                        >
                          {currentPayment.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {currentPayment.status === "REFUNDED" ? (
                <div className="alert alert-warning">
                  ⚠️ This payment is already refunded!
                </div>
              ) : (
                <button className="btn btn-danger w-100" onClick={handleRefund}>
                  Refund Payment
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
