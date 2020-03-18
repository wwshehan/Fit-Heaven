var db = require("../models");

module.exports = function(app) {
  app.get("/api/exercises/", function(req, res) {
    db.Exercises.findAll({
      // where: {
      //   muscle: req.params.muscle
      // }
    }).then(function(dbMuscle) {
      res.JSON(dbMuscle);
    });
  });
};
