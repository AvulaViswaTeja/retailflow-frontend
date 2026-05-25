import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function DeleteKPIReport() {

    let { rid } = useParams();

    let url = `http://localhost:8016/api/kpi-reports/${rid}`;

    axios.delete(url).then((response) => {
        alert("KPI Report #" + rid + " archived successfully.");
    }).catch((error) => {
        console.error("Error archiving report:", error);
        alert("Failed to archive report.");
    });

    return (
        <div>
            <span>Archiving Report ID: {rid}</span>
        </div>
    );
}