import { useEffect, useMemo, useState } from "react";
import { getUsers } from "../../api/userApi";
import DashboardShell from "../../components/DashboardShell";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(res => setUsers(res.data));
  }, []);

  const metrics = useMemo(() => {
    const total = users.length;
    const farmers = users.filter((user) => user.role === "FARMER").length;
    const inspectors = users.filter((user) => user.role === "QUALITY_INSPECTOR").length;
    const officers = users.filter((user) => user.role === "PROCUREMENT_OFFICER").length;

    return [
      { label: "Total users", value: String(total), note: "All registered accounts in the system." },
      { label: "Farmers", value: String(farmers), note: "Accounts submitting produce." },
      { label: "Inspectors", value: String(inspectors), note: "Accounts grading produce batches." },
      { label: "Procurement officers", value: String(officers), note: "Accounts creating purchase orders." },
    ];
  }, [users]);

  return (
    <DashboardShell
      title="User Registry"
      subtitle="Review every account by role so access stays aligned with the workflow."
      metrics={metrics}
      actions={[]}
    >
      <div className="workflowTableWrap">
        <table className="workflowTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.phoneNumber || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}