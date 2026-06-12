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
        "http://localhost:8070/api/payments/invoice/" + invoiceId,
        { headers: { Authorization: "Bearer " + token } }
      );
      setPayments(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Get Payments By Invoice</h4>
        </div>
        <div className="card-body">

         
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              placeholder="Enter Invoice ID"
              min={1}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>

          
          {error && <div className="alert alert-danger">{error}</div>}

          
          {searched && payments.length === 0 && !error && (
            <div className="alert alert-warning">
              No payments found for Invoice ID: <strong>{invoiceId}</strong>
            </div>
          )}

          
          {payments.length > 0 && (
            <>
              <p className="text-muted mb-2">
                Found <strong>{payments.length}</strong> payment(s) for
                Invoice ID: <strong>{invoiceId}</strong>
              </p>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
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
            </>
          )}

        </div>
      </div>
    </div>
  );
}