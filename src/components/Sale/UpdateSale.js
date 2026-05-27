import axios from "axios";
import { useState } from "react";

export default function UpdateSale() {
  const [saleId, setSaleId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("COMPLETED");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [currentSale, setCurrentSale] = useState(null);

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setCurrentSale(null);

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:1405/api/sales/" + saleId,{
            headers: { "Authorization": "Bearer " + token }
        });
      setCurrentSale(res.data);
      setQuantity(res.data.quantity);
      setStatus(res.data.status);
    } catch (err) {
      setError(err.response?.data?.message || "Sale not found");
    }
  };

  const handleUpdate = async () => {
    setMessage("");
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:1405/api/sales/" + saleId, {
        productId: currentSale.productId,
        customerId: currentSale.customerId,
        quantity: parseInt(quantity),
        status: status,
      },{
            headers: { "Authorization": "Bearer " + token }
        });

      setCurrentSale(res.data);
      setQuantity(res.data.quantity);
      setStatus(res.data.status);
      setMessage(
        "Sale updated! Sale ID: " + res.data.saleId +
        " | Product: " + res.data.productName +
        " | Quantity: " + res.data.quantity +
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
          <h4 className="mb-0">Update Sale</h4>
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

              
              <h6 className="text-muted mb-2">Current Sale Details:</h6>
              <div className="table-responsive mb-4">
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

              
              <h6 className="text-muted mb-2">Update Fields:</h6>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">New Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min={1}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">New Status</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>
              </div>

              <button
                className="btn btn-success mt-3 w-100"
                onClick={handleUpdate}
              >
                Update Sale
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}