import { NavLink, Outlet, useNavigate } from "react-router-dom";
import '@tabler/icons-webfont/dist/tabler-icons.min.css';

const GRAD_PRIMARY = "linear-gradient(135deg,#4f8cff,#7b5cff)";

const LINKS = [
    { to: "addUser",          label: "Add",       icon: "ti-user-plus" },
    { to: "deleteUser",       label: "Delete",    icon: "ti-user-minus" },
    { to: "updateUser",       label: "Update",    icon: "ti-edit" },
    { to: "getUserById",      label: "Get User",  icon: "ti-user-search" },
    { to: "getUserPaginated", label: "Paginated", icon: "ti-list-numbers" },
    { to: "getAllUsers",      label: "All Users", icon: "ti-users" },
];

export default function UserHome() {
    const navigate = useNavigate();

    const linkStyle = ({ isActive }) => ({
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "8px 14px",
        borderRadius: 9,
        fontSize: 13,
        fontWeight: 500,
        textDecoration: "none",
        transition: "all .15s",
        color: isActive ? "#fff" : "#9aa6c7",
        background: isActive ? "rgba(123,92,255,.22)" : "transparent",
        border: isActive ? "1px solid rgba(123,92,255,.45)" : "1px solid transparent",
    });

    return (
        <div style={{ background: "#0a0e27", minHeight: "100vh", fontFamily: "system-ui, sans-serif", userSelect: "none" }}>

            {/* Top bar */}
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 24px", background: "linear-gradient(90deg,#1a1a40,#1e3a6e)",
                position: "sticky", top: 0, zIndex: 100, flexWrap: "wrap", gap: 12 }}>

                {/* Brand */}
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: GRAD_PRIMARY,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 4px 14px rgba(79,140,255,.4)", cursor: "pointer" }}
                        onClick={() => navigate("/user")}>
                        <i className="ti ti-users" aria-hidden="true" style={{ fontSize: 18, color: "#fff" }}></i>
                    </div>
                    <span style={{ fontSize: 16, fontWeight: 500, color: "#fff", cursor: "pointer" }}
                        onClick={() => navigate("/user")}>
                        User Management
                    </span>
                </div>

                {/* Nav links */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    {LINKS.map(l => (
                        <NavLink key={l.to} to={l.to} end style={linkStyle}
                            onMouseEnter={e => { if (!e.currentTarget.style.background.includes("123,92,255")) { e.currentTarget.style.background = "rgba(255,255,255,.07)"; e.currentTarget.style.color = "#e2e8f5"; } }}
                            onMouseLeave={e => { if (!e.currentTarget.style.border.includes("123,92,255")) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9aa6c7"; } }}>
                            <i className={`ti ${l.icon}`} aria-hidden="true" style={{ fontSize: 15 }}></i>
                            {l.label}
                        </NavLink>
                    ))}
                </div>

                {/* Dashboard button */}
                <button onClick={() => navigate("/dashboard")}
                    style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500,
                        padding: "8px 16px", borderRadius: 9, border: "1px solid rgba(255,255,255,.2)",
                        background: "rgba(255,255,255,.06)", color: "#fff", cursor: "pointer" }}>
                    <i className="ti ti-layout-dashboard" aria-hidden="true" style={{ fontSize: 15 }}></i>
                    Dashboard
                </button>
            </nav>

            {/* Routed page content */}
            <div style={{ padding: 24 }}>
                <Outlet />
            </div>
        </div>
    );
}