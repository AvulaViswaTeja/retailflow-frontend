import axios from "axios";
import { useState } from "react";

export default function InsertCatalog() {
    let [effectiveDate, setEffectiveDate] = useState("");
    let [expiryDate, setExpiryDate] = useState("");
    let [status, setStatus] = useState("");
    let [productId, setProductId] = useState("");

    let effectiveDateHandler = (e) => {
        setEffectiveDate(e.target.value);
    };

    let expiryDateHandler = (e) => {
        setExpiryDate(e.target.value);
    };

    let productIdHandler = (e) => {
        setProductId(e.target.value);
    };

    let saveHandler = () => {
        let url = "http://localhost:1405/api/catalogs";
        let data = {
            "effectiveDate": effectiveDate,
            "expiryDate": expiryDate,
            "status": status,
            "productId": productId
        };
        axios.post(url, data, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            alert("Catalog added successfully");
            console.log(response.data);
        }).catch((error) => {
            if (error.response) {
                console.error("Status:", error.response.status);
                console.error("Data:", error.response.data);
            } else {
                console.error("Network Error:", error.message);
            }
        });
    };

    return (
        <div>
            <div className="mb-3">
            <label className="form-label">Effective Date</label>
            <input type="date" className="form-control" value={effectiveDate} onChange={effectiveDateHandler} />
            </div>


            <div className="mb-3">
            <label className="form-label">Expiry Date</label>
            <input type="date" className="form-control" value={expiryDate} onChange={expiryDateHandler} />
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
            <label className="form-label">Product ID</label>
            <input type="number" className="form-control" value={productId} onChange={productIdHandler} />
            </div>

            <br />

            <div className="d-flex gap-2">
                <button className="btn btn-primary w-100" onClick={saveHandler}>
                                    Add Catalog
                </button>
                <button className="btn btn-secondary w-100"
                    onClick={() => {
                        setEffectiveDate("");
                        setExpiryDate("");
                        setStatus("");
                        setProductId("");
                    }}>
                    Reset
                </button>
            </div>

        </div>
    );
}