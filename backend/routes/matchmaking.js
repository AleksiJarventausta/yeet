const router = require("express").Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Post = require("../models/Post");

router.get(
  "/matches",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    Post.find({ poster: { $ne: req.user._id } })
      .select("-liked -unliked  -__proto__ -__v")
      .populate("poster", "username discord")
      .exec(function(err, posts) {
        if (err) return res.status(400).json({ error: "failed" });
        res.json(posts);
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
