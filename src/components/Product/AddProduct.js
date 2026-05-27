import axios from "axios";
import { useState } from "react";

export  default function AddProduct(){
    let [productName, setProductName] = useState("");
    let [category, setCategory] = useState("");
    let [price, setPrice] = useState("");
    let [status, setStatus] = useState("");
    
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
        let token = localStorage.getItem("token");
        axios.post(url, data, {
            headers: { "Authorization": "Bearer " + token }
        }).then((response)=>{
            alert("Product added successfully" + response.data);
        }); 
    }

    return (
    <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Add Product</h4>
            </div>
            <div className="card-body">

                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={productName}
                        onChange={nameHandler}
                        placeholder="Enter product name"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        value={category}
                        onChange={categoryHandler}
                        placeholder="Enter category"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        min={0}
                        value={price}
                        onChange={priceHandler}
                        placeholder="Enter price"
                    />
                </div>

                <div className="mb-3">
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

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-primary w-100"
                        onClick={saveHandler}
                    >
                        Add Product
                    </button>
                    <button
                        className="btn btn-secondary w-100"
                        onClick={() => {
                            setProductName("");
                            setCategory("");
                            setPrice("");
                            setStatus("");
                        }}
                    >
                        Reset
                    </button>
                </div>

            </div>
        </div>
    </div>
);
} 