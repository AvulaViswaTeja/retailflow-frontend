import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';


import CatalogHome from './components/Catalog/CatalogHome';
import InsertCatalog from './components/Catalog/InsertCatalog';
import DeleteCatalog from './components/Catalog/DeleteCatalog';
import UpdateCatalog from './components/Catalog/UpdateCatalog';
import GetAllCatalogs from './components/Catalog/GetAllCatalogs';
import GetCatalogById from './components/Catalog/GetCatalogById';
import GetCatalogsByProduct from './components/Catalog/GetCatalogsByProduct';





import ProductHome from './components/Product/ProductHome';
import AddProduct from './components/Product/AddProduct';
import DeleteProduct from './components/Product/DeleteProduct';
import UpdateProduct from './components/Product/UpdateProduct';
import GetProductById from './components/Product/GetProductById';
import GetAllProducts from './components/Product/GetAllProducts';

// Inventory
import InventoryHome from './components/Inventory/InventoryHome';


import AddInventory from './components/Inventory/AddInventory';
import DeleteInventory from './components/Inventory/DeleteInventory';
import UpdateInventory from './components/Inventory/UpdateInventory';
import GetInventoryById from './components/Inventory/GetInventoryById';
import GetAllInventory from './components/Inventory/GetAllInventory';
import GetLowStock from './components/Inventory/GetLowStock';
import GetInventoryByProduct from './components/Inventory/GetInventoryByProduct';
import ReplenishStock from './components/Inventory/ReplenishStock';

// Purchase Order
import PurchaseOrderHome from './components/PurchaseOrder/PurchaseOrderHome';
import CreatePurchaseOrder from './components/PurchaseOrder/CreatePurchaseOrder';
import CancelPurchaseOrder from './components/PurchaseOrder/CancelPurchaseOrder';
import UpdatePurchaseOrder from './components/PurchaseOrder/UpdatePurchaseOrder';
import GetPurchaseOrderById from './components/PurchaseOrder/GetPurchaseOrderById';
import GetAllPurchaseOrders from './components/PurchaseOrder/GetAllPurchaseOrders';
import GetPurchaseBySupplier from './components/PurchaseOrder/GetPurchaseBySupplier';
import GetPurchaseByStatus from './components/PurchaseOrder/GetPurchaseByStatus';

// Audit Log
import AuditLogHome from './components/AuditLog/AuditLogHome';
import GetAllAuditLogs from './components/AuditLog/GetAllAuditLogs';
import GetAllAuditLogById from './components/AuditLog/GetAuditLogById';
import GetAuditLogByDateRange from './components/AuditLog/GetByDateRange';
import GetByUser from './components/AuditLog/GetByUser';
import GetAuditPaginated from './components/AuditLog/GetAuditPaginated';

// User
import UserHome from './components/User/UserHome';
import AddUser from './components/User/AddUser';
import DeleteUser from './components/User/DeleteUser';
import UpdateUser from './components/User/UpdateUser';
import GetUserById from './components/User/GetUserById';
import GetPaginatedUsers from './components/User/GetPaginatedUsers';
import GetAllUsers from './components/User/GetAllUsers';






// Compliance
import ComplianceReportHome from './components/ComplianceReport/CompilanceReportHome';
import InsertComplianceReport from './components/ComplianceReport/InsertCompilanceReport';
import DeleteComplianceReport from './components/ComplianceReport/DeleteCompilanceReport';
import UpdateComplianceReport from './components/ComplianceReport/UpdateComplianceReport';
import GetComplianceReportById from './components/ComplianceReport/GetComplianceReportById';
import GetComplianceAllReports from './components/ComplianceReport/GetAllComplianceReports';
import GetCompliancePaginated from './components/ComplianceReport/GetCompliancePaginated';

// KPI Report 
import KPIReportHome from './components/KPIReport/KPIReportHome';
import SaveReport from './components/KPIReport/SaveReport';
import DeleteKPIReport from './components/KPIReport/DeleteKPIReport';
import GetKPITrend from './components/KPIReport/GetKPITrend';
import GetKPIById from './components/KPIReport/GetKPIById';
import GetAllKPIReports from './components/KPIReport/GetAllKPIReports';
import GetKPIByDateRange from './components/KPIReport/GetKPIByDateRange';
import GetKPILatestByScope from './components/KPIReport/GetKPILatestByScope';
import GetKPIPaginated from './components/KPIReport/GetKPIPaginated';
import UpdateKPIReport from './components/KPIReport/UpdateKPIReport';

