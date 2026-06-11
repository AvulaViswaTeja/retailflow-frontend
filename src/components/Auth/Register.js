import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '@tabler/icons-webfont/dist/tabler-icons.min.css';

const GRAD_PRIMARY = "linear-gradient(135deg,#4f8cff,#7b5cff)";

export default function Register() {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let register = (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!userName || !email || !password || !role || !phoneNumber) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);

        axios.post("http://localhost:8070/api/auth/register", {
            "userName": userName,
            "email": email,
            "password": password,
            "role": role,
            "phoneNumber": phoneNumber
        })
        .then(() => {
            setSuccess("Account created successfully! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        })
        .catch((err) => {
            if (err.response && err.response.status === 400) {
                setError("Email already registered. Please use a different email.");
            } else {
                setError("Registration failed. Please try again.");
            }
            setLoading(false);
        });
    }

    const input = {
        width: "100%", height: 42, borderRadius: 9,
        border: "1px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.05)",
        color: "#f0f3fa", padding: "0 12px", fontSize: 13, outline: "none",
    };
    const label = { display: "block", fontSize: 11, color: "#8b97b8", marginBottom: 6 };

    return (
        <div style={{ minHeight: "100vh", background: "#0a0e27", fontFamily: "system-ui, sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>

            <div style={{ width: "100%", maxWidth: 460, background: "#141a35",
                border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: 32 }}>

                <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <div style={{ width: 54, height: 54, borderRadius: 14, background: GRAD_PRIMARY, margin: "0 auto 14px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 8px 24px rgba(79,140,255,.4)" }}>
                        <i className="ti ti-user-plus" aria-hidden="true" style={{ fontSize: 24, color: "#fff" }}></i>
                    </div>
                    <h2 style={{ fontSize: 20, fontWeight: 500, color: "#f0f3fa", marginBottom: 4 }}>Create account</h2>
                    <p style={{ fontSize: 13, color: "#8b97b8" }}>Join RetailFlow today</p>
                </div>

                {error && (
                    <div style={{ padding: "11px 14px", borderRadius: 10, marginBottom: 16, fontSize: 13,
                        background: "rgba(255,77,109,.18)", color: "#ff8fa5", border: "1px solid rgba(255,77,109,.4)" }}>
                        {error}
                    </div>
                )}
                {success && (
                    <div style={{ padding: "11px 14px", borderRadius: 10, marginBottom: 16, fontSize: 13,
                        background: "rgba(34,197,94,.18)", color: "#6ee7a8", border: "1px solid rgba(34,197,94,.4)" }}>
                        {success}
                    </div>
                )}

                <form onSubmit={register}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                        <div>
                            <label style={label}>Full name</label>
                            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
                                placeholder="enter name" style={input} />
                        </div>
                        <div>
                            <label style={label}>Phone</label>
                            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="enter phone" style={input} />
                        </div>
                    </div>

                    <div style={{ marginBottom: 14 }}>
                        <label style={label}>Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            placeholder="enter email" style={input} />
                    </div>

                    <div style={{ marginBottom: 14 }}>
                        <label style={label}>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            placeholder="enter password" style={input} />
                    </div>

                    <div style={{ marginBottom: 22 }}>
                        <label style={label}>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} style={input}>
                            <option value="" style={{ color: "#000" }}>Select role</option>
                            <option value="STORE_ASSOCIATE"    style={{ color: "#000" }}>Store Associate</option>
                            <option value="INVENTORY_MANAGER"  style={{ color: "#000" }}>Inventory Manager</option>
                            <option value="FINANCE_OFFICER"    style={{ color: "#000" }}>Finance Officer</option>
                            <option value="COMPLIANCE_OFFICER" style={{ color: "#000" }}>Compliance Officer</option>
                            <option value="STORE_MANAGER"      style={{ color: "#000" }}>Store Manager</option>
                            <option value="ADMIN"              style={{ color: "#000" }}>Admin</option>
                        </select>
                    </div>

                    <button type="submit" disabled={loading} style={{ width: "100%", height: 44, borderRadius: 9,
                        border: "none", background: GRAD_PRIMARY, color: "#fff", fontSize: 14, fontWeight: 500,
                        cursor: "pointer", boxShadow: "0 6px 18px rgba(79,140,255,.35)" }}>
                        {loading ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <p style={{ textAlign: "center", fontSize: 13, color: "#8b97b8", marginTop: 20 }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#7eb6ff", textDecoration: "none", fontWeight: 500 }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
}