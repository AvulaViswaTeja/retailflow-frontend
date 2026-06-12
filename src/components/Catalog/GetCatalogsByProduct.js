import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';

export default function GetCatalogsByProduct() {
    let [productName, setProductName] = useState("");
    let [productId, setProductId] = useState("");
    let [allProducts, setAllProducts] = useState([]);
    let [catalogs, setCatalogs] = useState([]);
    let [error, setError] = useState("");
    let [showErrorModal, setShowErrorModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");

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

    let productNameHandler = (e) => {
        let name = e.target.value;
        setProductName(name);
        setCatalogs([]);
        setError("");

        let found = allProducts.find(
            (p) => p.productName.toLowerCase() === name.toLowerCase()
        );

        if (found) {
            setProductId(found.productId);
        } else {
            setProductId("");
        }
    };

    let searchHandler = () => {
        if (!productId) {
            setModalMessage("Please select a valid product from the list");
            setShowErrorModal(true);
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/catalogs/product/" + productId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            setCatalogs(response.data);
            setError("");

            if (response.data.length === 0) {
                setError("No catalogs found for product: " + productName);
            }
        })
        .catch(() => {
            setCatalogs([]);
            setError("No catalogs found for product: " + productName);
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
                    <h4 className="mb-0">Get Catalogs By Product</h4>
                </div>
                <div className="card-body">

                    <div className="input-group mb-1">
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
                        <button className="btn btn-primary" onClick={searchHandler}>
                            Search
                        </button>
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}

                    {catalogs.length > 0 && (
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Catalog ID</th>
                                        <th>Effective Date</th>
                                        <th>Expiry Date</th>
                                        <th>Status</th>
                                        <th>Product ID</th>
                                        <th>Product Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {catalogs.map((catalog) => (
                                        <tr key={catalog.catalogId}>
                                            <td>{catalog.catalogId}</td>
                                            <td>{catalog.effectiveDate}</td>
                                            <td>{catalog.expiryDate}</td>
                                            <td>
                                                <span className={`badge ${
                                                    catalog.status === "ACTIVE" ? "bg-success" :
                                                    catalog.status === "INACTIVE" ? "bg-danger" :
                                                    "bg-secondary"
                                                }`}>
                                                    {catalog.status}
                                                </span>
                                            </td>
                                            <td>{catalog.productId}</td>
                                            <td>{productName}</td>
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
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => setShowErrorModal(false)}
                    ></div>
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