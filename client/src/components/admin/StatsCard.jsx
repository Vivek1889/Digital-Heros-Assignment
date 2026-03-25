import styles from "../../styles/admin.module.css";

function StatsCard({ users }) {
  return (
    <div className={styles.statsCard}>
      <h3>Total Users</h3>
      <h2>{users?.length}</h2>
    </div>
  );
}

export default StatsCard;
