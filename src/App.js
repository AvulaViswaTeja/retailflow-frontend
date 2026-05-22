import {BrowserRouter as Router, Routes, Route,Outlet} from 'react-router-dom';
import CatalogHome from './components/Catalog/CatalogHome';
import InsertCatalog from './components/Catalog/InsertCatalog';
import DeleteCatalog from './components/Catalog/DeleteCatalog';
import InventoryHome  from './components/Inventory/InventoryHome';
import SaleHome from './components/Sale/SaleHome';


import ProductHome from './components/Product/ProductHome';
import AddProduct from './components/Product/AddProduct';
import DeleteProduct from './components/Product/DeleteProduct';
import UpdateProduct from './components/Product/UpdateProduct';
import GetProductById from './components/Product/GetProductById';
import GetAllProducts from './components/Product/GetAllProducts';
import UpdateCatalog from './components/Catalog/UpdateCatalog';
import GetAllCatalogs from './components/Catalog/GetAllCatalogs';
import GetCatalogById from './components/Catalog/GetCatalogById';
import GetCatalogsByProduct from './components/Catalog/GetCatalogsByProduct';

import AddInventory from './components/Inventory/AddInventory';
import DeleteInventory from './components/Inventory/DeleteInventory';
import UpdateInventory from './components/Inventory/UpdateInventory';
import GetInventoryById from './components/Inventory/GetInventoryById';
import GetAllInventory from './components/Inventory/GetAllInventory';
import GetLowStock from './components/Inventory/GetLowStock';
import GetInventoryByProduct from './components/Inventory/GetInventoryByProduct';
import ReplenishStock from './components/Inventory/ReplenishStock';


import PurchaseOrderHome from './components/PurchaseOrder/PurchaseOrderHome';
import CreatePurchaseOrder from './components/PurchaseOrder/CreatePurchaseOrder';
import CancelPurchaseOrder from './components/PurchaseOrder/CancelPurchaseOrder';
import UpdatePurchaseOrder from './components/PurchaseOrder/UpdatePurchaseOrder';
import GetPurchaseOrderById from './components/PurchaseOrder/GetPurchaseOrderById';
import GetAllPurchaseOrders from './components/PurchaseOrder/GetAllPurchaseOrders';
import GetPurchaseBySupplier from './components/PurchaseOrder/GetPurchaseBySupplier';
import GetPurchaseByStatus from './components/PurchaseOrder/GetPurchaseByStatus';


import AuditLogHome from './components/AuditLog/AuditLogHome';
import GetAllAuditLogs from './components/AuditLog/GetAllAuditLogs';
import GetAllAuditLogById from './components/AuditLog/GetAuditLogById';
import GetAuditLogByDateRange from './components/AuditLog/GetByDateRange';
import GetByUser from './components/AuditLog/GetByUser';
import GetPaginated from './components/AuditLog/GetPaginated';
import AddUser from './components/User/AddUser';
import DeleteUser from './components/User/DeleteUser';
import UpdateUser from './components/User/UpdateUser';
import GetUserById from './components/User/UpdateUser';

import ComplianceReportHome from './components/ComplianceReport/CompilanceReportHome';
import InsertComplianceReport from './components/ComplianceReport/InsertReport';
import DeleteComplianceReport from './components/ComplianceReport/DeleteReport';
import UpdateComplianceReport from './components/ComplianceReport/UpdateReport';
import GetComplianceReportById from './components/ComplianceReport/GetReportById';
import GetComplianceAllReports from './components/ComplianceReport/GetAllReports';


// new KPI imports
import KPIReportHome from './components/KPIReport/KPIReportHome';
import SaveReport from './components/KPIReport/SaveReport';
import DeleteKPIReport from './components/KPIReport/DeleteReport';
import GetKPITrend from './components/KPIReport/GetTrend';
import GetKPIById from './components/KPIReport/GetById';
import GetAllKPIReports from './components/KPIReport/GetAllReports';
import GetKPIByDateRange from './components/KPIReport/GetByDateRange';
import GetKPILatestByScope from './components/KPIReport/GetLatestByScope';
import GetKPIPaginated from './components/KPIReport/GetPaginated';

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

import GetPaginatedPayments from './components/Payment/GetPaginatedPayments'
import GetAllPayments from './components/Payment/GetAllPayments'

import InvoiceHome from './components/Invoice/InvoiceHome';
import InsertInvoice from './components/Invoice/InsertInvoice';
import UpdateInvoice from './components/Invoice/UpdateInvoice';
import DeleteInvoice from './components/Invoice/DeleteInvoice';
import GetAllInvoices from './components/Invoice/GetAllInvoices';
import GetInvoiceByDateRange from './components/Invoice/GetInvoiceByDateRange';

