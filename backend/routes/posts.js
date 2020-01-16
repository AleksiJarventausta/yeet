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
        if (req.body.additional !== undefined && req.body.additional !== req.user.additonal) {
          req.user.additional = req.body.additional
          req.user.save().catch(err => console.log(err));
        }
        if (req.body.active !== undefined) {
          if(req.body.active) {
            post.liked = []
            post.unliked = []
          }
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

router.get("", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Post.findOne({ poster: req.user._id })
    .select("-liked -unliked -poster -_id")
    .exec(function(err, post) {
      if (err)
        return res.status(400).json({ error: "Failed to get user's post" });
      if (post) {
        return res.status(200).json(post);
      } else {
        return res.status(400).json({ error: "Failed to get user's post" });
      }
    });
});

router.post(
  "/addgame",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Post.findOne({ poster: req.user._id }).exec(function(err, post) {
      if (err)
        return res.status(400).json({ error: "Failed to add game to list" });
      if (post) {
        if (post.games.includes(req.body._id)) {
          return res.status(200).json({ error: "List already has this game" });
        }
        post.games.push(req.body._id);
        post.save(null, function(err, post) {
          if (err)
            return res
              .status(400)
              .json({ error: "Failed to add game to list" });
          return res.status(200).send("game add ok");
        });
      } else {
        return res.status(400).json({ error: "Failed to add game to list" });
      }
    });
  }
);

router.post(
  "/deletegame",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Post.findOne({ poster: req.user._id }).exec(function(err, post) {
      if (err) return res.status(400).json({ error: "Failed to delete game" });
      if (post) {
        const gameIndex = post.games.indexOf(req.body._id);
        if (gameIndex == -1) {
          return res.status(200).json({ error: "Game wasn't in the list." });
        }
        post.games.splice(gameIndex, 1);
        post.save(null, function(err, post) {
          if (err)
            return res
              .status(400)
              .json({ error: "Failed to add game to list" });
          res.status(200).send("game delete ok");
        });
      } else {
        res.status(400).json({ error: "Failed to delete game" });
      }
    });
  }
);

module.exports = router;
