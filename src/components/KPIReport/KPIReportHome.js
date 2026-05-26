import { Outlet, Link } from "react-router-dom";

export default function KPIReportHome() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="savereport">Save KPI Report</Link></li>
                    <li><Link to="getAll">Get All KPI Reports</Link></li>
                    <li><Link to="getPaginated">Get KPI Paginated</Link></li>
                    <li><Link to="getById">Get KPI Report By ID</Link></li>
                    <li><Link to="getLatest">Get KPI Latest By Scope</Link></li>
                    <li><Link to="getTrend">Get KPI Trend </Link></li>
                    <li><Link to="GetByDateRange">Get KPI By Date Range</Link></li>
                    <li><Link to="delete">Delete KPI Report</Link></li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    );
}