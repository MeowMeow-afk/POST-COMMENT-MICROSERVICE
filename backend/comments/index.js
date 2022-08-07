const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

const commentsByPostId = { 1: [{ id: "11", content: "hello world" }] };

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const comments = commentsByPostId[postId] ?? [];
  res.send({ data: comments });
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  if (isValidContent(content)) {
    const postId = req.params.id;
    const comments = commentsByPostId[postId] ?? [];
    comments.push({ id: commentId, content });
    commentsByPostId[postId] = comments;
    res.status(201).send(comments);
    return;
  }
  res.status(404).send({ error: "invalid request" });
});
const isValidContent = (content) => !!content;

app.listen(4001, () => {
  console.log("comment service running on port 4001");
});
