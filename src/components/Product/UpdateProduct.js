import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function UpdateProduct() {
    let { id } = useParams();
    let navigate = useNavigate();

    let [searchName, setSearchName] = useState("");
    let [allProducts, setAllProducts] = useState([]);
    let [categories, setCategories] = useState([]);
    let [productFound, setProductFound] = useState(false);
    let [productId, setProductId] = useState("");
    let [productName, setProductName] = useState("");
    let [category, setCategory] = useState("");
    let [price, setPrice] = useState("");
    let [status, setStatus] = useState("");

    let [showErrorModal, setShowErrorModal] = useState(false);
    let [showResultModal, setShowResultModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    useEffect(() => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:8070/api/products", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setAllProducts(res.data);
            let uniqueCategories = [...new Set(res.data.map((p) => p.category))];
            setCategories(uniqueCategories);
        })
        .catch((err) => {
            console.error("Failed to load products:", err);
        });
    }, []);

    useEffect(() => {
        if (id) {
            fetchProductById(id);
        } else {
            resetForm();
        }
    }, [id]);

    let showError = (message) => {
        setModalMessage(message);
        setShowErrorModal(true);
    };

    let fetchProductById = (pid) => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:8070/api/products/" + pid, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            fillForm(response.data);
        })
        .catch(() => {
            showError("Product not found with ID: " + pid);
            setProductFound(false);
        });
    };

    let fillForm = (product) => {
        setProductId(product.productId);
        setProductName(product.productName);
        setCategory(product.category);
        setPrice(product.price);
        setStatus(product.status);
        setProductFound(true);
    };

    let resetForm = () => {
        setProductFound(false);
        setSearchName("");
        setProductId("");
        setProductName("");
        setCategory("");
        setPrice("");
        setStatus("");
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
            fillForm(found);
        } else {
            setProductFound(false);
            showError("No product found with name: " + searchName);
        }
    };

    let updateHandler = () => {
        let token = localStorage.getItem("token");
        axios.put("http://localhost:8070/api/products/" + productId, {
            productName,
            category,
            price: parseFloat(price),
            status
        }, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            setModalSuccess(true);
            setModalMessage("Product updated successfully!");
            setShowResultModal(true);
        })
        .catch((error) => {
            setModalSuccess(false);
            setModalMessage("Update failed: " + (error.response?.data?.message || "Server error"));
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
                    <h4 className="mb-0">Update Product</h4>
                </div>
                <div className="card-body">

                    {!id && (
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={searchName}
                                onChange={(e) => {
                                    setSearchName(e.target.value);
                                    setProductFound(false);
                                    
                                    if (!e.target.value) {
                                        resetForm();
                                    }
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
                    )}

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
                                        placeholder="Select or type a category"
                                        list="categoryList"
                                    />
                                    <datalist id="categoryList">
                                        {categories.map((cat, index) => (
                                            <option key={index} value={cat} />
                                        ))}
                                    </datalist>
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