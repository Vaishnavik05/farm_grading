import { Link } from "react-router-dom";
import DashboardShell from "../../components/DashboardShell";

const metrics = [
  { label: "Open orders", value: "14", note: "Pending procurement requests under review." },
  { label: "Approved today", value: "6", note: "Orders ready to move into fulfilment." },
  { label: "Awaiting stock", value: "4", note: "Orders blocked by low inventory or missing grades." },
  { label: "Closed this week", value: "22", note: "Orders completed and marked as fulfilled." },
];

export default function Dashboard() {
  return (
    <DashboardShell
      title="Procurement Dashboard"
      subtitle="Create orders, watch supply constraints, and keep procurement aligned with graded produce availability."
      metrics={metrics}
      actions={[
        { to: "/procurement/create-order", label: "Create order", hint: "Start a new procurement request." },
        { to: "/admin/inventory", label: "Review inventory", hint: "Check stock before placing orders.", variant: "secondary" },
      ]}
    >
      <div className="dashboardGrid">
        <article className="dashboardPanel">
          <h2>Procurement priorities</h2>
          <ul>
            <li>Match demand to the latest graded inventory levels.</li>
            <li>Create orders only when the quantity and unit price are finalized.</li>
            <li>Use the inventory board to avoid overcommitting supply.</li>
          </ul>
        </article>
        <article className="dashboardPanel">
          <h2>Fast actions</h2>
          <div className="dashboardLinks">
            <Link to="/procurement/create-order">Create a new order</Link>
            <Link to="/admin/inventory">Open inventory board</Link>
          </div>
        </article>
      </div>
    </DashboardShell>
  );
}