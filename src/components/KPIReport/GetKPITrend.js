import axios from 'axios';
import { useState } from 'react';

export default function GetKPITrend() {

    let [scope, setScope] = useState("MONTHLY");
    let [days, setDays] = useState(30);
    let [reports, setReports] = useState([]);

    let scopeHandler = (e) => { setScope(e.target.value); }
    let daysHandler = (e) => { setDays(e.target.value); }

    let searchHandler = (e) => {
        e.preventDefault();

        let url = `http://localhost:1405/api/kpi-reports/scope/${scope}/trend?lastXDays=${days}`;

        axios.get(url).then((response) => {
            setReports(response.data);
            if (response.data.length === 0) {
                alert("No trend data found for " + scope + " in last " + days + " days");
            }
        }).catch((error) => {
            console.error("Error fetching trend:", error);
            alert("Failed to load trend data.");
        });
    }

    return (
        <div>
            <h2>KPI Report Trend Analysis</h2>

            <label>Scope</label>
            <select value={scope} onChange={scopeHandler}>
                <option>DAILY</option>
                <option>WEEKLY</option>
                <option>MONTHLY</option>
                <option>CUSTOM</option>
            </select>
            <br />

            <label>Last X Days</label>
            <input
                type="number"
                value={days}
                onChange={daysHandler}
                style={{ width: "80px" }}
            />
            <br />

            <button onClick={searchHandler}>LOAD TREND</button>
            <br /><br />

            {reports.length > 0 && (
                <div>
                    <p>{reports.length} report(s) found</p>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Scope</th>
                                <th>Metrics</th>
                                <th>Status</th>
                                <th>Generated Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((r) => {
                                return (
                                    <tr key={r.reportId}>
                                        <td>{r.reportId}</td>
                                        <td>{r.scope}</td>
                                        <td>{r.metrics}</td>
                                        <td>{r.status}</td>
                                        <td>{r.generatedDate}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}