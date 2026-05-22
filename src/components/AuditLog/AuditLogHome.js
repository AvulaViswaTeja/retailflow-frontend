import { Link, Outlet } from "react-router";

export default function AuditLogHome(){


    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="getAuditLogs">Get AuditLogs</Link>
                    </li>
                    <li>
                        <Link to="getAuditLogById">Get AuditLogs By Id</Link>
                    </li>
                    <li>
                        <Link to="getByDate">Get AuditLogs By Date</Link>
                    </li>
                    <li>
                        <Link to="getByUser">Get AuditLogs By User</Link>
                    </li>
                    <li>
                        <Link to="getPaginated">Get AuditLogs Paginated</Link>
                    </li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    )
}