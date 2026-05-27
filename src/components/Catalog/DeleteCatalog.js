import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DeleteCatalog() {
    let navigate = useNavigate();

    let [searchId, setSearchId] = useState("");
    let [catalog, setCatalog] = useState(null);
    let [catalogFound, setCatalogFound] = useState(false);

    let searchHandler = () => {
        if (!searchId) {
            alert("Please enter a Catalog ID");
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
                alert("Catalog not found with ID: " + searchId);
                setCatalogFound(false);
                setCatalog(null);
            });
    };

    let deleteHandler = () => {
        if (window.confirm("Are you sure you want to permanently delete this catalog?")) {
            let token = localStorage.getItem("token");
            axios.delete("http://localhost:1405/api/catalogs/" + searchId, {
            headers: { "Authorization": "Bearer " + token }
        })
                .then(() => {
                    alert("Catalog deleted successfully!");
                    navigate("/Catalog/getAll");
                })
                .catch((error) => {
                    alert("Delete failed: " + (error.response?.data?.message || "Server error"));
                });
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
                        onChange={(e) => setSearchId(e.target.value)}
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
                                    onClick={deleteHandler}
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
    </div>
);
}