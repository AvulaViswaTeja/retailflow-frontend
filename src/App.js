import {BrowserRouter as Router, Routes, Route,Outlet} from 'react-router-dom';
import CatalogHome from './components/Catalog/CatalogHome';
import InsertCatalog from './components/Catalog/InsertCatalog';
import DeleteCatalog from './components/Catalog/DeleteCatalog';
import InventoryHome  from './components/Inventory/InventoryHome';
import AddInventory from './components/Inventory/AddInventory';
import DeleteInventory from './components/Inventory/DeleteInventory';
import UpdateInventory from './components/Inventory/UpdateInventory';   
import GetInventoryById from './components/Inventory/GetInventoryById';
import GetAllInventory from './components/Inventory/GetAllInventory';
import ComplianceReportHome from './components/ComplianceReport/CompilanceReportHome';
import InsertReport from './components/ComplianceReport/InsertReport';
import DeleteReport from './components/ComplianceReport/DeleteReport';
import UpdateReport from './components/ComplianceReport/UpdateReport';
import GetReportById from './components/ComplianceReport/GetReportById';
import GetAllReports from './components/ComplianceReport/GetAllReports';

import SaleHome from './components/Sale/SaleHome';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Catalog" element={<CatalogHome/>}>
          <Route path="insert" element={<InsertCatalog/>}></Route>
          <Route path="delete" element={<DeleteCatalog/>}></Route>

        </Route>

        <Route path="/inventory" element={<InventoryHome/>}>
          <Route path="insert" element={<AddInventory/>}></Route>
          <Route path="delete" element={<DeleteInventory/>}></Route>
          <Route path="update" element={<UpdateInventory/>}></Route>
          <Route path="getById" element={<GetInventoryById/>}></Route>
          <Route path="getAll" element={<GetAllInventory/>}></Route>
        </Route>
   

        <Route path="/compliance" element={<ComplianceReportHome/>}>
          <Route path="insert" element={<InsertReport/>}></Route>
          <Route path="delete" element={<DeleteReport/>}></Route>
          <Route path="update" element={<UpdateReport/>}></Route>
          <Route path="getById" element={<GetReportById/>}></Route>
          <Route path="getAll" element={<GetAllReports/>}></Route>
        </Route>


      </Routes>
    </Router>
  );
}

export default App;
