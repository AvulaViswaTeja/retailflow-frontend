import axios from "axios";
import { useState, useEffect } from "react";

export default function GetAllInventoryPaginated() {

    const [inventory, setInventory] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetchPaginated(page);
    }, [page]);

    let fetchPaginated = (currentPage) => {
        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/inventory/paginated", {
            headers: { "Authorization": "Bearer " + token },
            params: { page: currentPage, size: size }
        })
        .then((res) => {
            setInventory(res.data.content);
            setTotalPages(res.data.totalPages);
            setTotalElements(res.data.totalElements);
        })
        .catch((err) => {
            setErrorMsg(err.response?.data?.message || "Error fetching inventory. Please try again.");
        });
    };

    let goToFirst = () => setPage(0);
    let goToPrev  = () => setPage((prev) => Math.max(prev - 1, 0));
    let goToNext  = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
    let goToLast  = () => setPage(totalPages - 1);

    return (
        <div className="container mt-4">

            {errorMsg && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {errorMsg}
                    <button type="button" className="btn-close" onClick={() => setErrorMsg("")}></button>
                </div>
            )}

            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">All Inventory Paginated</h4>
                    <span className="badge bg-light text-primary">
                        Total: {totalElements} records
                    </span>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Product Name</th>
                                    <th>Location ID</th>
                                    <th>Qty on Hand</th>
                                    <th>Safety Stock</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventory.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted py-3">
                                            No inventory records found
                                        </td>
                                    </tr>
                                ) : (
                                    inventory.map((item, index) => (
                                        <tr key={index}>
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
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-between align-items-center p-3">
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-primary btn-sm" onClick={goToFirst} disabled={page === 0}>
                                « First
                            </button>
                            <button className="btn btn-outline-primary btn-sm" onClick={goToPrev} disabled={page === 0}>
                                ‹ Prev
                            </button>
                        </div>
                        <span className="text-muted">
                            Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong>
                        </span>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-primary btn-sm" onClick={goToNext} disabled={page === totalPages - 1}>
                                Next ›
                            </button>
                            <button className="btn btn-outline-primary btn-sm" onClick={goToLast} disabled={page === totalPages - 1}>
                                Last »
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
