import db from "../config/db.js";

export const checkSubscription = (req, res, next) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM subscriptions WHERE user_id = ? ORDER BY id DESC LIMIT 1",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0)
        return res.status(403).json({ msg: "No subscription" });

      const sub = results[0];

      const today = new Date();
      if (new Date(sub.end_date) < today || sub.status !== "active") {
        return res.status(403).json({ msg: "Subscription expired" });
      }

      next();
    },
  );
};
