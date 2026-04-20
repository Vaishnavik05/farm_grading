import { Link } from "react-router-dom";
import DashboardShell from "../../components/DashboardShell";
import "./Dashboard.css";

const metrics = [
  { label: "Registered users", value: "128", note: "Farmers, inspectors and officers across the network." },
  { label: "Open inventory lines", value: "34", note: "Live inventory rows awaiting review or replenishment." },
  { label: "Grading backlog", value: "12", note: "Produce items waiting for an inspection decision." },
  { label: "Procurement orders", value: "19", note: "Active orders being tracked from submission to closure." },
];

export default function Dashboard() {
  return (
    <DashboardShell
      title="Admin Dashboard"
      subtitle="Monitor the complete farm procurement workflow, keep users organized, and stay ahead of stock or inspection bottlenecks."
      metrics={metrics}
      actions={[
        { to: "/admin/users", label: "Manage users", hint: "Review roles and registrations." },
        { to: "/admin/inventory", label: "Review inventory", hint: "Track stock health and category balance.", variant: "secondary" },
      ]}
    >
      <div className="dashboardGrid">
        <article className="dashboardPanel">
          <h2>Admin priorities</h2>
          <ul>
            <li>Approve operational access and ensure each role has the right workflow path.</li>
            <li>Watch inventory levels to spot shortages before procurement slows down.</li>
            <li>Use the user registry to audit who is active in the system.</li>
          </ul>
        </article>
        <article className="dashboardPanel">
          <h2>Quick links</h2>
          <div className="dashboardLinks">
            <Link to="/admin/users">Open user directory</Link>
            <Link to="/admin/inventory">Open inventory board</Link>
          </div>
        </article>
      </div>
    </DashboardShell>
  );
}