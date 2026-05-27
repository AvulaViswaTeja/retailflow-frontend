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

        axios.get("http://localhost:8014/api/products/" + pid, {
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

        axios.put("http://localhost:8014/api/products/" + productId, {
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
        <div>
           
            {!id && (
                <div className="mb-3">
                    <label className="form-label">Enter Product ID: </label>
                    <input
                        type="number"
                        className="form-control"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Enter product ID"
                    />
                    <br /><br />
                    <button className="btn btn-primary" onClick={searchHandler}>
                        Search
                    </button>
                    <br /><br />
                </div>
            )}

            
            {productFound && (
                <div>
                    <div className="mb-3">
                        <h3>Editing Product ID: {productId}</h3>
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Product Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                    />
                    </div>
                    
                    <div className="mb-3">
                    <label className="form-label">Category: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter category"
                    />
                    </div>

                    <div className="mb-3">

                    <label className="form-label">Price: </label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                    />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Status</label>
                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value="">-- Select Status --</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                        </select>
                    </div>

                    <div className="d-flex gap-2">
                    <button onClick={updateHandler} className="btn btn-primary">
                        Update Product
                    </button>
                    <button
                        onClick={() => navigate("/Product/getAll")}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    </div>
                </div>
            )}
        </div>
    );
}