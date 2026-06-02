import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GetPaginatedPayments() {
    const [payments, setPayments] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchPayments = (pageNumber) => {
        setLoading(true);
        setError("");
        let token = localStorage.getItem("token");
        axios.get("http://localhost:1405/api/payments/paginated", {
            params: { page: pageNumber, size: 3 },
            headers: { Authorization: "Bearer " + token }
        })
        .then((res) => {
            setPayments(res.data.content);
            setTotalPages(res.data.totalPages);
            setTotalElements(res.data.totalElements);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.response?.data?.message || "Something went wrong");
            setLoading(false);
        });
    };

    const handlePrevious = () => {
        if (page > 0) setPage(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    useEffect(() => {
        fetchPayments(page);
    }, [page]);

    if (loading) {
        return (
            <div className="container mt-4 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading payments...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    if (payments.length === 0) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">No payments found!</div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">All Payments Paginated</h4>
                    <span className="badge bg-light text-primary">
                        Total: {totalElements} records
                    </span>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Payment ID</th>
                                    <th>Invoice ID</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.paymentId}>
                                        <td>{payment.paymentId}</td>
                                        <td>{payment.invoiceId}</td>
                                        <td>₹{payment.amount}</td>
                                        <td>{payment.date}</td>
                                        <td>
                                            <span className="badge bg-secondary">
                                                {payment.method}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${
                                                payment.status === "SUCCESS" ? "bg-success" :
                                                payment.status === "REFUNDED" ? "bg-danger" :
                                                "bg-secondary"
                                            }`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-between align-items-center p-3">
                        <button
                            className="btn btn-outline-primary"
                            onClick={handlePrevious}
                            disabled={page === 0}
                        >
                            ← Previous
                        </button>
                        <span className="text-muted">
                            Page <strong>{page + 1}</strong> of{" "}
                            <strong>{totalPages}</strong>
                        </span>
                        <button
                            className="btn btn-outline-primary"
                            onClick={handleNext}
                            disabled={page === totalPages - 1}
                        >
                            Next →
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}