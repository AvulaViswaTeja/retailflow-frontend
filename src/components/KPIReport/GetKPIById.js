import axios from 'axios';
import { useState } from 'react';

export default function GetById() {
    let [id, setId] = useState('');
    let [report, setReport] = useState(null);
    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);

    let searchHandler = (e) => {
        e.preventDefault();
        setError(''); setReport(null); setLoading(true);

        // Direct endpoint — calls GET /api/kpi-reports/{id}
        axios.get(`http://localhost:1405/api/kpi-reports/${id}`)
            .then((res) => {
                setReport(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(`Report not found with ID: ${id}`);
                setLoading(false);
            });
    }

    return (
        <div>
            <h2>Get KPI Report By ID</h2>
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
                        placeholder="e.g. 3"
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
                <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', maxWidth: '500px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <span style={{ fontWeight: 600 }}>Report #{report.reportId}</span>
                        <span style={{ background: '#E6F1FB', color: '#185FA5', padding: '2px 8px', borderRadius: '20px', fontSize: '11px' }}>{report.scope}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '14px' }}>
                        {[
                            ['Stock Turnover', report.stockTurnover, report.stockTurnover >= 2],
                            ['Sales Growth', `${report.salesGrowth}%`, report.salesGrowth >= 0],
                            ['Shrinkage', `${report.shrinkageRate}%`, report.shrinkageRate <= 5]
                        ].map(([label, value, ok]) => (
                            <div key={label} style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px' }}>
                                <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{label}</div>
                                <div style={{ fontSize: '18px', fontWeight: 600, color: ok ? '#3B6D11' : '#A32D2D' }}>{value}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                        Period: {report.currentStart} → {report.currentEnd}<br />
                        Generated: {report.generatedDate} &nbsp;|&nbsp; Status: {report.status}
                    </div>
                    {report.metrics && (
                        <div style={{ marginTop: '12px', padding: '10px', background: '#f9fafb', borderRadius: '8px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>
                            {report.metrics}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}