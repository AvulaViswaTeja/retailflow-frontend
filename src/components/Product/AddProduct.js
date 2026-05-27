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

    let statusHandler = (e) => {
        setStatus(e.target.value);
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
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response)=>{
            alert("Product added successfully" + response.data);
        }); 
    }

    return(
        <div>
            <label>Product Name</label>
            <input value={productName} onChange={nameHandler}></input>
            <br></br>

            <label>Category</label>
            <input value={category} onChange={categoryHandler}></input>
            <br></br>

            <label>Price</label>
            <input value={price} onChange={priceHandler}></input>
            <br></br>

            <label>Status</label>
            <input value={status} onChange={statusHandler}></input>
            <br></br>

            <button onClick={saveHandler}>Add Product</button>
        </div>
    );
} 