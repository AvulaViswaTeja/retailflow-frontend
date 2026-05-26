import axios from "axios";
import { useState } from "react";
export  default function AddInventory(){
   let [productId, setProductId] = useState("");
   let [locationId, setLocationId] = useState("");
   let [quantityOnHand, setQuantityOnHand] = useState("");
   let [safetyStock, setSafetyStock] = useState("");
   let [status, setStatus] = useState("");
   let token = localStorage.getItem("token");
    let submitHandler = (e) => {
        e.preventDefault();
        let url = "http://localhost:8014/api/inventory";
        let inventory = {
            "productId": productId,
            "locationId": locationId,
            "quantityOnHand": quantityOnHand,
            "safetyStock": safetyStock,
            "status": status
        };
        axios.post(url, inventory, {
            headers: { "Authorization": "Bearer " + token }
        })
            .then((response) => {
                alert("Inventory Added Successfully: " + response.data);
            })
            .catch((error) => {
                console.error("Error adding inventory details:", error);
                alert("Error adding inventory: " + (error.response?.data?.message || error.message));
            }); 
    }

    return(<div>
        <h1>Add Inventory</h1>
        <div className="table table-striped">
        <label>Product ID:</label>
        <input type="text" className="form-control" placeholder="Enter Product ID" value={productId} onChange={(e)=>setProductId(e.target.value)} />
        <br/>
        <label>Location ID:</label>
        <input type="text" className="form-control" placeholder="Enter Location ID" value={locationId} onChange={(e)=>setLocationId(e.target.value)} />
        <br/>   
        <label>Quantity On Hand:</label>
        <input type="text" className="form-control" placeholder="Enter Quantity On Hand" value={quantityOnHand} onChange={(e)=>setQuantityOnHand(e.target.value)} />
        <br/>
        <label>Safety Stock:</label>
        <input type="text" className="form-control" placeholder="Enter Safety Stock" value={safetyStock} onChange={(e)=>setSafetyStock(e.target.value)} />       
        <br/>
        <label>Status:</label>
        <input type="text" className="form-control" placeholder="Enter Status" value={status} onChange={(e)=>setStatus(e.target.value)} />
        <br/>
        </div>
        <br/>
        
        <button className="btn btn-primary" onClick={submitHandler}>
          Add Inventory
        </button>   
      
    </div>
  );
} 