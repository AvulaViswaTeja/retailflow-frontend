import axios from "axios";
import { useState } from "react";

export default function GetPaymentById() {
  const [payment, setPayment] = useState(null);
  const [paymentId, setPaymentId] = useState("");
  const [error, setError] = useState("");
  const handleSearch = async () => {
    try {
      let token = localStorage.getItem("token");
        setError("");
        setPayment(null);
        const res = await axios.get("http://localhost:1405/api/payments/" + paymentId, {
            headers: { "Authorization": "Bearer " + token }
        });
        setPayment(res.data);
      
    } catch (err) {
      setError(err.response?.data?.message || "Payment not found");
    }
  };

  
  return (
    <div>
      <h1>Get Payment by Id component</h1>
      <label>Payment Id:</label>
      <input
        type="number"
        min={1}
        value={paymentId}
        placeholder="Enter payment Id"
        onChange={(e) => {
          setPaymentId(e.target.value);
        }}
        required
      />
      <button onClick={handleSearch}>Search</button>

    {error && <p style={{ color: "red" }}>{error}</p>}

      <br></br>
      <br></br>
      {payment && <table border={1}>
        <thead>
          <tr>
            <th>Payment Id</th>
            <th>Invoice Id</th>
            <th>Amount </th>
            <th>Date</th>
            <th>Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>{payment.paymentId}</td>
                <td>{payment.invoiceId}</td>
                <td>{payment.amount}</td>
                <td>{payment.date}</td>
                <td>{payment.method}</td>
                <td>{payment.status}</td>
            </tr>
        </tbody>
      </table>}
    </div>
  );
}
