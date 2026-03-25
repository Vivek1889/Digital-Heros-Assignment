import db from "../config/db.js";

// 👥 GET ALL USERS
export const getAllUsers = (req, res) => {
  const query = `
    SELECT 
      u.id,
      u.name,
      u.email,
      u.role,
      s.status AS status,
      s.end_date AS end_date,
      s.plan_type AS plan_type
    FROM users u
    LEFT JOIN subscriptions s 
      ON u.id = s.user_id
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// 🏆 GET ALL WINNERS
export const getAllWinners = (req, res) => {
  db.query(
    `SELECT w.id, u.name, w.match_count, w.prize_amount, w.status 
     FROM winners w
     JOIN users u ON w.user_id = u.id`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    },
  );
};

// 💰 MARK AS PAID
export const markAsPaid = (req, res) => {
  const winnerId = req.params.id;

  db.query(
    "UPDATE winners SET status = 'paid' WHERE id = ?",
    [winnerId],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ msg: "Marked as paid ✅" });
    },
  );
};
