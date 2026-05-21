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

        <Route path="/inventory" element={<InventoryHome/>}></Route>

        
      </Routes>
    </Router>
  );
}

export default App;
