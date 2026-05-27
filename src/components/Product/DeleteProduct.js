import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DeleteProduct() {
    let navigate = useNavigate();

    let [searchId, setSearchId] = useState("");
    let [product, setProduct] = useState(null);
    let [productFound, setProductFound] = useState(false);

    let searchHandler = () => {

        let token = localStorage.getItem("token");

        if (!searchId) {
            alert("Please enter a Product ID");
            return;
        }
        axios.get("http://localhost:1405/api/products/" + searchId, {
            headers: { "Authorization": "Bearer " + token }
        })
            .then((response) => {
                setProduct(response.data);
                setProductFound(true);
            })
            .catch(() => {
                alert("Product not found with ID: " + searchId);
                setProductFound(false);
                setProduct(null);
            });
    };

    let deleteHandler = () => {

        let token = localStorage.getItem("token");

        if (window.confirm("This will mark the product as INACTIVE. Continue?")) {
            axios.delete("http://localhost:1405/api/products/" + searchId, {
            headers: { "Authorization": "Bearer " + token }
        })
                .then(() => {
                    alert("Product marked as INACTIVE!");
                    navigate("/Product/getAll");
                })
                .catch((error) => {
                    alert("Failed: " + (error.response?.data?.message || "Server error"));
                });
        }
    };

   return (
    <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-header bg-danger text-white">
                <h4 className="mb-0">Delete Product</h4>
            </div>
            <div className="card-body">

                <div className="input-group mb-3">
                    <input
                        type="number"
                        className="form-control"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Enter Product ID"
                        min={1}
                    />
                    <button className="btn btn-primary" onClick={searchHandler}>
                        Search
                    </button>
                </div>

                {productFound && product && (
                    <div>
                        <h6 className="text-muted mb-2">Product Details:</h6>
                        <div className="table-responsive mb-3">
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
                                        <td>{product.price}</td>
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

                        {product.status === "INACTIVE" ? (
                            <div className="alert alert-warning">
                                This product is already inactive!
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-danger w-100"
                                    onClick={deleteHandler}
                                >
                                    Delete Product
                                </button>
                                <button
                                    className="btn btn-secondary w-100"
                                    onClick={() => navigate("/Product/getAll")}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    </div>
);
}