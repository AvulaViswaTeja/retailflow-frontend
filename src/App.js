import {BrowserRouter as Router, Routes, Route,Outlet} from 'react-router-dom';
import CatalogHome from './components/Catalog/CatalogHome';
import InsertCatalog from './components/Catalog/InsertCatalog';
import DeleteCatalog from './components/Catalog/DeleteCatalog';
import InventoryHome  from './components/Inventory/InventoryHome';
import SaleHome from './components/Sale/SaleHome';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Catalog" element={<CatalogHome/>}>
          <Route path="insert" element={<InsertCatalog/>}></Route>
          <Route path="delete" element={<DeleteCatalog/>}></Route>

        </Route>

        <Route path="/inventory" element={<InventoryHome/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
