import db from "../config/db.js";

export const getAllCharities = (req, res) => {
  db.query(
    `SELECT *
     FROM charities`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    },
  );
};
export const AddCharities = (req, res) => {
  const { charityname, description } = req.body;

  const query = `
    INSERT INTO charities (name, description)
    VALUES (?, ?)
  `;

  db.query(query, [charityname, description], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ msg: "Successfully added", id: result.insertId });
  });
};
export const deleteCharity = (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM charities WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Charity not found" });
    }

    res.json({ msg: "Charity deleted successfully" });
  });
};
