require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./db");
const authenticateToken = require("./middleware/authenticationToken");
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

/**
 * sign up
 */
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Missing username or password" });

  const hash = bcrypt.hashSync(password, 10);

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (results.length > 0)
        return res.status(409).json({ message: "Username already taken" });

      const hashedPassword = bcrypt.hashSync(password, 10);
      db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [username, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json({ message: "Insert failed" });

          return res.status(201).json({ message: "User created" });
        }
      );
    }
  );
});

/**
 * log in
 */
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length === 0)
        return res
          .status(401)
          .json({ message: "Invalid username or password" });

      const found = results[0];

      if (!bcrypt.compareSync(password, found.password)) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const token = jwt.sign(
        { id: found.id, username: found.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token, user: { id: found.id, username: found.username } });
    }
  );
});

/**
 * Get
 */
app.get("/todos", authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT * FROM todos WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

/**
 * Post
 */
app.post("/todos", authenticateToken, (req, res) => {
  const { task, completed } = req.body;
  const userId = req.user.id;

  if (!task || typeof completed === "undefined") {
    return res.status(400).json({ error: "Invalid Input" });
  }

  db.query(
    "INSERT INTO todos (task, completed, user_id) VALUES (?, ?, ?)",
    [task, completed, userId],
    (err, results) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      return res.status(201).json({
        message: "Todo created",
        task,
        completed,
        id: results.insertId,
      });
    }
  );
});

/**
 * Delete
 */
app.delete("/todos/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM todos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ message: "Task Deleted" });
  });
});

/**
 * Put
 */
app.put("/todos/:id", authenticateToken, (req, res) => {
  const id = req.params.id;
  const { task, completed } = req.body;
  if (typeof task === "undefined" || typeof completed === "undefined") {
    return res.status(400).json({ error: "Missing task" });
  }
  db.query(
    "UPDATE todos SET task = ?, completed = ? WHERE id = ?",
    [task, completed, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.json({ message: "Task Updated", task, completed });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Backend is listening at http://localhost:${PORT}`);
});
