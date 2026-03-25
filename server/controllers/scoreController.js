import db from "../config/db.js";

// ADD SCORE
export const addScore = (req, res) => {
  const userId = req.user.id;
  let { score, played_on } = req.body;

  // ✅ Fix date format (MySQL DATE)
  if (played_on) {
    played_on = new Date(played_on).toISOString().split("T")[0];
  } else {
    played_on = new Date().toISOString().split("T")[0];
  }

  // ✅ Validation
  if (!score || score < 1 || score > 45) {
    return res.status(400).json({ msg: "Score must be between 1 and 45" });
  }

  // Step 1: Get scores (oldest first)
  db.query(
    "SELECT id FROM scores WHERE user_id = ? ORDER BY created_at ASC",
    [userId],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "DB error" });
      }

      // Step 2: If already 5 → delete oldest
      if (results.length >= 5) {
        const oldestId = results[0].id;

        db.query("DELETE FROM scores WHERE id = ?", [oldestId], (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ msg: "Delete error" });
          }

          insertScore();
        });
      } else {
        insertScore();
      }
    },
  );

  // Step 3: Insert new score
  function insertScore() {
    db.query(
      "INSERT INTO scores (user_id, score, played_on) VALUES (?, ?, ?)",
      [userId, score, played_on],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "Insert error" });
        }

        res.json({
          msg: "Score added successfully",
          scoreId: result.insertId,
        });
      },
    );
  }
};

// GET SCORES
export const getScores = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM scores WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "DB error" });
      }

      res.json(results);
    },
  );
};

// DELETE SCORE
export const deleteScore = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM scores WHERE id = ?", [id], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: "Delete error" });
    }

    res.json({ msg: "Score deleted successfully" });
  });
};
