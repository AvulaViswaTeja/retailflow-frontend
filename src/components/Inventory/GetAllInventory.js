import axios from 'axios';
import { useState} from 'react';
import { Link } from 'react-router';
export  default function GetAllInventory(){
    let token = localStorage.getItem("token");
    let [inventoryArray, setInventoryData] = useState([]);
axios.get("http://localhost:8014/api/inventory", {
            headers: { "Authorization": "Bearer " + token }
        })
.then((response)=>{
    console.log(response.data);
    setInventoryData(response.data);
})
.catch((error)=>{
    console.error("Error fetching inventory details:", error);
    alert("Error fetching inventory: " + (error.response?.data?.message || error.message));
});
    return(<div>
        <h1>Get All Inventory</h1>
        <table className='table table-striped'>
            <thead>
            <th>Inventory ID</th>
            <th>Product ID</th>
            <th>Location ID</th>
            <th>Quantity On Hand</th>
            <th>Safety Stock</th>
            <th>Status</th>
            </thead>
            <tbody>
            {/* Map through the inventory data and display it in table rows */}
            {inventoryArray.map((item) => (
                <tr key={item.inventoryId}>
                    <td>{item.inventoryId}</td>
                    <td>{item.productId}</td>
                    <td>{item.locationId}</td>
                    <td>{item.quantityOnHand}</td>
                    <td>{item.safetyStock}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`/Inventory/delete/${item.inventoryId}`}>Delete</Link>
                        <Link to={`/Inventory/update/${item.inventoryId}`}>Update</Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
                
    </div>);
} 