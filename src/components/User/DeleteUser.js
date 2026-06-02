import axios from "axios";
import { useState } from "react";

export default function DeleteUser() {

    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(null);
    const [userFound, setUserFound] = useState(false);

    let fetchUser = (event) => {
        event.preventDefault();

        if (!userId) {
            alert("Please enter a User ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/users/" + userId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setUser(res.data);
            setUserFound(true);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                alert("User not found with ID: " + userId);
            } else {
                alert("Error: " + err.message);
            }
            setUserFound(false);
            setUser(null);
        });
    }

    let deleteUser = (event) => {
        event.preventDefault();

        let confirm = window.confirm(
            "Are you sure you want to delete user: " + user.userName + "?"
        );

        if (!confirm) return;

        let token = localStorage.getItem("token");

        axios.delete("http://localhost:1405/api/users/" + userId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            alert("User deleted successfully!");
            setUserId("");
            setUser(null);
            setUserFound(false);
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

                    <h5 className="card-title mb-4">Delete User</h5>

                    {/* Search Form */}
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

                    {/* User Details */}
                    {userFound && user && (
                        <div className="mt-4">
                            <h6 className="text-muted mb-3">User Found</h6>
                            <table className="table table-bordered table-sm">
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
                                        <td>{user.role}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{user.phoneNumber}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <button
                                className="btn btn-danger w-100 mt-2"
                                onClick={deleteUser}
                            >
                                Delete User
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}