import styles from "../../styles/admin.module.css";

function UsersCard({ users }) {
  return (
    <div className={styles.card}>
      <h3>Users</h3>
      {console.log(users)}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>End Date</th>
            <th>Plan Type</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>

              {/* ✅ Subscription Status */}
              <td>{u.status ? u.status : "Inactive"}</td>

              {/* ✅ Expiry Date */}
              <td>
                {u.end_date ? new Date(u.end_date).toLocaleDateString() : "---"}
              </td>

              {/* ✅ Plan Type */}
              <td>{u.plan_type ? u.plan_type : "---"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersCard;
