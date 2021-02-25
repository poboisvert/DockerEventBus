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

const comemntsByPostId = {};
const PORT = 4001;

// ROUTES BROWSE

// GET
app.get("/posts/:id/comments", (req, res) => {
  res.send(comemntsByPostId[req.params.id] || []);
});

// POST Comment
app.post("/posts/:id/comments", async (req, res) => {
  const commentsId = randomBytes(4).toString("hex");

  // Destructure request body
  const { content } = req.body;

  const comments = comemntsByPostId[req.params.id] || []; // If Empty  empty array []

  comments.push({ id: commentsId, content });

  comemntsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events/", {
    type: "CommentCreated",
    data: {
      id: commentsId,
      content,
      postId: req.params.id,
    },
  }); // Query

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

// PORT LISTENER
app.listen(PORT, () => {
  console.log(`Comment on ${PORT}`);
});
