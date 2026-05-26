import {useState, useEffect} from 'react';
import axios from 'axios';
export  default function GetPaginatedPayments(){
    const [payments,setPayments] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [totalElements,setTotalElements]= useState(0);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");

    const fetchPayments=(pageNumber)=>{
        setLoading(true);
        setError("");
        let token = localStorage.getItem("token");
         axios.get(
        "http://localhost:8014/api/payments/paginated",
        {
          params: {
            page: pageNumber,
            size: 3,
          }, 
          headers: { Authorization: "Bearer " + token }
        }
      ).then((res)=>{
            console.log(res.data);
            setPayments(res.data.content);
            setTotalElements(res.data.totalElements);
            setTotalPages(res.data.totalPages);
            setLoading(false);

        }).catch((err)=>{
            console.log(err.response);
            setError(err.response?.data?.message || "Something went wrong");
            setLoading(false);
        })
        
    }

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
    
    useEffect(()=>{
        fetchPayments(page);
    },[page]);

    if(loading) return <p>Loading...</p>
    if(error) return <p style={{color:"red"}}>{error}</p>
    if(payments.length===0) return <p>No payments found</p>
    return(<div>
        <h1>All Payments Paginated</h1>
        <table border={1}>
            <thead>
                <tr>
                    <th>Payment Id</th>
                    <th>Invoice Id</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Method</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {payments.map((payment)=>{
                    return (<tr key={payment.paymentId}>
                        <td>{payment.paymentId}</td>
                        <td>{payment.invoiceId}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.date}</td>
                        <td>{payment.method}</td>
                        <td>{payment.status}</td>
                    </tr>)
                })}
            </tbody>
        </table>

        <button onClick={handlePrevious} disabled={page===0}>prev</button>
        <span style={{ margin: "0 10px" }}>{page+1} out of {totalPages} | Total records : {totalElements}</span>
        <button onClick={handleNext} disabled={page===totalPages-1 }>next</button>

    </div>);
} 