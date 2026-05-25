import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function GetAllCatalogs() {
    let [catalogs, setCatalogs] = useState([]);

    const fetchCatalogs = () => {
        axios.get("http://localhost:8014/api/catalogs")
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

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            axios.delete(`http://localhost:8014/api/catalogs/${id}`)
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
        <div>
            <table border="1">
                <thead>
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
                            <td>{catalog.status}</td>
                            <td>{catalog.productId}</td>
                            <td>
                                <button onClick={() => deleteHandler(catalog.catalogId)}>
                                    Delete
                                </button>
                                &nbsp;
                                <Link to={`/Catalog/update/${catalog.catalogId}`}>
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}