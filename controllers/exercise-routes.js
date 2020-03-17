var db = require("../models");

module.exports = function(app) {
  app.get("/api/back", function(req, res) {
    db.Back.findAll({}).then(function(dbBack) {
      res.JSON(dbBack);
    });
  });
};
