import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import AuthPage from "./pages/auth/AuthPage";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Inventory from "./pages/admin/Inventory";
import FarmerDashboard from "./pages/farmer/Dashboard";
import AddProduce from "./pages/farmer/AddProduce";
import InspectorDashboard from "./pages/inspector/Dashboard";
import Inspect from "./pages/inspector/Inspect";
import ProcurementDashboard from "./pages/procurement/Dashboard";
import CreateOrder from "./pages/procurement/CreateOrder";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const hideSidebar = location.pathname === "/" || !user;

  return (
    <>
      {!hideSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer"
          element={
            <ProtectedRoute>
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/add-produce"
          element={
            <ProtectedRoute>
              <AddProduce />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inspector"
          element={
            <ProtectedRoute>
              <InspectorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inspector/inspect"
          element={
            <ProtectedRoute>
              <Inspect />
            </ProtectedRoute>
          }
        />
        <Route
          path="/procurement"
          element={
            <ProtectedRoute>
              <ProcurementDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/procurement/create-order"
          element={
            <ProtectedRoute>
              <CreateOrder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;