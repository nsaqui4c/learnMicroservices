const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const posts = {};

app.get("/", (req, res) => {
  res.send(posts);
});
app.post("/", validatePost("some value"), (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  res.status(201).send(`data added successfully-${id}`);
});

app.use((err, req, res, next) => {
  res.status(500).json(err.message || "Something broke!");
});

app.listen(4000, () => {
  console.log("server started on port 4000");
});

function validatePostBody(req, res, next) {
  const { title } = req.body;
  if (!title) {
    throw new Error("{'error':'body is missing title'}");
  }
  next();
}
function validatePost(customArg, req, res, next) {
  return function (req, res, next) {
    console.log(customArg);
    const { title } = req.body;
    if (!title) {
      res.status(400).json("{'error':'body is missing title'}");
    }
  };
}
