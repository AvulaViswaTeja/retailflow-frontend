import axios from 'axios';
import { useState } from 'react';

export default function GetKPILatestByScope() {

    let [scope, setScope] = useState("MONTHLY");
    let [report, setReport] = useState(null);

    let scopeHandler = (e) => { setScope(e.target.value); }

    let searchHandler = (e) => {
        e.preventDefault();

        let url = `http://localhost:8016/api/kpi-reports/scope/${scope}/latest`;

        axios.get(url).then((response) => {
            setReport(response.data);
        }).catch((error) => {
            console.error("Error fetching report:", error);
            alert("No report found for scope: " + scope);
            setReport(null);
        });
    }

    return (
        <div>
            <h2>Get Latest KPI Report By Scope</h2>

            <label>Scope</label>
            <select value={scope} onChange={scopeHandler}>
                <option>DAILY</option>
                <option>WEEKLY</option>
                <option>MONTHLY</option>
                <option>CUSTOM</option>
            </select>
            <br />

            <button onClick={searchHandler}>GET LATEST</button>
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