import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

export default function CancelPurchaseOrder() {
    const { purchaseOrderId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [errorMsg, setErrorMsg] = useState("");
    const [cancelling, setCancelling] = useState(false);

    const confirmCancel = () => {
        setCancelling(true);
        setErrorMsg("");

        const url = `http://localhost:1405/api/purchase-orders/${purchaseOrderId}`;
        axios.delete(url, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            navigate('/PurchaseOrder/getAll', {
                state: { successMsg: `Purchase Order #${purchaseOrderId} cancelled successfully.` }
            });
        })
        .catch((error) => {
            setErrorMsg(error.response?.data?.message || "Error cancelling purchase order. Please try again.");
            setCancelling(false);
        });
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <div className="card shadow-sm">
                <div className="card-header bg-danger text-white p-3">
                    <h3 className="mb-0 h5">Cancel Purchase Order</h3>
                    <small className="text-white-50">Order ID: #{purchaseOrderId}</small>
                </div>
                <div className="card-body p-4">

                    {errorMsg && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            {errorMsg}
                            <button type="button" className="btn-close" onClick={() => setErrorMsg("")}></button>
                        </div>
                    )}

                    {!errorMsg && (
                        <p className="text-muted mb-4">
                            Are you sure you want to cancel Purchase Order <strong>#{purchaseOrderId}</strong>? This action cannot be undone.
                        </p>
                    )}

                    <div className="d-flex justify-content-end gap-2">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('/PurchaseOrder/getAll')}
                            disabled={cancelling}
                        >
                            Go Back
                        </button>
                        <button
                            className="btn btn-danger px-4"
                            onClick={confirmCancel}
                            disabled={cancelling}
                        >
                            {cancelling ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Cancelling...
                                </>
                            ) : (
                                "Yes, Cancel Order"
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}