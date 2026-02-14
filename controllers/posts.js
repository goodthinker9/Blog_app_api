import { db } from "../db.js"

export const getPosts = (req, res) => {
  const cat = req.query.cat

  const q = cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts"

  db.query(q, cat ? [cat] : [], (err, data) => {
    if (err) return res.status(500).json(err)
    return res.status(200).json(data)  // ✅ always array
  })
}


export const getPost = (req, res) => {
  res.json("from controller")
}

export const addPost = (req, res) => {
  res.json("from controller")
}

export const deletePost = (req, res) => {
  res.json("from controller")
}

export const updatePost = (req, res) => {
  res.json("from controller")
}
