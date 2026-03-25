import db from "../config/db.js";

// CREATE SUBSCRIPTION
export const createSubscription = (req, res) => {
  const userId = req.user.id;
  const { plan_type, charity_percentage, amount } = req.body; // monthly / yearly
  console.log(req.body);

  let startDate = new Date();
  let endDate = new Date();

  if (plan_type === "monthly") {
    endDate.setMonth(endDate.getMonth() + 1);
  } else {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  db.query(
    "INSERT INTO subscriptions (user_id, plan_type, status, start_date, end_date) VALUES (?, ?, 'active', ?, ?)",
    [userId, plan_type, startDate, endDate],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ msg: "Subscription Activated" });
    },
  );
};

// GET SUBSCRIPTION STATUS
export const getSubscriptionStatus = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM subscriptions WHERE user_id = ? ORDER BY id DESC LIMIT 1",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        return res.json({ status: "inactive" });
      }

      const sub = results[0];

      // Check expiry
      const today = new Date();
      if (new Date(sub.end_date) < today) {
        return res.json({ status: "expired" });
      }

      res.json(sub);
    },
  );
};

// CANCEL SUBSCRIPTION
export const cancelSubscription = (req, res) => {
  const userId = req.user.id;

  db.query(
    "UPDATE subscriptions SET status = 'cancelled' WHERE user_id = ? AND status = 'active'",
    [userId],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ msg: "Subscription Cancelled" });
    },
  );
};
