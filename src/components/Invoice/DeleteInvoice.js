import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

export default function DeleteInvoice() {
  const [invoiceId, setInvoiceId] = useState("");
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setCurrentInvoice(null);
    if(!invoiceId){
      setError("Please enter a valid Invoice Id");
      return;
    }

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8070/api/invoices/" + invoiceId,
        { headers: { Authorization: "Bearer " + token } }
      );
      setCurrentInvoice(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Invoice not found");
    }
  };

  const handleDelete = async () => {
    setMessage("");
    setError("");

    try {
      let token = localStorage.getItem("token");
      await axios.delete("http://localhost:8070/api/invoices/" + invoiceId, {
        headers: { Authorization: "Bearer " + token },
      });
      setMessage("Invoice ID: " + invoiceId + " cancelled successfully!");
      setCurrentInvoice(null);
      setInvoiceId("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

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
        <div className="card-header bg-danger text-white">
          <h4 className="mb-0">Cancel Invoice</h4>
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
          {message && <div className="alert alert-success">{message}</div>}

         
          {currentInvoice && (
            <div>
              <h6 className="text-muted mb-2">Invoice Details:</h6>
              <div className="table-responsive mb-3">
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

            
              {currentInvoice.status === "PAID" ? (
                <div className="alert alert-warning">
                  ⚠️ Cannot cancel a PAID invoice!
                </div>
              ) : currentInvoice.status === "CANCELLED" ? (
                <div className="alert alert-warning">
                  ⚠️ This invoice is already cancelled!
                </div>
              ) : (
                <button
                  className="btn btn-danger w-100"
                  onClick={handleDelete}
                >
                  Cancel Invoice
                </button>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}