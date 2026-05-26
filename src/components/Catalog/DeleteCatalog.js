import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DeleteCatalog() {
    let navigate = useNavigate();

    let [searchId, setSearchId] = useState("");
    let [catalog, setCatalog] = useState(null);
    let [catalogFound, setCatalogFound] = useState(false);

    let searchHandler = () => {
        if (!searchId) {
            alert("Please enter a Catalog ID");
            return;
        }

        axios.get("http://localhost:8014/api/catalogs/" + searchId)
            .then((response) => {
                setCatalog(response.data);
                setCatalogFound(true);
            })
            .catch(() => {
                alert("Catalog not found with ID: " + searchId);
                setCatalogFound(false);
                setCatalog(null);
            });
    };

    let deleteHandler = () => {
        if (window.confirm("Are you sure you want to permanently delete this catalog?")) {
            axios.delete("http://localhost:8014/api/catalogs/" + searchId)
                .then(() => {
                    alert("Catalog deleted successfully!");
                    navigate("/Catalog/getAll");
                })
                .catch((error) => {
                    alert("Delete failed: " + (error.response?.data?.message || "Server error"));
                });
        }
    };

    return (
        <div>

            <label>Enter Catalog ID: </label>
            <input
                type="number"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter catalog ID"
            />
            <button onClick={searchHandler}>Search</button>

            <br /><br />


            {catalogFound && catalog && (
                <div>
                    <h3>Catalog Details</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Catalog ID</th>
                                <th>Effective Date</th>
                                <th>Expiry Date</th>
                                <th>Status</th>
                                <th>Product ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{catalog.catalogId}</td>
                                <td>{catalog.effectiveDate}</td>
                                <td>{catalog.expiryDate}</td>
                                <td>{catalog.status}</td>
                                <td>{catalog.productId}</td>
                            </tr>
                        </tbody>
                    </table>

                    <br />

                    <button
                        onClick={deleteHandler}
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => navigate("/Catalog/getAll")}
                        
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}