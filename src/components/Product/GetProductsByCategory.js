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

        axios.get("http://localhost:1405/api/products/category/" + category, {
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
    <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Get Products By Category</h4>
            </div>
            <div className="card-body">

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Food, Oil"
                    />
                    <button className="btn btn-primary" onClick={searchHandler}>
                        Search
                    </button>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {products.length > 0 && (
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
                                {products.map((product) => (
                                    <tr key={product.productId}>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    </div>
);
}