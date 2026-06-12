import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateUser() {

    let [userId, setUserId] = useState("");
    let [userName, setUserName] = useState("");
    let [role, setRole] = useState("");
    let [phone, setPhone] = useState("");
    let [password, setPassword] = useState("");
    let [userFound, setUserFound] = useState(false);

    let [showModal, setShowModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const navigate = useNavigate();

    let showError = (message) => {
        setModalSuccess(false);
        setModalMessage(message);
        setShowModal(true);
    };

    let fetchUser = (event) => {
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
            setUserName(res.data.userName);
            setRole(res.data.role);
            setPhone(res.data.phoneNumber);
            setPassword("");
            setUserFound(true);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                showError("User not found with ID: " + userId);
            } else {
                showError("Error: " + err.message);
            }
            setUserFound(false);
        });
    };

    let updateUser = (event) => {
        event.preventDefault();

        let token = localStorage.getItem("token");

        let data = {
            userName: userName,
            role: role,
            phoneNumber: phone,
            password: password
        };

        axios.put("http://localhost:8070/api/users/" + userId, data, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            setModalSuccess(true);
            setModalMessage("User updated successfully!");
            setShowModal(true);
        })
        .catch((err) => {
            if (err.response) {
                showError("Failed to update: " + (err.response.data?.message || err.response.status));
            } else {
                showError("Network error: " + err.message);
            }
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
                    <h4 className="mb-0">Update User</h4>
                </div>
                <div className="card-body">

                    {/* Step 1 — Search */}
                    <form onSubmit={fetchUser}>
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

                    {/* Step 2 — Update form */}
                    {userFound && (
                        <form onSubmit={updateUser} className="mt-4">

                            <h6 className="text-muted mb-3">Editing User ID: {userId}</h6>

                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select
                                    className="form-select"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    <option value="STORE_ASSOCIATE">Store Associate</option>
                                    <option value="INVENTORY_MANAGER">Inventory Manager</option>
                                    <option value="FINANCE_OFFICER">Finance Officer</option>
                                    <option value="COMPLIANCE_OFFICER">Compliance Officer</option>
                                    <option value="STORE_MANAGER">Store Manager</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Leave blank to keep current password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-success w-100">
                                Update User
                            </button>

                        </form>
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