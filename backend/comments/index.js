const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 4001;
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4002"],
    optionsSuccessStatus: 200,
  })
);

const commentsByPostId = { 1: [{ id: "11", content: "hello world" }] };
const eventBussUrl = "http://localhost:4002/events";

app.post("/events", (req, res) => {
  const data = req.body;
  console.log("data from buss", data);
  res.status(200).send({ ok: "comments service recieved data" });
});

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const comments = commentsByPostId[postId] ?? [];
  res.send({ data: comments });
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  if (isValidContent(content)) {
    const postId = req.params.id;
    const comments = commentsByPostId[postId] ?? [];
    comments.push({ id: commentId, content });
    commentsByPostId[postId] = comments;

    // Emiting event to event buss
    try {
      let data = {
        event: {
          type: "COMMENTS/CREATED_COMMENT",
          data: {
            id: commentId,
            content,
            postId: postId,
          },
        },
      };
      const response = await axios.post(eventBussUrl, data);
      console.log("post to event buss response", response.data);
    } catch (error) {
      console.log("post to event buss error", error.code);
    }
    res.status(201).send(comments);
    return;
  }
  res.status(404).send({ error: "invalid request" });
});
const isValidContent = (content) => !!content;

app.listen(PORT, () => {
  console.log("comment service running on port 4001");
});
