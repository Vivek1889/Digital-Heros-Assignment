import API from "../../services/api";
import styles from "../../styles/dashboard.module.css";

function ScoresTable({ scores, refresh }) {
  const deleteScore = async (id) => {
    await API.delete(`/scores/delete/${id}`);
    refresh();
  };

  return (
    <div className={styles.ScoreTable}>
      <h3>Your Scores Card</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Score</th>
            <th>Played On</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {scores.map((s) => (
            <tr key={s.id}>
              <td>{s.score}</td>
              <td>
                {s?.played_on
                  ? new Date(s.played_on).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                <button
                  className={`${styles.btn} ${styles.danger}`}
                  onClick={() => deleteScore(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScoresTable;