// Sale
import SaleHome from './components/Sale/SaleHome';
import InsertSale from './components/Sale/InsertSale';
import DeleteSale from './components/Sale/DeleteSale';
import UpdateSale from './components/Sale/UpdateSale';
import GetAllSales from './components/Sale/GetAllSales';
import GetAllSalesPaginated from './components/Sale/GetAllSalesPaginated';
import GetSalesByCustomer from './components/Sale/GetSalesByCustomer';
import GetSaleById from './components/Sale/GetSaleById';
import GetSalesByDateRange from './components/Sale/GetSalesByDateRange';

// Payment
import PaymentHome from './components/Payment/PaymentHome';
import InsertPayment from './components/Payment/InsertPayment';
import UpdatePayment from './components/Payment/UpdatePayment';
import DeletePayment from './components/Payment/DeletePayment';
import GetPaymentById from './components/Payment/GetPaymentById';
import GetByInvoice from './components/Payment/GetByInvoice';
import GetPaginatedPayments from './components/Payment/GetPaginatedPayments';
import GetAllPayments from './components/Payment/GetAllPayments';

// Invoice
import InvoiceHome from './components/Invoice/InvoiceHome';
import InsertInvoice from './components/Invoice/InsertInvoice';
import UpdateInvoice from './components/Invoice/UpdateInvoice';
import DeleteInvoice from './components/Invoice/DeleteInvoice';
import GetAllInvoices from './components/Invoice/GetAllInvoices';
import GetInvoiceByDateRange from './components/Invoice/GetInvoiceByDateRange';
import GetByStatus from './components/Invoice/GetInvoiceByStatus';

import GetInvoiceById from './components/Invoice/GetInvoiceById';
import GetInvoiceByStatus from './components/Invoice/GetInvoiceByStatus';
import GetInvoicePaginated from './components/Invoice/GetInvoicePaginated';


import NotificationHome from './components/Notification/NotificationHome';
import GetNotificationByUser from './components/Notification/GetNotificationByUser';
import DeleteNotification from './components/Notification/DeleteNotification';
import GetAllNotifications from './components/Notification/GetAllNotifications';
import GetNotificationById from './components/Notification/GetNotificationById';
import InsertNotification from './components/Notification/InsertNotification';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MarkAsRead from './components/Notification/MarkAsRead';


