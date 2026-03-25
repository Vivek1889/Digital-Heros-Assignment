import { useState } from "react";
import API from "../../services/api";
import styles from "../../styles/dashboard.module.css";

function AddScoreCard({ refresh }) {
  const [newScore, setNewScore] = useState("");

  const addScore = async () => {
    await API.post("/scores/add", {
      score: Number(newScore),
      played_on: new Date(),
    });

    setNewScore("");
    refresh();
  };

  return (
    <div className={styles.card}>
      <h3>Add Score between (1 - 45)</h3>

      <input
        className={styles.input}
        value={newScore}
        onChange={(e) => setNewScore(e.target.value)}
      />

      <button className={`${styles.btn} ${styles.primary}`} onClick={addScore}>
        Add
      </button>
    </div>
  );
}

export default AddScoreCard;
