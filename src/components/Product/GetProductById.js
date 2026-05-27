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
        <div>
            <div className="mb-3">
            <label className="form-label">Enter Product ID: </label>
            <input
                type="number"
                className="form-control"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter product ID"
            />
            </div>
            <button className="btn btn-primary" onClick={searchHandler}>
                Search
            </button>

            

            
            {error && <p>{error}</p>}

            
            {product && (
                <table className="table table-border">
                    <thead>
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
                            <td>{product.price}</td>
                            <td>{product.status}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}