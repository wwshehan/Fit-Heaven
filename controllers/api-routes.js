// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      db.User.findOne({
        where: {
          id: req.user.id
        }
      })
        // Otherwise send back the user's email and id
        // Sending back a password, even a hashed password, isn't a good idea
        .then(foundUser => {
          console.log(foundUser);
          res.json({
            email: foundUser.dataValues.email,
            gender: foundUser.dataValues.gender,
            level: foundUser.dataValues.level,
            weight: foundUser.dataValues.weight
          });
        });
    }
  });

  app.get("/api/user_data/:id", function(req, res) {
    db.User.findByPk(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(500).json(err));
  });

  app.put("/api/user_data", function(req, res) {
    console.log(req.user.id);
    db.User.update(req.body, {
      where: {
        id: req.user.id
      }
    }).then(function(dbUser) {
      console.log("NEWUSER" + dbUser);
      res.json(dbUser);
    });
  });

  app.get("/api/findExercises", (req, res) => {
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then(results => {
      console.log(results);
      if (!results.dataValues.level) {
        res.json({});
      } else {
        db.Exercise.findAll({
          where: {
            muscle: "chest",
            level: results.dataValues.level
          }
        }).then(arrayOfExercises => {
          console.log(arrayOfExercises);
          res.json(arrayOfExercises);
        });
      }
    });
  });
};
