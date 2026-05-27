import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

        axios.post("http://localhost:1405/api/auth/register", {
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

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-sm" style={{ width: "100%", maxWidth: 460 }}>
                <div className="card-body p-4">

                    {/* Header */}
                    <div className="text-center mb-4">
                        <h4 className="fw-semibold mb-1">RetailFlow</h4>
                        <p className="text-muted small">Create your account</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="alert alert-danger py-2 small" role="alert">
                            {error}
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="alert alert-success py-2 small" role="alert">
                            {success}
                        </div>
                    )}

                    <form onSubmit={register}>

                        {/* Name + Phone in a row */}
                        <div className="row g-3 mb-3">
                            <div className="col-6">
                                <label className="form-label fw-medium">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="enter name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="col-6">
                                <label className="form-label fw-medium">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="enter phone"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label className="form-label fw-medium">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Role */}
                        <div className="mb-4">
                            <label className="form-label fw-medium">Role</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="">Select role</option>
                                <option value="STORE_ASSOCIATE">Store Associate</option>
                                <option value="INVENTORY_MANAGER">Inventory Manager</option>
                                <option value="FINANCE_OFFICER">Finance Officer</option>
                                <option value="COMPLIANCE_OFFICER">Compliance Officer</option>
                                <option value="STORE_MANAGER">Store Manager</option>
                                <option value="ADMIN">Admin</option>
                            </select>
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
                                    Creating account...
                                </>
                            ) : "Create Account"}
                        </button>

                    </form>

                    {/* Divider */}
                    <hr className="my-3" />

                    {/* Login link */}
                    <p className="text-center text-muted small mb-0">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary fw-medium text-decoration-none">
                            Sign in
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}