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
        axios.get("http://localhost:8014/api/products/" + pid)
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
        axios.put("http://localhost:8014/api/products/" + productId, {
            productName,
            category,
            price: parseFloat(price),
            status
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
            <h1>Update Product</h1>

      
            {!id && (
                <div>
                    <label>Enter Product ID: </label>
                    <input
                        type="number"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Enter product ID"
                    />
                    <button onClick={searchHandler}>Search</button>
                    <br /><br />
                </div>
            )}

            
            {productFound && (
                <div>
                    <h3>Editing Product ID: {productId}</h3>

                    <label>Product Name: </label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                    />
                    <br /><br />

                    <label>Category: </label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter category"
                    />
                    <br /><br />

                    <label>Price: </label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                    />
                    <br /><br />

                    <label>Status: </label>
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="ACTIVE / INACTIVE"
                    />
                    <br /><br />

                    <button onClick={updateHandler}>Update Product</button>
                    <button
                        onClick={() => navigate("/Product/getAll")}
                        style={{ marginLeft: "10px" }}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}