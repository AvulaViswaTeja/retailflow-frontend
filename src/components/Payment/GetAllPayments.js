import axios from 'axios';
import {useEffect, useState} from 'react';

export  default function GetAllPayments(){

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState("");

    useEffect(()=>{
        let token = localStorage.getItem("token");
        axios.get("http://localhost:8014/api/payments", {
            headers: { "Authorization": "Bearer " + token }
        }).then((res)=>{
            console.log(res);
            setPayments(res.data);
            setLoading(false);
        }).catch((err)=>{
            setError(err.response?.data?.message || "Failed to fetch invoices");
            setLoading(false);
        })
    },[])

    if(loading) return <p>Loading...</p>

    if(error) return <p style={{color:"red"}}>{error}</p>

    if(payments.length===0) {
        return <p>Payments not found</p>
    }


    return(<div>
        <h1>Get All payments component</h1>
        <table border={1}>
            <thead>
                <tr>
                    <th>Payment Id</th>
                    <th>Invoice Id</th>
                    <th>Amount </th>
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
    </div>);
} 