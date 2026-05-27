import axios from 'axios';
import  { useState } from 'react';
export default function CreatePurchaseOrder() {
    let[supplierId, setSupplierId] = useState("");
    let[expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
    let[status, setStatus] = useState("");
    let [productId, setProductId] = useState("");
    const token = localStorage.getItem("token");
    let supplierIdHandler = (e) => {
        setSupplierId(e.target.value);
    }      
    let expectedDeliveryDateHandler = (e) => {
        setExpectedDeliveryDate(e.target.value);
    }       
    let statusHandler = (e) => {
        setStatus(e.target.value);
    }
    let productIdHandler = (e) => {
        setProductId(e.target.value);
    }
    let submitHandler = (e) => {
        e.preventDefault();
        let url="http://localhost:1405/api/purchase-orders"
        let purchaseorder = {
            "supplierId":supplierId,
            "expectedDeliveryDate":expectedDeliveryDate,
            "status":status,
            "productId": productId
        };
        axios.post(url, purchaseorder, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response)=>{
            alert("Purchase Order Created Successfully"+response.data)
        });
    }
        return(
            <div>
                <h1>Create Purchase Order</h1>
                <div className='table table-striped'>
                <label>Supplier ID:</label>
                <input className="form-control" type="text" placeholder="Enter Supplier ID" value={supplierId} onChange={supplierIdHandler} />
                <br/>
                <label>Expected Delivery Date:</label>
                <input className="form-control" type="date" placeholder="Enter Expected Delivery Date" value={expectedDeliveryDate} onChange={expectedDeliveryDateHandler} />
                <br/>
                <label>Status:</label>
                <input className="form-control" type="text" placeholder="Enter Status" value={status} onChange={statusHandler} />
                <br/>
                <label>Product ID:</label>
                <input className="form-control" type="text" placeholder="Enter Product ID" value={productId} onChange={productIdHandler} />
                </div>
                <br/>
                <button className="btn btn-primary" onClick={submitHandler}>Save</button>
            </div>
        )
}