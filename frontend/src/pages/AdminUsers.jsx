import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const deleteUser = (name) => {
    if (!window.confirm("Delete this user?")) return;

    const updated = users.filter((u) => u.name !== name);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  return (
    <div className="container dashboard">
      <h2>Manage Users</h2>
      <p className="subtitle">View and manage system users</p>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>
                  <span className="badge bg-secondary text-capitalize">
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.role === "admin" ? (
                    <span className="text-muted">Protected</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteUser(user.name)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
