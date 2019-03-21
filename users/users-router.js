const express = require("express");

const Users = require("../data/helpers/userDb");

const router = express.Router();

// handles URLs beginning with /api/users
router.get("/", async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the users."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);
    user
      ? res.status(200).json(user)
      : res.status(404).json({ message: "User not found." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving user."
    });
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const userPosts = await Users.getUserPosts(req.params.id);
    userPosts[0]
      ? res.status(200).json(userPosts)
      : res.status(404).json({ message: "User post's not found." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving user's posts."
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

router.put("/:id", async (req, res) => {
  try {
    const user = await Users.update(req.params.id, req.body);
    user
      ? res.status(200).json(user)
      : res.status(404).json({ message: "The user could not be found." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the user."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await Users.remove(req.params.id);
    count > 0
      ? res.status(200).json({ message: "The user has been removed." })
      : res.status(404).json({ message: "The user could not be found." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error deleting the user."
    });
  }
});

module.exports = router;
