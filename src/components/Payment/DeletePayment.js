import axios from "axios";
import { useState } from "react";


//Refund == Delete Payment

export default function DeletePayment() {
  const [paymentId, setPaymentId] = useState("");
  const [currentPayment, setCurrentPayment] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setMessage("");
    setError("");
    setCurrentPayment(null);

    try {
      let token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:1405/api/payments/" + paymentId, {
            headers: { "Authorization": "Bearer " + token }
        });
      setCurrentPayment(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Payment not found");
    }
  };

  const handleRefund = async () => {
    setMessage("");
    setError("");

    try {
      await axios.patch("http://localhost:1405/api/payments/" + paymentId + "/refund");
      setMessage(
        "Payment ID: " + paymentId + " refunded successfully!"
      );
      setCurrentPayment(null);
      setPaymentId("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h1>Refund Payment</h1>

      {/* Search */}
      <label>Payment ID: </label>
      <input
        type="number"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
        placeholder="Enter Payment ID"
        min={1}
      />
      <button onClick={handleSearch}>Search</button>

      <br /><br />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* Current Payment Details */}
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

          {/* Block refund if already REFUNDED */}
          {currentPayment.status === "REFUNDED" ? (
            <p style={{ color: "orange" }}>
              This payment is already refunded!
            </p>
          ) : (
            <button
              onClick={handleRefund}
              style={{ color: "white", backgroundColor: "red" }}
            >
              Refund Payment
            </button>
          )}
        </div>
      )}
    </div>
  );
}