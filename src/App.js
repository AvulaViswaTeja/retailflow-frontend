import {BrowserRouter as Router, Routes, Route,Outlet} from 'react-router-dom';
import CatalogHome from './components/Catalog/CatalogHome';
import InsertCatalog from './components/Catalog/InsertCatalog';
import DeleteCatalog from './components/Catalog/DeleteCatalog';
import InventoryHome  from './components/Inventory/InventoryHome';
import AddInventory  from './components/Inventory/AddInventory';
import DeleteInventory  from './components/Inventory/DeleteInventory';
import GetAllInventory  from './components/Inventory/GetAllInventory';
import GetByProduct  from './components/Inventory/GetByProduct';
import GetInventoryById  from './components/Inventory/GetInventoryById';
import GetLowStock  from './components/Inventory/GetLowStock';
import ReplenishStock  from './components/Inventory/ReplenishStock';
import UpdateInventory  from './components/Inventory/UpdateInventory';
import CancelPurchaseOrder  from './components/PurchaseOrder/CancelPurchaseOrder'
import GetAllPurchaseOrders  from './components/PurchaseOrder/GetAllPurchaseOrders'
import GetByStatus  from './components/PurchaseOrder/GetByStatus';
import GetPurchaseOrderById  from './components/PurchaseOrder/GetPurchaseOrderById'
import GetBySupplier  from './components/PurchaseOrder/GetBySupplier'
import CreatePurchaseOrder  from './components/PurchaseOrder/CreatePurchaseOrder'
import PurchaseOrderHome  from './components/PurchaseOrder/PurchaseOrderHome'
import UpdatePurchaseOrder  from './components/PurchaseOrder/UpdatePurchaseOrder'




// import SaleHome from './components/Sale/SaleHome';
// import DeleteInventory from './components/Inventory/DeleteInventory';
// import UpdateInventory from './components/Inventory/UpdateInventory';
// import GetInventoryById from './components/Inventory/GetInventoryById';
// import GetAllInventory from './components/Inventory/GetAllInventory';
// import GetLowStock from './components/Inventory/GetLowStock';
// import GetByProduct from './components/Inventory/GetByProduct';
// import ReplenishStock from './components/Inventory/ReplenishStock';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Catalog" element={<CatalogHome/>}>
          <Route path="insert" element={<InsertCatalog/>}></Route>
          <Route path="delete" element={<DeleteCatalog/>}></Route>

        </Route>

        <Route path="/Inventory" element={<InventoryHome/>}>
        <Route path="insert" element={<AddInventory/>}></Route>
        <Route path="delete" element={<DeleteInventory/>}></Route>
        <Route path="update" element={<UpdateInventory/>}></Route>
        <Route path="getById" element={<GetInventoryById/>}></Route>
        <Route path="getAll" element={<GetAllInventory/>}></Route>
        <Route path="getLowStock" element={<GetLowStock/>}></Route>
        <Route path="getByProduct" element={<GetByProduct/>}></Route>
        <Route path="replenish" element={<ReplenishStock/>}></Route>
        </Route>
        <Route path="/PurchaseOrder" element={<PurchaseOrderHome/>}>
          <Route path="insert" element={<CreatePurchaseOrder />} />
          <Route path="delete" element={<CancelPurchaseOrder />} />
          <Route path="update" element={<UpdatePurchaseOrder />} />
          <Route path="getById" element={<GetPurchaseOrderById />} />
          <Route path="getAll" element={<GetAllPurchaseOrders />} />
          <Route path="getBySupplier" element={<GetBySupplier />} />
          <Route path="getByStatus" element={<GetByStatus />} />
</Route>
      </Routes>

    </Router>
  );
}

export default App;
