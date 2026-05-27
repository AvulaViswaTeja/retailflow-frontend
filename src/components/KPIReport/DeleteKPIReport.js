import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteKPIReport() {

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        let url = `http://localhost:1405/api/kpi-reports/${id}`;

        axios.delete(url).then(() => {
            alert("KPI Report #" + id + " archived successfully.");
            navigate("/kpireport/getAll");
        }).catch((error) => {
            console.error("Error archiving report:", error);
            alert("Failed to archive report.");
            navigate("/kpireport/getAll");
        });
    }, [id]);

    return (
        <div>
            <span>Archiving KPI Report ID: {id}...</span>
        </div>
    );
}