import axios from "axios";
import { useState } from "react";

export default function GetCatalogsByProduct() {
    let [productId, setProductId] = useState("");
    let [catalogs, setCatalogs] = useState([]);
    let [error, setError] = useState("");

    let searchHandler = () => {
        if (!productId) {
            alert("Please enter a Product ID");
            return;
        }
        let token = localStorage.getItem("token");

        let url = "http://localhost:1405/api/catalogs/product/" + productId;

        axios.get(url, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            setCatalogs(response.data);
            setError("");

            if (response.data.length === 0) {
                setError("No catalogs found for Product ID: " + productId);
            }
        })
        .catch((error) => {
            setCatalogs([]);
            setError("No catalogs found for Product ID: " + productId);
            console.error("Error:", error);
        });
    };

    return (
    <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Get Catalogs By Product</h4>
            </div>
            <div className="card-body">

                <div className="input-group mb-3">
                    <input
                        type="number"
                        className="form-control"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        placeholder="Enter Product ID"
                        min={1}
                    />
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    </div>
);
}