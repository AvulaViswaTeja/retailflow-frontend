import { Outlet, Link } from "react-router-dom";

export default function ComplianceReportHome(){
    return(
        <div>
            <nav>
                <ul>
                    <li><Link to="insert">Insert Compliance Report</Link></li>
                    <li><Link to="delete">Delete Compliance Report</Link></li>
                    <li><Link to="update">Update Compliance Report</Link></li>
                    <li><Link to="getById">Get Compliance Report By Id</Link></li>
                    <li><Link to="getAll">Get All Compliance Reports</Link></li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    );
}