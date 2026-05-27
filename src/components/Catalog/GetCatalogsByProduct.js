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
        <div>
            <div className="mb-3">
            <label className="form-label">Enter Product ID: </label>
            <input
                type="number"
                className="form-control"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter product ID"
            />
            </div>

            <button className="btn btn-primary" onClick={searchHandler}>
                Search
            </button>

           
            {error && <p>{error}</p>}

           
            {catalogs.length > 0 && (
                <table className="table table-border">
                    <thead>
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
                                <td>{catalog.status}</td>
                                <td>{catalog.productId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}