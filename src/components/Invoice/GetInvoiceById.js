import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function GetInvoiceById() {
  const [invoiceId, setInvoiceId] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setInvoice(null);
    setError("");
    if(!invoiceId){
      setError("Please enter a valid Invoice Id");
      return;
    }

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
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Get Invoice By ID</h4>
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