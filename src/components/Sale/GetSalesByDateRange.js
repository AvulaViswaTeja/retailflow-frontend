import axios from "axios";
import { useState } from "react";

export default function GetSalesByDateRange() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
        "http://localhost:1405/api/sales/date-range",
        {
          params: { start: startDate, end: endDate },
          headers: { Authorization: "Bearer " + token },
        }
      );
      setSales(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Get Sales By Date Range</h4>
        </div>
        <div className="card-body">

          {/* Date Inputs */}
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

          {/* Error */}
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          {/* No results */}
          {searched && sales.length === 0 && !error && (
            <div className="alert alert-warning">
              No sales found between {startDate} and {endDate}
            </div>
          )}

          {/* Results */}
          {sales.length > 0 && (
            <>
              <p className="text-muted mb-2">
                Found <strong>{sales.length}</strong> sale(s) between{" "}
                <strong>{startDate}</strong> and <strong>{endDate}</strong>
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