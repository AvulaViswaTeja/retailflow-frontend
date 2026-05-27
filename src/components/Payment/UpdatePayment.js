import { useState } from "react";
import axios from "axios";

export default function UpdatePayment() {
  const [paymentId, setPaymentId] = useState("");
  const [method, setMethod] = useState("CASH");
  const [currentPayment, setCurrentPayment] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setCurrentPayment(null);

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:1405/api/payments/" + paymentId,
        {
          headers: { Authorization: "Bearer " + token },
        },
      );
      setCurrentPayment(res.data);
      setMethod(res.data.method);
    } catch (err) {
      setError(err.response?.data?.message || "Payment not found");
    }
  };

  const handleUpdate = async () => {
    setMessage("");
    setError("");

    try {
      let token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:1405/api/payments/" + paymentId,
        {
          invoiceId: currentPayment.invoiceId,
          amount: currentPayment.amount,
          method: method,
        },
        {
          headers: { Authorization: "Bearer " + token },
        },
      );

      setCurrentPayment(res.data);
      setMethod(res.data.method);

      setMessage(
        "Payment updated! " +
          "Payment ID: " +
          res.data.paymentId +
          " | Method changed to: " +
          res.data.method,
      );
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Update Payment</h1>

      <label>Payment ID: </label>
      <input
        type="number"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
        placeholder="Enter Payment ID"
        min={1}
      />
      <button onClick={handleSearch}>Search</button>

      <br />
      <br />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {currentPayment && (
        <div>
          <table border={1}>
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Invoice ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{currentPayment.paymentId}</td>
                <td>{currentPayment.invoiceId}</td>
                <td>{currentPayment.amount}</td>
                <td>{currentPayment.date}</td>
                <td>{currentPayment.method}</td>
                <td>{currentPayment.status}</td>
              </tr>
            </tbody>
          </table>

          <br />

          {currentPayment.status === "REFUNDED" ? (
            <p style={{ color: "orange" }}>Cannot update a refunded payment!</p>
          ) : (
            <div>
              <label>New Method: </label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="CASH">CASH</option>
                <option value="CARD">CARD</option>
                <option value="UPI">UPI</option>
                <option value="NET_BANKING">NET_BANKING</option>
              </select>

              <br />
              <br />

              <button onClick={handleUpdate}>Update Payment</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
