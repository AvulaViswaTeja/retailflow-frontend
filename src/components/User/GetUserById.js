import axios from "axios";
import { useState } from "react";

export default function GetUserById() {

    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(null);

    let getUser = (event) => {
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
            setUser(res.data);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                alert("User not found with ID: " + userId);
            } else {
                alert("Error: " + err.message);
            }
            setUser(null);
        });
    }

    return (
        <div className="container mt-4">
            <div className="card shadow-sm" style={{ maxWidth: 500 }}>
                <div className="card-body">

                    <h5 className="card-title mb-4">Get User By ID</h5>

                    {/* Search Form */}
                    <form onSubmit={getUser}>
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

                    {/* User Details */}
                    {user && (
                        <div className="mt-4">
                            <h6 className="text-muted mb-3">User Found</h6>
                            <table className="table table-bordered table-sm align-middle">
                                <tbody>
                                    <tr>
                                        <th>User ID</th>
                                        <td>{user.userId}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{user.userName}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Role</th>
                                        <td>
                                            <span className="badge bg-secondary">
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{user.phoneNumber}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}