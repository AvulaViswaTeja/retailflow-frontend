import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export  default function GetAllPurchaseOrders(){
    let token = localStorage.getItem("token");
    let [POArray, setPOdata] = useState([]);
   useEffect(()=>{
    let url="http://localhost:8014/api/purchase-orders"
    axios.get(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response)=>{
        setPOdata(response.data);

    }).catch((error)=>{
        alert("Error fetching data"+error);
    });
   },[]);
    return(<div>
        <h1>Get All products</h1>
        <table className='table table-striped '>
            <thead className='table-dark'>
                <tr> 
                    <th>Purchase Order ID</th>   
                    <th>Supplier ID</th>
                    <th>Order Date</th>
                    <th>Expected Delivery Date</th>
                    <th>Status</th>
                    <th>Product ID</th>
                </tr>
            </thead>   
            <tbody>
                {
                    POArray.map((purchaseorder)=>{
                        return(
                            <tr>
                                <td>{purchaseorder.purchaseOrderId}</td>
                                <td>{purchaseorder.supplierId}</td>
                                <td>{purchaseorder.orderDate}</td>
                                <td>{purchaseorder.expectedDeliveryDate}</td>
                                <td>{purchaseorder.status}</td>
                                <td>{purchaseorder.productId}</td>
                                <td>
                                    <Link to={`/PurchaseOrder/delete/${purchaseorder.purchaseOrderId}`}>Delete</Link>
                                    <Link to={`/PurchaseOrder/update/${purchaseorder.purchaseOrderId}`}>Update</Link>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    </div>);
} 