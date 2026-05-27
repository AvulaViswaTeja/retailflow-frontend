import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function GetAllPurchaseOrders() {
    let token = localStorage.getItem("token");
    let [POArray, setPOdata] = useState([]);

    useEffect(() => {
        let url = "http://localhost:1405/api/purchase-orders";
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setPOdata(response.data);
        }).catch((error) => {
            alert("Error fetching data: " + error);
        });
    }, []);

    return (
        <div className="container mt-5">
            {/* Header section with margin-bottom */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-secondary fw-bold">Purchase Orders</h2>
            </div>

            {/* Table inside a responsive, shadowed card container */}
            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle mb-0">
                            <thead className="table-dark text-center">
                                <tr> 
                                    <th>Purchase Order ID</th>   
                                    <th>Supplier ID</th>
                                    <th>Order Date</th>
                                    <th>Expected Delivery Date</th>
                                    <th>Status</th>
                                    <th>Product ID</th>
                                    <th>Actions</th> {/* Fixed missing header column */}
                                </tr>
                            </thead>   
                            <tbody className="text-center">
                                {POArray.length > 0 ? (
                                    POArray.map((purchaseorder) => (
                                        <tr key={purchaseorder.purchaseOrderId}>
                                            <td className="fw-semibold">#{purchaseorder.purchaseOrderId}</td>
                                            <td>{purchaseorder.supplierId}</td>
                                            <td>{purchaseorder.orderDate}</td>
                                            <td>{purchaseorder.expectedDeliveryDate}</td>
                                            <td>
                                                <span className={`badge ${
                                                    purchaseorder.status === 'Completed' ? 'bg-success' : 
                                                    purchaseorder.status === 'Pending' ? 'bg-warning text-dark' : 'bg-secondary'
                                                }`}>
                                                    {purchaseorder.status}
                                                </span>
                                            </td>
                                            <td>{purchaseorder.productId}</td>
                                            <td>
                                                <div className="d-flex justify-content-center gap-2">
                                                    <Link 
                                                        to={`/PurchaseOrder/update/${purchaseorder.purchaseOrderId}`} 
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        Update
                                                    </Link>
                                                    <Link 
                                                        to={`/PurchaseOrder/delete/${purchaseorder.purchaseOrderId}`} 
                                                        className="btn btn-sm btn-outline-danger"
                                                    >
                                                        Delete
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-muted py-4">No purchase orders found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}