import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

export default function UpdateCatalog() {
    let { id } = useParams();
    let navigate = useNavigate();

    let [searchId, setSearchId] = useState("");
    let [catalogFound, setCatalogFound] = useState(false);
    let [catalogId, setCatalogId] = useState("");
    let [effectiveDate, setEffectiveDate] = useState("");
    let [expiryDate, setExpiryDate] = useState("");
    let [status, setStatus] = useState("");
    let [productId, setProductId] = useState("");

    
    let [showErrorModal, setShowErrorModal] = useState(false);
    let [showResultModal, setShowResultModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    useEffect(() => {
        if (id) {
            fetchCatalog(id);
        } else {
            setCatalogFound(false);
            setSearchId("");
            setCatalogId("");
            setEffectiveDate("");
            setExpiryDate("");
            setStatus("");
            setProductId("");
        }
    }, [id]);

    let fetchCatalog = (catalogIdToFetch) => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:8070/api/catalogs/" + catalogIdToFetch, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            let catalog = response.data;
            setCatalogId(catalog.catalogId);
            setEffectiveDate(catalog.effectiveDate);
            setExpiryDate(catalog.expiryDate);
            setStatus(catalog.status);
            setProductId(catalog.productId);
            setCatalogFound(true);
        })
        .catch(() => {
            setModalMessage("Catalog not found with ID: " + catalogIdToFetch);
            setShowErrorModal(true);
            setCatalogFound(false);
        });
    };

    let searchHandler = () => {
        if (!searchId) {
            setModalMessage("Please enter a Catalog ID");
            setShowErrorModal(true);
            return;
        }
        fetchCatalog(searchId);
    };

    let updateHandler = () => {
        let token = localStorage.getItem("token");
        axios.put("http://localhost:8070/api/catalogs/" + catalogId, {
            effectiveDate,
            expiryDate,
            status,
            productId: parseInt(productId)
        }, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            setModalSuccess(true);
            setModalMessage("Catalog updated successfully!");
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
            navigate("/Catalog/getAll");
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Update Catalog</h4>
                </div>
                <div className="card-body">

                   
                    {!id && (
                        <div className="input-group mb-3">
                            <input
                                type="number"
                                className="form-control"
                                value={searchId}
                                onChange={(e) => {
                                    setSearchId(e.target.value);
                                   
                                    if (!e.target.value) {
                                        setCatalogFound(false);
                                        setCatalogId("");
                                        setEffectiveDate("");
                                        setExpiryDate("");
                                        setStatus("");
                                        setProductId("");
                                    }
                                }}
                                placeholder="Enter Catalog ID"
                                min={1}
                            />
                            <button className="btn btn-primary" onClick={searchHandler}>
                                Search
                            </button>
                        </div>
                    )}

                
                    {catalogFound && (
                        <div>
                            <h6 className="text-muted mb-3">Editing Catalog ID: {catalogId}</h6>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Effective Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={effectiveDate}
                                        onChange={(e) => setEffectiveDate(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Expiry Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
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

                                <div className="col-md-6">
                                    <label className="form-label">Product ID</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={productId}
                                        readOnly
                                        style={{ backgroundColor: "#f0f0f0", cursor: "not-allowed" }}
                                    />
                                    <small className="text-muted">
                                        (Product ID cannot be changed)
                                    </small>
                                </div>
                            </div>

                            <div className="d-flex gap-2 mt-3">
                                <button
                                    className="btn btn-success w-100"
                                    onClick={updateHandler}
                                >
                                    Update Catalog
                                </button>
                                <button
                                    className="btn btn-secondary w-100"
                                    onClick={() => navigate("/Catalog/getAll")}
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