const express = require("express");

const Posts = require("../data/helpers/postDb");

const router = express.Router();

// handles URLS beginning with /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts."
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userPosts = await Posts.getById(req.params.id);
    userPosts
      ? res.status(200).json(userPosts)
      : res.status(404).json({ message: "The post could not be found." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error retrieving the posts."
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await Posts.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the post."
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postId = await Posts.remove(req.params.id);
    postId
      ? res.status(200).json({ message: "The post has been removed." })
      : res.status(404).json({ message: "The post could not be found." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error removing the post."
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body);
    post
      ? res.status(200).json(post)
      : res.status(404).json({ message: "The post could not be found." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error updating the post."
    });
  }
});

module.exports = router;
