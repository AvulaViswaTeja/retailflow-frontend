import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function DeleteComplianceReport() {

    let { rid } = useParams();

    let url = `http://localhost:8016/api/compliance-reports/${rid}`;

    axios.delete(url).then((response) => {
        alert("Compliance Report #" + rid + " archived successfully.");
    }).catch((error) => {
        console.error("Error archiving report:", error);
        alert("Failed to archive report.");
    });

    return (
        <div>
            <span>Archiving Compliance Report ID: {rid}</span>
        </div>
    );
}