import { useEffect, useState } from "react";
import { getUsers } from "../../api/userApi";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers().then(res => setUsers(res.data));
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} - {u.role}</li>
        ))}
      </ul>
    </div>
  );
}