import axios from "axios";
import { useState, useEffect } from "react";

export default function GetAllSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:8014/api/sales", {
        headers: { "Authorization": "Bearer " + token },
      })
      .then((res) => {
        setSales(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch sales");
        setLoading(false);
      });
  }, []);

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
          <h4 className="mb-0">All Sales</h4>
          <span className="badge bg-light text-primary">
            Total: {sales.length}
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
        </div>
      </div>
    </div>
  );
}