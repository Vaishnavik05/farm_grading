import { Link } from "react-router-dom";
import "./Sidebar.css";
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/farmer">Farmer</Link></li>
        <li><Link to="/inspector">Inspector</Link></li>
        <li><Link to="/procurement">Procurement</Link></li>
      </ul>
    </aside>
  );
}