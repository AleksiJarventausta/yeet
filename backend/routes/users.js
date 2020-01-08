const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var registerValidation = require('../validation/validateRegisteration');
var loginValidation= require('../validation/validateLogin');
const mongoose = require('mongoose');
const passport = require('passport');

router.post('/login', function (req, res) {


  const { errors, isValid } = loginValidation(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ password: "Password incorrect" });
      }
    });
  });
});


router.post('/register', function (req, res) {

    let {errors, isValid}= registerValidation(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}, function (err, user) {
        if (user) {
            return res.status(400).json({email: "Email already in use."});
        } else {
            let registeringUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                _id : new mongoose.Types.ObjectId()
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(registeringUser.password, salt, (err, hash) => {
                if (err) throw err;
                registeringUser.password = hash;
                registeringUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }

    });
});
router.get('/search',
    passport.authenticate("jwt", {session: false}),
    function (req, res) {
        
        User.find({_id : {$ne : req.user._id} }).select('-password -__proto__ -__v').populate('creator', 'name').sort('created_at').exec( function (err, posts) {
            if (err) return res.status(400).json({lol:'failed'});
            res.json(posts);
        });
});



module.exports = router;