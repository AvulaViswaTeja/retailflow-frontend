import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddUser() {

    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [role, setRole] = useState("");
    let [phone, setPhone] = useState("");

    let [showModal, setShowModal] = useState(false);
    let [modalMessage, setModalMessage] = useState("");
    let [modalSuccess, setModalSuccess] = useState(true);

    const navigate = useNavigate();

    let showError = (message) => {
        setModalSuccess(false);
        setModalMessage(message);
        setShowModal(true);
    };

    let saveHandler = () => {
        if (!name)     { showError("Please enter a name");          return; }
        if (!email)    { showError("Please enter an email");        return; }
        if (!password) { showError("Please enter a password");      return; }
        if (!role)     { showError("Please select a role");         return; }
        if (!phone)    { showError("Please enter a phone number");  return; }

        let url = "http://localhost:8070/api/users";
        let data = { userName: name, email, password, role, phoneNumber: phone };
        let token = localStorage.getItem("token");

        axios.post(url, data, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setModalSuccess(true);
            setModalMessage("User added successfully!");
            setShowModal(true);
            setName("");
            setEmail("");
            setPassword("");
            setRole("");
            setPhone("");
        })
        .catch((error) => {
            showError("Failed to add user: " + (error.response?.data?.message || "Server error"));
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
                    <h4 className="mb-0">Add User</h4>
                </div>
                <div className="card-body">

                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            className="form-select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="">-- Select Role --</option>
                            <option value="STORE_ASSOCIATE">Store Associate</option>
                            <option value="INVENTORY_MANAGER">Inventory Manager</option>
                            <option value="FINANCE_OFFICER">Finance Officer</option>
                            <option value="COMPLIANCE_OFFICER">Compliance Officer</option>
                            <option value="STORE_MANAGER">Store Manager</option>
                            
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-primary w-100"
                            onClick={saveHandler}
                        >
                            Add User
                        </button>
                        <button
                            className="btn btn-secondary w-100"
                            onClick={() => {
                                setName("");
                                setEmail("");
                                setPassword("");
                                setRole("");
                                setPhone("");
                            }}
                        >
                            Reset
                        </button>
                    </div>

                </div>
            </div>

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