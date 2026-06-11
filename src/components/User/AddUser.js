import axios from "axios";
import { useState } from "react";

export default function AddUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");

    let saveUser = (event) => {
        event.preventDefault();

        let token = localStorage.getItem("token");

        if (!token) {
            alert("Not logged in. Please refresh the page.");
            return;
        }

        let data = {
            "userName": name,
            "email": email,
            "password": password,
            "role": role,
            "phoneNumber": phone
        }

        axios.post("http://localhost:8070/api/users", data, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            alert("User created successfully!");
            setName("");
            setEmail("");
            setPassword("");
            setRole("");
            setPhone("");
        })
        .catch((err) => {
            alert("Error: " + err.response.status);
        });
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm" style={{ maxWidth: 500 }}>
                <div className="card-body">

                    <h5 className="card-title mb-4">Add User</h5>

                    <form onSubmit={saveUser}>

                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Add User
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}