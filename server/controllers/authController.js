import db from "../config/db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ msg: "User Registered" });
    },
  );
};

// LOGIN
export const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(400).json({ msg: "User not found" });
      }

      const user = result[0];

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ msg: "Wrong password" });
      }

      // ✅ Fetch subscription
      db.query(
        "SELECT * FROM subscriptions WHERE user_id = ?",
        [user.id],
        (err, subResult) => {
          if (err) return res.status(500).json(err);

          const subscription = subResult[0] || null;
          console.log(user);
          // ✅ Add subscription to token payload
          const token = generateToken({
            id: user.id,
            role: user.role,
            name: user.name,
            subscription: subscription,
          });

          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
          });

          res.json({
            msg: "Login success",
            user: {
              id: user.id,
              role: user.role,
              name: user.name,
              subscription: subscription,
            },
          });
        },
      );
    },
  );
};
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // true in production (HTTPS)
    sameSite: "lax",
  });

  res.json({ msg: "Logged out successfully" });
};

// GET USER
export const getMe = (req, res) => {
  res.json({ user: req.user });
};
