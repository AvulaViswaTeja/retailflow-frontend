import axios from "axios";
import { useState, useEffect } from "react";

export default function GetAllUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    let fetchAllUsers = () => {
        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/users", {
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
        <div>
            <h1>Get All Users</h1>

            <table border="1">
                <thead>
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
                            <td colSpan="5">No users found</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.phoneNumber}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}