import axios from 'axios';
import { useState } from 'react';

export default function SaveReport() {

    let today = new Date().toISOString().split('T')[0];
    let monthStart = today.slice(0, 7) + '-01';
    let lastMonthEnd = new Date(new Date().setDate(0)).toISOString().split('T')[0];
    let lastMonthStart = lastMonthEnd.slice(0, 7) + '-01';

    let [form, setForm] = useState({
        scope: 'MONTHLY',
        currentStart: monthStart,
        currentEnd: today,
        previousStart: lastMonthStart,
        previousEnd: lastMonthEnd
    });

    let [result, setResult] = useState(null);
    let [loading, setLoading] = useState(false);
    let [copied, setCopied] = useState(false);

    let saveHandler = (e) => {
        e.preventDefault();
        if (!form.scope) { alert("Please select a scope"); return; }
        setResult(null); setLoading(true);

        axios.post("http://localhost:1405/api/kpi-reports", form)
            .then((res) => { setResult(res.data); setLoading(false); })
            .catch((err) => { alert("Failed: " + err.message); setLoading(false); });
    }

    let copyMetrics = () => {
        navigator.clipboard.writeText(result.metrics);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    let statusColor = (v, min, max) => {
        if (max) return v <= max ? "#3B6D11" : "#A32D2D";
        return v >= min ? "#3B6D11" : "#A32D2D";
    }

    let statusIcon = (v, min, max) => {
        let ok = max ? v <= max : v >= min;
        return ok ? "✓" : "✗";
    }

    let verdictColor = (s) => {
        if (s === "PASS")    return { bg: "#EAF3DE", color: "#3B6D11" };
        if (s === "WARNING") return { bg: "#FAEEDA", color: "#854F0B" };
        if (s === "FAIL")    return { bg: "#FCEBEB", color: "#A32D2D" };
        return { bg: "#f0f0f0", color: "#333" };
    }

    let card = { background: "white", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "20px", marginBottom: "16px" };
    let metricCard = { background: "#f9fafb", borderRadius: "8px", padding: "14px" };
    let label = { fontSize: "12px", color: "#6b7280", display: "block", marginBottom: "6px" };
    let input = { width: "100%", padding: "8px 10px", fontSize: "13px", border: "1px solid #e5e7eb", borderRadius: "8px", fontFamily: "sans-serif" };
    let grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" };
    let grid3 = { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginBottom: "16px" };

    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: "800px" }}>

            {/* Header */}
            <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>Generate KPI Report</h2>
                <p style={{ fontSize: "13px", color: "#6b7280" }}>
                    System computes stock turnover, sales growth, and shrinkage from actual data
                </p>
            </div>

            {/* Form */}
            <div style={card}>
                <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "14px" }}>Report parameters</p>

                <div style={{ marginBottom: "14px" }}>
                    <label style={label}>Scope</label>
                    <select value={form.scope} onChange={e => setForm({ ...form, scope: e.target.value })} style={input}>
                        <option value="">-- Select scope --</option>
                        <option>DAILY</option>
                        <option>WEEKLY</option>
                        <option>MONTHLY</option>
                        <option>CUSTOM</option>
                    </select>
                </div>

                <div style={grid2}>
                    <div>
                        <label style={label}>Current period start</label>
                        <input type="date" value={form.currentStart} onChange={e => setForm({ ...form, currentStart: e.target.value })} style={input} />
                    </div>
                    <div>
                        <label style={label}>Current period end</label>
                        <input type="date" value={form.currentEnd} onChange={e => setForm({ ...form, currentEnd: e.target.value })} style={input} />
                    </div>
                </div>

                <div style={grid2}>
                    <div>
                        <label style={label}>Previous period start</label>
                        <input type="date" value={form.previousStart} onChange={e => setForm({ ...form, previousStart: e.target.value })} style={input} />
                    </div>
                    <div>
                        <label style={label}>Previous period end</label>
                        <input type="date" value={form.previousEnd} onChange={e => setForm({ ...form, previousEnd: e.target.value })} style={input} />
                    </div>
                </div>

                <button onClick={saveHandler} disabled={loading}
                    style={{ padding: "9px 20px", fontSize: "13px", fontWeight: 500, background: loading ? "#9ca3af" : "#111827", color: "white", border: "none", borderRadius: "8px", cursor: loading ? "not-allowed" : "pointer" }}>
                    {loading ? "Generating..." : "Generate Report"}
                </button>
            </div>

            {/* Result */}
            {result && (
                <div style={card}>
                    {/* Header row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                        <p style={{ fontSize: "14px", fontWeight: 500 }}>Report #{result.reportId} — {result.scope}</p>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 500, ...verdictColor(result.status) }}>
                            {result.status}
                        </span>
                    </div>

                    <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "16px" }}>
                        {result.currentStart} → {result.currentEnd} &nbsp;|&nbsp; Generated {result.generatedDate}
                    </p>

                    {/* KPI cards */}
                    <div style={grid3}>
                        <div style={metricCard}>
                            <div style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Stock Turnover</div>
                            <div style={{ fontSize: "26px", fontWeight: 600, color: statusColor(result.stockTurnover, 2) }}>{result.stockTurnover}</div>
                            <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}>Min: 2.0 {statusIcon(result.stockTurnover, 2)}</div>
                        </div>
                        <div style={metricCard}>
                            <div style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Sales Growth</div>
                            <div style={{ fontSize: "26px", fontWeight: 600, color: statusColor(result.salesGrowth, 0) }}>{result.salesGrowth}%</div>
                            <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}>Min: 0% {statusIcon(result.salesGrowth, 0)}</div>
                        </div>
                        <div style={metricCard}>
                            <div style={{ fontSize: "11px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "6px" }}>Shrinkage Rate</div>
                            <div style={{ fontSize: "26px", fontWeight: 600, color: statusColor(result.shrinkageRate, null, 5) }}>{result.shrinkageRate}%</div>
                            <div style={{ fontSize: "11px", color: "#6b7280", marginTop: "4px" }}>Max: 5% {statusIcon(result.shrinkageRate, null, 5)}</div>
                        </div>
                    </div>

                    {/* Threshold checks */}
                    <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "10px" }}>Threshold checks</p>
                    {[
                        { label: "Stock turnover ≥ 2.0", value: result.stockTurnover, pass: result.stockTurnover >= 2, display: result.stockTurnover },
                        { label: "Sales growth ≥ 0%", value: result.salesGrowth, pass: result.salesGrowth >= 0, display: `${result.salesGrowth}%` },
                        { label: "Shrinkage rate ≤ 5%", value: result.shrinkageRate, pass: result.shrinkageRate <= 5, display: `${result.shrinkageRate}%` },
                    ].map((item) => (
                        <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: "#f9fafb", borderRadius: "8px", marginBottom: "6px" }}>
                            <span style={{ fontSize: "13px" }}>{item.label}</span>
                            <span style={{ fontSize: "12px", fontWeight: 500, color: item.pass ? "#3B6D11" : "#A32D2D" }}>
                                {item.pass ? "✓" : "✗"} {item.display} — {item.pass ? "within threshold" : "breached"}
                            </span>
                        </div>
                    ))}

                    <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", margin: "16px 0" }} />

                    {/* Copy metrics */}
                    <p style={{ fontSize: "14px", fontWeight: 500, marginBottom: "10px" }}>Copy for compliance check</p>
                    <div onClick={copyMetrics} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#6b7280", fontFamily: "monospace", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>{result.metrics}</span>
                        <span style={{ fontSize: "12px", marginLeft: "8px", flexShrink: 0, color: copied ? "#3B6D11" : "#6b7280" }}>{copied ? "Copied!" : "Copy"}</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "6px" }}>Click to copy, then paste into the compliance report form</p>
                </div>
            )}
        </div>
    );
}