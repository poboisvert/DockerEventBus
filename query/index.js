const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

//PORT
const PORT = 4002;

// Event filter by type
// Refer to POST or Comment Service
const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

// POST FROM EVENT-BUS
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  // Analyzing the event type
  handleEvent(type, data);

  //console.log(posts);

  res.send({});
});

app.listen(PORT, async () => {
  console.log(`Query on PORT ${PORT}`);
  // IF DOWN, it will fetch the lost data - Shudown
  const res = await axios.get("http://event-bus-serv:4005/events");

  for (let event of res.data) {
    console.log("Analyzing event", event.type);

    handleEvent(event.type, event.data);
  }
});
