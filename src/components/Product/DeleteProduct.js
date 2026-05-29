import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function DeleteProduct() {
    let navigate = useNavigate();

    let [searchName, setSearchName] = useState("");
    let [allProducts, setAllProducts] = useState([]);
    let [product, setProduct] = useState(null);
    let [productFound, setProductFound] = useState(false);

    let [showConfirmModal, setShowConfirmModal] = useState(false);
    let [showResultModal, setShowResultModal] = useState(false);
    let [showErrorModal, setShowErrorModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    useEffect(() => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:1405/api/products", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => setAllProducts(res.data))
        .catch((err) => console.error("Failed to load products:", err));
    }, []);

    let showError = (message) => {
        setModalMessage(message);
        setShowErrorModal(true);
    };

    let searchHandler = () => {
        if (!searchName) {
            showError("Please enter a product name");
            return;
        }

        let found = allProducts.find(
            (p) => p.productName.toLowerCase() === searchName.toLowerCase()
        );

        if (found) {
            setProduct(found);
            setProductFound(true);
        } else {
            setProduct(null);
            setProductFound(false);
            // ✅ Show as modal instead of inline alert
            showError("No product found with name: " + searchName);
        }
    };

    let deleteHandler = () => {
        let token = localStorage.getItem("token");
        setShowConfirmModal(false);

        axios.delete("http://localhost:1405/api/products/" + product.productId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            setModalSuccess(true);
            setModalMessage(`Product "${product.productName}" marked as INACTIVE successfully!`);
            setShowResultModal(true);
            setAllProducts(allProducts.map((p) =>
                p.productId === product.productId
                    ? { ...p, status: "INACTIVE" }
                    : p
            ));
            setProduct({ ...product, status: "INACTIVE" });
        })
        .catch((error) => {
            setModalSuccess(false);
            setModalMessage("Failed: " + (error.response?.data?.message || "Server error"));
            setShowResultModal(true);
        });
    };

    let closeResultModal = () => {
        setShowResultModal(false);
        if (modalSuccess) {
            navigate("/Product/getAll");
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
                            type="text"
                            className="form-control"
                            value={searchName}
                            onChange={(e) => {
                                setSearchName(e.target.value);
                                setProductFound(false);
                                setProduct(null);
                            }}
                            placeholder="Enter or select product name"
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

                            {product.status === "INACTIVE" ? (
                                <div className="alert alert-warning">
                                    ⚠️ This product is already inactive!
                                </div>
                            ) : (
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() => setShowConfirmModal(true)}
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

            {/* ✅ Error / Validation Modal */}
            {showErrorModal && (
                <>
                    <div className="modal-backdrop fade show" onClick={() => setShowErrorModal(false)}></div>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-danger text-white">
                                    <h5 className="modal-title">❌ Error</h5>
                                    <button className="btn-close btn-close-white" onClick={() => setShowErrorModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p className="mb-0">{modalMessage}</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger w-100" onClick={() => setShowErrorModal(false)}>
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ✅ Confirm Delete Modal */}
            {showConfirmModal && (
                <>
                    <div className="modal-backdrop fade show" onClick={() => setShowConfirmModal(false)}></div>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-warning text-dark">
                                    <h5 className="modal-title">⚠️ Confirm Delete</h5>
                                    <button className="btn-close" onClick={() => setShowConfirmModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to mark <strong>"{product?.productName}"</strong> as INACTIVE?</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary w-50"
                                        onClick={() => setShowConfirmModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-danger w-50"
                                        onClick={deleteHandler}
                                    >
                                        Yes, Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ✅ Result Modal (success or error) */}
            {showResultModal && (
                <>
                    <div className="modal-backdrop fade show" onClick={closeResultModal}></div>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className={`modal-header ${modalSuccess ? "bg-success" : "bg-danger"} text-white`}>
                                    <h5 className="modal-title">
                                        {modalSuccess ? "✅ Success" : "❌ Error"}
                                    </h5>
                                    <button className="btn-close btn-close-white" onClick={closeResultModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p className="mb-0">{modalMessage}</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className={`btn ${modalSuccess ? "btn-success" : "btn-danger"} w-100`}
                                        onClick={closeResultModal}
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