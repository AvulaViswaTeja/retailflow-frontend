import {useEffect, useState} from 'react';
import api from "../../api";
export  default function GetAllPayments(){

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState("");

    useEffect(()=>{
        api.get("api/payments").then((res)=>{
            console.log(res);
            setPayments(res.data);
            setLoading(false);
        }).catch((err)=>{
            setError(err.response?.data?.message || "Failed to fetch invoices");
            setLoading(false);
        })
    },[])

    if(loading) return <p>Loading...</p>

    if(payments.length===0) {
        return <p>Payments not found</p>
    }


    return(<div>
        <h1>Get All payments component</h1>

    </div>);
} 