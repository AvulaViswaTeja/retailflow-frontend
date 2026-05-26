import axios from "axios";
import { useState } from "react";

export default function GetProductsByCategory() {

    const [category, setCategory] = useState("");
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    let searchHandler = () => {
        if (!category) {
            alert("Please enter a category");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:8014/api/products/category/" + category, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setProducts(res.data);
            setError("");

            if (res.data.length === 0) {
                setError("No products found for category: " + category);
            }
        })
        .catch(() => {
            setProducts([]);
            setError("No products found for category: " + category);
        });
    };

    return (
        <div>

            <label>Enter Category: </label>
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Food, Oil"
            />
            <button onClick={searchHandler}>Search</button>

            <br /><br />

            
            {error && <p style={{ color: "red" }}>{error}</p>}

          
            {products.length > 0 && (
                <table border="1" cellPadding="10" cellSpacing="0">
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
                        {products.map((product) => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}