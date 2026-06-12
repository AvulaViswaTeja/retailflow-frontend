import axios from "axios";
import { useState } from "react";

export default function GetInvoiceByDateRange() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setSearched(true);
    setInvoices([]);
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8070/api/invoices/date-range", {
        params: { start: startDate, end: endDate },
        headers: { "Authorization": "Bearer " + token },
      });
      setInvoices(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Get Invoices By Date Range</h4>
        </div>
        <div className="card-body">

          
          <div className="row g-3 mb-3">
            <div className="col-md-5">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-5">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-primary w-100"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

         
          {error && <div className="alert alert-danger">{error}</div>}

         
          {searched && invoices.length === 0 && !error && (
            <div className="alert alert-warning">
              No invoices found between {startDate} and {endDate}
            </div>
          )}

          
          {invoices.length > 0 && (
            <>
              <p className="text-muted mb-2">
                Found <strong>{invoices.length}</strong> invoice(s) between{" "}
                <strong>{startDate}</strong> and <strong>{endDate}</strong>
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