const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// ROUTES Express
const app = express();

// JSON ENCODING
app.use(bodyParser.json());

//PORT
const PORT = 4003;

// STORAGE
/* 
CORS Require if communication with Front End
POSTS = 4000
COMMENTS = 4001
Query = 4002
Moderation = 4003
EVENT_BUS = 4005
*/

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("Android") ? "rejected" : "approved";

    await axios.post("http://localhost:4005/events/", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }
  res.send({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Moderation on PORT ${PORT}`);
});
