import axios from "axios";
import { useState, useEffect } from "react";

export default function AddProduct() {
    let [productName, setProductName] = useState("");
    let [category, setCategory] = useState("");
    let [categories, setCategories] = useState([]);
    let [products, setProducts] = useState([]);
    let [price, setPrice] = useState("");
    let [status, setStatus] = useState("");
    let [showModal, setShowModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    useEffect(() => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:8070/api/products", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setProducts(res.data);
            let uniqueCategories = [...new Set(res.data.map((p) => p.category))];
            setCategories(uniqueCategories);
        })
        .catch((err) => {
            console.error("Failed to load categories:", err);
        });
    }, []);

    let showError = (message) => {
        setModalSuccess(false);
        setModalMessage(message);
        setShowModal(true);
    };

    let saveHandler = () => {
        if (!productName) {
            showError("Please enter a product name");
            return;
        }

        if (!category) {
            showError("Please select or enter a category");
            return;
        }

        if (!price) {
            showError("Please enter a price");
            return;
        }

        if (!status) {
            showError("Please select a status");
            return;
        }

        
        let isDuplicate = products.some(
            (p) => p.productName.toLowerCase() === productName.toLowerCase()
        );

        if (isDuplicate) {
            showError(`Product "${productName}" already exists! Please use a different name.`);
            return;
        }

        let url = "http://localhost:8070/api/products";
        let data = { productName, category, price, status };
        let token = localStorage.getItem("token");

        axios.post(url, data, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setModalSuccess(true);
            setModalMessage("Product added successfully!");
            setShowModal(true);
            setProducts([...products, res.data]);
            if (!categories.includes(category)) {
                setCategories([...categories, category]);
            }
            setProductName("");
            setCategory("");
            setPrice("");
            setStatus("");
        })
        .catch((error) => {
            showError("Failed to add product: " + (error.response?.data?.message || "Server error"));
        });
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Add Product</h4>
                </div>
                <div className="card-body">

                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Enter product name"
                        />
                       
                        {productName && products.some(
                            (p) => p.productName.toLowerCase() === productName.toLowerCase()
                        ) && (
                            <small className="text-danger">
                                ⚠️ Product "{productName}" already exists!
                            </small>
                        )}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input
                            type="text"
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            placeholder="Select or type a category"
                            list="categoryList"
                        />
                        <datalist id="categoryList">
                            {categories.map((cat, index) => (
                                <option key={index} value={cat} />
                            ))}
                        </datalist>
                        <small className="text-muted">
                            Select an existing category or type a new one
                        </small>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            min={0}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Enter price"
                        />
                    </div>

                    <div className="mb-3">
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

                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-primary w-100"
                            onClick={saveHandler}
                        >
                            Add Product
                        </button>
                        <button
                            className="btn btn-secondary w-100"
                            onClick={() => {
                                setProductName("");
                                setCategory("");
                                setPrice("");
                                setStatus("");
                            }}
                        >
                            Reset
                        </button>
                    </div>

                </div>
            </div>

           
            {showModal && (
                <>
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => setShowModal(false)}
                    ></div>

                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className={`modal-header ${modalSuccess ? "bg-success" : "bg-danger"} text-white`}>
                                    <h5 className="modal-title">
                                        {modalSuccess ? "✅ Success" : "❌ Error"}
                                    </h5>
                                    <button
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <p className="mb-0">{modalMessage}</p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className={`btn ${modalSuccess ? "btn-success" : "btn-danger"} w-100`}
                                        onClick={() => setShowModal(false)}
                                    >
                                        OK
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}