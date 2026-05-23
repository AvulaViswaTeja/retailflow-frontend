import { useState, useEffect } from "react";
import api from "../../api";
export default function GetAllSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    api
      .get("/api/sales")
      .then((res) => {
        setSales(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch sales");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (sales.length === 0) {
    return (
      <p>
        <strong>No sales Found</strong>
      </p>
    );
  }

  return (
    <div>
      <h1> All Sales</h1>
      <table border={2}>
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
            {sales.map((sale)=>{
                return <tr key={sale.saleId}>
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
            })}
        </tbody>
      </table>
    </div>
  );
}
