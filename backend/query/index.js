const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 4003;

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:4002"] }));
app.use(bodyParser.json());

const queryData = {};

app.post("/events", (req, res) => {
  const data = req.body;
  handleEvents(data);
  res.send({ ok: "Data received in query service" });
});

app.get("/getAllPost", (req, res) => {
  res.send({ data: Object.values(queryData) });
});

app.listen(PORT, async () => {
  console.log("query server listening to port 4003");
  // handle any unhandled event stored in event bus queue while the query service was down
  try {
    const eventBus = await axios.get("http://localhost:4002/events");
    for (const event of eventBus.data.events) {
      console.log("processing event:", event.type);
      handleEvents(event);
    }
    console.log(queryData);
  } catch (error) {
    console.log(error);
  }
});

const handleEvents = (data) => {
  if (data?.type && data?.type === "POSTS/CREATED_POST") {
    const { postId, title } = data.data;
    queryData[postId] = { id: postId, title, comments: [] };
  }
  if (data?.type && data?.type === "COMMENTS/CREATED_COMMENT") {
    const { postId, id, content } = data.data;
    queryData[postId].comments.push({ id, content, postId });
  }
};
