import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

export default function CancelPurchaseOrder() {
    const {purchaseOrderId } = useParams();
    const navigate = useNavigate(); // To redirect the user back after deletion
    const token = localStorage.getItem("token");
    useEffect(() => {
        // Append the ID directly to the URL path to match standard Spring Boot @PathVariable
       
        const url = `http://localhost:8014/api/purchase-orders/${purchaseOrderId}`;

        axios.delete(url, {
            headers: { "Authorization": "Bearer " + token }
        })
            .then((response) => {
                alert("Purchase Order Cancelled Successfully");
                // Redirect back to the order list view
                navigate('/PurchaseOrder/getAll'); 
            })
            .catch((error) => {
                console.error("Delete error details:", error);
                alert("Error cancelling purchase order: " + (error.response?.data?.message || error.message));
            });
    }, [purchaseOrderId, navigate]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Cancelling Purchase Order...</h1>
            <p>Processing cancellation for Order ID: <strong>{purchaseOrderId}</strong></p>
        </div>
    );
}