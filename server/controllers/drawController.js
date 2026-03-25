import db from "../config/db.js";

// Generate numbers
function generateNumbers() {
  let nums = new Set();
  while (nums.size < 5) {
    nums.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(nums);
}

export const runDraw = (req, res) => {
  const numbers = generateNumbers();
  const drawMonth = new Date().toLocaleString("default", { month: "long" });

  // Step 1: Save draw
  db.query(
    "INSERT INTO draws (draw_month, numbers, status) VALUES (?, ?, 'completed')",
    [drawMonth, JSON.stringify(numbers)],
    (err, result) => {
      if (err) {
        console.log("DRAW INSERT ERROR:", err);
        return res.status(500).json(err);
      }

      const drawId = result.insertId;

      // Step 2: Get total active subscriptions
      db.query(
        "SELECT COUNT(*) as total FROM subscriptions WHERE status = 'active'",
        (err, subResult) => {
          if (err) {
            console.log("SUB ERROR:", err);
            return res.status(500).json(err);
          }

          const totalUsers = subResult[0].total;
          const totalPool = totalUsers * 100;

          const prizeDist = {
            5: totalPool * 0.4,
            4: totalPool * 0.35,
            3: totalPool * 0.25,
          };

          // Step 3: Get users
          db.query(
            "SELECT user_id, GROUP_CONCAT(score) as scores FROM scores GROUP BY user_id",
            (err, users) => {
              if (err) {
                console.log("USER FETCH ERROR:", err);
                return res.status(500).json(err);
              }

              let winnersByTier = { 3: [], 4: [], 5: [] };

              users.forEach((user) => {
                const userScores = user.scores.split(",").map(Number);

                const matchCount = userScores.filter((s) =>
                  numbers.includes(s),
                ).length;

                if (matchCount >= 3 && matchCount <= 5) {
                  winnersByTier[matchCount].push(user.user_id);
                }
              });

              // Step 4: Insert winners
              Object.keys(winnersByTier).forEach((tier) => {
                const winners = winnersByTier[tier];

                if (winners.length > 0) {
                  const prizeEach = prizeDist[tier] / winners.length;

                  winners.forEach((userId) => {
                    db.query(
                      "INSERT INTO winners (user_id, draw_id, match_count, prize_amount) VALUES (?, ?, ?, ?)",
                      [userId, drawId, tier, prizeEach],
                      (err) => {
                        if (err) {
                          console.log("WINNER INSERT ERROR:", err);
                        }
                      },
                    );
                  });
                }
              });

              res.json({
                msg: "Draw completed with prizes 💰",
                numbers,
                totalPool,
              });
            },
          );
        },
      );
    },
  );
};
// 📊 Get Latest Draw Result
export const getDrawResult = (req, res) => {
  db.query("SELECT * FROM draws ORDER BY id DESC LIMIT 1", (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.json({ msg: "No draw found" });
    }

    res.json(result[0]);
  });
};
export const getWinners = (req, res) => {
  db.query(
    `SELECT w.*, u.name 
     FROM winners w
     JOIN users u ON w.user_id = u.id`,
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    },
  );
};
