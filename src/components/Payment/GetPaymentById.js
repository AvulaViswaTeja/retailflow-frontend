import axios from "axios";
import { useState } from "react";

export default function GetPaymentById() {
  const [payment, setPayment] = useState(null);
  const [paymentId, setPaymentId] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setPayment(null);

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:1405/api/payments/" + paymentId,
        { headers: { "Authorization": "Bearer " + token } }
      );
      setPayment(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Payment not found");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Get Payment By ID</h4>
        </div>
        <div className="card-body">

          {/* Search */}
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              min={1}
              value={paymentId}
              placeholder="Enter Payment ID"
              onChange={(e) => setPaymentId(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>

          {/* Error */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Result */}
          {payment && (
            <div className="table-responsive">
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
                    <td>{payment.paymentId}</td>
                    <td>{payment.invoiceId}</td>
                    <td>₹{payment.amount}</td>
                    <td>{payment.date}</td>
                    <td>
                      <span className="badge bg-secondary">
                        {payment.method}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        payment.status === "SUCCESS" ? "bg-success" :
                        payment.status === "REFUNDED" ? "bg-danger" :
                        "bg-secondary"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}