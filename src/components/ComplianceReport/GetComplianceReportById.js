import axios from 'axios';
import { useState } from 'react';

export default function GetComplianceReportById() {

    let [id, setId] = useState('');
    let [report, setReport] = useState(null);
    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);

    let searchHandler = (e) => {
        e.preventDefault();
        setError(''); setReport(null); setLoading(true);

        axios.get(`http://localhost:8016/api/compliance-reports/${id}`)
            .then((res) => { setReport(res.data); setLoading(false); })
            .catch(() => { setError(`Report not found with ID: ${id}`); setLoading(false); });
    }

    let statusColor = (s) => {
        if (s === 'PASS')    return '#3B6D11';
        if (s === 'WARNING') return '#854F0B';
        if (s === 'FAIL')    return '#A32D2D';
        return '#111827';
    }

    let statusBg = (s) => {
        if (s === 'PASS')    return '#EAF3DE';
        if (s === 'WARNING') return '#FAEEDA';
        if (s === 'FAIL')    return '#FCEBEB';
        return '#f3f4f6';
    }

    return (
        <div>
            <h2>Get Compliance Report By ID</h2>
            <br />

            {error && (
                <div style={{ background: '#FCEBEB', border: '1px solid #f87171', borderRadius: '8px', padding: '10px 14px', color: '#A32D2D', fontSize: '13px', marginBottom: '16px' }}>
                    {error}
                </div>
            )}

            <form onSubmit={searchHandler} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', marginBottom: '24px' }}>
                <div>
                    <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px' }}>Report ID</label>
                    <input
                        type="number"
                        placeholder="e.g. 8"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        required
                        style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', width: '140px' }}
                    />
                </div>
                <button type="submit" disabled={loading}
                    style={{ padding: '9px 18px', background: '#111827', color: 'white', border: 'none', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {report && (
                <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', maxWidth: '540px' }}>

                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ fontWeight: 600, fontSize: '15px' }}>Report #{report.reportId}</span>
                        <span style={{ background: statusBg(report.status), color: statusColor(report.status), padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 500 }}>
                            {report.status}
                        </span>
                    </div>

                    {/* Scope and date */}
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>
                        Scope: {report.scope} &nbsp;|&nbsp; Generated: {report.generatedDate}
                    </div>

                    {/* KPI cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '14px' }}>
                        {[
                            ['Stock Turnover', report.stockTurnover, report.stockTurnover >= 2],
                            ['Sales Growth',   `${report.salesGrowth}%`, report.salesGrowth >= 0],
                            ['Shrinkage',      `${report.shrinkageRate}%`, report.shrinkageRate <= 5]
                        ].map(([label, value, ok]) => (
                            <div key={label} style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px' }}>
                                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{label}</div>
                                <div style={{ fontSize: '18px', fontWeight: 600, color: ok ? '#3B6D11' : '#A32D2D' }}>{value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Remarks */}
                    {report.remarks && (
                        <div style={{ padding: '10px 14px', background: statusBg(report.status), borderRadius: '8px', fontSize: '13px', color: statusColor(report.status), marginBottom: '12px' }}>
                            {report.remarks}
                        </div>
                    )}

                    {/* Metrics */}
                    {report.metrics && (
                        <div style={{ padding: '10px 14px', background: '#f9fafb', borderRadius: '8px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>
                            {report.metrics}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}