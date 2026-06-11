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

        axios.post("http://localhost:8070/api/notifications", data, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(() => {
            alert("Notification created successfully!");
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
        <div className="container mt-4">
            <div className="card shadow-sm" style={{ maxWidth: 500 }}>
                <div className="card-body">

                    <h5 className="card-title mb-4">Insert Notification</h5>

                    <form onSubmit={saveNotification}>

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

                        <div className="mb-3">
                            <label className="form-label">Message</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="enter message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Category</label>
                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="STOCK_ALERT">Stock Alert</option>
                                <option value="PAYMENT">Payment</option>
                                <option value="SALES">Sales</option>
                                <option value="COMPLIANCE">Compliance</option>
                                <option value="GENERAL">General</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Save Notification
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}