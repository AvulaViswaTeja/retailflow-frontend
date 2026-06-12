import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '@tabler/icons-webfont/dist/tabler-icons.min.css';

const GRAD_PRIMARY = "linear-gradient(135deg,#4f8cff,#7b5cff)";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    let login = (event) => {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);

        axios.post("http://localhost:8070/api/auth/login", {
            "email": email,
            "password": password
        })
            .then((res) => {
                localStorage.setItem("token",    res.data.token);
                localStorage.setItem("role",     res.data.role);
                localStorage.setItem("userName", res.data.userName);
                localStorage.setItem("email",    email);
                localStorage.setItem("userId",   res.data.userId);   // ← from login response

                navigate("/dashboard");
            })
            .catch(() => {
                setError("Invalid email or password. Please try again.");
                setLoading(false);
            });
    }

    const input = {
        width: "100%", height: 42, borderRadius: 9,
        border: "1px solid rgba(255,255,255,.12)", background: "rgba(255,255,255,.05)",
        color: "#f0f3fa", padding: "0 12px 0 38px", fontSize: 13, outline: "none",
    };
    const label = { display: "block", fontSize: 11, color: "#8b97b8", marginBottom: 6 };

    return (
        <div style={{
            minHeight: "100vh", background: "#0a0e27", fontFamily: "system-ui, sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20
        }}>

            <div style={{
                width: "100%", maxWidth: 400, background: "#141a35",
                border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: 32
            }}>

                <div style={{ textAlign: "center", marginBottom: 26 }}>
                    <div style={{
                        width: 54, height: 54, borderRadius: 14, background: GRAD_PRIMARY, margin: "0 auto 14px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 8px 24px rgba(79,140,255,.4)"
                    }}>
                        <i className="ti ti-building-store" aria-hidden="true" style={{ fontSize: 26, color: "#fff" }}></i>
                    </div>
                    <h2 style={{ fontSize: 20, fontWeight: 500, color: "#f0f3fa", marginBottom: 4 }}>Welcome back</h2>
                    <p style={{ fontSize: 13, color: "#8b97b8" }}>Sign in to your RetailFlow account</p>
                </div>

                {error && (
                    <div style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "11px 14px",
                        borderRadius: 10, marginBottom: 16, fontSize: 13,
                        background: "rgba(255,77,109,.18)", color: "#ff8fa5", border: "1px solid rgba(255,77,109,.4)"
                    }}>
                        <i className="ti ti-alert-circle" aria-hidden="true" style={{ fontSize: 16 }}></i>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={login}>
                    <div style={{ marginBottom: 16 }}>
                        <label style={label}>Email address</label>
                        <div style={{ position: "relative" }}>
                            <i className="ti ti-mail" aria-hidden="true" style={{
                                position: "absolute", left: 12, top: 13,
                                fontSize: 16, color: "#6b779b"
                            }}></i>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder="enter your email" style={input} />
                        </div>
                    </div>

                    <div style={{ marginBottom: 22 }}>
                        <label style={label}>Password</label>
                        <div style={{ position: "relative" }}>
                            <i className="ti ti-lock" aria-hidden="true" style={{
                                position: "absolute", left: 12, top: 13,
                                fontSize: 16, color: "#6b779b"
                            }}></i>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="enter your password" style={input} />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} style={{
                        width: "100%", height: 44, borderRadius: 9,
                        border: "none", background: GRAD_PRIMARY, color: "#fff", fontSize: 14, fontWeight: 500,
                        cursor: "pointer", boxShadow: "0 6px 18px rgba(79,140,255,.35)"
                    }}>
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <p style={{ textAlign: "center", fontSize: 13, color: "#8b97b8", marginTop: 20 }}>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "#7eb6ff", textDecoration: "none", fontWeight: 500 }}>Register</Link>
                </p>
            </div>
        </div>
    );
}