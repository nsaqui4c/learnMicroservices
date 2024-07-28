
## EXPRESS

* body parser
```js
// body parser are part of express now. No need to install anything
const bodyParser  = require('body-parser');
app.use(bodyParser()); //Now deprecated
//You now need to call the methods separately

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());
//And so on. If you're still getting a warning with urlencoded you need to use

app.use(bodyParser.urlencoded({
  extended: true
}));
```

* middleware with error
```js
app.post("/", validatePostBody, (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  res.status(201).send(`data added successfully-${id}`);
});

function validatePostBody(req, res, next) {
  const { title } = req.body;
  if (!title) {
    throw new Error("{'error':'body is missing title'}");
  }
  next();
}
app.use((err, req, res, next) => {
  res.status(500).json(err.message || "Something broke!");
});
```
* middleware with argument
```js
app.post("/", validatePost("some value"), (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };

  res.status(201).send(`data added successfully-${id}`);
});

function validatePost(customArg, req, res, next) {
  return function (req, res, next) {
    console.log(customArg);
    const { title } = req.body;
    if (!title) {
      res.status(400).json("{'error':'body is missing title'}");
    }
  };
}
```
