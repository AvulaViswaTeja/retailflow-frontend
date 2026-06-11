import axios from "axios";
import { useState } from "react";

export default function UpdateUser() {

    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [userFound, setUserFound] = useState(false);

    let fetchUser = (event) => {
        event.preventDefault();

        if (!userId) {
            alert("Please enter a User ID");
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
                alert("User not found with ID: " + userId);
            } else {
                alert("Error: " + err.message);
            }
            setUserFound(false);
        });
    }

    let updateUser = (event) => {
        event.preventDefault();

        let token = localStorage.getItem("token");

        let data = {
            "userName": userName,
            "role": role,
            "phoneNumber": phone,
            "password": password
        }

        axios.put("http://localhost:8070/api/users/" + userId, data, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            alert("User updated successfully!");
        })
        .catch((err) => {
            if (err.response) {
                alert("Error: " + err.response.status
                    + " - " + JSON.stringify(err.response.data));
            } else {
                alert("Network error: " + err.message);
            }
        });
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm" style={{ maxWidth: 500 }}>
                <div className="card-body">

                    <h5 className="card-title mb-4">Update User</h5>

                    {/* Step 1 — Search */}
                    <form onSubmit={fetchUser}>
                        <div className="mb-3">
                            <label className="form-label">User ID</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="enter user id"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Search
                        </button>
                    </form>

                    {/* Step 2 — Update Form */}
                    {userFound && (
                        <form onSubmit={updateUser} className="mt-4">

                            <h6 className="text-muted mb-3">
                                Editing User ID: {userId}
                            </h6>

                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="enter name"
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
                                    placeholder="enter phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="leave blank to keep current password"
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
        </div>
    );
}