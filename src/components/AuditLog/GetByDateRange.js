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

        axios.get("http://localhost:8070/api/audit-logs/date-range", {
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
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">

                    <h5 className="card-title mb-4">Get Audit Logs By Date Range</h5>

                    {/* Search Form */}
                    <form onSubmit={fetchByDateRange}>
                        <div className="row g-3 mb-3">

                            <div className="col-md-6">
                                <label className="form-label">Start Date</label><br />
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
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">End Date</label><br />
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
                                    className="form-control"
                                />
                            </div>

                        </div>

                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary">
                                Search
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={reset}>
                                Reset
                            </button>
                        </div>
                    </form>

                    {/* Results Table */}
                    {auditLogs.length > 0 && (
                        <div className="table-responsive mt-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h6 className="text-muted mb-0">Results</h6>
                                <span className="badge bg-secondary">
                                    {auditLogs.length} records found
                                </span>
                            </div>
                            <table className="table table-bordered table-hover table-sm align-middle">
                                <thead className="table-dark">
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
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}