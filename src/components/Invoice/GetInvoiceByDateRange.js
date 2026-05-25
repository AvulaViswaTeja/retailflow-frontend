import { useState } from "react";
import api from "../../api";

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
      const res = await api.get("/api/invoices/date-range", {
        params: {
          start: startDate,
          end: endDate,
        },
      });
      setInvoices(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Get Invoices By Date Range</h1>

      <label>Start Date: </label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <br /><br />

      <label>End Date: </label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSearch}>Search</button>

      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {searched && invoices.length === 0 && !error && (
        <p>No invoices found between {startDate} and {endDate}</p>
      )}

      {invoices.length > 0 && (
        <table border={1}>
          <thead>
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
            {invoices.map((invoice) => {
              return (
                <tr key={invoice.invoiceId}>
                  <td>{invoice.invoiceId}</td>
                  <td>{invoice.saleId}</td>
                  <td>{invoice.customerId}</td>
                  <td>{invoice.amount}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}