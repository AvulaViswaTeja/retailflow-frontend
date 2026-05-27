import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteComplianceReport() {

    let { rid } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        if (!rid) return;

        let url = `http://localhost:1405/api/compliance-reports/${rid}`;

        axios.delete(url).then(() => {
            alert("Compliance Report #" + rid + " archived successfully.");
            navigate("/compliance/getAll");
        }).catch((error) => {
            console.error("Error archiving report:", error);
            alert("Failed to archive report.");
            navigate("/compliance/getAll");
        });
    }, [rid]);

    return (
        <div>
            <span>Archiving Compliance Report ID: {rid}...</span>
        </div>
    );
}