import { useNavigate } from "react-router-dom";
import '@tabler/icons-webfont/dist/tabler-icons.min.css';

const GRAD_PRIMARY = "linear-gradient(135deg,#4f8cff,#7b5cff)";

export default function HomePage() {
    const navigate = useNavigate();

    const features = [
        { icon: "ti-package",        title: "Inventory Management", desc: "Real-time stock tracking and replenishment",    grad: "linear-gradient(135deg,#2563eb,#3b82f6)" },
        { icon: "ti-receipt-2",      title: "Sales & Billing",      desc: "Seamless transaction capture and invoicing",    grad: "linear-gradient(135deg,#16a34a,#22c55e)" },
        { icon: "ti-chart-bar",      title: "KPI Analytics",        desc: "Track growth, turnover and shrinkage metrics",  grad: "linear-gradient(135deg,#d97706,#f59e0b)" },
        { icon: "ti-shield-check",   title: "Compliance & Audit",   desc: "Immutable audit logs and regulatory reporting", grad: "linear-gradient(135deg,#db2777,#ec4899)" },
        { icon: "ti-bell",           title: "Smart Notifications",  desc: "Real-time alerts for stockouts and deadlines",  grad: "linear-gradient(135deg,#7c3aed,#a855f7)" },
        { icon: "ti-users",          title: "Role Based Access",    desc: "Secure access control for every team member",   grad: "linear-gradient(135deg,#0d9488,#14b8a6)" },
    ];

    const roles = [
        { role: "Admin",              icon: "ti-settings" },
        { role: "Store Associate",    icon: "ti-building-store" },
        { role: "Inventory Manager",  icon: "ti-package" },
        { role: "Finance Officer",    icon: "ti-credit-card" },
        { role: "Compliance Officer", icon: "ti-clipboard-list" },
        { role: "Store Manager",      icon: "ti-user-shield" },
    ];

    return (
        <div style={{ minHeight: "100vh", background: "#0a0e27", fontFamily: "system-ui, sans-serif", userSelect: "none" }}>

            {/* Navbar */}
            <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 32px", background: "linear-gradient(90deg,#1a1a40,#1e3a6e)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, color: "#fff", fontSize: 18, fontWeight: 500 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: GRAD_PRIMARY,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 4px 14px rgba(79,140,255,.4)" }}>
                        <i className="ti ti-building-store" aria-hidden="true" style={{ fontSize: 20 }}></i>
                    </div>
                    RetailFlow
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => navigate("/login")} style={{ padding: "8px 18px", borderRadius: 9,
                        border: "1px solid rgba(255,255,255,.25)", background: "transparent", color: "#fff",
                        fontSize: 13, cursor: "pointer" }}>Sign in</button>
                    <button onClick={() => navigate("/register")} style={{ padding: "8px 18px", borderRadius: 9,
                        border: "none", background: GRAD_PRIMARY, color: "#fff", fontSize: 13, cursor: "pointer",
                        boxShadow: "0 6px 18px rgba(79,140,255,.35)" }}>Register</button>
                </div>
            </nav>

            {/* Hero */}
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 32px",
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "center" }}>
                <div>
                    <span style={{ display: "inline-block", fontSize: 12, padding: "5px 14px", borderRadius: 20,
                        marginBottom: 18, background: "rgba(123,92,255,.2)", color: "#c9bbff",
                        border: "1px solid rgba(123,92,255,.4)" }}>
                        Store Operations Platform
                    </span>
                    <h1 style={{ fontSize: 42, fontWeight: 500, color: "#fff", lineHeight: 1.2, marginBottom: 18, userSelect: "none" }}>
                        Manage your retail <span style={{
                            background: "linear-gradient(135deg,#60a5fa,#a855f7)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>operations</span> with ease
                    </h1>
                    <p style={{ fontSize: 16, color: "#9aa6c7", lineHeight: 1.7, marginBottom: 28 }}>
                        RetailFlow unifies your product catalog, inventory tracking, sales transactions,
                        and compliance reporting — all in one place.
                    </p>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                        <button onClick={() => navigate("/login")} style={{ padding: "13px 26px", borderRadius: 10,
                            border: "none", background: GRAD_PRIMARY, color: "#fff", fontSize: 15, fontWeight: 500,
                            cursor: "pointer", boxShadow: "0 8px 24px rgba(79,140,255,.4)" }}>
                            Get started
                            <i className="ti ti-arrow-right" aria-hidden="true" style={{ fontSize: 16, marginLeft: 8, verticalAlign: -2 }}></i>
                        </button>
                        <button onClick={() => navigate("/register")} style={{ padding: "13px 26px", borderRadius: 10,
                            border: "1px solid rgba(255,255,255,.25)", background: "transparent", color: "#fff",
                            fontSize: 15, cursor: "pointer" }}>Create account</button>
                    </div>
                    <div style={{ display: "flex", gap: 30, marginTop: 44 }}>
                        {[["6+", "User roles"], ["13+", "Modules"], ["99.9%", "Uptime"]].map(([n, l], i) => (
                            <div key={l} style={{ paddingLeft: i ? 30 : 0,
                                borderLeft: i ? "1px solid rgba(255,255,255,.15)" : "none" }}>
                                <div style={{ fontSize: 24, fontWeight: 500, color: "#fff" }}>{n}</div>
                                <div style={{ fontSize: 12, color: "#8b97b8" }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feature cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {features.map((f, i) => (
                        <div key={i} style={{ padding: 18, borderRadius: 14, background: "#141a35",
                            border: "1px solid rgba(255,255,255,.08)", transition: "transform .2s" }}
                            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: f.grad, marginBottom: 12,
                                display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <i className={`ti ${f.icon}`} aria-hidden="true" style={{ fontSize: 19, color: "#fff" }}></i>
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 500, color: "#f0f3fa", marginBottom: 4 }}>{f.title}</div>
                            <div style={{ fontSize: 11, color: "#7d88a8", lineHeight: 1.5 }}>{f.desc}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Roles */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", background: "#0c1130" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "50px 32px" }}>
                    <div style={{ textAlign: "center", marginBottom: 28 }}>
                        <h3 style={{ fontSize: 22, fontWeight: 500, color: "#fff", marginBottom: 6 }}>Built for every role</h3>
                        <p style={{ fontSize: 14, color: "#8b97b8" }}>Each team member gets a tailored experience</p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                        {roles.map((r, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px",
                                borderRadius: 30, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)" }}>
                                <i className={`ti ${r.icon}`} aria-hidden="true" style={{ fontSize: 16, color: "#7eb6ff" }}></i>
                                <span style={{ fontSize: 13, color: "#cdd5ea" }}>{r.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer CTA */}
            <div style={{ textAlign: "center", padding: "56px 32px" }}>
                <h3 style={{ fontSize: 20, fontWeight: 500, color: "#fff", marginBottom: 8 }}>Ready to streamline your store operations?</h3>
                <p style={{ fontSize: 14, color: "#8b97b8", marginBottom: 24 }}>Sign in to your account or register to get started</p>
                <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
                    <button onClick={() => navigate("/login")} style={{ padding: "12px 28px", borderRadius: 10,
                        border: "none", background: GRAD_PRIMARY, color: "#fff", fontSize: 14, fontWeight: 500,
                        cursor: "pointer", boxShadow: "0 6px 18px rgba(79,140,255,.35)" }}>Sign in</button>
                    <button onClick={() => navigate("/register")} style={{ padding: "12px 28px", borderRadius: 10,
                        border: "1px solid rgba(255,255,255,.25)", background: "transparent", color: "#fff",
                        fontSize: 14, cursor: "pointer" }}>Register</button>
                </div>
                <p style={{ fontSize: 12, color: "#6b779b", marginTop: 36 }}>
                    © 2026 RetailFlow. Store Operations & Inventory Management Platform.
                </p>
            </div>
        </div>
    );
}