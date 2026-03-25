import API from "../../services/api";
import styles from "../../styles/admin.module.css";

function WinnersCard({ winners, refresh }) {
  const markPaid = async (id) => {
    await API.put(`/admin/winners/${id}/pay`);
    refresh();
  };

  return (
    <div className={styles.card}>
      <h3>Winners</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {winners.map((w) => (
            <tr key={w.id}>
              <td>{w.name}</td>
              <td>₹{w.prize_amount}</td>

              <td>
                <span
                  className={w.status === "paid" ? styles.paid : styles.pending}
                >
                  {w.status}
                </span>
              </td>

              <td>
                {w.status !== "paid" ? (
                  <button onClick={() => markPaid(w.id)}>Mark Paid</button>
                ) : (
                  "Paid"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WinnersCard;
