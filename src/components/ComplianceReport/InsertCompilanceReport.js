import axios from 'axios';
import { useState } from 'react';

export default function InsertComplianceReport() {

    let [scope, setScope] = useState("");
    let [metrics, setMetrics] = useState("");

    let scopeHandler = (e) => { setScope(e.target.value); }
    let metricsHandler = (e) => { setMetrics(e.target.value); }

    let saveHandler = (e) => {
        e.preventDefault();

        let url = "http://localhost:8016/api/compliance-reports";

        let data = {
            scope: scope,
            metrics: metrics
        };

        axios.post(url, data).then((response) => {
            alert("Compliance Report Saved! ID: " + response.data.reportId);
            setScope("");
            setMetrics("");
        }).catch((error) => {
            console.error("Error saving compliance report:", error);
            alert("Failed to save compliance report.");
        });
    }

    return (
        <div>
            <h2>Insert Compliance Report</h2>

            <label>Scope</label>
            <select value={scope} onChange={scopeHandler}>
                <option value="">-- Select Scope --</option>
                <option>DAILY</option>
                <option>WEEKLY</option>
                <option>MONTHLY</option>
                <option>CUSTOM</option>
            </select>
            <br />

            <label>Metrics</label>
            <input
                value={metrics}
                onChange={metricsHandler}
                placeholder="e.g. Shrinkage: 2% | Growth: 10%"
                style={{ width: "400px" }}
            />
            <br />

            <button onClick={saveHandler}>SAVE</button>
        </div>
    );
}