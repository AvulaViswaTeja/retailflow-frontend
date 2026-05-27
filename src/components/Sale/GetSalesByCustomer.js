import { useState } from "react";
import axios from "axios";

export default function GetSalesByCustomers() {
  const [customerId, setCustomerId] = useState("");
  const [sales, setSales] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setSearched(true);
    setSales([]);
    setError("");
    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:8014/api/sales/customer/" + customerId,
        { headers: { "Authorization": "Bearer " + token } }
      );
      setSales(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Customer ID not found");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Get Sales By Customer ID</h4>
        </div>
        <div className="card-body">

          
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Enter Customer ID"
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

          
          {searched && sales.length === 0 && !error && (
            <div className="alert alert-warning">
              No sales found for Customer ID: {customerId}
            </div>
          )}

         
          {sales.length > 0 && (
            <>
              <p className="text-muted mb-2">
                Found <strong>{sales.length}</strong> sale(s) for Customer ID: <strong>{customerId}</strong>
              </p>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
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
            </>
          )}

        </div>
      </div>
    </div>
  );
}