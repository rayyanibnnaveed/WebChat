const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");
const upload = require("../upload");

const router = express.Router();

/* AUTH MIDDLEWARE */
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token)
    return res.status(403).json({ message: "No token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
}


/* CREATE POST */
/* CREATE POST */
router.post("/", auth, upload.single("image"), (req, res) => {

  const { content } = req.body;
  const userId = req.user.id;

  let imageUrl = null;

  if(req.file){
    imageUrl = req.file.location; // S3 URL
  }

  const now = new Date().toISOString();

  db.query(
    "INSERT INTO posts(user_id,content,image_url,created_at) VALUES(?,?,?,?)",
    [userId, content || "", imageUrl, now],
    (err) => {

      if(err){
        return res.status(500).json({ message:"DB Error" });
      }

      res.json({ message:"Post created" });

    }
  );
});


/* GET POSTS */
router.get("/", (req, res) => {
  db.query(
    "SELECT posts.id, posts.user_id, users.name, posts.content, posts.created_at FROM posts JOIN users ON posts.user_id=users.id ORDER BY posts.created_at DESC",
    (err, data) => {
      res.json(data);
    }
  );
});
/* DELETE POST */
router.delete("/:id", auth, (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  db.query(
    "DELETE FROM posts WHERE id=? AND user_id=?",
    [postId, userId],
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "DB Error" });

      if (result.affectedRows === 0)
        return res.status(403).json({ message: "Not allowed" });

      res.json({ message: "Post deleted" });
    }
  );
});
module.exports = router;
