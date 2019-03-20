const express = require("express");

const Posts = require("../data/helpers/postDb");

const router = express.Router();

// handles URLS beginning with /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the posts"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userPosts = await Posts.getById(req.params.id);
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the posts"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = await Posts.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Error adding the post"
    });
  }
});

module.exports = router;
