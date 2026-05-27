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
          params: {
            start: startDate,
            end: endDate,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      console.log(res.data);
      setSales(res.data);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Get Sales By Date Range</h1>

      <label>Start Date: </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <br />
      <br />

      <label>End Date: </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {searched && sales.length === 0 && !error && (
        <p>
          No sales found between {startDate} and {endDate}
        </p>
      )}

      {sales.length > 0 && (
        <table border={1}>
          <thead>
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
            {sales.map((sale) => {
              return (
                <tr key={sale.saleId}>
                  <td>{sale.saleId}</td>
                  <td>{sale.productId}</td>
                  <td>{sale.productName}</td>
                  <td>{sale.customerId}</td>
                  <td>{sale.quantity}</td>
                  <td>{sale.amount}</td>
                  <td>{sale.date}</td>
                  <td>{sale.status}</td>
                  <td>{sale.invoiceId}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
