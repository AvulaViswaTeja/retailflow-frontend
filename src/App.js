import {BrowserRouter as Router, Routes, Route,Outlet} from 'react-router-dom';
import CatalogHome from './components/Catalog/CatalogHome';
import InsertCatalog from './components/Catalog/InsertCatalog';
import DeleteCatalog from './components/Catalog/DeleteCatalog';
import InventoryHome  from './components/Inventory/InventoryHome';
import SaleHome from './components/Sale/SaleHome';
import AuditLogHome from './components/AuditLog/AuditLogHome';
import GetAllAuditLogs from './components/AuditLog/GetAllAuditLogs';
import GetAllAuditLogById from './components/AuditLog/GetAuditLogById';
import GetByDateRange from './components/AuditLog/GetByDateRange';
import GetByUser from './components/AuditLog/GetByUser';
import GetPaginated from './components/AuditLog/GetPaginated';
import AddUser from './components/User/AddUser';
import DeleteUser from './components/User/DeleteUser';
import UpdateUser from './components/User/UpdateUser';
import GetUserById from './components/User/UpdateUser';

import UserHome from './components/User/UserHome';
import NotificationHome from './components/Notification/NotificationHome';
import GetNotificationByUser from './components/Notification/GetNotificationByUser';
import DeleteNotification from './components/Notification/DeleteNotification';
import GetAllNotifications from './components/Notification/GetAllNotifications';
import GetNotificationById from './components/Notification/GetNotificationById';
import GetPaginatedUsers from './components/User/GetPaginatedUsers';
import GetAllUsers from './components/User/GetAllUsers';
import InsertNotification from './components/Notification/InsertNotification';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Catalog" element={<CatalogHome/>}>
          <Route path="insert" element={<InsertCatalog/>}></Route>
          <Route path="delete" element={<DeleteCatalog/>}></Route>

        </Route>

        <Route path="/inventory" element={<InventoryHome/>}></Route>
        <Route path="/auditLog" element={<AuditLogHome/>}>
            <Route path="getAuditLogs" element={<GetAllAuditLogs/>} />
            <Route path="getAuditLogById" element={<GetAllAuditLogById/>} />
            <Route path="getByDate" element={<GetByDateRange/>} />
            <Route path="getByUser" element={<GetByUser/>} />
            <Route path="getPaginated" element={<GetPaginated/>} />
        </Route>

         <Route path="/user" element={<UserHome/>}>
            <Route path="addUser" element={<AddUser/>} />
            <Route path="deleteUser" element={<DeleteUser/>} />
            <Route path="updateUser" element={<UpdateUser/>} />
            <Route path="getUserById" element={<GetUserById/>} />
            <Route path="getUserPaginated" element={<GetPaginatedUsers/>} />
            <Route path="getAllUsers" element={<GetAllUsers/>} />
        </Route>
        <Route path="/notification" element={<NotificationHome/>}>
            <Route path="insert" element={<InsertNotification/>} />
            <Route path="delete" element={<DeleteNotification/>} />
            <Route path="getAllNotifications" element={<GetAllNotifications/>} />
            <Route path="getNotificationById" element={<GetNotificationById/>} />
            <Route path="getNotificationByUser" element={<GetNotificationByUser/>} />
        
            
        
        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;