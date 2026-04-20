import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Sidebar.css";
export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  const menuByRole = {
    ADMIN: [
      { to: "/admin", label: "Overview" },
      { to: "/admin/users", label: "Users" },
      { to: "/admin/inventory", label: "Inventory" },
    ],
    FARMER: [
      { to: "/farmer", label: "Overview" },
      { to: "/farmer/add-produce", label: "Add Produce" },
    ],
    QUALITY_INSPECTOR: [
      { to: "/inspector", label: "Overview" },
      { to: "/inspector/inspect", label: "Inspect" },
    ],
    PROCUREMENT_OFFICER: [
      { to: "/procurement", label: "Overview" },
      { to: "/procurement/create-order", label: "Create Order" },
    ],
  };

  const menu = menuByRole[user?.role] || [];

  return (
    <aside className="sidebar">
      <div className="sidebarHeader">
        <span>Farm Grade</span>
        <strong>{user?.role || "Dashboard"}</strong>
      </div>
      <ul>
        {menu.map((item) => (
          <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
        ))}
      </ul>
      <button className="sidebarLogout" onClick={logout}>Logout</button>
    </aside>
  );
}