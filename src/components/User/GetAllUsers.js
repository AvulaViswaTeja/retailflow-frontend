import axios from "axios";
import { useState, useEffect } from "react";

export default function GetAllUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    let fetchAllUsers = () => {
        let token = localStorage.getItem("token");

        axios.get("http://localhost:8070/api/users", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setUsers(res.data);
        })
        .catch((err) => {
            alert("Error fetching users: " + err.message);
        });
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">

                    <h5 className="card-title mb-4">All Users</h5>

                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-sm align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-muted">
                                            No users found
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.userId}>
                                            <td>{user.userId}</td>
                                            <td>{user.userName}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <span className="badge bg-secondary">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td>{user.phoneNumber}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    );
}