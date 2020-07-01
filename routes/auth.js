const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const router = express.Router();

let Account = require("../models/account");
let Profile = require("../models/profile");

router.get("/logout", function (req, res) {
  console.log(`[Auth] ${req.session.user} has logged out`)

  req.session.destroy()
  res.redirect("/login")
});

router.get("/register", function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("../")
  } else {
    res.render("./auth/register", {
      message: undefined
    });
  }
});


router.post("/register", validateRegister(), function (req, res) {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) throw error


    Account({
      username: req.body.username,
      password: hash,
      created: Date.now()
    }).save(function (err, doc) {
      if (err) {
        res.render("./auth/register", {
          message: "Username already exists."
        });

      } else {
        Profile({
          username: req.body.username
        }).save(function (err, doc) {
          if (err) throw err
        });

        req.login(doc._id, function (err) {
          if (err) throw err

          req.session.user = req.body.username
          console.log(`[Auth] ${req.session.user} has registered`)
          res.redirect("../")
        })
      }
    })
  })
})

router.get("/login", function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("../")
  } else {
    res.render("./auth/login", {
      message: undefined
    })
  }
})

router.post("/login", function (req, res) {
  req.body.username = req.body.username.toLowerCase()
  req.body.password = req.body.password.toLowerCase()

  Account.find({
    username: req.body.username
  }, function (err, doc) {
    if (err) throw err

    if (!doc.length) {
      res.render("./auth/login", {
        message: "Username or password is incorrect."
      })
    } else {
      bcrypt.compare(req.body.password, doc[0].password, function (err, result) {
        if (err) throw err
        if (result == true) {
          req.login(doc[0]._id, function (err) {
            if (err) throw err;
            req.session.user = req.body.username

            console.log(`[Auth] ${req.session.user} has logged in`)
            res.redirect("../")
          })

        } else {
          console.log(`${req.session.user} failed to login`)
          res.render("./auth/login", {
            message: "Username or password is incorrect."
          })
        }
      })
    }
  })
})

function validateRegister() {
  return function (req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    req.body.password = req.body.password.toLowerCase();

    if (
      validator.isAlphanumeric(req.body.username)
    ) {
      console.log("authentication = " + req.isAuthenticated());
      return next();
    }
    res.render("./auth/register", {
      message: "Invalid input. Try again."
    })
  }
}

module.exports = router;