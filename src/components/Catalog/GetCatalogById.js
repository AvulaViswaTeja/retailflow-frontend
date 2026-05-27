import axios from "axios";
import { useState } from "react";

export default function GetCatalogById() {
    let [catalogId, setCatalogId] = useState("");
    let [catalog, setCatalog] = useState(null);
    let [error, setError] = useState("");

    let searchHandler = () => {
        if (!catalogId) {
            alert("Please enter a Catalog ID");
            return;
        }
        let token = localStorage.getItem("token");

        let url = "http://localhost:1405/api/catalogs/" + catalogId;

        axios.get(url, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            setCatalog(response.data);
            setError("");
        })
        .catch((error) => {
            setCatalog(null);
            setError("Catalog not found with ID: " + catalogId);
            console.error("Error:", error);
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
                        onChange={(e) => setCatalogId(e.target.value)}
                        placeholder="Enter Catalog ID"
                        min={1}
                    />
                    <button className="btn btn-primary" onClick={searchHandler}>
                        Search
                    </button>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

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
    </div>
);
}