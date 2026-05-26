import axios from "axios";
import { useState } from "react";

export default function MarkAsRead() {

    const [notificationId, setNotificationId] = useState("");
    const [notification, setNotification] = useState(null);
    const [notificationFound, setNotificationFound] = useState(false);

    
    let fetchNotification = (event) => {
        event.preventDefault();

        if (!notificationId) {
            alert("Please enter a Notification ID");
            return;
        }

        let token = localStorage.getItem("token");

        axios.get("http://localhost:1405/api/notifications/" + notificationId, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            setNotification(res.data);
            setNotificationFound(true);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                alert("Notification not found with ID: " + notificationId);
            } else {
                alert("Error: " + err.message);
            }
            setNotification(null);
            setNotificationFound(false);
        });
    }

   
    let markAsRead = (event) => {
        event.preventDefault();

        let token = localStorage.getItem("token");

        axios.patch("http://localhost:1405/api/notifications/" + notificationId + "/read", {}, {
            headers: { "Authorization": "Bearer " + token }
        })
        .then((res) => {
            alert("Notification marked as READ successfully!");
            setNotification(res.data); 
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
            <h1>Mark Notification As Read</h1>

            
            <form>
                <label>Notification ID</label>
                <input
                    type="number"
                    placeholder="enter notification id"
                    value={notificationId}
                    onChange={(e) => setNotificationId(e.target.value)}
                />
                <button onClick={fetchNotification}>Search</button>
                
            </form>

            <br />

           
            {notificationFound && notification && (
                <div>
                    <h3>Notification Found</h3>
                    <p>Notification ID: {notification.notificationId}</p>
                    <p>User ID: {notification.userId}</p>
                    <p>User Name: {notification.userName}</p>
                    <p>Message: {notification.message}</p>
                    <p>Category: {notification.category}</p>
                    <p>Status: {notification.status}</p>
                    <p>Created Date: {notification.createdDate}</p>

                    
                    {notification.status === "UNREAD" ? (
                        <button
                            onClick={markAsRead}
                            style={{ backgroundColor: "green", color: "white" }}
                        >
                            Mark As Read
                        </button>
                    ) : (
                        <p style={{ color: "green" }}>
                            ✅ Already marked as READ
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}