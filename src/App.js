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