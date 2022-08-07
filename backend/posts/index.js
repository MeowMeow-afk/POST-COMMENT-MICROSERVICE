const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

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

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { title };
  res.status(201).send({ data: posts[id] });
});

app.listen(4000, () => {
  console.log("listening on port 4000");
});
