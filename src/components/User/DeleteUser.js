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
        <div>
            <h1>Delete User</h1>

            <form>
                <label>User ID</label>
                <input
                    type="number"
                    placeholder="enter user id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={fetchUser}>Search</button>
            </form>

            <br />

            {userFound && user && (
                <div>
                    <h3>User Found</h3>
                    <p>User ID: {user.userId}</p>
                    <p>Name: {user.userName}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <p>Phone: {user.phoneNumber}</p>

                    <button
                        onClick={deleteUser}
                        style={{ backgroundColor: "red", color: "white" }}
                    >
                        Delete User
                    </button>
                </div>
            )}
        </div>
    );
}