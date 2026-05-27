import axios from 'axios';
import { useState, useEffect } from 'react'; // Added useEffect
import { Link } from 'react-router-dom'; // Fixed router import path

export default function GetAllInventory() {
    let token = localStorage.getItem("token");
    let [inventoryArray, setInventoryData] = useState([]);

    // Safely fetch data once on component mount
    useEffect(() => {
        axios.get("http://localhost:1405/api/inventory", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            console.log(response.data);
            setInventoryData(response.data);
        })
        .catch((error) => {
            console.error("Error fetching inventory details:", error);
            alert("Error fetching inventory: " + (error.response?.data?.message || error.message));
        });
    }, []); // Empty dependency array means this runs exactly once

    return (
        <div className="container mt-5">
            <div className="row mb-4 align-items-center">
                <div className="col">
                    <h2 className="text-secondary fw-bold">Inventory Records</h2>
                </div>
            </div>

            <div className="card shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle mb-0">
                            <thead className="table-dark text-center">
                                <tr>
                                    <th>Inventory ID</th>
                                    <th>Product ID</th>
                                    <th>Location ID</th>
                                    <th>Quantity On Hand</th>
                                    <th>Safety Stock</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {inventoryArray.length > 0 ? (
                                    inventoryArray.map((item) => (
                                        <tr key={item.inventoryId}>
                                            <td className="fw-semibold">#{item.inventoryId}</td>
                                            <td>{item.productId}</td>
                                            <td>{item.locationId}</td>
                                            <td>{item.quantityOnHand}</td>
                                            <td>{item.safetyStock}</td>
                                            <td>
                                                <span className={`badge ${
                                                    item.status === 'In Stock' ? 'bg-success' : 
                                                    item.status === 'Low Stock' ? 'bg-warning text-dark' : 'bg-danger'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex justify-content-center gap-2">
                                                    <Link 
                                                        to={`/Inventory/update/${item.inventoryId}`} 
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        Update
                                                    </Link>
                                                    <Link 
                                                        to={`/Inventory/delete/${item.inventoryId}`} 
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
                                        <td colSpan="7" className="text-muted py-4">No inventory items found.</td>
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