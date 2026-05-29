import axios from "axios";
import { useState, useEffect } from "react";

export default function GetProductsByCategory() {

    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:1405/api/products", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            let uniqueCategories = [...new Set(res.data.map((p) => p.category))];
            setCategories(uniqueCategories);
        })
        .catch((err) => {
            console.error("Failed to load categories:", err);
        });
    }, []);

    let showError = (message) => {
        setModalMessage(message);
        setShowErrorModal(true);
    };

    let searchHandler = () => {
        if (!category) {
            showError("Please select or enter a category");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/products/category/" + category, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setProducts(res.data);

            if (res.data.length === 0) {
                showError("No products found for category: " + category);
            }
        })
        .catch(() => {
            setProducts([]);
            showError("No products found for category: " + category);
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
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setProducts([]);
                            }}
                            placeholder="Select or type a category"
                            list="categoryList"
                        />
                        <datalist id="categoryList">
                            {categories.map((cat, index) => (
                                <option key={index} value={cat} />
                            ))}
                        </datalist>
                        <button className="btn btn-primary" onClick={searchHandler}>
                            Search
                        </button>
                    </div>

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

            
            {showErrorModal && (
                <>
                    <div className="modal-backdrop fade show" onClick={() => setShowErrorModal(false)}></div>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-danger text-white">
                                    <h5 className="modal-title">❌ Error</h5>
                                    <button
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowErrorModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p className="mb-0">{modalMessage}</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() => setShowErrorModal(false)}
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