function App() {
   const [loading, setLoading] = useState(true); 
 
    useEffect(() => {
        
        localStorage.clear(); 
 
        
        axios.post("http://localhost:8014/api/auth/login", {
            "email": "admin@retailflow.com",
            "password": "admin123"
        })
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("userName", res.data.userName);
            console.log("Auto logged in as Admin");
            setLoading(false);
        })
        .catch((err) => {
            console.log("Auto login failed: " + err.message);
            setLoading(false);
        });
    }, []); 
    if (loading) {
        return <div>Logging in...</div>;
    }
  return (
    
    <Router>
      <Routes>

       

        

        

        {/* Audit Log */}
        <Route path="/auditLog" element={<AuditLogHome/>}>
          <Route path="getAuditLogs"   element={<GetAllAuditLogs/>}/>
          <Route path="getAuditLogById"element={<GetAllAuditLogById/>}/>
          <Route path="getByDate"      element={<GetAuditLogByDateRange/>}/>
          <Route path="getByUser"      element={<GetByUser/>}/>
          <Route path="getPaginated"   element={<GetAuditPaginated/>}/>
        </Route>

        {/* User */}
        <Route path="/user" element={<UserHome/>}>
          <Route path="addUser"          element={<AddUser/>}/>
          <Route path="deleteUser"       element={<DeleteUser/>}/>
          <Route path="updateUser"       element={<UpdateUser/>}/>
          <Route path="getUserById"      element={<GetUserById/>}/>
          <Route path="getUserPaginated" element={<GetPaginatedUsers/>}/>
          <Route path="getAllUsers"      element={<GetAllUsers/>}/>
        </Route>

        {/* Notification */}
        <Route path="/notification" element={<NotificationHome/>}>
          <Route path="insert"                element={<InsertNotification/>}/>
          <Route path="delete"                element={<DeleteNotification/>}/>
          <Route path="getAllNotifications"   element={<GetAllNotifications/>}/>
          <Route path="getNotificationById"   element={<GetNotificationById/>}/>
          <Route path="getNotificationByUser" element={<GetNotificationByUser/>}/>
        </Route>

        

        
       
        <Route path="/Catalog" element={<CatalogHome/>}>
          <Route path="insert"       element={<InsertCatalog/>}/>
          <Route path="delete"     element={<DeleteCatalog/>}/>  
          <Route path="delete/:id" element={<DeleteCatalog/>}/>
          <Route path="update"       element={<UpdateCatalog/>}/>       
          <Route path="update/:id"   element={<UpdateCatalog/>}/>       
          <Route path="getAll"       element={<GetAllCatalogs/>}/>
          <Route path="getById"      element={<GetCatalogById/>}/>
          <Route path="getByProduct" element={<GetCatalogsByProduct/>}/>
        </Route>

        <Route path='/Product' element={<ProductHome/>}>
          <Route path='add'        element={<AddProduct/>}/>
          <Route path='update'     element={<UpdateProduct/>}/>     
          <Route path='update/:id' element={<UpdateProduct/>}/>     
          <Route path='getById'    element={<GetProductById/>}/>
          <Route path='getAll'     element={<GetAllProducts/>}/>
          <Route path='delete'     element={<DeleteProduct/>}/>
          <Route path='delete/:id' element={<DeleteProduct/>}/>
        </Route>


        
        <Route path="/Inventory" element={<InventoryHome/>}>
        <Route path="insert" element={<AddInventory/>}></Route>
        <Route path="delete/:inventoryId" element={<DeleteInventory/>}></Route>
        <Route path="update/:inventoryId" element={<UpdateInventory/>}></Route>
        <Route path="getById" element={<GetInventoryById/>}></Route>
        <Route path="getAll" element={<GetAllInventory/>}></Route>
        <Route path="getLowStock" element={<GetLowStock/>}></Route>
        <Route path="getByProduct" element={<GetInventoryByProduct/>}></Route>
        <Route path="replenish" element={<ReplenishStock/>}></Route>
        </Route>

        <Route path="/PurchaseOrder" element={<PurchaseOrderHome/>}>
          <Route path="insert" element={<CreatePurchaseOrder />} />
          <Route path="delete/:purchaseOrderId" element={<CancelPurchaseOrder />} />
          <Route path="update/:purchaseOrderId" element={<UpdatePurchaseOrder />} />
          <Route path="getById" element={<GetPurchaseOrderById />} />
          <Route path="getAll" element={<GetAllPurchaseOrders />} />
          <Route path="getBySupplier" element={<GetPurchaseBySupplier />} />
          <Route path="getByStatus" element={<GetPurchaseByStatus />} />
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
          <Route path="getById" element={<GetInvoiceById/>}></Route>
          <Route path="getByDateRange" element={<GetInvoiceByDateRange/>}></Route>
          <Route path="getByStatus" element={<GetInvoiceByStatus />}></Route>
          <Route path="getPaginated" element={<GetInvoicePaginated />}></Route>
        </Route>

         {/* KPI Reports — new */}
        <Route path="/kpireport" element={<KPIReportHome/>}>
          <Route path="savereport"     element={<SaveReport/>}/>
          <Route path="delete"         element={<DeleteKPIReport/>}/>
          <Route path="getTrend"       element={<GetKPITrend/>}/>
          <Route path="getById"        element={<GetKPIById/>}/>
          <Route path="getAll"         element={<GetAllKPIReports/>}/>
          <Route path="GetByDateRange" element={<GetKPIByDateRange/>}/>
          <Route path="getLatest"      element={<GetKPILatestByScope/>}/>
          <Route path="getPaginated"   element={<GetKPIPaginated/>}/>
          <Route path="update/:id"    element={<UpdateKPIReport/>}/>
        </Route>

        {/* Compliance Reports */}
        <Route path="/compliance" element={<ComplianceReportHome/>}>
          <Route path="insert"         element={<InsertComplianceReport/>}/>
          <Route path="delete"         element={<DeleteComplianceReport/>}/>
          <Route path="update/:rid"    element={<UpdateComplianceReport/>}/>
          <Route path="getById"        element={<GetComplianceReportById/>}/>
          <Route path="getAll"         element={<GetComplianceAllReports/>}/>
          <Route path="getPaginated"   element={<GetCompliancePaginated/>}/>
        </Route>



       
      </Routes>
    </Router>
  );
}

export default App;