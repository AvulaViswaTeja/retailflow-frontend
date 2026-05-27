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
        let token = localStorage.getItem("token");
        axios.get("http://localhost:1405/api/catalogs/" + catalogIdToFetch, {
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
        let token = localStorage.getItem("token");
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
    <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Update Catalog</h4>
            </div>
            <div className="card-body">

                {/* Search box — only when coming from nav */}
                {!id && (
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
                )}

                {/* Edit form — shown after catalog found */}
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
    </div>
);
}