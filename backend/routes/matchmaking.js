const router = require("express").Router();
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");

router.get(
  "/matches",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Post.find({ creator: { $ne: req.user._id } })
      .select("-liked -unliked  -__proto__ -__v")
      .populate("poster", "username discord")
      .exec(function(err, posts) {
        if (err) return res.status(400).json({ error: "failed" });
        res.json(posts);
      });
  }
);

router.post(
  "/search",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Post.findOne({ poster: req.user._id }).exec(function(err, post) {
      if (err) return res.status(400).json({ error: "failed" });
      if (post) {
        post.active = req.body.active;
        post.description = req.body.description;
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

router.post("/like", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  let userId = req.body._id;
  Post.findOne({poster: userId}, function(err, otherPost) {
    if (req.body.like) {
      otherPost.liked.push(req.user._id)
    } else {
      otherPost.unliked.push(req.user._id)
    }
    otherPost.save();
    Post.findOne({poster: req.user._id}, function (err, userPost) {
      if(userPost.liked.includes(userId) && req.body.like) {
        console.log("match made in heaven.");
      }
    })
  })
  res.send("ok");
});

module.exports = router;
