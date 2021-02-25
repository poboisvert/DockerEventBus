const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// ROUTES Express
const app = express();

// JSON ENCODING
app.use(bodyParser.json());

// STORAGE
/* POSTS = 4000
COMMENTS = 4001
Query = 4002
EVENT_BUS = 4005*/

app.post("/events", (req, res) => {
  const event = req.body;
  // ASSUME ALL POST WORK
  axios.post("http://localhost:4000/events/", event); // POST
  axios.post("http://localhost:4001/events/", event); // COMMENT
  axios.post("http://localhost:4002/events/", event); // Query

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Event-Bus on PORT 4005");
});
