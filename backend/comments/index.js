const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const app = express();
app.use(bodyParser.json());

const commentsByPostId = { 123: [{ id: "hello", content: "hello world" }] };

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const comments = commentsByPostId[postId] ?? [];
  res.send({ comments });
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  console.log(content);
  if (isValidContent(content)) {
    const postId = req.params.id;
    const comments = commentsByPostId[postId] ?? [];
    comments.push({ id: commentId, content });
    commentsByPostId[postId] = comments;
    res.status(201).send(comments);
  }
  res.status(404).send({ error: "invalid request" });
});

app.listen(4001, () => {
  console.log("comment service runningon port 4001");
});

const isValidContent = (content) => !!content;
