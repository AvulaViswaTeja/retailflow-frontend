import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function GetPaginated() {
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchInvoices = (pageNumber) => {
    setLoading(true);
    setError("");
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:8070/api/invoices/paginated", {
        params: { page: pageNumber, size: 5 },
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setInvoices(res.data.content);
        setTotalElements(res.data.totalElements);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      });
  };

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  useEffect(() => {
    fetchInvoices(page);
  }, [page]);

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
      <button
        onClick={() => navigate('/Invoice')}
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
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">All Invoices Paginated</h4>
          <span className="badge bg-light text-primary">
            Total: {totalElements} records
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

          
          <div className="d-flex justify-content-between align-items-center p-3">
            <button
              className="btn btn-outline-primary"
              onClick={handlePrevious}
              disabled={page === 0}
            >
              ← Previous
            </button>
            <span className="text-muted">
              Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              className="btn btn-outline-primary"
              onClick={handleNext}
              disabled={page === totalPages - 1}
            >
              Next →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}