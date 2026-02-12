import { db } from "../db.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const q = "SELECT * FROM users WHERE email=? OR username=?";

  db.query(q, [req.body.email, req.body.username], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists");

    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      const q2 = "INSERT INTO users (`username`, `email`, `password`) VALUES (?)";
      const values = [
        req.body.username,
        req.body.email,
        hash,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created");
      });

    } catch (error) {
      return res.status(500).json(error);
    }
  });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
