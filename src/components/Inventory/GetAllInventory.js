import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function GetAllInventory() {
    let token = localStorage.getItem("token");
    let [inventoryArray, setInventoryData] = useState([]);
    let [errorMsg, setErrorMsg] = useState("");
    const location = useLocation();
    const [successMsg, setSuccessMsg] = useState(location.state?.successMsg || "");

    useEffect(() => {
        axios.get("http://localhost:1405/api/inventory", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {
            setInventoryData(response.data);
        })
        .catch((error) => {
            setErrorMsg(error.response?.data?.message || "Error fetching inventory. Please try again.");
        });
    }, []);

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    return (
        <div className="container mt-5">

            {errorMsg && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {errorMsg}
                    <button type="button" className="btn-close" onClick={() => setErrorMsg("")}></button>
                </div>
            )}

            {successMsg && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMsg}
                    <button type="button" className="btn-close" onClick={() => setSuccessMsg("")}></button>
                </div>
            )}

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
                                    <th>Product Name</th>
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
                                            <td>{item.productName || "N/A"}</td>
                                            <td>{item.locationId}</td>
                                            <td>{item.quantityOnHand}</td>
                                            <td>{item.safetyStock}</td>
                                            <td>
                                                <span className={`badge ${
                                                    item.status === "IN_STOCK"     ? "bg-success"           :
                                                    item.status === "LOW_STOCK"    ? "bg-warning text-dark" :
                                                    item.status === "OUT_OF_STOCK" ? "bg-danger"            :
                                                    item.status === "DISCONTINUED" ? "bg-dark"              :
                                                    "bg-secondary"
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
