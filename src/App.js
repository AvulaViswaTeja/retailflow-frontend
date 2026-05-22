import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';

// existing imports — unchanged
import CatalogHome from './components/Catalog/CatalogHome';
import InsertCatalog from './components/Catalog/InsertCatalog';
import DeleteCatalog from './components/Catalog/DeleteCatalog';
// new imports for Compliance Report
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

export default App;