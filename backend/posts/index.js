const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4002"],
    optionsSuccessStatus: 200,
  })
);

const posts = {
  1: { title: "yash" },
  2: { title: "yash chauhan" },
  3: { title: "rana" },
};

app.get("/posts", (req, res) => {
  res.send({
    data: Object.entries(posts).map(([id, title]) => ({
      id,
      title: title.title,
    })),
  });
});

app.post("/events", (req, res) => {
  const data = req.body;
  res.status(200).send({ ok: "post service recieved data" });
});

const eventBussUrl = "http://localhost:4002/events";
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { title };
  try {
    const response = await axios.post(eventBussUrl, {
      event: { type: "POSTS/CREATED_POST", data: { postId: id, title } },
    });
    console.log("post to event buss response", response.data);
  } catch (error) {
    console.log("post to event buss error", error.code);
  }
  res.status(201).send({ data: posts[id] });
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
