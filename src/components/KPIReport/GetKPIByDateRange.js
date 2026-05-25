import axios from 'axios';
import { useState } from 'react';

export default function GetKPIByDateRange() {

    let today = new Date().toISOString().split('T')[0];
    let [start, setStart] = useState(today.slice(0, 7) + "-01");
    let [end, setEnd] = useState(today);
    let [reports, setReports] = useState([]);

    let startHandler = (e) => { setStart(e.target.value); }
    let endHandler = (e) => { setEnd(e.target.value); }

    let searchHandler = (e) => {
        e.preventDefault();

        let url = `http://localhost:8016/api/kpi-reports/date-range?start=${start}&end=${end}`;

        axios.get(url).then((response) => {
            setReports(response.data);
            if (response.data.length === 0) {
                alert("No reports found between " + start + " and " + end);
            }
        }).catch((error) => {
            console.error("Error fetching reports:", error);
            alert("Failed to search reports.");
        });
    }

    return (
        <div>
            <h2>Get KPI Reports By Date Range</h2>

            <label>Start Date</label>
            <input
                type="date"
                value={start}
                onChange={startHandler}
            />
            <br />

            <label>End Date</label>
            <input
                type="date"
                value={end}
                onChange={endHandler}
            />
            <br />

            <button onClick={searchHandler}>SEARCH</button>
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