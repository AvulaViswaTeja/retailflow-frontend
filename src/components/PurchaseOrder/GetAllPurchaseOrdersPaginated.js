import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GetAllPurchaseOrdersPaginated() {

    const navigate = useNavigate();
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    let [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetchPaginated(page);
    }, [page]);

    let fetchPaginated = (currentPage) => {
        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/purchase-orders/paginated", {
            headers: { "Authorization": "Bearer " + token },
            params: {
                page: currentPage,
                size: size
            }
        })
        .then((res) => {
            setPurchaseOrders(res.data.content);
            setTotalPages(res.data.totalPages);
            setTotalElements(res.data.totalElements);
        })
        .catch((err) => {
            setErrorMsg(err.response?.data?.message || "Error fetching purchase orders. Please try again.");
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
              {/*  Back button */}
            <button
            onClick={() => navigate('/PurchaseOrder')}
            style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 14px', borderRadius: 8, fontSize: 12,
                color: '#fff', cursor: 'pointer',
                background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                border: 'none', marginBottom: 16,
            }}>
            ← Back
            </button>
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">All Purchase Orders Paginated</h4>
                    <span className="badge bg-light text-primary">
                        Total: {totalElements} records
                    </span>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product Name</th>
                                    <th>Supplier ID</th>
                                    <th>Order Date</th>
                                    <th>Expected Delivery</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchaseOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted py-3">
                                            No purchase orders found
                                        </td>
                                    </tr>
                                ) : (
                                    purchaseOrders.map((order) => (
                                        <tr key={order.purchaseOrderId}>
                                            <td>#{order.purchaseOrderId}</td>
                                            <td>{order.productName || "N/A"}</td>
                                            <td>{order.supplierId}</td>
                                            <td>{order.orderDate}</td>
                                            <td>{order.expectedDeliveryDate}</td>
                                            <td>
                                                <span className={`badge ${
                                                    order.status === "PENDING"   ? "bg-warning text-dark" :
                                                    order.status === "COMPLETED"  ? "bg-success"           :
                                                    order.status === "ACTIVE" ? "bg-info"              :
                                                    order.status === "CANCELLED" ? "bg-danger"            :
                                                    "bg-secondary"
                                                }`}>
                                                    {order.status}
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
                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={goToFirst}
                                disabled={page === 0}
                            >
                                « First
                            </button>
                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={goToPrev}
                                disabled={page === 0}
                            >
                                ‹ Prev
                            </button>
                        </div>

                        <span className="text-muted">
                            Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong>
                        </span>

                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={goToNext}
                                disabled={page === totalPages - 1}
                            >
                                Next ›
                            </button>
                            <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={goToLast}
                                disabled={page === totalPages - 1}
                            >
                                Last »
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}