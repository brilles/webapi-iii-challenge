const express = require("express");

const usersRouter = require("./users/users-router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h1>Welcome</h1>
  `);
});

// routing
server.use("/api/users", usersRouter);

module.exports = server;
