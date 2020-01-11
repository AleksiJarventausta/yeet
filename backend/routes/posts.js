const router = require("express").Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Post = require("../models/Post");

router.post(
  "/search",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Post.findOne({ poster: req.user._id }).exec(function(err, post) {
      if (err) return res.status(400).json({ error: "failed" });
      if (post) {
        if (req.body.active !== undefined) {
          post.active = req.body.active;
        }
        if (req.body.description !== undefined) {
          post.description = req.body.description;
        }
        post.save(null, function(err, post) {
          if (err) return res.status(400).json({ error: "failed" });
          res.status(200).send("update ok");
        });
      } else {
        const newPost = new Post({
          poster: req.user._id,
          description: req.body.description,
          active: true,
          _id: mongoose.Types.ObjectId()
        });
        newPost.save(null, function(err, post) {
          if (err) return res.status(400).json({ error: "failed" });
          res.status(200).send("new post ok");
        });
      }
    });
  }
);

router.post(
  "/addgame",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Post.findOne({ poster: req.user._id }).exec(function(err, post) {
      if (err) return res.status(400).json({ error: "Failed to add game to list" });
      if (post) {
        post.games.push(req.body.gameId);
        post.save(null, function(err, post) {
          if (err) return res.status(400).json({ error: "Failed to add game to list" });
          res.status(200).send("game add ok");
        });
      } else {
        res.status(400).json({error: "Failed to add game to list"});
      }
    });
  }
);

module.exports = router;