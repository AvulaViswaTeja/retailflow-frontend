import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteInventory() {
    let token = localStorage.getItem("token");
    let { inventoryId } = useParams();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");
    let confirmDelete = () => {
        setErrorMsg("");
        const url = `http://localhost:8070/api/inventory/${inventoryId}`;
        axios.delete(url, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((response) => {   
            navigate('/Inventory/getAll', {
                state: { successMsg: `Inventory #${inventoryId} deleted successfully.` }
            });
        })
        .catch((error) => {
            setErrorMsg(error.response?.data?.message || "Error deleting inventory. Please try again.");
        }); 
    }
    return (
         <div className="container mt-5" style={{ maxWidth: '500px' }}>
        <div className="card shadow-sm">
            <div className="card-header bg-danger text-white p-3">
                <h3 className="mb-0 h5">Delete Inventory</h3>
            </div>
            <div className="card-body p-4 text-center">
                <p className="mb-4">Are you sure you want to delete Inventory <strong>#{inventoryId}</strong>?</p>
                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-outline-secondary" onClick={() => navigate('/Inventory/getAll')}>
                        Cancel
                    </button>
                    <button className="btn btn-danger px-4" onClick={confirmDelete}>
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
    );
}
