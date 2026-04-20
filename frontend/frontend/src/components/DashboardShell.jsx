import { Link } from "react-router-dom";
import "./DashboardShell.css";

export default function DashboardShell({ title, subtitle, metrics = [], actions = [], children }) {
  return (
    <main className="dashboardShell">
      <section className="dashboardHero">
        <div>
          <p className="dashboardEyebrow">Farm Procurement System</p>
          <h1>{title}</h1>
          <p className="dashboardSubtitle">{subtitle}</p>
        </div>
        {actions.length > 0 && (
          <div className="dashboardHeroActions">
            {actions.map((action) => (
              <Link key={action.to} to={action.to} className={`dashboardAction ${action.variant || "primary"}`}>
                <span>{action.label}</span>
                <small>{action.hint}</small>
              </Link>
            ))}
          </div>
        )}
      </section>

      {metrics.length > 0 && (
        <section className="dashboardMetrics">
          {metrics.map((metric) => (
            <article key={metric.label} className="metricCard">
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.note}</small>
            </article>
          ))}
        </section>
      )}

      <section className="dashboardContent">{children}</section>
    </main>
  );
}
