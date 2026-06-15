import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GetUserById() {

    let [userId, setUserId] = useState("");
    let [user, setUser] = useState(null);

    let [showModal, setShowModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const navigate = useNavigate();

    let showError = (message) => {
        setModalSuccess(false);
        setModalMessage(message);
        setShowModal(true);
    };

    let getUser = (event) => {
        event.preventDefault();

        if (!userId) {
            showError("Please enter a User ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/users/" + userId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setUser(res.data);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                showError("User not found with ID: " + userId);
            } else {
                showError("Error: " + err.message);
            }
            setUser(null);
        });
    };

    return (

        <div className="container mt-4">

            <button
                onClick={() => navigate('/user')}
                style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 8, fontSize: 12,
                    color: '#fff', cursor: 'pointer',
                    background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                    border: 'none', marginBottom: 16,
                }}>
                ← Back
            </button>

            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Get User By ID</h4>
                </div>
                <div className="card-body">

                    {/* Search form */}
                    <form onSubmit={getUser}>
                        <div className="mb-3">
                            <label className="form-label">User ID</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter user id"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Search
                        </button>
                    </form>

                    {/* User details */}
                    {user && (
                        <div className="mt-4">
                            <h6 className="text-muted mb-3">User Found</h6>
                            <table className="table table-bordered table-sm align-middle">
                                <tbody>
                                    <tr><th>User ID</th><td>{user.userId}</td></tr>
                                    <tr><th>Name</th><td>{user.userName}</td></tr>
                                    <tr><th>Email</th><td>{user.email}</td></tr>
                                    <tr>
                                        <th>Role</th>
                                        <td><span className="badge bg-secondary">{user.role}</span></td>
                                    </tr>
                                    <tr><th>Phone</th><td>{user.phoneNumber}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <>
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => setShowModal(false)}
                    ></div>

                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className={`modal-header ${modalSuccess ? "bg-success" : "bg-danger"} text-white`}>
                                    <h5 className="modal-title">
                                        {modalSuccess ? "✅ Success" : "❌ Error"}
                                    </h5>
                                    <button
                                        className="btn-close btn-close-white"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <p className="mb-0">{modalMessage}</p>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        className={`btn ${modalSuccess ? "btn-success" : "btn-danger"} w-100`}
                                        onClick={() => setShowModal(false)}
                                    >
                                        OK
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}