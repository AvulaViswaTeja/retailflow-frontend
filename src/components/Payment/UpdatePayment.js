import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export default function UpdatePayment() {
  const [paymentId, setPaymentId] = useState("");
  const [method, setMethod] = useState("CASH");
  const [currentPayment, setCurrentPayment] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setCurrentPayment(null);
    if(!paymentId){
      setError("Please enter a valid Payment Id");
      return;
    }

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8070/api/payments/" + paymentId,
        { headers: { Authorization: "Bearer " + token } }
      );
      setCurrentPayment(res.data);
      setMethod(res.data.method);
    } catch (err) {
      setError(err.response?.data?.message || "Payment not found");
    }
  };

  const handleUpdate = async () => {
    setMessage("");
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:8070/api/payments/" + paymentId,
        {
          invoiceId: currentPayment.invoiceId,
          amount: currentPayment.amount,
          method: method,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      setCurrentPayment(res.data);
      setMethod(res.data.method);
      setMessage(
        "Payment updated! Payment ID: " + res.data.paymentId +
        " | Method changed to: " + res.data.method
      );
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
          <h4 className="mb-0">Update Payment</h4>
        </div>
        <div className="card-body">

          {/* Search */}
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

          {/* Messages */}
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          {/* Current Payment + Update Form */}
          {currentPayment && (
            <div>

              {/* Current Details */}
              <h6 className="text-muted mb-2">Current Payment Details:</h6>
              <div className="table-responsive mb-4">
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
                        <span className={`badge ${
                          currentPayment.status === "SUCCESS" ? "bg-success" :
                          currentPayment.status === "REFUNDED" ? "bg-danger" :
                          "bg-secondary"
                        }`}>
                          {currentPayment.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Block if REFUNDED */}
              {currentPayment.status === "REFUNDED" ? (
                <div className="alert alert-warning">
                  ⚠️ Cannot update a refunded payment!
                </div>
              ) : (
                <div>
                  <h6 className="text-muted mb-2">Update Method:</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">New Method</label>
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
                  </div>

                  <button
                    className="btn btn-success mt-3 w-100"
                    onClick={handleUpdate}
                  >
                    Update Payment
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}