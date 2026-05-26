import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateComplianceReport() {

    let { rid } = useParams();
    let navigate = useNavigate();

    let [report, setReport] = useState({
        reportId: "",
        scope: "",
        metrics: "",
        status: "",
        generatedDate: ""
    });

    useEffect(() => {
        let url = `http://localhost:8016/api/compliance-reports/${rid}`;
        axios.get(url).then((response) => {
            setReport(response.data);
        }).catch((error) => {
            alert("Error fetching report: " + error);
        });
    }, [rid]);

    let updateHandler = (e) => {
        e.preventDefault();

        let url = `http://localhost:8016/api/compliance-reports/${rid}`;

        let data = {
            scope: report.scope,
            metrics: report.metrics
        };

        axios.put(url, data).then((response) => {
            alert("Compliance Report #" + rid + " updated successfully!");
            navigate("/compliance/getAll");
        }).catch((error) => {
            console.error("Error updating report:", error);
            alert("Failed to update report.");
        });
    }

    return (
        <div>
            <h2>Update Compliance Report</h2>

            <label>ID</label>
            <input value={report.reportId} readOnly />
            <br />

            <label>Scope</label>
            <select
                value={report.scope}
                onChange={(e) => setReport({ ...report, scope: e.target.value })}
            >
                <option>DAILY</option>
                <option>WEEKLY</option>
                <option>MONTHLY</option>
                <option>CUSTOM</option>
            </select>
            <br />

            <label>Metrics</label>
            <input
                value={report.metrics}
                onChange={(e) => setReport({ ...report, metrics: e.target.value })}
                style={{ width: "400px" }}
            />
            <br />

            <button onClick={updateHandler}>UPDATE</button>
            &nbsp;&nbsp;
            <button onClick={() => navigate("/compliance/getAll")}>Cancel</button>
        </div>
    );
}