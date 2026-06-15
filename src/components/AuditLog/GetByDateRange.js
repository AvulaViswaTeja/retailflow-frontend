import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function GetByDateRange() {

    let [startDate, setStartDate] = useState(null);
    let [endDate, setEndDate] = useState(null);
    let [auditLogs, setAuditLogs] = useState([]);

    let [showModal, setShowModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const navigate = useNavigate();

    let showError = (message) => {
        setModalSuccess(false);
        setModalMessage(message);
        setShowModal(true);
    };

    let formatDate = (date, endOfDay) => {
        let d = new Date(date);
        let year = d.getFullYear();
        let month = String(d.getMonth() + 1).padStart(2, "0");
        let day = String(d.getDate()).padStart(2, "0");
        return endOfDay
            ? `${year}-${month}-${day}T23:59:59`
            : `${year}-${month}-${day}T00:00:00`;
    };

    let fetchByDateRange = (event) => {
        event.preventDefault();

        if (!startDate || !endDate) {
            showError("Please select both start and end date");
            return;
        }

        if (endDate < startDate) {
            showError("End date cannot be before start date");
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
                showError("No audit logs found for this date range");
            }
            setAuditLogs(res.data);
        })
        .catch((err) => {
            showError("Error: " + (err.response?.data?.message || err.message));
            setAuditLogs([]);
        });
    };

    let reset = () => {
        setStartDate(null);
        setEndDate(null);
        setAuditLogs([]);
    };

    return (

        <div className="container mt-4">

            <button
                onClick={() => navigate('/auditLog')}
                style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 8, fontSize: 12,
                    color: '#fff', cursor: 'pointer',
                    background: 'linear-gradient(135deg,#0d9488,#14b8a6)',
                    border: 'none', marginBottom: 16,
                }}>
                ← Back
            </button>

            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Get Audit Logs By Date Range</h4>
                </div>
                <div className="card-body">

                    {/* Search form */}
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
                                    placeholderText="Select start date"
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
                                    placeholderText="Select end date"
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

                    {/* Results table */}
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

            {/* Modal */}
            {showModal && (
                <>
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => setShowModal(false)}
                    ></div>

                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className={`modal-header ${modalSuccess ? "bg-success" : "bg-danger"} text-white`}>
                                    <h5 className="modal-title">
                                        {modalSuccess ? "✅ Success" : "❌ Error"}
                                    </h5>
                                    <button
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <p className="mb-0">{modalMessage}</p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className={`btn ${modalSuccess ? "btn-success" : "btn-danger"} w-100`}
                                        onClick={() => setShowModal(false)}
                                    >
                                        OK
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}