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

function sseAuthorization(req) {}

router.get(
  "/matches",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    Post.find({ poster: { $ne: req.user._id }, active: true })
      .select("-liked -unliked  -__proto__ -__v")
      .populate("poster", "username discord")
      .exec(function(err, posts) {
        if (err) return res.status(400).json({ error: "failed" });
        nocache(res);
        res.json(posts);
      });
  }
);

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
          res.writeHead(200, headers);
          res.write(":" + Array(2049).join(" ") + "\n"); // 2kB padding for IE
          res.write("retry: 2000\n");
          res.write("data: moi\n\n");

          const newClient = {
            id: user._id,
            res
          };
          clients.push(newClient);
          const timer = setInterval(() => {
            res.write("data: empty \n\n");
          }, 20000);

          req.on("close", () => {
            clients = clients.filter(c => c.id !== user.id);
            clearInterval(timer);
          });
        } else {
          next(res.status(401).send("Unauthorized."));
        }
      })
      .catch(err => console.log(err));
  }
  // When client closes connection we update the clients list
  // avoiding the disconnected one
});

router.post("/like", passport.authenticate("jwt", { session: false }), function(
  req,
  res
) {
  Post.findOne({ _id: req.body.postId }).exec(function(err, otherPost) {
    if (req.body.like) {
      otherPost.liked.push(req.user._id);
    } else {
      otherPost.unliked.push(req.user._id);
    }
    otherPost
      .save()
      .then(user => console.log(user))
      .catch(err => {});
    Post.findOne({ poster: req.user._id })
      .populate("poster")
      .exec(function(err, userPost) {
        const lol = JSON.parse(JSON.stringify(userPost.liked));
        const xd = lol.includes(req.body.userId);
        if (xd && req.body.like) {
          clients.map(c => {
            const otherId = mongoose.Types.ObjectId(req.body.userId);
            if (c.id.equals(req.user._id) || otherId.equals(c.id)) {
              c.res.write("data: LoYTY MATCHI!!!!!!\n\n");
            }
          });
        }
      });
  });
  res.send("ok");
});

module.exports = router;
