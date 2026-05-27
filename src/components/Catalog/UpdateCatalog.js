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
        axios.get("http://localhost:1405/api/catalogs/" + catalogIdToFetch)
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
                alert("Catalog not found with ID: " + catalogIdToFetch);
                setCatalogFound(false);
            });
    };


    let searchHandler = () => {
        if (!searchId) {
            alert("Please enter a Catalog ID");
            return;
        }
        fetchCatalog(searchId);
    };

    let updateHandler = () => {
        axios.put("http://localhost:1405/api/catalogs/" + catalogId, {
            effectiveDate,
            expiryDate,
            status,
            productId: parseInt(productId)
        }, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            alert("Catalog updated successfully!");
            navigate("/Catalog/getAll");
        })
        .catch((error) => {
            alert("Update failed: " + (error.response?.data?.message || "Server error"));
        });
    };

    return (
        <div>

            
            {!id && (
                <div className="mb-3">
                    <label className="form-label">Enter Catalog ID: </label>
                    <input
                        type="number"
                        className="form-control"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Enter catalog ID"
                    />
                    <br /><br />
                    <button className="btn btn-primary" onClick={searchHandler}>
                        Search
                    </button>
                    <br /><br />
                </div>
            )}

            
            {catalogFound && (
                <div>
                    <div className="mb-3">
                    <h3>Editing Catalog ID: {catalogId}</h3>

                    <label className="form-label">Effective Date: </label>
                    <input
                        type="date"
                        value={effectiveDate}
                        onChange={(e) => setEffectiveDate(e.target.value)}
                        className="form-control"
                    />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">Expiry Date: </label>
                    <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="form-control"
                    />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Status</label>
                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}>
                            <option value="">-- Select Status --</option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                        </select>
                    </div>

                    <div className="mb-3">

                    <label className="form-label">Product ID: </label>
                    <input
                        type="number"
                        value={productId}
                        readOnly
                        className="form-control"
                    />
                    <small>
                        (Product ID cannot be changed)
                    </small>
                    </div>

                    <div className="d-flex gap-2">
                    <button className="btn btn-primary" onClick={updateHandler}>
                        Update Catalog
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/Catalog/getAll")}
                    >
                        Cancel
                    </button>
                    </div>
                </div>
            )}
        </div>
    );
}