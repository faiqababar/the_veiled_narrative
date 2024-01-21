const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const passport = require("passport");
const validatePostInput = require("../../validation/post");
var MongoDB = require("mongodb");

// @route - POST api/posts/create
// @desc - creates a post
// @access - public
router.post("/create", (req, res) => {
  const post = req.body;
  const { errors, isValid } = validatePostInput(post);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post(post);
  newPost
    .save()
    .then((doc) => res.json(doc))
    .catch((err) => console.log({ create: "Error creating new post" }));
});

// @route - PATCH api/posts/update/:id
// @desc - updates a post
// @access - private
router.patch(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("Update post request received");
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { title, body, author, publish, image } = req.body;
    const date = new Date();

    Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { title, body, author, publish, image, date } },
      { new: true }
    )
      .then((doc) => res.status(200).json(doc))
      .catch((err) =>
        res.status(400).json({ update: "Error updating existing post" })
      );
  }
);

// @route - DELETE api/posts/delete/:id
// @desc - deletes a post
// @access - private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOneAndDelete({ _id: req.params.id })
      .then((doc) => res.status(200).json(doc))
      .catch((err) =>
        res.status(400).json({ delete: "Error deleting a post" })
      );
  }
);

// @route - GET api/posts/postsByOffset/:skip/:limit/:publishFlag
// @desc - gets posts based on offset value(skip), limit(i.e. 14 posts) and value of publish flag
// @access - private
router.get("/postsByOffset/:skip/:limit/:publishFlag", (req, res) => {
  console.log("Get posts by offset request: ", req);
  const skip =
    req.params.skip && /^\d+$/.test(req.params.skip)
      ? Number(req.params.skip)
      : 0;

  const limit =
    req.params.limit && /^\d+$/.test(req.params.limit)
      ? Number(req.params.limit)
      : 0;

  const publishFlag = req.params.publishFlag;

  let publishQuery = { publish: publishFlag };

  // if publishFlag is set to true then get only published posts, otherwise get all posts
  if (publishFlag == "false") {
    publishQuery = {};
  }

  console.log("Skip: ", skip);
  console.log("Limit: ", limit);
  console.log("publishQuery: ", publishQuery);
  Post.find(publishQuery)
    .limit(limit)
    .skip(skip)
    .sort((sort = { date: -1 }))
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log("Error fetching all paginated posts: ", err);
      res.status(400).json({ post: "Error fetching all paginated posts" });
    });
});

// @route - GET api/posts/post/:id/:publishFlag
// @desc - gets a post by id and publish value
// @access - public
router.get("/post/:id/:publishFlag", (req, res) => {
  let searchClause = {
    _id: req.params.id,
    publish: req.params.publishFlag,
  };

  if (req.params.publishFlag == "false") {
    searchClause = { _id: req.params.id };
  }

  console.log("Search Clause in get post by id: ", searchClause);

  Post.find(searchClause)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(400).json({ id: "Error fetching post by id" }));
});

module.exports = router;
