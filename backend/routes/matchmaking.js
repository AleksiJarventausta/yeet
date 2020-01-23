const router = require("express").Router();
const passport = require("passport");
const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");
const jwt_decode = require("jwt-decode");

let clients = [];

function nocache(res) {
  res.header("Cache-Control", "private, no-cache");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
}

router.get(
  "/matches",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    Post.findOne({ poster: req.user._id }).exec(function(err, userPost) {
      if (!userPost || err)
        return res.status(400).json({ error: "user hasn't made post yet" });
      Post.find({
        poster: { $ne: req.user._id },
        active: true,
        liked: { $ne: req.user._id },
        unliked: { $ne: req.user._id },
        games: { $in: userPost.games }
      })
        .select(" -__proto__ -__v")
        .populate("poster", "-_id username discord additional")
        .exec(function(err, posts) {
          if (err) return res.status(400).json({ error: "failed" });
          nocache(res);
          res.json(posts);
        });
    });
  }
);

function closeClient(user, time) {
  clients = clients.filter(c => c.id !== user._id && c.timer !== time);
  if (clients.filter(c => c.id === user._id) < 1) {
    Post.findOne({ poster: user._id }).exec(function(err, userPost) {
      userPost.active = false;
      userPost.save().catch(err => console.log(err));
    });
  }
}

router.get("/connect", function(req, res, next) {
  // Mandatory headers and http status to keep connection open
  if (req.headers.authorization) {
    const jwt_payload = jwt_decode(req.headers.authorization);
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          const headers = {
            "Content-Type": "text/event-stream",
            Connection: "keep-alive",
            "Cache-Control": "no-cache",
            "Access-control-allow-headers": "x-requested-with",
            "Access-Control-Allow-Origin": "*"
          };
          //req.user.responses.push(res);
          //req.user.save();
          res.set(headers);
          res.write(":" + Array(2049).join(" ") + "\n"); // 2kB padding for IE
          res.write("retry: 10000\n\n");
          Post.findOne({ poster: user._id }).exec(function(err, userPost) {
            userPost.active = true;
            userPost.save().catch(err => console.log(err));
          });

          const time = Date.now();
          const newClient = {
            id: user._id,
            timer: time,
            res
          };
          clients.push(newClient);

          req.on("close", () => closeClient(user, time));
        } else {
          next(res.status(401).send("Unauthorized."));
        }
      })
      .catch(err => console.log(err));
  }
  // When client closes connection we update the clients list
  // avoiding the disconnected one
});

function matchUsers(req, otherPost, userPost) {
  const matchedUser = {
    username: otherPost.poster.username,
    discord: otherPost.poster.discord,
    games: otherPost.games,
    description: otherPost.description,
    additional: otherPost.poster.additional
  };

  const thisUser = {
    username: req.user.username,
    discord: req.user.discord,
    games: userPost.games,
    description: userPost.description,
    additional: userPost.poster.additional
  };
  clients.map(c => {
    if (c.id.equals(req.user._id)) {
      c.res.write("data: " + JSON.stringify(matchedUser) + "\n\n");
    } else if (otherPost.poster._id.equals(c.id)) {
      c.res.write("data: " + JSON.stringify(thisUser) + "\n\n");
    }
  });
}

router.post("/like", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Post.findOne({ _id: req.body.postId })
    .populate("poster", "username discord additional")
    .exec(function(err, otherPost) {
      if (req.body.like) {
        otherPost.liked.push(req.user._id);
      } else {
        otherPost.unliked.push(req.user._id);
      }
      const userId = otherPost.poster._id
      otherPost
        .save()
        .then(user => {
          Post.findOne({ poster: req.user._id })
            .populate("poster")
            .exec(function(err, userPost) {
              const isMatch = userPost.liked.includes(userId)
              if (isMatch && req.body.like) {
                matchUsers(req, otherPost, userPost);
              }
            });
        })
        .catch(err => {});
    });
  res.send("ok");
});

module.exports = router;
