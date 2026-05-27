import { useState, useEffect } from "react";
import axios from "axios";

export default function GetAllSalesPaginated() {
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSales = (pageNumber) => {
    setLoading(true);
    setError("");
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:8014/api/sales/paginated", {
        params: { page: pageNumber, size: 5 },
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setSales(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch sales");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSales(page);
  }, [page]);

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading sales...</p>
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

  if (sales.length === 0) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">No sales found!</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">All Sales Paginated</h4>
          <span className="badge bg-light text-primary">
            Total: {totalElements} records
          </span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Sale ID</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Customer ID</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Invoice ID</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.saleId}>
                    <td>{sale.saleId}</td>
                    <td>{sale.productId}</td>
                    <td>{sale.productName}</td>
                    <td>{sale.customerId}</td>
                    <td>{sale.quantity}</td>
                    <td>₹{sale.amount}</td>
                    <td>{sale.date}</td>
                    <td>
                      <span className={`badge ${
                        sale.status === "COMPLETED" ? "bg-success" :
                        sale.status === "PENDING" ? "bg-warning text-dark" :
                        sale.status === "CANCELLED" ? "bg-danger" :
                        "bg-secondary"
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                    <td>{sale.invoiceId || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
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