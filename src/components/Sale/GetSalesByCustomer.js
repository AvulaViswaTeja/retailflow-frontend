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
      const res = await axios.get("http://localhost:8014/api/sales/customer/" + customerId,{
            headers: { "Authorization": "Bearer " + token }
        });
      console.log(res.data);
      setSales(res.data);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Customer ID not found");
    }
  };

  return (
    <div>
      <h1>Get Sale By Customer ID</h1>
      <input
        type="number"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        placeholder="Enter customer Id"
        required
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {searched && sales.length === 0 && !error && (
        <p>No sales found for customer ID: {customerId}</p>
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
