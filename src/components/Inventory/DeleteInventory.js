import axios from 'axios';
import {  useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

export  default function DeleteInventory(){
    let {inventoryId} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const url = `http://localhost:8014/api/inventory/${inventoryId}`;   
        axios.delete(url)
        .then((response)=>{
            alert("Inventory Deleted Successfully");
            navigate('/Inventory/getAll');
        }
        ).catch((error)=>{
            console.error("Delete error details:", error);
            alert("Error deleting inventory: " + (error.response?.data?.message || error.message));
        });
    }, [inventoryId, navigate]);


    return(<div>
        <h1>Delete Inventory</h1>
        <p>Processing deletion for Inventory ID: <strong>{inventoryId}</strong></p>
        
    </div>);
} 