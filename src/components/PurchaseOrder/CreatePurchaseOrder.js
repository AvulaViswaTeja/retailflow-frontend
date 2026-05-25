import axios from 'axios';
import  { useState } from 'react';
export default function CreatePurchaseOrder() {
    let[supplierId, setSupplierId] = useState("");
    let[expectedDeliveryDate, setExpectedDeliveryDate] = useState("");
    let[status, setStatus] = useState("");
    let [productId, setProductId] = useState("");
    
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
        let url="http://localhost:8014/api/purchase-orders"
        let purchaseorder = {
            "supplierId":supplierId,
            "expectedDeliveryDate":expectedDeliveryDate,
            "status":status,
            "productId": productId
        };
        axios.post(url, purchaseorder)
        .then((response)=>{
            alert("Purchase Order Created Successfully"+response.data)
        });
    }
        return(
            <div>
                <h1>Create Purchase Order</h1>
                <label>Supplier ID:</label>
                <input type="text" value={supplierId} onChange={supplierIdHandler} />
                <br/>
                <label>Expected Delivery Date:</label>
                <input type="date" value={expectedDeliveryDate} onChange={expectedDeliveryDateHandler} />
                <br/>
                <label>Status:</label>
                <input type="text" value={status} onChange={statusHandler} />
                <br/>
                <label>Product ID:</label>
                <input type="text" value={productId} onChange={productIdHandler} />
                <button onClick={submitHandler}>Save</button>
            </div>
        )
}