import { Link } from "react-router-dom";
import DashboardShell from "../../components/DashboardShell";

const metrics = [
  { label: "Assigned inspections", value: "17", note: "Produce lots waiting for an inspector decision." },
  { label: "Completed today", value: "9", note: "Inspections resolved during the current shift." },
  { label: "Pending review", value: "5", note: "Items waiting on a final grade or follow-up." },
  { label: "Escalations", value: "2", note: "Cases that need extra attention or re-checking." },
];

export default function Dashboard() {
  return (
    <DashboardShell
      title="Inspector Dashboard"
      subtitle="Track inspection assignments, record scores, and keep the grading queue moving with minimal friction."
      metrics={metrics}
      actions={[
        { to: "/inspector/inspect", label: "Inspect produce", hint: "Score a batch and assign a grade." },
        { to: "/admin/users", label: "View assignments", hint: "Review operator data and ownership.", variant: "secondary" },
      ]}
    >
      <div className="dashboardGrid">
        <article className="dashboardPanel">
          <h2>Inspection focus</h2>
          <ul>
            <li>Work through assigned lots in priority order.</li>
            <li>Record scores consistently so grades stay comparable.</li>
            <li>Flag any produce that needs reinspection or rejection.</li>
          </ul>
        </article>
        <article className="dashboardPanel">
          <h2>Quick links</h2>
          <div className="dashboardLinks">
            <Link to="/inspector/inspect">Open inspection form</Link>
            <Link to="/admin/inventory">Check stock aftermath</Link>
          </div>
        </article>
      </div>
    </DashboardShell>
  );
}