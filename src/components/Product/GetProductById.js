import axios from "axios";
import { useState } from "react";

export default function GetProductById() {
    let [productId, setProductId] = useState("");
    let [product, setProduct] = useState(null);
    let [error, setError] = useState("");

    let searchHandler = () => {
        if (!productId) {
            alert("Please enter a Product ID");
            return;
        }

        axios.get("http://localhost:8014/api/products/" + productId)
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
            <h1>Get Product By ID</h1>

            <label>Enter Product ID: </label>
            <input
                type="number"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter product ID"
            />
            <button onClick={searchHandler}>Search</button>

            <br /><br />

            
            {error && <p>{error}</p>}

            
            {product && (
                <table border="1">
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