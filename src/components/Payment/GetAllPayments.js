import axios from 'axios';
import { useEffect, useState } from 'react';

export default function GetAllPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios.get("http://localhost:1405/api/payments", {
      headers: { "Authorization": "Bearer " + token }
    })
    .then((res) => {
      setPayments(res.data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.response?.data?.message || "Failed to fetch payments");
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading payments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">No payments found!</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">All Payments</h4>
          <span className="badge bg-light text-primary">
            Total: {payments.length}
          </span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
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
                {payments.map((payment) => (
                  <tr key={payment.paymentId}>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}