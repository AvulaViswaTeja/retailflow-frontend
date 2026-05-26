import axios from "axios";
import { useState, useEffect } from "react";
export default function GetAllInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:8014/api/invoices", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setInvoices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to fetch invoices");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading....</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (invoices.length === 0) {
    return (
      <p>
        <strong>No Invoices found</strong>
      </p>
    );
  }

  return (
    <div>
      <h1>Get All Invoices</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Invoice Id</th>
            <th>Customer Id</th>
            <th>Sale Id</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => {
            return (
              <tr key={invoice.invoiceId}>
                <td>{invoice.invoiceId}</td>
                <td>{invoice.customerId}</td>
                <td>{invoice.saleId}</td>
                <td>{invoice.date}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
