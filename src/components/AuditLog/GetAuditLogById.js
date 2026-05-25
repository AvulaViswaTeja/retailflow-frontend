import axios from "axios";
import { useState } from "react";

export  default function GetAuditLogById(){

    const[auditId,setAuditId] = useState("")
    const [auditLog, setAuditLog] = useState(null);
    
    let getAuditLog = (event) => {
        event.preventDefault();

        

        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/audit-logs/" + auditId, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then((res) => {
            setAuditLog(res.data);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                alert("AuditLog not found with ID: " + auditId);
            } else {
                alert("Error: " + err.message);
            }
            setAuditLog(null);
        });
    }


    return(
        <div>
            <h1>Get Audit Log by Id</h1>
            <form>
                <label>AuditLog Id</label>
                <input value={auditId} onChange={(e)=>setAuditId(e.target.value)} />
                <button onClick={getAuditLog}>Get</button> 
            </form>

            <br />

            {auditLog && (
                <div>
                    <p>AuditLog ID: {auditLog.auditId}</p>
                    <p>User Id: {auditLog.userId}</p>
                    <p>UserName: {auditLog.userName}</p>
                    <p>Action: {auditLog.action}</p>
                    <p>Timestamp: {auditLog.timeStamp}</p>
                </div>
            )}


        </div>
    );
} 