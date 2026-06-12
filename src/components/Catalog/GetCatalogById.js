import axios from "axios";
import { useState } from "react";

export default function GetCatalogById() {
    let [catalogId, setCatalogId] = useState("");
    let [catalog, setCatalog] = useState(null);
    let [showErrorModal, setShowErrorModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");

    let showError = (message) => {
        setModalMessage(message);
        setShowErrorModal(true);
    };

    let searchHandler = () => {
        if (!catalogId) {
            showError("Please enter a Catalog ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/catalogs/" + catalogId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            setCatalog(response.data);
        })
        .catch(() => {
            setCatalog(null);
            
            showError("Catalog not found with ID: " + catalogId);
        });
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Get Catalog By ID</h4>
                </div>
                <div className="card-body">

                    <div className="input-group mb-3">
                        <input
                            type="number"
                            className="form-control"
                            value={catalogId}
                            onChange={(e) => {
                                setCatalogId(e.target.value);
                                if (!e.target.value) {
                                    setCatalog(null);
                                }
                            }}
                            placeholder="Enter Catalog ID"
                            min={1}
                        />
                        <button className="btn btn-primary" onClick={searchHandler}>
                            Search
                        </button>
                    </div>

                    {catalog && (
                        <div className="table-responsive">
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