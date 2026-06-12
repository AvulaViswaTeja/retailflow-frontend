import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router';

export default function GetProductById() {
    let [productId, setProductId] = useState("");
    let [product, setProduct] = useState(null);
    let [showErrorModal, setShowErrorModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");

    const navigate = useNavigate();

    let showError = (message) => {
        setModalMessage(message);
        setShowErrorModal(true);
    };

    let searchHandler = () => {
        if (!productId) {
            showError("Please enter a Product ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/products/" + productId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            setProduct(response.data);
        })
        .catch(() => {
            setProduct(null);
            showError("Product not found with ID: " + productId);
        });
    };

    return (
        <div className="container mt-4">

            {/* ✅ Back button */}
            <button
            onClick={() => navigate('/Product')}
            style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 8, fontSize: 12,
                color: '#fff', cursor: 'pointer',
                background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                border: 'none', marginBottom: 16,
            }}>
            ← Back
            </button>


            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Get Product By ID</h4>
                </div>
                <div className="card-body">

                    <div className="input-group mb-3">
                        <input
                            type="number"
                            className="form-control"
                            value={productId}
                            onChange={(e) => {
                                setProductId(e.target.value);
                                if (!e.target.value) {
                                    setProduct(null);
                                }
                            }}
                            placeholder="Enter Product ID"
                            min={1}
                        />
                        <button className="btn btn-primary" onClick={searchHandler}>
                            Search
                        </button>
                    </div>

                    {product && (
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
                                    <tr>
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