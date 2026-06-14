import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
export default function DeleteSale() {
  const [saleId, setSaleId] = useState("");
  const [currentSale, setCurrentSale] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setCurrentSale(null);

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8070/api/sales/" + saleId,{
            headers: { "Authorization": "Bearer " + token }
        });
      setCurrentSale(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Sale not found");
    }
  };

  const handleDelete = async () => {
    setMessage("");
    setError("");

    try {
      let token = localStorage.getItem("token");
      await axios.delete("http://localhost:8070/api/sales/" + saleId, {
            headers: { "Authorization": "Bearer " + token }
        });
      setMessage("Sale ID: " + saleId + " cancelled successfully!");
      setCurrentSale(null);
      setSaleId("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <button
        onClick={() => navigate('/Sale')}
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
          <h4 className="mb-0">Cancel Sale</h4>
        </div>
        <div className="card-body">

          
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              value={saleId}
              onChange={(e) => setSaleId(e.target.value)}
              placeholder="Enter Sale ID"
              min={1}
            />
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>

          
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}

          
          {currentSale && (
            <div>
              <h6 className="text-muted mb-2">Sale Details:</h6>
              <div className="table-responsive mb-3">
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Sale ID</th>
                      <th>Product</th>
                      <th>Customer ID</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Invoice ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{currentSale.saleId}</td>
                      <td>{currentSale.productName}</td>
                      <td>{currentSale.customerId}</td>
                      <td>{currentSale.quantity}</td>
                      <td>₹{currentSale.amount}</td>
                      <td>
                        <span className={`badge ${
                          currentSale.status === "COMPLETED" ? "bg-success" :
                          currentSale.status === "PENDING" ? "bg-warning text-dark" :
                          currentSale.status === "CANCELLED" ? "bg-danger" :
                          "bg-secondary"
                        }`}>
                          {currentSale.status}
                        </span>
                      </td>
                      <td>{currentSale.invoiceId || "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              
              {currentSale.status === "CANCELLED" ? (
                <div className="alert alert-warning">
                  ⚠️ This sale is already cancelled!
                </div>
              ) : (
                <button
                  className="btn btn-danger w-100"
                  onClick={handleDelete}
                >
                  Cancel Sale
                </button>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}