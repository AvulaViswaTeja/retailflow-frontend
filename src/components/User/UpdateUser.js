<<<<<<< Updated upstream
export  default function GetUserById(){
    return(<div>
        <h1>Update User</h1>
    </div>);
} 
=======
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

        axios.get("http://localhost:8014/api/users/" + userId, {
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

        axios.put("http://localhost:1405/api/users/" + userId, data, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            alert("User updated successfully!");
            console.log(res.data);
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
            <h1>Update User</h1>

          
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

            {userFound && (
                <form>
                    <h3>Editing User ID: {userId}</h3>

                    <label>Name</label>
                    <input
                        placeholder="enter name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    /><br />

                    <label>Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="STORE_ASSOCIATE">Store Associate</option>
                        <option value="INVENTORY_MANAGER">Inventory Manager</option>
                        <option value="FINANCE_OFFICER">Finance Officer</option>
                        <option value="COMPLIANCE_OFFICER">Compliance Officer</option>
                        <option value="STORE_MANAGER">Store Manager</option>
                        <option value="ADMIN">Admin</option>
                    </select><br />

                    <label>Phone Number</label>
                    <input
                        placeholder="enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    /><br />

                    <label>New Password</label>
                    <input
                        type="password"
                        placeholder="leave blank to keep current password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />

                    <button onClick={updateUser}>Update User</button>
                </form>
            )}
        </div>
    );
}
>>>>>>> Stashed changes
