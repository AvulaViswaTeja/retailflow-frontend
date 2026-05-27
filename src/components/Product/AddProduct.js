import axios from "axios";
import { useState } from "react";

export  default function AddProduct(){
    let [productName, setProductName] = useState("");
    let [category, setCategory] = useState("");
    let [price, setPrice] = useState("");
    let [status, setStatus] = useState("");
    const token = localStorage.getItem("token");
    let nameHandler = (e) => {
        setProductName(e.target.value);
    };

    let categoryHandler = (e) => {
        setCategory(e.target.value);
    };

    let priceHandler = (e) => {
        setPrice(parseFloat(e.target.value));
    };

    let saveHandler=()=>{
        let url="http://localhost:1405/api/products";
        let data={
                "productName":productName,
                "category":category,
                "price":price,
                "status":status
            
        };
        axios.post(url, data, {
            headers: { "Authorization": "Bearer " + token }
        }).then((response)=>{
            alert("Product added successfully" + response.data);
        }); 
    }

    return(
        <div>
            <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input value={productName} onChange={nameHandler} className="form-control"></input>
            </div>

            <div className="mb-3">
            <label className="form-label">Category</label>
            <input value={category} onChange={categoryHandler} className="form-control"></input>
            </div>

            <div className="mb-3">
            <label className="form-label">Price</label>
            <input value={price} onChange={priceHandler} className="form-control"></input>
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

            <div className="d-flex gap-2">
                <button className="btn btn-primary w-100" onClick={saveHandler}>
                                    Add Product
                </button>
                <button className="btn btn-secondary w-100"
                    onClick={() => {
                        setProductName("");
                        setCategory("");
                        setPrice("");
                        setStatus("");
                        
                    }}>
                    Reset
                </button>
            </div>
        </div>
    );
} 