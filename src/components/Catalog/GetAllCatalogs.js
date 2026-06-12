import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function GetAllCatalogs() {
    let [catalogs, setCatalogs] = useState([]);
    let [showConfirmModal, setShowConfirmModal] = useState(false);
    let [showResultModal, setShowResultModal] = useState(false);
    let [selectedId, setSelectedId] = useState(null);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const fetchCatalogs = () => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:8070/api/catalogs", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => setCatalogs(response.data))
        .catch((error) => console.error("Error fetching catalogs:", error));
    };

    useEffect(() => {
        fetchCatalogs();
    }, []);

    
    let openConfirmModal = (id) => {
        setSelectedId(id);
        setShowConfirmModal(true);
    };

    let deleteHandler = () => {
        let token = localStorage.getItem("token");
        setShowConfirmModal(false);

        axios.delete(`http://localhost:8070/api/catalogs/${selectedId}`, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            setModalSuccess(true);
            setModalMessage(`Catalog ID: ${selectedId} deleted successfully!`);
            setShowResultModal(true);
            fetchCatalogs();    
        })
        .catch(() => {
            setModalSuccess(false);
            setModalMessage("Delete failed! Please try again.");
            setShowResultModal(true);
        });
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">All Catalogs</h4>
                    <span className="badge bg-light text-primary">
                        Total: {catalogs.length}
                    </span>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Catalog ID</th>
                                    <th>Effective Date</th>
                                    <th>Expiry Date</th>
                                    <th>Status</th>
                                    <th>Product ID</th>
                                    <th>Actions</th>
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
                                        <td>
                                           
                                            <button
                                                className="btn btn-danger btn-sm me-2"
                                                onClick={() => openConfirmModal(catalog.catalogId)}
                                            >
                                                Delete
                                            </button>
                                            <Link
                                                className="btn btn-secondary btn-sm"
                                                to={`/Catalog/update/${catalog.catalogId}`}
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            
            {showConfirmModal && (
                <>
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => setShowConfirmModal(false)}
                    ></div>
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-warning text-dark">
                                    <h5 className="modal-title">⚠️ Confirm Delete</h5>
                                    <button
                                        className="btn-close"
                                        onClick={() => setShowConfirmModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>Are you sure you want to delete <strong>Catalog ID: {selectedId}</strong>?</p>
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

            
            {showResultModal && (
                <>
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => setShowResultModal(false)}
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
                                        onClick={() => setShowResultModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p className="mb-0">{modalMessage}</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className={`btn ${modalSuccess ? "btn-success" : "btn-danger"} w-100`}
                                        onClick={() => setShowResultModal(false)}
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