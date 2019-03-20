const express = require("express");

const usersRouter = require("./users/users-router.js");
const postsRouter = require("./posts/posts-router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h1>Welcome</h1>
  `);
});

// routing
server.post("/api/users", usersRouter, makeUppercase);
server.put("/api/users/:id", usersRouter, makeUppercase);
server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

function makeUppercase(req, res, next) {
  const str = req.body.name;
  const strArrOriginal = str
    .split(" ")
    .map(name => name.charAt(0))
    .join();
  const strArrUpper = str
    .split(" ")
    .map(name => name.charAt(0).toUpperCase())
    .join();
  console.log(strArrOriginal);
  console.log(strArrUpper);
  if (strArrOriginal == strArrUpper) {
    next();
  } else {
    res.status(401).send("name must be capitalized, try again");
  }
}

module.exports = server;
