import axios from "axios";
import { useState } from "react";

export default function AddCatalog() {
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

    let statusHandler = (e) => {
        setStatus(e.target.value);
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
        axios.post(url, data).then((response) => {
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
            <label>Effective Date</label>
            <input type="date" value={effectiveDate} onChange={effectiveDateHandler} />
            <br />

            <label>Expiry Date</label>
            <input type="date" value={expiryDate} onChange={expiryDateHandler} />
            <br />

            <label>Status</label>
            <input value={status} onChange={statusHandler} />
            <br />

            <label>Product ID</label>
            <input type="number" value={productId} onChange={productIdHandler} />
            <br />

            <button onClick={saveHandler}>Add Catalog</button>
        </div>
    );
}