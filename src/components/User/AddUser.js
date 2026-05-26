import axios from "axios";
import { useState } from "react";

export default function AddUser() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");

    let nameHandler = (event) => {
        setName(event.target.value);
    }

    let emailHandler = (event) => {
        setEmail(event.target.value);
    }

    let passHandler = (event) => {
        setPassword(event.target.value);
    }

    let roleHandler = (event) => {
        setRole(event.target.value);
    }

    let phoneHandler = (event) => {
        setPhone(event.target.value);
    }

    let saveUser = (event) => {
        event.preventDefault();

        let token = localStorage.getItem("token");
        

        
        if (!token) {
            alert("Not logged in. Please refresh the page.");
            return;
        }

        let url = "http://localhost:1405/api/users";

        let data = {
            "userName": name,
            "email": email,
            "password": password,
            "role": role,
            "phoneNumber": phone
        }

        axios.post(url, data, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then((res) => {
            alert("User created successfully!");
            console.log(res.data);

          
            setName("");
            setEmail("");
            setPassword("");
            setRole("");
            setPhone("");
        })
        .catch((err) => {
           
                alert(err.response.status);
            
        });
    }

    return (
        <div>
            <h2>Add User</h2>
            <form>
                <label>Name</label>
                <input
                    placeholder="enter name"
                    value={name}
                    onChange={nameHandler}
                /><br />

                <label>Email</label>
                <input
                    placeholder="enter email"
                    value={email}
                    onChange={emailHandler}
                /><br />

                <label>Password</label>
                <input
                    type="password"
                    placeholder="enter the password"
                    value={password}
                    onChange={passHandler}
                /><br />

                <label>Role</label>
                <select value={role} onChange={roleHandler}>
                    <option value="">Select Role</option>
                    <option value="STORE_ASSOCIATE">Store Associate</option>
                    <option value="INVENTORY_MANAGER">Inventory Manager</option>
                    <option value="FINANCE_OFFICER">Finance Officer</option>
                    <option value="COMPLIANCE_OFFICER">Compliance Officer</option>
                    <option value="STORE_MANAGER">Store Manager</option>
                   
                </select><br />

                <label>Phone Number</label>
                <input
                    placeholder="enter phone number"
                    value={phone}
                    onChange={phoneHandler}
                /><br />

                <button onClick={saveUser}>Add User</button>
            </form>
        </div>
    );
}