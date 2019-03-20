const express = require("express");

const Posts = require("../data/helpers/postDb");

const router = express.Router();

// handles URLS beginning with /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.get(req.body);
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
      message: "Error retrieving the user posts"
    });
  }
});

module.exports = router;
