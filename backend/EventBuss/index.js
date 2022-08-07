const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "http://localhost:4001",
      "http://localhost:4003",
    ],
  })
);

const events = [];

const services = {
  posts: "http://localhost:4000/events",
  comments: "http://localhost:4001/events",
  query: "http://localhost:4003/events",
};
app.post("/events", async (req, res) => {
  const { event } = req.body;
  events.push(event);
  try {
    // await axios.post(services.posts, event);
    // await axios.post(services.comments, event);
    await axios.post(services.query, event);
  } catch (error) {
    console.log("error", error);
  }
  res.send({ ok: "event emmited from eventbuss" });
});

app.get("/events", async (req, res) => {
  res.send({ events });
});

app.listen(4002, () => console.log("Event Buss listening at 4002"));