import GetByStatus from './components/Invoice/GetByStatus';
import GetInvoicePaginated from './components/Invoice/GetInvoicePaginated';

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
          <Route path='update' element={<UpdateCatalog/>}></Route>
          <Route path='getAll' element={<GetAllCatalogs/>}></Route>
          <Route path='getById' element={<GetCatalogById/>}></Route>
          <Route path='getByProduct' element={<GetCatalogsByProduct/>}></Route>
        </Route>

        <Route path='/Product' element={<ProductHome/>}>
          <Route path='add' element={<AddProduct/>}></Route>
          <Route path='delete' element={<DeleteProduct/>}></Route>
          <Route path='update' element={<UpdateProduct/>}></Route>
          <Route path='getById' element={<GetProductById/>}></Route>
          <Route path='getAll' element={<GetAllProducts/>}></Route>
        </Route>


        <Route path="/Inventory" element={<InventoryHome/>}>
        <Route path="insert" element={<AddInventory/>}></Route>
        <Route path="delete" element={<DeleteInventory/>}></Route>
        <Route path="update" element={<UpdateInventory/>}></Route>
        <Route path="getById" element={<GetInventoryById/>}></Route>
        <Route path="getAll" element={<GetAllInventory/>}></Route>
        <Route path="getLowStock" element={<GetLowStock/>}></Route>
        <Route path="getByProduct" element={<GetInventoryByProduct/>}></Route>
        <Route path="replenish" element={<ReplenishStock/>}></Route>
        </Route>
        <Route path="/PurchaseOrder" element={<PurchaseOrderHome/>}>
          <Route path="insert" element={<CreatePurchaseOrder />} />
          <Route path="delete" element={<CancelPurchaseOrder />} />
          <Route path="update" element={<UpdatePurchaseOrder />} />
          <Route path="getById" element={<GetPurchaseOrderById />} />
          <Route path="getAll" element={<GetAllPurchaseOrders />} />
          <Route path="getBySupplier" element={<GetPurchaseBySupplier />} />
          <Route path="getByStatus" element={<GetPurchaseByStatus />} />
        </Route>
        

        <Route path='/Product' element={<ProductHome/>}>
          <Route path='add' element={<AddProduct/>}></Route>
          <Route path='delete' element={<DeleteProduct/>}></Route>
          <Route path='update' element={<UpdateProduct/>}></Route>
          <Route path='getById' element={<GetProductById/>}></Route>
          <Route path='getAll' element={<GetAllProducts/>}></Route>
        </Route>


        
        
        <Route path="/auditLog" element={<AuditLogHome/>}>
            <Route path="getAuditLogs" element={<GetAllAuditLogs/>} />
            <Route path="getAuditLogById" element={<GetAllAuditLogById/>} />
            <Route path="getByDate" element={<GetAuditLogByDateRange/>} />
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
       
          <Route path="getPaginated" element={<GetPaginatedPayments/>}></Route>
        </Route>

        {/* Invoice Route */}
        <Route path="/Invoice" element={<InvoiceHome/>}>
          <Route path="insert" element={<InsertInvoice/>}></Route>
          <Route path="update" element={<UpdateInvoice/>}></Route>
          <Route path="delete" element={<DeleteInvoice/>}></Route>
          <Route path="getAll" element={<GetAllInvoices/>}></Route>
          <Route path="getByDateRange" element={<GetInvoiceByDateRange/>}></Route>
          <Route path="getByStatus" element={<GetByStatus />}></Route>
          <Route path="getPaginated" element={<GetInvoicePaginated />}></Route>
        </Route>

         {/* KPI Reports — new */}
        <Route path="/kpireport" element={<KPIReportHome/>}>
          <Route path="savereport"     element={<SaveReport/>}></Route>
          <Route path="delete"         element={<DeleteKPIReport/>}></Route>
          <Route path="getTrend"       element={<GetKPITrend/>}></Route>
          <Route path="getById"        element={<GetKPIById/>}></Route>
          <Route path="getAll"         element={<GetAllKPIReports/>}></Route>
          <Route path="GetByDateRange" element={<GetKPIByDateRange/>}></Route>
          <Route path="getLatest"      element={<GetKPILatestByScope/>}></Route>
          <Route path="getPaginated"   element={<GetKPIPaginated/>}></Route>
        </Route>

        <Route path="/compliance" element={<ComplianceReportHome/>}>
          <Route path="insert"  element={<InsertComplianceReport/>}></Route>
          <Route path="delete"  element={<DeleteComplianceReport/>}></Route>
          <Route path="update"  element={<UpdateComplianceReport/>}></Route>
          <Route path="getById" element={<GetComplianceReportById/>}></Route>
          <Route path="getAll"  element={<GetComplianceAllReports/>}></Route>
        </Route>



       
      </Routes>

    </Router>
  );
}
