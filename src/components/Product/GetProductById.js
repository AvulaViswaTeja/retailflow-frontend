import axios from "axios";
import { useState } from "react";

export default function GetProductById() {
    let [productId, setProductId] = useState("");
    let [product, setProduct] = useState(null);
    let [error, setError] = useState("");

    let searchHandler = () => {

        let token = localStorage.getItem("token");

        if (!productId) {
            alert("Please enter a Product ID");
            return;
        }

        axios.get("http://localhost:1405/api/products/" + productId, {
            headers: { "Authorization": "Bearer " + token }
        })
            .then((response) => {
                setProduct(response.data);
                setError("");
            })
            .catch(() => {
                setProduct(null);
                setError("Product not found with ID: " + productId);
            });
    };

    return (
    <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Get Product By ID</h4>
            </div>
            <div className="card-body">

                <div className="input-group mb-3">
                    <input
                        type="number"
                        className="form-control"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        placeholder="Enter Product ID"
                        min={1}
                    />
                    <button className="btn btn-primary" onClick={searchHandler}>
                        Search
                    </button>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {product && (
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{product.productId}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.category}</td>
                                    <td>₹{product.price}</td>
                                    <td>
                                        <span className={`badge ${
                                            product.status === "ACTIVE" ? "bg-success" :
                                            product.status === "INACTIVE" ? "bg-danger" :
                                            "bg-secondary"
                                        }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    </div>
);
}