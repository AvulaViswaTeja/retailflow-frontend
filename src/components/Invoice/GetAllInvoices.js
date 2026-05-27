import axios from "axios";
import { useState, useEffect } from "react";

export default function GetAllInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:1405/api/invoices", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setInvoices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch invoices");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading invoices...</p>
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

  if (invoices.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">No invoices found!</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">All Invoices</h4>
          <span className="badge bg-light text-primary">
            Total: {invoices.length}
          </span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Invoice ID</th>
                  <th>Customer ID</th>
                  <th>Sale ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.invoiceId}>
                    <td>{invoice.invoiceId}</td>
                    <td>{invoice.customerId}</td>
                    <td>{invoice.saleId}</td>
                    <td>{invoice.date}</td>
                    <td>₹{invoice.amount}</td>
                    <td>
                      <span className={`badge ${
                        invoice.status === "PAID" ? "bg-success" :
                        invoice.status === "PENDING" ? "bg-warning text-dark" :
                        invoice.status === "PARTIALLY_PAID" ? "bg-info text-dark" :
                        invoice.status === "CANCELLED" ? "bg-danger" :
                        "bg-secondary"
                      }`}>
                        {invoice.status}
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