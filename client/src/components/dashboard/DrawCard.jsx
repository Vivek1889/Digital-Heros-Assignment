import styles from "../../styles/dashboard.module.css";
import { FaTrophy } from "react-icons/fa";

function DrawCard({ draw }) {
  return (
    <div className={styles.card}>
      <h3>
        <FaTrophy /> Latest Draw
      </h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Draw Month</th>
            <th>Numbers</th>
            <th>Created On</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{draw?.draw_month}</td>
            <td>{draw?.numbers?.join(", ")}</td>
            <td>
              {draw?.created_at
                ? new Date(draw.created_at).toLocaleDateString()
                : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DrawCard;
