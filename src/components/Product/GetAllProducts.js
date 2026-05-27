import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function GetAllProducts() {
    let [products, setProducts] = useState([]);

    const fetchProducts = () => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:1405/api/products", {
            headers: { "Authorization": "Bearer " + token }
        })
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    let deleteHandler = (id) => {

        let token = localStorage.getItem("token");

        if (window.confirm("This will mark the product as INACTIVE. Continue?")) {
            axios.delete("http://localhost:1405/api/products/" + id, {
            headers: { "Authorization": "Bearer " + token }
        })
                .then(() => {
                    alert("Product marked as INACTIVE!");
                    fetchProducts(); 
                })
                .catch(() => alert("Delete failed!"));
        }
    };

    return (
    <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">All Products</h4>
                <span className="badge bg-light text-primary">
                    Total: {products.length}
                </span>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
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
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm me-2"
                                            onClick={() => deleteHandler(product.productId)}
                                        >
                                            Delete
                                        </button>
                                        <Link
                                            className="btn btn-secondary btn-sm"
                                            to={`/Product/update/${product.productId}`}
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);
}