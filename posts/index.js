const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");

// STORAGE
/* POSTS = 4000
COMMENTS = 4001
Query = 4002
EVENT_BUS = 4005*/

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
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  // Event-Bus Service
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

// PORT LISTENER
app.listen(PORT, () => {
  console.log(`Post on ${PORT}`);
});
