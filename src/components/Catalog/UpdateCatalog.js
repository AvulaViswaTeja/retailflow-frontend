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

        axios.get("http://localhost:8014/api/catalogs/" + catalogIdToFetch, {
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

        axios.put("http://localhost:8014/api/catalogs/" + catalogId, {
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
                <div>
                    <label>Enter Catalog ID: </label>
                    <input
                        type="number"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Enter catalog ID"
                    />
                    <button onClick={searchHandler}>Search</button>
                    <br /><br />
                </div>
            )}

            
            {catalogFound && (
                <div>
                    <h3>Editing Catalog ID: {catalogId}</h3>

                    <label>Effective Date: </label>
                    <input
                        type="date"
                        value={effectiveDate}
                        onChange={(e) => setEffectiveDate(e.target.value)}
                    />
                    <br /><br />

                    <label>Expiry Date: </label>
                    <input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                    <br /><br />

                    <label>Status: </label>
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="ACTIVE / INACTIVE"
                    />
                    <br /><br />

                    <label>Product ID: </label>
                    <input
                        type="number"
                        value={productId}
                        readOnly
                        
                    />
                    <small>
                        (Product ID cannot be changed)
                    </small>
                    <br /><br />

                    <button onClick={updateHandler}>Update Catalog</button>
                    <button
                        onClick={() => navigate("/Catalog/getAll")}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}