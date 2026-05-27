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
        <div>
            <p>Total Records: {totalElements}</p>

            <table className="table table-border" cellPadding="10" cellSpacing="0">
                <thead>
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
                            <td colSpan="5">No products found</td>
                        </tr>
                    ) : (
                        products.map((product) => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.productName}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.status}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <br />

            <button onClick={goToFirst} disabled={page === 0}>« First</button>
            <button onClick={goToPrev}  disabled={page === 0}>‹ Prev</button>
            <span> Page {page + 1} of {totalPages} </span>
            <button onClick={goToNext}  disabled={page === totalPages - 1}>Next ›</button>
            <button onClick={goToLast}  disabled={page === totalPages - 1}>Last »</button>
        </div>
    );
}