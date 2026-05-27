import axios from "axios";
import { useState, useEffect } from "react";

export default function GetAllProductsPaginated() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        fetchPaginated(page);
    }, [page]);

    let fetchPaginated = (currentPage) => {
        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/products/paginated", {
            headers: { "Authorization": "Bearer " + token },
            params: {
                page: currentPage,
                size: size
            }
        })
        .then((res) => {
            setProducts(res.data.content);
            setTotalPages(res.data.totalPages);
            setTotalElements(res.data.totalElements);
        })
        .catch((err) => {
            alert("Error fetching products: " + err.message);
        });
    };

    let goToFirst = () => setPage(0);
    let goToPrev  = () => setPage((prev) => Math.max(prev - 1, 0));
    let goToNext  = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
    let goToLast  = () => setPage(totalPages - 1);

    return (
    <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">All Products Paginated</h4>
                <span className="badge bg-light text-primary">
                    Total: {totalElements} records
                </span>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted py-3">
                                        No products found
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.productId}>
                                        <td>{product.productId}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.category}</td>
                                        <td>₹{product.price}</td>
                                        <td>
                                            <span className={`badge ${
                                                product.status === "ACTIVE" ? "bg-success" :
                                                product.status === "INACTIVE" ? "bg-danger" :
                                                "bg-secondary"
                                            }`}>
                                                {product.status}
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