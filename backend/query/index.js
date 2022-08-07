const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:4002"] }));
app.use(bodyParser.json());

const queryData = {};

app.post("/events", (req, res) => {
  const data = req.body;
  if (data?.type && data?.type === "POSTS/CREATED_POST") {
    const { postId, title } = data.data;
    queryData[postId] = { id: postId, title, comments: [] };
  }
  if (data?.type && data?.type === "COMMENTS/CREATED_COMMENT") {
    const { postId, id, content } = data.data;
    queryData[postId].comments.push({ id, content, postId });
  }
  console.log("queryData", queryData);
  res.send({ ok: "Data received in query service" });
});

app.get("/getAllPost", (req, res) => {
  res.send({ data: Object.values(queryData) });
});

app.listen(4003, () => console.log("query server listening to port 4003"));
