import { Routes, Route, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import AuthPage from "./pages/auth/AuthPage";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Inventory from "./pages/admin/Inventory";
import ProtectedRoute from "./components/ProtectedRoute";
import FarmerDashboard from "./pages/farmer/Dashboard";
import InspectorDashboard from "./pages/inspector/Dashboard";
import ProcurementDashboard from "./pages/procurement/Dashboard";

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
          path="/inspector"
          element={
            <ProtectedRoute>
              <InspectorDashboard />
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
      </Routes>
    </>
  );
}

export default App;