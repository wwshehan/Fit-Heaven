var db = require("../models");

module.exports = function(app) {
  app.get("/api/exercises/:back", function(req, res) {
    db.Exercises.findAll({
      where: {
        muscle: req.params.back
      }
    }).then(function(dbBack) {
      res.JSON(dbBack);
    });
  });
};
