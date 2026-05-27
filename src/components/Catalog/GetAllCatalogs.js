import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function GetAllCatalogs() {
    let [catalogs, setCatalogs] = useState([]);

    const fetchCatalogs = () => {
        let token = localStorage.getItem("token");
        axios.get("http://localhost:1405/api/catalogs", {
            headers: { "Authorization": "Bearer " + token }
        })
            .then((response) => {
                setCatalogs(response.data);
            })
            .catch((error) => {
                console.error("Error fetching catalogs:", error);
            });
    };

    useEffect(() => {
        fetchCatalogs();
    }, []);

    let deleteHandler = (id) => {

        let token = localStorage.getItem("token");

        if (window.confirm("Are you sure you want to delete?")) {
            axios.delete(`http://localhost:1405/api/catalogs/${id}`, {
            headers: { "Authorization": "Bearer " + token }
        })
                .then(() => {
                    alert("Deleted successfully!");
                    fetchCatalogs();
                })
                .catch((error) => {
                    console.error("Error deleting catalog:", error);
                    alert("Delete failed!");
                });
        }
    };

    return (
    <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">All Catalogs</h4>
                <span className="badge bg-light text-primary">
                    Total: {catalogs.length}
                </span>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>Catalog ID</th>
                                <th>Effective Date</th>
                                <th>Expiry Date</th>
                                <th>Status</th>
                                <th>Product ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {catalogs.map((catalog) => (
                                <tr key={catalog.catalogId}>
                                    <td>{catalog.catalogId}</td>
                                    <td>{catalog.effectiveDate}</td>
                                    <td>{catalog.expiryDate}</td>
                                    <td>
                                        <span className={`badge ${
                                            catalog.status === "ACTIVE" ? "bg-success" :
                                            catalog.status === "INACTIVE" ? "bg-danger" :
                                            "bg-secondary"
                                        }`}>
                                            {catalog.status}
                                        </span>
                                    </td>
                                    <td>{catalog.productId}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm me-2"
                                            onClick={() => deleteHandler(catalog.catalogId)}
                                        >
                                            Delete
                                        </button>
                                        <Link
                                            className="btn btn-secondary btn-sm"
                                            to={`/Catalog/update/${catalog.catalogId}`}
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
);
}