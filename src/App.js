import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

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

import InventoryHome from './components/Inventory/InventoryHome';
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
import GetAuditPaginated from './components/AuditLog/GetAuditPaginated';

import UserHome from './components/User/UserHome';
import AddUser from './components/User/AddUser';
import DeleteUser from './components/User/DeleteUser';
import UpdateUser from './components/User/UpdateUser';
import GetUserById from './components/User/GetUserById';
import GetPaginatedUsers from './components/User/GetPaginatedUsers';
import GetAllUsers from './components/User/GetAllUsers';

import ComplianceReportHome from './components/ComplianceReport/CompilanceReportHome';
import InsertComplianceReport from './components/ComplianceReport/InsertCompilanceReport';
import DeleteComplianceReport from './components/ComplianceReport/DeleteCompilanceReport';
import UpdateComplianceReport from './components/ComplianceReport/UpdateComplianceReport';
import GetComplianceReportById from './components/ComplianceReport/GetComplianceReportById';
import GetComplianceAllReports from './components/ComplianceReport/GetAllComplianceReports';
import GetCompliancePaginated from './components/ComplianceReport/GetCompliancePaginated';

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

import SaleHome from './components/Sale/SaleHome';
import InsertSale from './components/Sale/InsertSale';
import DeleteSale from './components/Sale/DeleteSale';
import UpdateSale from './components/Sale/UpdateSale';
import GetAllSales from './components/Sale/GetAllSales';
import GetAllSalesPaginated from './components/Sale/GetAllSalesPaginated';
import GetSalesByCustomer from './components/Sale/GetSalesByCustomer';
import GetSaleById from './components/Sale/GetSaleById';
import GetSalesByDateRange from './components/Sale/GetSalesByDateRange';

import PaymentHome from './components/Payment/PaymentHome';
import InsertPayment from './components/Payment/InsertPayment';
import UpdatePayment from './components/Payment/UpdatePayment';
import DeletePayment from './components/Payment/DeletePayment';
import GetPaymentById from './components/Payment/GetPaymentById';
import GetByInvoice from './components/Payment/GetByInvoice';
import GetPaginatedPayments from './components/Payment/GetPaginatedPayments';
import GetAllPayments from './components/Payment/GetAllPayments';

import InvoiceHome from './components/Invoice/InvoiceHome';
import InsertInvoice from './components/Invoice/InsertInvoice';
import UpdateInvoice from './components/Invoice/UpdateInvoice';
import DeleteInvoice from './components/Invoice/DeleteInvoice';
import GetAllInvoices from './components/Invoice/GetAllInvoices';
import GetInvoiceByDateRange from './components/Invoice/GetInvoiceByDateRange';
import GetInvoiceById from './components/Invoice/GetInvoiceById';
import GetInvoiceByStatus from './components/Invoice/GetInvoiceByStatus';
import GetInvoicePaginated from './components/Invoice/GetInvoicePaginated';

import NotificationHome from './components/Notification/NotificationHome';
import GetNotificationByUser from './components/Notification/GetNotificationByUser';
import DeleteNotification from './components/Notification/DeleteNotification';
import GetAllNotifications from './components/Notification/GetAllNotifications';
import GetNotificationById from './components/Notification/GetNotificationById';
import InsertNotification from './components/Notification/InsertNotification';
import MarkAsRead from './components/Notification/MarkAsRead';

// -------------------------------------------------------
// Role constants
// -------------------------------------------------------
const ALL_ROLES        = ["ADMIN","STORE_ASSOCIATE","INVENTORY_MANAGER","FINANCE_OFFICER","COMPLIANCE_OFFICER","STORE_MANAGER"];
const ADMIN_ONLY       = ["ADMIN"];
const ADMIN_INVENTORY  = ["ADMIN","INVENTORY_MANAGER"];
const ADMIN_FINANCE    = ["ADMIN","FINANCE_OFFICER"];
const ADMIN_COMPLIANCE = ["ADMIN","COMPLIANCE_OFFICER"];
const ADMIN_MANAGER    = ["ADMIN","STORE_MANAGER"];
const ADMIN_SALES      = ["ADMIN","STORE_ASSOCIATE","STORE_MANAGER"];

// -------------------------------------------------------
// ProtectedRoute
// -------------------------------------------------------
function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("role");

    if (!token) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;
    return children;
}

// -------------------------------------------------------
// Unauthorized page
// -------------------------------------------------------
function Unauthorized() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
            <h3 className="text-danger">Access Denied</h3>
            <p className="text-muted">You don't have permission to view this page.</p>
            <button className="btn btn-primary mt-3" onClick={() => window.history.back()}>Go Back</button>
        </div>
    );
}

