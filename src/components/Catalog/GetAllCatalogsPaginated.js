import axios from "axios";
import { useState, useEffect } from "react";

export default function GetAllCatalogsPaginated() {

    const [catalogs, setCatalogs] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        fetchPaginated(page);
    }, [page]);

    let fetchPaginated = (currentPage) => {
        let token = localStorage.getItem("token");

        axios.get("http://localhost:8014/api/catalogs/paginated", {
            headers: { "Authorization": "Bearer " + token },
            params: {
                page: currentPage,
                size: size
            }
        })
        .then((res) => {
            setCatalogs(res.data.content);
            setTotalPages(res.data.totalPages);
            setTotalElements(res.data.totalElements);
        })
        .catch((err) => {
            alert("Error fetching catalogs: " + err.message);
        });
    };

    let goToFirst = () => setPage(0);
    let goToPrev  = () => setPage((prev) => Math.max(prev - 1, 0));
    let goToNext  = () => setPage((prev) => Math.min(prev + 1, totalPages - 1));
    let goToLast  = () => setPage(totalPages - 1);

    return (
        <div>
            <p>Total Records: {totalElements}</p>

            <table className="table table-border" >
                <thead>
                    <tr>
                        <th>Catalog ID</th>
                        <th>Effective Date</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                    </tr>
                </thead>
                <tbody>
                    {catalogs.length === 0 ? (
                        <tr>
                            <td colSpan="6">No catalogs found</td>
                        </tr>
                    ) : (
                        catalogs.map((catalog) => (
                            <tr key={catalog.catalogId}>
                                <td>{catalog.catalogId}</td>
                                <td>{catalog.effectiveDate}</td>
                                <td>{catalog.expiryDate}</td>
                                <td>{catalog.status}</td>
                                <td>{catalog.productId}</td>
                                <td>{catalog.productName}</td>
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