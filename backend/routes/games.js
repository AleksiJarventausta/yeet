const router = require("express").Router();
const passport = require("passport");
const axios = require("axios");


const axiosConfig = {
  headers: {
    Accept: "application/json",
    "user-key": process.env.IGDB_KEY
  }
};

router.post(
  "/search",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    try {
      const searchString =
        'search "' +
        req.body.search +
        '";where total_rating >0 & total_rating_count > 100; fields total_rating,name,popularity,artworks; limit 10;';
      axios
        .post("https://api-v3.igdb.com/games", searchString, axiosConfig)
        .then(igRes => {
          res.send(igRes.data);
        })
        .catch(err => res.status(400).json({ error: "Failed to get games." }));
    } catch (err) {
      res.status(400).json({ error: "Failed to get games." });
    }
  }
);

router.post(
  "/search-id",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    try {
      const searchString =
        "where id=(" +
        req.body.ids.toString() +
        "); fields total_rating,name,popularity,artworks;";
      axios
        .post("https://api-v3.igdb.com/games", searchString, axiosConfig)
        .then(igRes => {
          res.send(igRes.data);
        })
        .catch(err => res.status(400).json({ error: "Failed to get games." }));
    } catch (err) {
      res.status(400).json({ error: "Failed to get games." });
    }
  }
);

module.exports = router;
