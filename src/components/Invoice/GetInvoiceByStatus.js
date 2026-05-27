import axios from "axios";
import { useState } from "react";

export default function GetInvoiceByStatus() {
  const [status, setStatus] = useState("PENDING");
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setSearched(true);
    setInvoices([]);
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:1405/api/invoices/status/" + status,
        { headers: { "Authorization": "Bearer " + token } }
      );
      setInvoices(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Get Invoices By Status</h4>
        </div>
        <div className="card-body">

          
          <div className="input-group mb-3">
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="PENDING">PENDING</option>
              <option value="PAID">PAID</option>
              <option value="PARTIALLY_PAID">PARTIALLY_PAID</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>

          
          {error && <div className="alert alert-danger">{error}</div>}

          
          {searched && invoices.length === 0 && !error && (
            <div className="alert alert-warning">
              No invoices found with status: <strong>{status}</strong>
            </div>
          )}

          
          {invoices.length > 0 && (
            <>
              <p className="text-muted mb-2">
                Found <strong>{invoices.length}</strong> invoice(s) with status:{" "}
                <span className={`badge ${
                  status === "PAID" ? "bg-success" :
                  status === "PENDING" ? "bg-warning text-dark" :
                  status === "PARTIALLY_PAID" ? "bg-info text-dark" :
                  status === "CANCELLED" ? "bg-danger" :
                  "bg-secondary"
                }`}>
                  {status}
                </span>
              </p>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
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
                    {invoices.map((invoice) => (
                      <tr key={invoice.invoiceId}>
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