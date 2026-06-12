import { useState } from "react";
import axios from "axios";

export default function UpdateInvoice() {
  const [invoiceId, setInvoiceId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setCurrentInvoice(null);

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8070/api/invoices/" + invoiceId, {
        headers: { "Authorization": "Bearer " + token },
      });
      setCurrentInvoice(res.data);
      setAmount(res.data.amount);
      setStatus(res.data.status);
    } catch (err) {
      setError(err.response?.data?.message || "Invoice not found");
    }
  };

  const handleUpdate = async () => {
    setMessage("");
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:8070/api/invoices/" + invoiceId,
        {
          saleId: currentInvoice.saleId,
          amount: parseFloat(amount),
          status: status,
        },
        { headers: { "Authorization": "Bearer " + token } }
      );

      setCurrentInvoice(res.data);
      setAmount(res.data.amount);
      setStatus(res.data.status);
      setMessage(
        "Invoice updated! " +
          "Invoice ID: " + res.data.invoiceId +
          " | Amount: ₹" + res.data.amount +
          " | Status: " + res.data.status
      );
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Update Invoice</h4>
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

          {/* Messages */}
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          {/* Current Invoice + Update Form */}
          {currentInvoice && (
            <div>

              {/* Current Details */}
              <h6 className="text-muted mb-2">Current Invoice Details:</h6>
              <div className="table-responsive mb-4">
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
                      <td>{currentInvoice.invoiceId}</td>
                      <td>{currentInvoice.saleId}</td>
                      <td>{currentInvoice.customerId}</td>
                      <td>₹{currentInvoice.amount}</td>
                      <td>{currentInvoice.date}</td>
                      <td>
                        <span className={`badge ${
                          currentInvoice.status === "PAID" ? "bg-success" :
                          currentInvoice.status === "PENDING" ? "bg-warning text-dark" :
                          currentInvoice.status === "PARTIALLY_PAID" ? "bg-info text-dark" :
                          currentInvoice.status === "CANCELLED" ? "bg-danger" :
                          "bg-secondary"
                        }`}>
                          {currentInvoice.status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Block if PAID */}
              {currentInvoice.status === "PAID" ? (
                <div className="alert alert-warning">
                  ⚠️ Cannot update a PAID invoice!
                </div>
              ) : (
                <div>
                  <h6 className="text-muted mb-2">Update Fields:</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">New Amount</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          min={0}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">New Status</label>
                      <select
                        className="form-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PARTIALLY_PAID">PARTIALLY_PAID</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                  </div>

                  <button
                    className="btn btn-success mt-3 w-100"
                    onClick={handleUpdate}
                  >
                    Update Invoice
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}