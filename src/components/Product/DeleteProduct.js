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
        axios.get("http://localhost:8014/api/products/" + searchId, {
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
            axios.delete("http://localhost:8014/api/products/" + searchId, {
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
        <div>
            <div className="mb-3">
            <label className="form-label">Enter Product ID: </label>
            <input
                type="number"
                className="form-control"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter product ID"
            />
            </div>
            
            <button onClick={searchHandler} className="btn btn-primary">
                Search
            </button>

            <br /><br />

            {productFound && product && (
                <div>
                    <h3>Product Details</h3>
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

                    <br />

                    <button
                        onClick={deleteHandler}
                        className="btn btn-danger"
                    >
                        Delete Product
                    </button>
                    <button
                        onClick={() => navigate("/Product/getAll")}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}