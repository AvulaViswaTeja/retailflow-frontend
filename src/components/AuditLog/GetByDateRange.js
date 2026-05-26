import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GetByDateRange() {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [auditLogs, setAuditLogs] = useState([]);

    
    let formatDate = (date, endOfDay) => {
        let d = new Date(date);
        let year = d.getFullYear();
        let month = String(d.getMonth() + 1).padStart(2, "0");
        let day = String(d.getDate()).padStart(2, "0");
        return endOfDay
            ? `${year}-${month}-${day}T23:59:59`
            : `${year}-${month}-${day}T00:00:00`;
    }

    let fetchByDateRange = (event) => {
        event.preventDefault();

        if (!startDate || !endDate) {
            alert("Please select both start and end date");
            return;
        }

        if (endDate < startDate) {
            alert("End date cannot be before start date");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/audit-logs/date-range", {
            headers: { "Authorization": "Bearer " + token },
            params: {
                start: formatDate(startDate, false),  
                end: formatDate(endDate, true)         
            }
        })
        .then((res) => {
            if (res.data.length === 0) {
                alert("No audit logs found for this date range");
            }
            setAuditLogs(res.data);
        })
        .catch((err) => {
            alert("Error: " + err.message);
            setAuditLogs([]);
        });
    }

    let reset = () => {
        setStartDate(null);
        setEndDate(null);
        setAuditLogs([]);
    }

    return (
        <div>
            <h1>Get Audit Logs By Date Range</h1>

            <form>
                <label>Start Date</label><br />
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="select start date"
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    isClearable
                />

                <br /><br />

                <label>End Date</label><br />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}   
                    placeholderText="select end date"
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    isClearable
                />

                <br /><br />

                <button onClick={fetchByDateRange}>Search</button>
                <button onClick={reset} type="button">Reset</button>
            </form>

            <br />

            {auditLogs.length > 0 && (
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Audit ID</th>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Action</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auditLogs.map((log) => (
                            <tr key={log.auditId}>
                                <td>{log.auditId}</td>
                                <td>{log.userId}</td>
                                <td>{log.userName}</td>
                                <td>{log.action}</td>
                                <td>{log.timeStamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
