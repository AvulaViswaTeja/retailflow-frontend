import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateKPIReport() {

    let { id } = useParams();
    let navigate = useNavigate();

    let [report, setReport] = useState({
        reportId: '',
        scope: '',
        metrics: '',
        status: '',
        generatedDate: ''
    });

    useEffect(() => {
        let url = `http://localhost:8016/api/kpi-reports/${id}`;
        axios.get(url).then((response) => {
            setReport(response.data);
        }).catch((error) => {
            alert("Error fetching report: " + error);
        });
    }, [id]);

    let updateHandler = (e) => {
        e.preventDefault();

        let url = `http://localhost:8016/api/kpi-reports/${id}`;
        let data = { scope: report.scope, metrics: report.metrics };

        axios.put(url, data).then(() => {
            alert("KPI Report #" + id + " updated successfully!");
            navigate("/kpireport/getAll");
        }).catch((error) => {
            alert("Failed to update: " + error.message);
        });
    }

    return (
        <div>
            <h2>Update KPI Report</h2>

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
            <br /><br />

            <button onClick={updateHandler}>UPDATE</button>
            &nbsp;&nbsp;
            <button onClick={() => navigate("/kpireport/getAll")}>Cancel</button>
        </div>
    );
}