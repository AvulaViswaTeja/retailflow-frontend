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
            const token    = res.data.token;
            const role     = res.data.role;
            const userName = res.data.userName;

            localStorage.setItem("token",    token);
            localStorage.setItem("role",     role);
            localStorage.setItem("userName", userName);
            localStorage.setItem("email",    email);

            // Fetch userId by calling /api/users/me
            axios.get("http://localhost:1405/api/users/me", {
                headers: { "Authorization": "Bearer " + token }
            })
            .then((meRes) => {
                localStorage.setItem("userId", meRes.data.userId);
            })
            .catch(() => {
                // userId not critical — notifications just won't load
            })
            .finally(() => {
                navigate("/dashboard");
            });
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

                    <div className="text-center mb-4">
                        <h4 className="fw-semibold mb-1">RetailFlow</h4>
                        <p className="text-muted small">Sign in to your account</p>
                    </div>

                    {error && (
                        <div className="alert alert-danger py-2 small" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={login}>

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

                    <hr className="my-3" />

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