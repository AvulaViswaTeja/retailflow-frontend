import axios from 'axios';
import { useState } from 'react';

export default function InsertReport() {

    let [scope, setScope] = useState("");
    let [metrics, setMetrics] = useState("");
    let [result, setResult] = useState(null);
    let [loading, setLoading] = useState(false);

    let scopeHandler = (e) => { setScope(e.target.value); }
    let metricsHandler = (e) => { setMetrics(e.target.value); }

    let saveHandler = (e) => {
        e.preventDefault();
        setResult(null);
        setLoading(true);

        let url = "http://localhost:8016/api/compliance-reports";
        let data = { scope: scope, metrics: metrics };

        axios.post(url, data).then((response) => {
            setResult(response.data);
            setLoading(false);
            setScope("");
            setMetrics("");
        }).catch((error) => {
            alert("Failed to save: " + error.message);
            setLoading(false);
        });
    }

    let statusColor = (status) => {
        if (status === "PASS")    return "green";
        if (status === "WARNING") return "orange";
        if (status === "FAIL")    return "red";
        return "black";
    }

    return (
        <div>
            <h2>Insert Compliance Report</h2>
            <p>Paste the metrics string from a KPI Report to run a compliance check.</p>
            <br />

            <label>Scope</label><br />
            <select value={scope} onChange={scopeHandler}>
                <option value="">-- Select Scope --</option>
                <option>DAILY</option>
                <option>WEEKLY</option>
                <option>MONTHLY</option>
                <option>CUSTOM</option>
            </select>
            <br /><br />

            <label>Metrics (paste from KPI Report)</label><br />
            <input
                value={metrics}
                onChange={metricsHandler}
                placeholder="Stock Turnover: 4.75 | Sales Growth: 12.0% | Shrinkage: 1.8%"
                style={{ width: "500px" }}
            />
            <br /><br />

            <button onClick={saveHandler} disabled={loading}>
                {loading ? "Running check..." : "RUN COMPLIANCE CHECK"}
            </button>
            <br /><br />

            {/* Result card */}
            {result && (
                <div>
                    <h3>Compliance Result</h3>
                    <table border="1" cellPadding="8">
                        <tbody>
                            <tr>
                                <td><b>Report ID</b></td>
                                <td>{result.reportId}</td>
                            </tr>
                            <tr>
                                <td><b>Scope</b></td>
                                <td>{result.scope}</td>
                            </tr>
                            <tr>
                                <td><b>Verdict</b></td>
                                <td style={{ color: statusColor(result.status), fontWeight: "bold" }}>
                                    {result.status}
                                </td>
                            </tr>
                            <tr>
                                <td><b>Remarks</b></td>
                                <td>{result.remarks}</td>
                            </tr>
                            <tr>
                                <td><b>Stock Turnover</b></td>
                                <td>{result.stockTurnover}</td>
                            </tr>
                            <tr>
                                <td><b>Sales Growth</b></td>
                                <td>{result.salesGrowth}%</td>
                            </tr>
                            <tr>
                                <td><b>Shrinkage Rate</b></td>
                                <td>{result.shrinkageRate}%</td>
                            </tr>
                            <tr>
                                <td><b>Generated Date</b></td>
                                <td>{result.generatedDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}