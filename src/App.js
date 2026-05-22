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
import InsertSale from './components/Sale/InsertSale'
import DeleteSale from './components/Sale/DeleteSale'
import UpdateSale from './components/Sale/UpdateSale'
import GetAllSales from './components/Sale/GetAllSales'
import GetAllSalesPaginated from './components/Sale/GetAllSalesPaginated'
import GetSalesByCustomer from './components/Sale/GetSalesByCustomer'
import GetSaleById from './components/Sale/GetSaleById'
import GetSalesByDateRange from './components/Sale/GetSalesByDateRange'

import PaymentHome from './components/Payment/PaymentHome';
import InsertPayment from './components/Payment/InsertPayment'
import UpdatePayment from './components/Payment/UpdatePayment'
import DeletePayment from './components/Payment/DeletePayment'
import GetPaymentById from './components/Payment/GetPaymentById'
import GetByInvoice from './components/Payment/GetByInvoice'
import GetPaginated from './components/Payment/GetPaginated'
import GetAllPayments from './components/Payment/GetAllPayments'

import InvoiceHome from './components/Invoice/InvoiceHome';
import InsertInvoice from './components/Invoice/InsertInvoice';
import UpdateInvoice from './components/Invoice/UpdateInvoice';
import DeleteInvoice from './components/Invoice/DeleteInvoice';
import GetAllInvoices from './components/Invoice/GetAllInvoices';
import GetByDateRange from './components/Invoice/GetByDateRange';
import GetByStatus from './components/Invoice/GetByStatus';

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
        <Route path="/inventory" element={<InventoryHome/>}>
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
        {/* Sale Route */}
        <Route path="/Sale" element={<SaleHome/>}>
          <Route path="insert" element={<InsertSale/>}></Route>
          <Route path="delete" element={<DeleteSale/>}></Route>
          <Route path="update" element={<UpdateSale/>}></Route>
          <Route path="getById" element={<GetSaleById/>}></Route>
          <Route path="getAll" element={<GetAllSales/>}></Route>
          <Route path="getAllPaginated" element={<GetAllSalesPaginated/>}></Route>
          <Route path="getSalesByCustomer" element={<GetSalesByCustomer/>}></Route>
          <Route path="getSalesByDateRange" element={<GetSalesByDateRange/>}></Route>
        </Route>

        {/* Payment Route */}
        <Route path="/Payment" element={<PaymentHome />}>
          <Route path="insert" element={<InsertPayment/>}></Route>
          <Route path="update" element={<UpdatePayment/>}></Route>
          <Route path="delete" element={<DeletePayment/>}></Route>
          <Route path="getPaymentById" element={<GetPaymentById/>}></Route>
          <Route path="getAll" element={<GetAllPayments/>}></Route>
          <Route path="getByInvoice" element={<GetByInvoice/>}></Route>
          <Route path="getPaginated" element={<GetPaginated/>}></Route>
        </Route>

        {/* Invoice Route */}
        <Route path="/Invoice" element={<InvoiceHome/>}>
          <Route path="insert" element={<InsertInvoice/>}></Route>
          <Route path="update" element={<UpdateInvoice/>}></Route>
          <Route path="delete" element={<DeleteInvoice/>}></Route>
          <Route path="getAll" element={<GetAllInvoices/>}></Route>
          <Route path="getByDateRange" element={<GetByDateRange/>}></Route>
          <Route path="getByStatus" element={<GetByStatus />}></Route>
          <Route path="getPaginated" element={<GetPaginated />}></Route>
        </Route>



       
      </Routes>
    </Router>
  );
}

export default App;