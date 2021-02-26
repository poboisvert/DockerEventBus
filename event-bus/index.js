const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// ROUTES Express
const app = express();

// JSON ENCODING
app.use(bodyParser.json());

// Events
const events = [];

// STORAGE
/* 
CORS Require if communication with Front End
POSTS = 4000
COMMENTS = 4001
Query = 4002
Moderation = 4003
EVENT_BUS = 4005
*/

//PORT
const PORT = 4005;

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  // ASSUME ALL POST WORK - SEND TO ALL SERVICE - DUPLICATION - NODE 15 FIX
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Event-Bus on PORT ${PORT}`);
});
