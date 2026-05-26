import {useState,useEffect} from 'react';
import axios from 'axios';
export default function GetPaginated() {
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInvoices = (pageNumber) => {
    setLoading(true);
    setError("");
    let token = localStorage.getItem("token");
    axios
      .get("http://localhost:8014/api/invoices/paginated", {
        params: {
          page: pageNumber,
          size: 3,
        },
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        console.log(res);
        setInvoices(res.data.content);
        setTotalElements(res.data.totalElements);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Something went wrong");
        setLoading(false);
      });
  };

  const handlePrevious = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchInvoices(page);
  }, [page]);

   if(loading) return <p>Loading...</p>
    if(error) return <p style={{color:"red"}}>{error}</p>
    if(invoices.length===0) return <p>No invoices found</p>
  return (
    <div>
      <h1>All Invoices Paginated</h1>
        <table border={1}>
            <thead>
                <tr>
                    <th>Invoice Id</th>
                    <th>Customer Id</th>
                    <th>Sale Id</th>
                    <th>Date</th>
                    <th>amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((invoice)=>{
                    return (<tr key={invoice.invoiceId}>
                        <td>{invoice.invoiceId}</td>
                        <td>{invoice.customerId}</td>
                        <td>{invoice.saleId}</td>
                        <td>{invoice.date}</td>
                        <td>{invoice.amount}</td>
                        <td>{invoice.status}</td>
                        
                    </tr>)
                })}
            </tbody>
        </table>

        <button onClick={handlePrevious} disabled={page===0}>prev</button>
        <span style={{ margin: "0 10px" }}>{page+1} out of {totalPages} | Total records : {totalElements}</span>
        <button onClick={handleNext} disabled={page===totalPages-1 }>next</button>
    </div>
  );
}
