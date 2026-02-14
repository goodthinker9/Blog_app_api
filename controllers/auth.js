import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import express from "express"
const app=express()
app.use(cookieParser());


export const register = async (req, res) => {
  // Check if user exists
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], async (err, data) => {
    if (err) {
      console.error("Check user error:", err);
      return res.status(500).json({ error: "Database error checking existing user" });
    }
    
    if (data.length) {
      return res.status(409).json({ message: "User already exists" });
    }

    // If user doesn't exist, create new user
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);

      // Fixed INSERT query - use ? for each value, not for the whole array
      const q2 = "INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?)";
      
      // Pass values as separate parameters, not as an array
      db.query(q2, [req.body.username, req.body.email, hash], (err, data) => {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: "User has been created" });
      });

    } catch (error) {
      console.error("Hashing error:", error);
      return res.status(500).json({ error: "Error processing password" });
    }
  });
};

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username=?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found");

        // check password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password); 
        if (!isPasswordCorrect) return res.status(400).json("Wrong username or password");

        // create JWT
        const token = jwt.sign({ id: data[0].id }, "jwtkey");

        // exclude password from response
        const { password, ...other } = data[0];

        // send cookie + user info
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(other);
    });
};

export const logout = (req, res) => {

  res.clearCookie("access_token",{
    sameSite:"none",secure:true
  }).status(200).json("user has been logged out.")
};