const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

// ROUTES Express
const app = express();

// JSON ENCODING
app.use(bodyParser.json());
app.use(cors());

/* 
CORS Require if communication with Front End
POSTS = 4000
COMMENTS = 4001
Query = 4002
Moderation = 4003
EVENT_BUS = 4005
*/

//PORT & Storage
const PORT = 4000;
const posts = {};

// AXIOS
app.get("/posts", (req, res) => {
  res.send(posts);
});

// POST POST
// Received from REACT Front END
app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  // Received from event-bus
  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

// POST events
app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

// PORT
app.listen(PORT, () => {
  console.log(`Posts on PORT ${PORT}`);
});
