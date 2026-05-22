import {BrowserRouter as Router, Routes, Route,Outlet} from 'react-router-dom';
import CatalogHome from './components/Catalog/CatalogHome';
import InsertCatalog from './components/Catalog/InsertCatalog';
import DeleteCatalog from './components/Catalog/DeleteCatalog';
import InventoryHome  from './components/Inventory/InventoryHome';
import InventoryHome  from './components/Inventory/AddInventory';
import InventoryHome  from './components/Inventory/DeleteInventory';
import InventoryHome  from './components/Inventory/GetAllInventory';
import InventoryHome  from './components/Inventory/GetByProduct';
import InventoryHome  from './components/Inventory/GetInventoryById';
import InventoryHome  from './components/Inventory/GetLowStock';
import InventoryHome  from './components/Inventory/ReplenishStock';
import InventoryHome  from './components/Inventory/UpdateInventory';






import SaleHome from './components/Sale/SaleHome';
import DeleteInventory from './components/Inventory/DeleteInventory';
import UpdateInventory from './components/Inventory/UpdateInventory';
import GetInventoryById from './components/Inventory/GetInventoryById';
import GetAllInventory from './components/Inventory/GetAllInventory';
import GetLowStock from './components/Inventory/GetLowStock';
import GetByProduct from './components/Inventory/GetByProduct';
import ReplenishStock from './components/Inventory/ReplenishStock';


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
          <Route path="insert" element={<AddPurchaseOrder />} />
          <Route path="delete" element={<DeletePurchaseOrder />} />
          <Route path="update" element={<UpdatePurchaseOrder />} />
          <Route path="getById" element={<GetPurchaseOrderById />} />
          <Route path="getAll" element={<GetAllPurchaseOrders />} />
          <Route path="getBySupplier" element={<GetPurchaseOrderBySupplier />} />
          <Route path="getByStatus" element={<GetPurchaseByStatus />} />
</Route>
      </Routes>

    </Router>
  );
}

export default App;
