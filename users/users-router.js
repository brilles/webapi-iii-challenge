const express = require("express");

const Users = require("../data/helpers/userDb");

const router = express.Router();

// handles URLs beginning with /api/users
router.get("/", async (req, res) => {
  try {
    const users = await Users.get(req.body);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the users."
    });
  }
});

router.get("/:id", async (req, res) => {
  const user = await Users.getById(req.params.id);
  user
    ? res.status(200).json(user)
    : res.status(404).json({ message: "User not found." });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving user."
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await Users.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the user."
    });
  }
});

module.exports = router;
