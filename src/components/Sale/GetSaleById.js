import { useState } from "react";
import axios from "axios";

export default function GetSaleById() {
  const [saleId, setSaleId] = useState("");
  const [sale, setSale] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setSale(null);
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:1405/api/sales/" + saleId,{
            headers: { "Authorization": "Bearer " + token }
        });
      console.log(res.data);
      setSale(res.data);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Sale not found");
    }
  };

  return (
    <div>
      <h1>Get Sale by Id </h1>
      <input
        type="number"
        value={saleId}
        min={1}
        onChange={(e) => setSaleId(e.target.value)}
        placeholder="Enter Sale ID"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {sale && (
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
            <tr>
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
          </tbody>
        </table>
      )}
    </div>
  );
}
