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

        let url = "http://localhost:8014/api/catalogs/" + catalogId;

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
        <div>
            <div className="mb-3">
            <label className="form-label">Enter Catalog ID: </label>
            <input
                type="number"
                className="form-control"
                value={catalogId}
                onChange={(e) => setCatalogId(e.target.value)}
                placeholder="Enter catalog ID"
            />
            </div>
            <button className="btn btn-primary" onClick={searchHandler}>
                Search
            </button>

            
            {error && <p>{error}</p>}

            
            {catalog && (
                <table className="table table-border">
                    <thead>
                        <tr>
                            <th>ID</th>
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
                            <td>{catalog.status}</td>
                            <td>{catalog.productId}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}