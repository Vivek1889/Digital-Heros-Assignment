import API from "../../services/api";
import styles from "../../styles/admin.module.css";

function RunDrawCard({ refresh, draw }) {
  const runDraw = async () => {
    await API.post("/draw/rundraw");
    refresh();
  };

  return (
    <div className={styles.statsCard}>
      <h5>Curr Dwaw: {draw?.numbers?.join(", ")}</h5>
      <h4>month:{draw?.draw_month}</h4>
      <button className={styles.runBtn} onClick={runDraw}>
        Run new Draw 🎯
      </button>
    </div>
  );
}

export default RunDrawCard;
