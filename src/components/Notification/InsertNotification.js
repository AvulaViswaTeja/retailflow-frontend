import axios from "axios";
import { useState } from "react";

export default function InsertNotification() {

    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [category, setCategory] = useState("");

    let saveNotification = (event) => {
        event.preventDefault();

        if (!userId || !message || !category) {
            alert("Please fill all fields");
            return;
        }

        let token = localStorage.getItem("token");

        let data = {
            "userId": userId,
            "message": message,
            "category": category
        }

        axios.post("http://localhost:1405/api/notifications", data, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            alert("Notification created successfully!");
            console.log(res.data);
            setUserId("");
            setMessage("");
            setCategory("");
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
            <h1>Insert Notification</h1>

            <form>
                <label>User ID</label>
                <input
                    type="number"
                    placeholder="enter user id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                /><br />

                <label>Message</label>
                <input
                    placeholder="enter message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                /><br />

                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="STOCK_ALERT">Stock Alert</option>
                    <option value="PAYMENT">Payment</option>
                    <option value="SALES">Sales</option>
                    <option value="COMPLIANCE">Compliance</option>
                    <option value="GENERAL">General</option>
                </select><br /><br />

                <button onClick={saveNotification}>Save Notification</button>
            </form>
        </div>
    );
}