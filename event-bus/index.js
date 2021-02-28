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

// POST is POSTING TO EVENT-BUS
app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  // ASSUME ALL POST WORK - SEND TO ALL SERVICE - DUPLICATION - NODE 15 FIX - DOCKER Image 14 (TO CONFIRM)
  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });

  // Query Listenning to Event-Bus in case of shutdown
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

// No Action
app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Event-Bus on PORT ${PORT}`);
});
