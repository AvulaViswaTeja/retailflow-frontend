import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';

export default function InsertCatalog() {
    let [effectiveDate, setEffectiveDate] = useState("");
    let [expiryDate, setExpiryDate] = useState("");
    let [status, setStatus] = useState("");
    let [productName, setProductName] = useState("");
    let [productId, setProductId] = useState("");
    let [allProducts, setAllProducts] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:8070/api/products", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setAllProducts(res.data);
        })
        .catch((err) => {
            console.error("Failed to load products:", err);
        });
    }, []);

    let showError = (message) => {
        setModalSuccess(false);
        setModalMessage(message);
        setShowModal(true);
    };

    let productNameHandler = (e) => {
        let name = e.target.value;
        setProductName(name);

        let found = allProducts.find(
            (p) => p.productName.toLowerCase() === name.toLowerCase()
        );

        if (found) {
            setProductId(found.productId);
        } else {
            setProductId("");
        }
    };

    let saveHandler = () => {

        if (!effectiveDate) {
            showError("Please select an Effective Date.");
            return;
        }

        if (!expiryDate) {
            showError("Please select an Expiry Date.");
            return;
        }

        if (expiryDate < effectiveDate) {
            showError("Expiry Date cannot be before Effective Date.");
            return;
        }

        if (!status) {
            showError("Please select a Status.");
            return;
        }

        if (!productId) {
            showError("Please select a valid product from the list.");
            return;
        }

        let url = "http://localhost:8070/api/catalogs";
        let data = {
            effectiveDate,
            expiryDate,
            status,
            productId: productId
        };
        let token = localStorage.getItem("token");

        axios.post(url, data, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            setModalSuccess(true);
            setModalMessage("Catalog added successfully!");
            setShowModal(true);
            setEffectiveDate("");
            setExpiryDate("");
            setStatus("");
            setProductName("");
            setProductId("");
        })
        .catch((error) => {
            showError("Failed to add catalog: " + (error.response?.data?.message || "Server error"));
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
                    <h4 className="mb-0">Add Catalog</h4>
                </div>
                <div className="card-body">

                    <div className="mb-3">
                        <label className="form-label">Effective Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={effectiveDate}
                            onChange={(e) => setEffectiveDate(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Expiry Date</label>
                        <input
                            type="date"
                            className="form-control"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
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

                    <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={productName}
                            onChange={productNameHandler}
                            placeholder="Select or type a product name"
                            list="productList"
                        />
                        <datalist id="productList">
                            {allProducts.map((p) => (
                                <option key={p.productId} value={p.productName} />
                            ))}
                        </datalist>
                        {productName && !productId && (
                            <small className="text-danger">
                                ⚠️ No product found with this name
                            </small>
                        )}
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-primary w-100"
                            onClick={saveHandler}
                        >
                            Add Catalog
                        </button>
                        <button
                            className="btn btn-secondary w-100"
                            onClick={() => {
                                setEffectiveDate("");
                                setExpiryDate("");
                                setStatus("");
                                setProductName("");
                                setProductId("");
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