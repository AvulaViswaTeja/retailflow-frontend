import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function UpdateProduct() {
    let { id } = useParams();
    let navigate = useNavigate();

    let [searchId, setSearchId] = useState("");
    let [productFound, setProductFound] = useState(false);
    let [productId, setProductId] = useState("");
    let [productName, setProductName] = useState("");
    let [category, setCategory] = useState("");
    let [price, setPrice] = useState("");
    let [status, setStatus] = useState("");


    useEffect(() => {
        if (id) {
            fetchProduct(id);
        } else {
            setProductFound(false);
            setSearchId("");
            setProductId("");
            setProductName("");
            setCategory("");
            setPrice("");
            setStatus("");
        }
    }, [id]);

    let fetchProduct = (pid) => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:1405/api/products/" + pid, {
            headers: { "Authorization": "Bearer " + token }
        })
            .then((response) => {
                let product = response.data;
                setProductId(product.productId);
                setProductName(product.productName);
                setCategory(product.category);
                setPrice(product.price);
                setStatus(product.status);
                setProductFound(true);
            })
            .catch(() => {
                alert("Product not found with ID: " + pid);
                setProductFound(false);
            });
    };

    let searchHandler = () => {
        
        if (!searchId) {
            alert("Please enter a Product ID");
            return;
        }
        fetchProduct(searchId);
    };

    let updateHandler = () => {
        let token = localStorage.getItem("token");
        axios.put("http://localhost:1405/api/products/" + productId, {
            productName,
            category,
            price: parseFloat(price),
            status
        }, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            alert("Product updated successfully!");
            navigate("/Product/getAll");
        })
        .catch((error) => {
            alert("Update failed: " + (error.response?.data?.message || "Server error"));
        });
    };

    return (
    <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Update Product</h4>
            </div>
            <div className="card-body">

                {/* Search box — only when coming from nav */}
                {!id && (
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
                )}

                {/* Edit form — shown after product found */}
                {productFound && (
                    <div>
                        <h6 className="text-muted mb-3">Editing Product ID: {productId}</h6>

                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder="Enter product name"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Enter category"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Enter price"
                                    min={0}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-select"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">-- Select Status --</option>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                </select>
                            </div>
                        </div>

                        <div className="d-flex gap-2 mt-3">
                            <button
                                className="btn btn-success w-100"
                                onClick={updateHandler}
                            >
                                Update Product
                            </button>
                            <button
                                className="btn btn-secondary w-100"
                                onClick={() => navigate("/Product/getAll")}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </div>
);
}