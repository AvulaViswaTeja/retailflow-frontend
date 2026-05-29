import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DeleteCatalog() {
    let navigate = useNavigate();

    let [searchId, setSearchId] = useState("");
    let [catalog, setCatalog] = useState(null);
    let [catalogFound, setCatalogFound] = useState(false);
    let [showConfirmModal, setShowConfirmModal] = useState(false);
    let [showResultModal, setShowResultModal] = useState(false);
    let [showErrorModal, setShowErrorModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    let searchHandler = () => {
        if (!searchId) {
            setModalMessage("Please enter a Catalog ID");
            setShowErrorModal(true);
            return;
        }

        let token = localStorage.getItem("token");
        axios.get("http://localhost:1405/api/catalogs/" + searchId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            setCatalog(response.data);
            setCatalogFound(true);
        })
        .catch(() => {
            setModalMessage("Catalog not found with ID: " + searchId);
            setShowErrorModal(true);
            setCatalogFound(false);
            setCatalog(null);
        });
    };

    let deleteHandler = () => {
        let token = localStorage.getItem("token");
        setShowConfirmModal(false);

        axios.delete("http://localhost:1405/api/catalogs/" + searchId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            setModalSuccess(true);
            setModalMessage("Catalog deleted successfully!");
            setShowResultModal(true);
        })
        .catch((error) => {
            setModalSuccess(false);
            setModalMessage("Delete failed: " + (error.response?.data?.message || "Server error"));
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
                <div className="card-header bg-danger text-white">
                    <h4 className="mb-0">Delete Catalog</h4>
                </div>
                <div className="card-body">

                    <div className="input-group mb-3">
                        <input
                            type="number"
                            className="form-control"
                            value={searchId}
                            onChange={(e) => {
                                setSearchId(e.target.value);
                                // ✅ Clear catalog data when search field is cleared
                                if (!e.target.value) {
                                    setCatalog(null);
                                    setCatalogFound(false);
                                }
                            }}
                            placeholder="Enter Catalog ID"
                            min={1}
                        />
                        <button className="btn btn-primary" onClick={searchHandler}>
                            Search
                        </button>
                    </div>

                    {catalogFound && catalog && (
                        <div>
                            <h6 className="text-muted mb-2">Catalog Details:</h6>
                            <div className="table-responsive mb-3">
                                <table className="table table-bordered table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Catalog ID</th>
                                            <th>Effective Date</th>
                                            <th>Expiry Date</th>
                                            <th>Status</th>
                                            <th>Product ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
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
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {catalog.status === "INACTIVE" ? (
                                <div className="alert alert-warning">
                                    ⚠️ This catalog is already inactive!
                                </div>
                            ) : (
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() => setShowConfirmModal(true)}
                                    >
                                        Delete Catalog
                                    </button>
                                    <button
                                        className="btn btn-secondary w-100"
                                        onClick={() => navigate("/Catalog/getAll")}
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
                                    <p>Are you sure you want to delete <strong>Catalog ID: {searchId}</strong>?</p>
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