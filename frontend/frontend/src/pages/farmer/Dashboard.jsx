import { Link } from "react-router-dom";
import DashboardShell from "../../components/DashboardShell";

const metrics = [
  { label: "Produce submitted", value: "46", note: "Items submitted for grading and procurement review." },
  { label: "Under inspection", value: "8", note: "Batches currently in the quality workflow." },
  { label: "Graded produce", value: "31", note: "Completed inspections with a published grade." },
  { label: "Rejected batches", value: "3", note: "Entries that need a rework or re-submission." },
];

export default function Dashboard() {
  return (
    <DashboardShell
      title="Farmer Dashboard"
      subtitle="Submit produce, watch its grading status, and keep your harvest pipeline moving without switching screens."
      metrics={metrics}
      actions={[
        { to: "/farmer/add-produce", label: "Add produce", hint: "Create a new harvest entry." },
        { to: "/admin/inventory", label: "Check inventory", hint: "See where your produce is headed.", variant: "secondary" },
      ]}
    >
      <div className="dashboardGrid">
        <article className="dashboardPanel">
          <h2>What to do next</h2>
          <ul>
            <li>Record new produce immediately after harvest.</li>
            <li>Watch inspection outcomes to see which batches qualify for procurement.</li>
            <li>Use the inventory board to understand demand by category.</li>
          </ul>
        </article>
        <article className="dashboardPanel">
          <h2>Fast actions</h2>
          <div className="dashboardLinks">
            <Link to="/farmer/add-produce">Submit new produce</Link>
            <Link to="/admin/inventory">View stock health</Link>
          </div>
        </article>
      </div>
    </DashboardShell>
  );
}