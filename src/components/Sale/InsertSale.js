import axios from "axios";
import { useState, useEffect } from "react";

export default function InsertSale() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [status, setStatus] = useState("COMPLETED");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

 useEffect(()=>{
  let token = localStorage.getItem("token");
  axios.get("http://localhost:8070/api/products",{
    headers:{"Authorization":"Bearer "+token}
  }).then((res)=>{
    setProducts(res.data);
  }).catch((err)=>{
    setError("Failed to load products");
  })
 },[])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const req_data = {
      productId: parseInt(productId),
      customerId: parseInt(customerId),
      quantity: parseInt(quantity),
      status: status,
    };

    try {
      let token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8070/api/sales", req_data,{
            headers: { "Authorization": "Bearer " + token }
        });
      const sale = res.data;
      setError("");
      setMessage(
        "Sale created! " +
          "Sale ID: " + sale.saleId +
          " | Product: " + sale.productName +
          " | Amount: ₹" + sale.amount +
          " | Invoice ID: " + sale.invoiceId
      );
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Create New Sale</h4>
        </div>
        <div className="card-body">

          {message && (
            <div className="alert alert-success alert-dismissible">
              {message}
            </div>
          )}
          {error && (
            <div className="alert alert-danger alert-dismissible">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product</label>
              <select
                className="form-select"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
              >
                <option value="">-- Select Product --</option>
                {products.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName} — ₹{product.price} ({product.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Customer ID</label>
              <input
                type="number"
                className="form-control"
                min={1}
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Enter Customer ID"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter Quantity"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="COMPLETED">COMPLETED</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Create Sale
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}