import axios from "axios";
import { useState } from "react";

export default function GetUserById() {

    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(null);
    
    let getUser = (event) => {
        event.preventDefault();

        

        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/users/" + userId, {
            headers: {
                "Authorization": "Bearer " + token
            }
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
        <div>
            <h1>Get User By ID</h1>

            <form>
                <label>User ID</label>
                <input
                    type="number"
                    placeholder="enter user id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={getUser}>Search</button>
            </form>

            <br />

            {user && (
                <div>
                    <p>User ID: {user.userId}</p>
                    <p>Name: {user.userName}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <p>Phone: {user.phoneNumber}</p>
                </div>
            )}
        </div>
    );
}