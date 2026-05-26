import { useState, useEffect } from "react";
import axios from "axios";

export default function GetAllSalesPaginated() {
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSales = (pageNumber) => {
    setLoading(true);
    setError("");
    let token = localStorage.getItem("token");
    axios
      .get(
        "http://localhost:8014/api/sales/paginated",
        {
          params: {
            page: pageNumber,
            size: 5,
          }, 
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then((res) => {
        setSales(res.data.content);
        setTotalPages(res.data.totalPages);
        setTotalElements(res.data.totalElements);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response?.data?.message || "Failed to fetch sales");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSales(page);
  }, [page]);

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (sales.length === 0) return <p>No sales found</p>;

  return (
    <div>
      <h1>All Sales Paginated</h1>

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
          {sales.map((sale) => (
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
          ))}
        </tbody>
      </table>

      <br />

      <button onClick={handlePrevious} disabled={page === 0}>
        Previous
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {page + 1} of {totalPages} | Total: {totalElements} records
      </span>

      <button onClick={handleNext} disabled={page === totalPages - 1}>
        Next
      </button>
    </div>
  );
}
