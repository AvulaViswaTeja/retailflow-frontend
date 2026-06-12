import axios from "axios";
import { useState } from "react";

export default function GetInvoiceById() {
  const [invoiceId, setInvoiceId] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setInvoice(null);
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8070/api/invoices/" + invoiceId, {
        headers: { "Authorization": "Bearer " + token },
      });
      setInvoice(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Invoice not found");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Get Invoice By ID</h4>
        </div>
        <div className="card-body">

          {/* Search */}
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

          {/* Error */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Result */}
          {invoice && (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Invoice ID</th>
                    <th>Sale ID</th>
                    <th>Customer ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{invoice.invoiceId}</td>
                    <td>{invoice.saleId}</td>
                    <td>{invoice.customerId}</td>
                    <td>₹{invoice.amount}</td>
                    <td>{invoice.date}</td>
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
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}