import axios from 'axios';
import { useState } from 'react';

export default function GetKPIById() {

    let [id, setId] = useState("");
    let [report, setReport] = useState(null);

    let idHandler = (e) => { setId(e.target.value); }

    let searchHandler = (e) => {
        e.preventDefault();

        let url = `http://localhost:8016/api/kpi-reports/${id}`;

        axios.get(url).then((response) => {
            setReport(response.data);
        }).catch((error) => {
            console.error("Error fetching report:", error);
            alert("Report not found with ID: " + id);
            setReport(null);
        });
    }

    return (
        <div>
            <h2>Get KPI Report By ID</h2>

            <label>Report ID</label>
            <input
                type="number"
                value={id}
                onChange={idHandler}
                placeholder="Enter report ID"
            />
            <br />

            <button onClick={searchHandler}>SEARCH</button>
            <br /><br />

            {report && (
                <table border="1">
                    <tbody>
                        <tr><td><b>ID</b></td><td>{report.reportId}</td></tr>
                        <tr><td><b>Scope</b></td><td>{report.scope}</td></tr>
                        <tr><td><b>Metrics</b></td><td>{report.metrics}</td></tr>
                        <tr><td><b>Status</b></td><td>{report.status}</td></tr>
                        <tr><td><b>Generated Date</b></td><td>{report.generatedDate}</td></tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}