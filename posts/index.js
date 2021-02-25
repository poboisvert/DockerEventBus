const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

// STORAGE
/* POSTS = 4000
COMMENTS = 4001 */

// CORS
const cors = require("cors");

// ROUTES Express
const app = express();

// JSON ENCODING
app.use(bodyParser.json());
app.use(cors());

const posts = {};
const PORT = 4000;

// ROUTES BROWSE
// GET POST
app.get("/posts", (req, res) => {
  res.send(posts);
});

// POST POST
app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  // EX: 4151
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  res.status(201).send(posts[id]);
});

// PORT LISTENER
app.listen(PORT, () => {
  console.log(`Active on ${PORT}`);
});
