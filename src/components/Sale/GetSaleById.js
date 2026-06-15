import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export default function GetSaleById() {
  const [saleId, setSaleId] = useState("");
  const [sale, setSale] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    setSale(null);
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8070/api/sales/" + saleId,{
            headers: { "Authorization": "Bearer " + token }
        });
      console.log(res.data);
      setSale(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Sale not found");
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
          <h4 className="mb-0">Get Sale By ID</h4>
        </div>
        <div className="card-body">

          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              value={saleId}
              min={1}
              onChange={(e) => setSaleId(e.target.value)}
              placeholder="Enter Sale ID"
            />
            <button
              className="btn btn-primary"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          {sale && (
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
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
                  <tr>
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
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}