// -------------------------------------------------------
// App
// -------------------------------------------------------
function App() {
    return (
        <Router>
            <Routes>

                {/* Public routes */}
                <Route path="/login"        element={<Login />} />
                <Route path="/register"     element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/"             element={<Navigate to="/login" replace />} />

                {/* Audit Log — ADMIN + COMPLIANCE_OFFICER */}
                <Route path="/auditLog" element={<ProtectedRoute allowedRoles={ADMIN_COMPLIANCE}><AuditLogHome /></ProtectedRoute>}>
                    <Route path="getAuditLogs"    element={<GetAllAuditLogs />} />
                    <Route path="getAuditLogById" element={<GetAllAuditLogById />} />
                    <Route path="getByDate"       element={<GetAuditLogByDateRange />} />
                    <Route path="getByUser"       element={<GetByUser />} />
                    <Route path="getPaginated"    element={<GetAuditPaginated />} />
                </Route>

                {/* User — ADMIN only */}
                <Route path="/user" element={<ProtectedRoute allowedRoles={ADMIN_ONLY}><UserHome /></ProtectedRoute>}>
                    <Route path="addUser"          element={<AddUser />} />
                    <Route path="deleteUser"       element={<DeleteUser />} />
                    <Route path="updateUser"       element={<UpdateUser />} />
                    <Route path="getUserById"      element={<GetUserById />} />
                    <Route path="getUserPaginated" element={<GetPaginatedUsers />} />
                    <Route path="getAllUsers"       element={<GetAllUsers />} />
                </Route>

                {/* Notification — all roles */}
                <Route path="/notification" element={<ProtectedRoute allowedRoles={ALL_ROLES}><NotificationHome /></ProtectedRoute>}>
                    <Route path="insert"                 element={<InsertNotification />} />
                    <Route path="delete"                 element={<DeleteNotification />} />
                    <Route path="getAllNotifications"     element={<GetAllNotifications />} />
                    <Route path="getNotificationById"    element={<GetNotificationById />} />
                    <Route path="getNotificationByUser"  element={<GetNotificationByUser />} />
                    <Route path="markAsRead"             element={<MarkAsRead />} />
                </Route>

                {/* Catalog — all roles */}
                <Route path="/Catalog" element={<ProtectedRoute allowedRoles={ALL_ROLES}><CatalogHome /></ProtectedRoute>}>
                    <Route path="insert"        element={<InsertCatalog />} />
                    <Route path="delete"        element={<DeleteCatalog />} />
                    <Route path="delete/:id"    element={<DeleteCatalog />} />
                    <Route path="update"        element={<UpdateCatalog />} />
                    <Route path="update/:id"    element={<UpdateCatalog />} />
                    <Route path="getAll"        element={<GetAllCatalogs />} />
                    <Route path="getById"       element={<GetCatalogById />} />
                    <Route path="getByProduct"  element={<GetCatalogsByProduct />} />
                </Route>

                {/* Product — all roles */}
                <Route path="/Product" element={<ProtectedRoute allowedRoles={ALL_ROLES}><ProductHome /></ProtectedRoute>}>
                    <Route path="add"        element={<AddProduct />} />
                    <Route path="update"     element={<UpdateProduct />} />
                    <Route path="update/:id" element={<UpdateProduct />} />
                    <Route path="getById"    element={<GetProductById />} />
                    <Route path="getAll"     element={<GetAllProducts />} />
                    <Route path="delete"     element={<DeleteProduct />} />
                    <Route path="delete/:id" element={<DeleteProduct />} />
                </Route>

                {/* Inventory — ADMIN + INVENTORY_MANAGER */}
                <Route path="/Inventory" element={<ProtectedRoute allowedRoles={ADMIN_INVENTORY}><InventoryHome /></ProtectedRoute>}>
                    <Route path="insert"                   element={<AddInventory />} />
                    <Route path="delete/:inventoryId"      element={<DeleteInventory />} />
                    <Route path="update/:inventoryId"      element={<UpdateInventory />} />
                    <Route path="getById"                  element={<GetInventoryById />} />
                    <Route path="getAll"                   element={<GetAllInventory />} />
                    <Route path="getLowStock"              element={<GetLowStock />} />
                    <Route path="getByProduct"             element={<GetInventoryByProduct />} />
                    <Route path="replenish"                element={<ReplenishStock />} />
                </Route>

                {/* Purchase Order — ADMIN + INVENTORY_MANAGER */}
                <Route path="/PurchaseOrder" element={<ProtectedRoute allowedRoles={ADMIN_INVENTORY}><PurchaseOrderHome /></ProtectedRoute>}>
                    <Route path="insert"                   element={<CreatePurchaseOrder />} />
                    <Route path="delete/:purchaseOrderId"  element={<CancelPurchaseOrder />} />
                    <Route path="update/:purchaseOrderId"  element={<UpdatePurchaseOrder />} />
                    <Route path="getById"                  element={<GetPurchaseOrderById />} />
                    <Route path="getAll"                   element={<GetAllPurchaseOrders />} />
                    <Route path="getBySupplier"            element={<GetPurchaseBySupplier />} />
                    <Route path="getByStatus"              element={<GetPurchaseByStatus />} />
                </Route>

                {/* Sale — ADMIN + STORE_ASSOCIATE + STORE_MANAGER */}
                <Route path="/Sale" element={<ProtectedRoute allowedRoles={ADMIN_SALES}><SaleHome /></ProtectedRoute>}>
                    <Route path="insert"              element={<InsertSale />} />
                    <Route path="delete"              element={<DeleteSale />} />
                    <Route path="update"              element={<UpdateSale />} />
                    <Route path="getById"             element={<GetSaleById />} />
                    <Route path="getAll"              element={<GetAllSales />} />
                    <Route path="getAllPaginated"      element={<GetAllSalesPaginated />} />
                    <Route path="getSalesByCustomer"  element={<GetSalesByCustomer />} />
                    <Route path="getSalesByDateRange" element={<GetSalesByDateRange />} />
                </Route>

                {/* Payment — ADMIN + FINANCE_OFFICER */}
                <Route path="/Payment" element={<ProtectedRoute allowedRoles={ADMIN_FINANCE}><PaymentHome /></ProtectedRoute>}>
                    <Route path="insert"         element={<InsertPayment />} />
                    <Route path="update"         element={<UpdatePayment />} />
                    <Route path="delete"         element={<DeletePayment />} />
                    <Route path="getPaymentById" element={<GetPaymentById />} />
                    <Route path="getAll"         element={<GetAllPayments />} />
                    <Route path="getByInvoice"   element={<GetByInvoice />} />
                    <Route path="getPaginated"   element={<GetPaginatedPayments />} />
                </Route>

                {/* Invoice — ADMIN + FINANCE_OFFICER */}
                <Route path="/Invoice" element={<ProtectedRoute allowedRoles={ADMIN_FINANCE}><InvoiceHome /></ProtectedRoute>}>
                    <Route path="insert"         element={<InsertInvoice />} />
                    <Route path="update"         element={<UpdateInvoice />} />
                    <Route path="delete"         element={<DeleteInvoice />} />
                    <Route path="getAll"         element={<GetAllInvoices />} />
                    <Route path="getById"        element={<GetInvoiceById />} />
                    <Route path="getByDateRange" element={<GetInvoiceByDateRange />} />
                    <Route path="getByStatus"    element={<GetInvoiceByStatus />} />
                    <Route path="getPaginated"   element={<GetInvoicePaginated />} />
                </Route>

                {/* KPI Report — ADMIN + STORE_MANAGER */}
                <Route path="/kpireport" element={<ProtectedRoute allowedRoles={ADMIN_MANAGER}><KPIReportHome /></ProtectedRoute>}>
                    <Route path="savereport"     element={<SaveReport />} />
                    <Route path="delete"         element={<DeleteKPIReport />} />
                    <Route path="getTrend"       element={<GetKPITrend />} />
                    <Route path="getById"        element={<GetKPIById />} />
                    <Route path="getAll"         element={<GetAllKPIReports />} />
                    <Route path="GetByDateRange" element={<GetKPIByDateRange />} />
                    <Route path="getLatest"      element={<GetKPILatestByScope />} />
                    <Route path="getPaginated"   element={<GetKPIPaginated />} />
                    <Route path="update/:id"     element={<UpdateKPIReport />} />
                </Route>

                {/* Compliance — ADMIN + COMPLIANCE_OFFICER */}
                <Route path="/compliance" element={<ProtectedRoute allowedRoles={ADMIN_COMPLIANCE}><ComplianceReportHome /></ProtectedRoute>}>
                    <Route path="insert"       element={<InsertComplianceReport />} />
                    <Route path="delete"       element={<DeleteComplianceReport />} />
                    <Route path="update/:rid"  element={<UpdateComplianceReport />} />
                    <Route path="getById"      element={<GetComplianceReportById />} />
                    <Route path="getAll"       element={<GetComplianceAllReports />} />
                    <Route path="getPaginated" element={<GetCompliancePaginated />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App;