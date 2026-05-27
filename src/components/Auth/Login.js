import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

        axios.post("http://localhost:1405/api/auth/login", {
            "email": email,
            "password": password
        })
        .then((res) => {
            // Store token and user info
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role",  res.data.role);
            localStorage.setItem("userName", res.data.userName);

            // Redirect based on role
            const role = res.data.role;
            if (role === "ADMIN")                navigate("/user/getAllUsers");
            else if (role === "INVENTORY_MANAGER") navigate("/Inventory/getAll");
            else if (role === "FINANCE_OFFICER")   navigate("/Invoice/getAll");
            else if (role === "COMPLIANCE_OFFICER")navigate("/auditLog/getAuditLogs");
            else if (role === "STORE_MANAGER")     navigate("/kpireport/getAll");
            else if (role === "STORE_ASSOCIATE")   navigate("/Sale/getAll");
            else                                   navigate("/Product/getAll");
        })
        .catch(() => {
            setError("Invalid email or password. Please try again.");
            setLoading(false);
        });
    }

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-sm" style={{ width: "100%", maxWidth: 420 }}>
                <div className="card-body p-4">

                    {/* Header */}
                    <div className="text-center mb-4">
                        <h4 className="fw-semibold mb-1">RetailFlow</h4>
                        <p className="text-muted small">Sign in to your account</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="alert alert-danger py-2 small" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={login}>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="form-label fw-medium">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Signing in...
                                </>
                            ) : "Sign In"}
                        </button>

                    </form>

                    {/* Divider */}
                    <hr className="my-3" />

                    {/* Register link */}
                    <p className="text-center text-muted small mb-0">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary fw-medium text-decoration-none">
                            Register
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}